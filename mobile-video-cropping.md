# Smart Mobile Video Cropping for find-scene

When building `find-scene`, one of the most frustrating problems we encountered was sharing horizontal video clips to mobile devices. On platforms like TikTok or Instagram Reels, users expect videos to fill the vertical 9:16 screen. But if you just arbitrarily slice the center out of a 16:9 movie scene, you almost always cut off the most important part of the shot—characters talking on the side, a car driving across the screen, or key details hidden in the margins.

We needed a way to intelligently detect where the "action" or "information" was and dynamically pan our 9:16 crop window to follow it. This post is a technical survey of how we achieved this using low-res proxy analysis, future gravity motion tracking, and seam carving.

## The Strategy

Processing full-resolution video in real-time is computationally prohibitive for a quick bot response. Our first step is to quickly extract a low-resolution proxy of the video: we use `ffmpeg` to pull raw grayscale frames at 160x90 resolution at just 5 frames per second. 

This proxy provides a lightweight matrix of pixel data. Armed with this, we compute a **Heuristic Fast-Pass** to categorize the scene into one of three buckets:

1. **Information-heavy**: The scene is fairly static, but has significant off-center detail (like an asymmetrical shot of two people talking).
2. **Movement-heavy**: The scene contains concentrated bursts of motion that travel across the screen.
3. **Static/Center**: The scene is boring or perfectly centered, requiring no special treatment.

We assign a `detailScore` (based on spatial gradients) and a `motionScore` (based on temporal frame differences). If the ratio of detail to motion is high, we enter the **Information** tracker. If motion is high, we trigger the **Movement** tracker.

## Strategy 1: The Movement Tracker ("Future Gravity")

For action scenes, just tracking the current frame's movement is too jerky and reactive. We needed the crop window to smoothly anticipate where the action was heading, much like a camera operator would. 

To solve this, we built a **Future Gravity** system:
1. We compute a "pixel moving" boolean matrix by finding areas where intensity changes drastically between consecutive frames.
2. We aggregate this into `col_energy` to find the horizontal columns with the most action.
3. We then apply a temporal lookahead (about 2 seconds into the future). We assign a "future gravity" score to every X-coordinate by summing up future energy, weighted by how soon it happens. 

This pulls our target X-coordinate towards the motion *before* it gets there. We also apply a stickiness factor: once the camera locks onto an off-center subject, it requires a significant "noise floor" of movement to pull it away, preventing the camera from jittering back and forth between small background movements.

## Strategy 2: Information Tracker (Greedy Seam Carving)

Some scenes are highly detailed but don't have much motion—for example, a wide shot of two characters standing on opposite edges of the screen.

To determine the most "interesting" 9:16 slice of a static 16:9 image, we adapted an algorithm famous for content-aware image resizing: **Seam Carving**.

1. We compute the "energy" of every pixel using a Sobel-like edge detection filter (combining X and Y gradients).
2. Instead of resizing the image, we do "greedy seam carving". We trace the lowest-energy paths (the most boring vertical columns) through the frames and "remove" them.
3. We track the *provenance* of the surviving pixels. Once we've carved away enough boring seams to reach a 9:16 ratio, we average the original X-coordinates of the pixels that survived. 

The resulting center of mass tells us exactly where the most information-dense portion of the original frame is located.

## Smoothing and Output: The "Whip Pan"

Whether we used Movement or Information tracking, we now have an array of ideal anchor X-coordinates for each frame. But applying this directly would result in a shaky, nauseating camera pan.

We apply a smoothing window (a rolling average across frames) to simulate the smooth movement of a physical camera head. 

Finally, how do we apply this dynamically changing crop to the original high-resolution video without writing a complex custom renderer? We leverage `ffmpeg`'s `sendcmd` filter. We generate a text file of timestamped crop commands:

```text
0.000 crop x max(0, min(iw-out_w, iw*0.3521-out_w/2));
0.200 crop x max(0, min(iw-out_w, iw*0.3640-out_w/2));
0.400 crop x max(0, min(iw-out_w, iw*0.4102-out_w/2));
```

We pass this into the `crop` filter: `sendcmd=f=cmdPath,crop=w=ih*(9/16):h=ih`. This allows ffmpeg to slide the crop window left and right perfectly in sync with our AI-computed coordinates, completely in a single pass.

## The Results

By combining fast proxy extraction, predictive motion tracking, seam carving for detail preservation, and ffmpeg's dynamic `sendcmd` filter, we achieved an extremely fast, content-aware pan-and-scan system.

Here is an example of the algorithm in action:

### Original Video (16:9)

<iframe width="100%" height="400" src="https://www.youtube.com/embed/aO5p6xxaUBI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Final Smart Cropped Result (9:16)

<video controls width="100%">
  <source src="./final.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
