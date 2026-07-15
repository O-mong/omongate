# omongate

A Discord clone UI disguised as a job posting from a company called Omong.
In reality, it is a short interactive fiction in which seemingly ordinary HR
information gradually takes on different meanings as you move between channels.

## What You Can Explore

Channel list on the left:

| Channel | Content |
|---|---|
| `#공지사항` | A job posting. At first, it simply looks like a recruitment notice with attractive benefits. |
| `#지원서제출` | A conversation thread between actual applicants. |
| `#규칙` | An employee manual. Each time you open another archive channel, a new annotation is added here. |
| `#archive-2025` / `#archive-2024` / `#archive-2023` / `#archive-2022` / `#archive-2021` | Archived channels left behind by former employees. You can open them in any order. |
| `#archive-당신` | Unlocks only after you have opened all five archive channels above. |

Once you have viewed all five archive channels, `#archive-당신` unlocks. After
the conversation inside it ends, the entire site shifts into a slightly different
state. The channels you have viewed and whether you have reached the ending are
stored in cookies, so your progress remains after refreshing the page. Delete the
cookies to start over from the beginning. See "Persistence" in `ARCHITECTURE.md`.

On desktop, the site uses a four-column layout consisting of a server rail,
channel list, chat area, and member list. When the viewport becomes narrow
(below 768px), it automatically switches to a mobile layout that moves between
the channel list and chat view.

## Running the Project

```bash
npm install
npm run dev       # Development server at http://localhost:5173
npm run build     # Type checking + production build in dist/
npm run preview   # Preview the production build locally
```

Requires Node.js 20 or later.

## Customization

To fork the project and adapt it into a different story or company, you only need
to edit the files below. They contain configuration values only, so you do not
need to understand the application logic.

| What You Want to Change | Where to Change It |
|---|---|
| Identity values such as the company name, visitor label, and seat number "249" | `src/config/site.ts` |
| Message intervals and sequence timing | `src/config/timing.ts` |
| GitHub link attached to the server logo and deployment domain (`site_url`) | `omongate.conf` in the project root (`key=value` format. You only need to edit the text without changing any TypeScript code, but **a rebuild is required**) |
| Character names, avatar colors, and avatar images | `src/content/personas.ts` — set an image path in `avatarImage` to display a picture instead of initials |
| Channel labels, topics, and typing indicator text | `src/content/channelMeta.ts` |
| Color palette | `src/styles/tokens.ts` |
| Progress storage method (default: cookies) | `src/services/progress.ts` |

For more detailed instructions on how to edit each file, see "Common Tasks" in
`ARCHITECTURE.md`.

Place images such as avatars and the GitHub icon in the `public/` folder, then
reference them using root-relative paths such as `/filename.svg`.

When `site_url` in `omongate.conf` is set to the actual deployment domain,
`robots.txt` and `sitemap.xml` are automatically generated for that domain during
the build and included in `dist/`. If it is left empty,
`https://example.com` is used as a placeholder.

## Where to Start Reading the Code

First, run `npm run dev` and look through the interface. Before modifying the
code, read [ARCHITECTURE.md](./ARCHITECTURE.md). It is organized around practical
tasks such as "what needs to be changed to add a new channel?" In summary:

- `src/domain/` — Story progression state and transition rules (no React)
- `src/domain/view/` — Converts the state into "what should be shown on screen now"
- `src/config/` — Identity and timing values (see "Customization" above)
- `src/content/` — Static data such as channel text and character avatars/names
- `src/components/` — Everything that is actually rendered (`channels/` contains each channel screen, `layout/` contains the Discord-style shell, and `AppShell` chooses between desktop and mobile)
- `src/hooks/` — Handles timed sequences such as delayed messages and the ending sequence

## Developer Convenience

When contributing to the project or adjusting its sequences, you can enable
developer mode to avoid manually clearing story progress every time.

- Set `DEV_MODE=true` in the `omongate.conf` file in the project root. A rebuild
  or restart is required after making the change.
- Once the setting is applied, a reset button appears in the user profile area at
  the bottom left of `ChannelSideBar.tsx`.
- Clicking the button immediately resets all currently stored progress cookies
  and reloads the page, allowing you to test again from the initial state at any
  time.