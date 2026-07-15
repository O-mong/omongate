# Architecture

This document is intended to tell you "where to look and what to change" before
modifying the code. Depending on what you want to do, you only need to read the
relevant section below.

## At a Glance

```
User action → StoryCommands → storyReducer → StoryState → buildViewModel() → StoryViewModel → component rendering
```

- **StoryState** (`src/domain/state.ts`) — A single object that contains the entire
  story progression state, such as which channels have been viewed and which
  sequence is currently playing.
- **storyReducer** (`src/domain/reducer.ts`) — `(state, action) => new state`.
  This is the only place where state changes.
- **buildViewModel()** (`src/domain/view/index.ts`) — Combines and interprets
  StoryState fields, then converts them into a form components can use directly
  (labels, counts, tooltip text, and so on).
- **StoryCommands** (`src/hooks/useStoryEngine.ts`) — A collection of functions
  called by components (`goA2023()`, `toggleFear()`, and so on). Internally, they
  dispatch actions and schedule delayed sequences when necessary.
- Components receive `{ state, view, commands }` through `useStory()`. Values that
  require combining or interpreting multiple fields, such as counts, text, or
  tooltip visibility, should be read from `view.xxx`. Simple flags that are only
  turned on or off exactly as their names suggest, such as
  `state.a2025DelayedShown`, should be read directly from `state.xxx`.
  Use `commands.xxx()` to issue commands.

## Responsibilities by Folder

```
src/domain/              Story logic — no React, DOM, or timers
  state.ts                  StoryState shape + initial values
  actions.ts                All possible state transitions (StoryAction)
  reducer.ts                storyReducer — the only place where state changes
  channels.ts               Channel ID list + archive channel detection
  view/                     Converts StoryState into "what should be shown now"
    nav.ts                    Sidebar channel list (active/locked/unread dot)
    header.ts                 Chat header label/topic/input placeholder
    rules.ts                  Annotation and README card content for the #규칙 channel
    reactions.ts              Emoji reaction states (😨👀☔)
    archives.ts               Delayed messages/sequences for archive channels
    ending.ts                 Member list/sidebar state/ending sequence flags
    messages.ts               Whether to show the "new message" banner

src/config/
  site.ts                    Centralized identity values such as the server name,
                              visitor display name, and seat number "249"
                              (SITE_CONFIG)
  timing.ts                  Centralized delay/duration values (ms) and scroll
                              threshold values (px) (TIMING) — each controller
                              only reads values from here

src/content/              Static text — channel labels/topics (channelMeta.ts),
                          avatar colors/initials for speakers (personas.ts)

src/services/progress.ts  Two functions for saving/restoring progress in cookies
                          (saveProgress/loadProgress)

src/hooks/
  useStoryEngine.ts          Combines the reducer + timeline + controllers below
                              and exposes them as StoryCommands
  timeline.ts                Named setTimeout/setInterval entries, all cleaned up
                              through a single dispose()
  controllers/               One file per timer-driven sequence. Plain functions
                              that receive dispatch/timeline/stateRef as their first
                              arguments (endingSequence.ts is the only exception —
                              it retains factory form because it has internal state
                              that remembers whether playback is active)
    endingSequence.ts           Plays the archive-당신 conversation + final sequence
    archiveEntry.ts              Channel transition intro + delayed follow-up message
    lockToast.ts                 Auto-dismissing "locked" toast
  useIsMobile.ts / useMediaQuery.ts   Responsive breakpoint detection

src/context/StoryContext.tsx     <StoryProvider> + useStory() hook

src/components/
  primitives/                Reusable parts (Avatar, Tooltip, InfoCard, ReactionPill …)
  chat/                      Chat-style pieces (Message, ArchivedHeader)
  layout/                    Discord-style shell
    AppShell.tsx                Chooses DesktopShell/MobileShell based on viewport width
    DesktopShell.tsx             Server rail + sidebar + chat + member list
    MobileShell.tsx              Single-screen channel list ⇄ chat + member drawer
    MessagePane.tsx               Scrollable message area shared by both shells
  channels/                  Per-channel components + ChannelRegistry (switch table)

src/styles/tokens.ts         All colors named by their semantic roles
```

