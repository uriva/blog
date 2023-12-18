# My dev management principles

I have the luxury of managing some great engineers. These are some things I found to be really important for me.

## Autonomy makes people effective

People are naturally hard workers and excellent problem solvers.

However, their motivation is greatly harmed when micromanaged.

Micromanaging can be avoided by talking about what the goal is.

When people are given goals, their motivation increases. When given exact tasks, it decreases.

Motivation is paramount, considerably more important than talent or experience. Therefore people should be given context, coached and advised, rarely be told exactly what to do.

A good way to give people goals-not-tasks is to choose metrics that have intrinsic value (e.g. "latency of a server" or "client onboarding time") rather than "obedience metrics" (e.g. # tasks done, or # hours they worked).

## Managers should be hands on at all levels

If you are managing someone, be an expert decision maker at what his day to day looks like.
Prefer good decision making over likeability/agreeability.

Ideally promote managers from within, after being good at their role for some time. This creates the right atmosphere and avoids risk. Especially for high level roles.

Get down in the trenches. E.g. managers can do oncall! They usually don't - because it sucks. Make it not suck, and keep everyone carrying the load together.

## Psychological safety is important

Coding is messy business, we make mistakes that cause big problems.
It is crucial that people are not discouraged by mistakes they do, but rather have a debugger approach to debrief such incidents and make mechanisms that will prevent a kind of mistake from recurring.

Celebrate wins by name, take responsibility for losses collectively.
This will make people feel like they can point failures safely, and take calculated risks.
Tests by the way should be written with respect to probability and cost of failure, not over everything or nothing.

## Religiously avoid context switches

Software development is a cognitive tasking activity. Much effort is invested in loading into memory the problem at hand. When a programmer context-switches they need to unload and load a lot of stuff into their brain, and that causes loss of gumption and time.

Corollary of that is to avoid over-meeting and keep meetings minimal. Meetings are a great way to make someone get out of "flow-state".

## Big changes are in danger of sprawling

Unmerged code accrues technical debt (much like money accrues interest). Plan ahead to avoid this, because it can quickly become a big problem.

The more proven and dependable an engineer's ability is, the larger changes they can handle.
Newcomers should typically get 1 day tasks. Only veteran engineers should handle large mind boggling refactors.

## "Lazy" approach to development

Coding is costly ("the most expensive way to get something done"). Code only when there is concrete business-related motivation.

Keep asking "why" and "how do you know". Good PMs will have good answers.

Remember that "If you build it they will NOT come". In the startup world, first they come, then you build it! (or you build something really scrappy and iterate).

Watch out for premature optimization and premature generalization - in programming it's very hard to predict the bottleneck before it occurs. It's very hard to generalize from a single case, a couple of cases are required.

Some programmers are prone to premature generalization, coach them.

Best way to avoid premature generalization is to look at the amount of lines of code. Good generalizations reduce code, premature ones increase code length.

## Programming is a battle against entropy

Duplication is your worst enemy.

If you don't watch out, things get needlessly intertwined with each other.
These events will eventually lead to the death of your codebase, where changes cost more than their value.

The company's scale is correlated to lines of codes divided by ARR. This means the less code you have per income, the more your product is scalable.

Team size is correlated to lines of code, and team size causes quadratic (or more...) communication overhead. Keep your code base small so you can keep your team small.

## Necessity is mother of invention

Things like "a special research team" or "cto office" have potential to harm morale and make people feel excluded.

Real innovation comes from "regular" teams encountering "regular" problems but taking a moment to think about them.

Allow for risk taking in a controlled manner, let the ones who proved themselves take bigger risks. If you trust someone, don't control what they do, but do control how success is measured.

Avoid titles unless they have clear and immediately obvious meaning
What matters is the topology of the organization and the processes, not the titles.

More often than not titles obscure rather than elucidate. There are subtle differences (VP of, head of, director of...) that vary from place to place.

It's a way for ego to be introduced, via titles arms race.

## Invest heavily in developer experience

Architecture as code, and other stateless stuff.

Automate everything - code checks, formatting, tests, programming environments… anything you can.

Make it quick to iterate (e.g. environment load times, setup, onboarding)

This relates to being hands-on, because when you are hands-on you will feel the pain yourself and will pursue solving it.

## Keep the team small

Communication overhead is significant.

If you have to increase the team size, make it so the teams have little to zero interactions between them.

Give ownership on a piece of code, because code collaboration is delicate. Make repos correspond to teams.

People should be given roles that have unique perspectives

If you have a PM and an eng manager who have the same responsibility, you'll get territory wars.

An engineer should have a technical area of expertise, a product manager should have a product area of expertise, the two might intersect, but cannot be in complete congruence.

## The best decision maker should be the decision maker

Sometimes this is not the most senior person in the room.
If someone makes better decisions than their managers, time to switch, in a thoughtful and kind way.

## Keep contracts sane

You hire people to be your partners, not your prisoners.

Don't make people sign draconian stuff, even if they are "the standard template". Avoid things like - "everything you do on this machine is mine" and other evil stuff. Make the contracts short, simple with easy english.

Let people retain their identities. Still missing tools to do this to satisfaction, but in github for example you can be a member of an organization, rather than get a user that belongs to an organization.

## Compensation

Keep clarity with respect to compensation, especially equity. Candidates must have all the details they need to make a good decision, e.g. what percentage of total stocks they get. Do simulations with them about exit options. Not everyone is a startup founder and savvy in all these details.

If someone is useful to the organization, make them well compensated, even if they are bad negotiators. Making the best contributors be rewarded will positively impact the general atmosphere.

Find a fair way to gauge people's relative contribution, without making people hate the organization, considering multiple people's impressions. Founders too.
No long essays about what you did, no essay peer reviews.

If you want to rely on managers and peers' opinions, present them binary questions, and normalize/aggregate intelligently.

## Hiring

Prefer motivation > talent > experience.

Coding interviews are a great way to measure someone, they cut through all the bs.

Cultural fit interviews should be done by team members, or be a side effect of a formal interview (coding interviews). This has worked for google for >15 years, to create the most pleasant work atmosphere I've been in.

You read through to the end. Yay.

I will probably update this in the future, but this is a good snapshot. Hope it is useful to you.