## Common Tasks

**To add a new channel**
1. Add the ID to `ChannelId` in `src/domain/channels.ts`
2. If it needs a sidebar entry, add a case in `src/domain/view/nav.ts`
3. Create the channel component in `src/components/channels/`
4. Add one line to `src/components/channels/ChannelRegistry.tsx`

**To add a new story flag or timed sequence**
1. Add a field to `StoryState` (`domain/state.ts`)
2. Add an action that changes the field (`domain/actions.ts`) and a reducer case
   (`domain/reducer.ts`)
3. If the component only turns the field on or off exactly as its name suggests,
   read `state.theField` directly. If it needs to be combined with other fields or
   transformed into text, add it as a derived field in the relevant
   `domain/view/*.ts` file.
4. If a delay is required, schedule it with `Timeline.after`/`every` inside the
   relevant controller (`hooks/controllers/`). Do not hardcode timing values.
   Add a named value to `TIMING` in `src/config/timing.ts`, then import and use it.
   If it is a completely new and independent sequence, you may create a new
   controller file.

**To adjust message spacing or the overall pacing**
Change only the `TIMING` values in `src/config/timing.ts` — all timing values in
this app are centralized there, including channel transition intro duration,
delayed message intervals, archive-당신 dialogue tick intervals, each step of the
ending sequence, "locked" toast duration, and the grace period before the
"new message" banner/divider disappears.

**To change the company name, visitor label, or seat number**
Change only the `SITE_CONFIG` values in `src/config/site.ts` — the sidebar server
name, announcement body, each archive channel's "249번 자리" ("Seat 249") /
"멤버 249명" ("249 members") expressions, reaction counts, anonymous user name,
and related values all come from this object.

**To add a new color**
Add it to `src/styles/tokens.ts` and name it after what the color is used for,
then import it from there. Running `grep -rn "oklch(" src` outside this file
should always return no results.

**To change how progress is stored**
The two functions in `src/services/progress.ts`, `saveProgress` and
`loadProgress`, are the only places you need to change. Cookies are used by
default to store which archives have been viewed and whether the ending has been
reached, so progress persists across refreshes and return visits. To use a
different storage mechanism, change only the `document.cookie` sections inside
these two functions. `useStoryEngine.ts` imports these functions directly, so
nothing else needs to be modified.
The stored data is not the entire `StoryState`; it only includes story progression
fields extracted by `extractProgress()`, such as visited archives, delayed
message visibility, and whether the ending has been reached. View-only state,
such as hover state or scroll position, is not stored. To store additional fields,
add them to the `SavedProgress` interface and `extractProgress()`.

**To modify the responsive layout**
`useIsMobile()` uses a viewport width of 768px as the breakpoint, and `AppShell`
chooses whether to render `DesktopShell` or `MobileShell`. Both shells reuse the
same `ChannelSidebar`/`ChatHeader`/`MemberList` components and only change their
context through props such as `fullScreen`/`onBack`/`onToggleMembers`/`width`.
Screen transition state such as whether the channel list or chat is currently
visible (`panel`/`membersOpen` in `MobileShell`) is unrelated to the story, so it
is handled with ordinary `useState` rather than `StoryState`.

## Verifying Behavior Without a Browser

There is no dedicated test runner. To verify the logic in an environment without
a browser:

```bash
npx vite build --ssr <temporary-entry-point>.tsx --outDir dist-ssr-smoke --emptyOutDir
node dist-ssr-smoke/<temporary-entry-point>.js
```

In the entry-point script, create the desired state directly with
`[...actions].reduce(storyReducer, initialStoryState)`, pass it through
`buildViewModel()`, then provide the result to `StoryContext.Provider` (currently
exported from `context/StoryContext.tsx`) and render the actual component tree
with `renderToStaticMarkup` from `react-dom/server`.

This allows you to execute the reducer, derived view logic, and JSX as-is without
real timers or DOM measurements, making it possible to catch rendering crashes
or story continuity issues such as "does that annotation actually appear after
this archive has been viewed?" After verification, delete the temporary
entry-point file and `dist-ssr-smoke/`.