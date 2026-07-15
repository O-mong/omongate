// oklch() colors named by role. This is the only file that should need to change if the palette does.
export const colors = {
  appBg: 'oklch(0.16 0.01 260)',
  rail: 'oklch(0.15 0.01 260)',
  sidebar: 'oklch(0.21 0.01 260)',
  main: 'oklch(0.19 0.01 260)',
  divider: 'oklch(0.15 0.01 260)',
  scrollbarThumb: 'oklch(0.28 0.01 260)',
  link: 'oklch(0.7 0.09 250)',
  linkHover: 'oklch(0.8 0.09 250)',

  text: {
    base: 'oklch(0.88 0.005 260)',
    name: 'oklch(0.93 0.01 260)',
    body: 'oklch(0.85 0.005 260)',
    bodyDim: 'oklch(0.82 0.005 260)',
    muted: 'oklch(0.5 0.01 260)',
    faint: 'oklch(0.45 0.01 260)',
    faintest: 'oklch(0.42 0.01 260)',
    locked: 'oklch(0.32 0.01 260)',
    unknown: 'oklch(0.6 0.02 260)',
    unknownDim: 'oklch(0.5 0.03 20)',
    unknownName: 'oklch(0.72 0.02 20)', // ex-manager's name in the away list, warmer than `unknown` (their avatar glyph)
    awayIdleName: 'oklch(0.7 0.005 260)', // generic idle "away" members list
  },

  card: { bg: 'oklch(0.15 0.008 260)', border: 'oklch(0.24 0.01 260)', text: 'oklch(0.72 0.01 260)' },
  code: 'oklch(0.25 0.01 260)',
  annotation: { border: 'oklch(0.4 0.04 20)', bg: 'oklch(0.13 0.006 260)', text: 'oklch(0.55 0.02 20)' },

  badge: { bot: 'oklch(0.45 0.08 260)', pinned: 'oklch(0.4 0.05 150)' },

  avatar: {
    hr: 'oklch(0.42 0.06 30)',
    applicant: 'oklch(0.42 0.1 250)',
    parkSeoyeon: 'oklch(0.42 0.08 140)',
    ohSejin: 'oklch(0.42 0.09 320)',
    yoonTaeho: 'oklch(0.42 0.08 60)',
    prBot: 'oklch(0.4 0.05 220)',
    buildingBot: 'oklch(0.4 0.05 200)',
    hrOfficer: 'oklch(0.42 0.08 160)',
    kimDoyun: 'oklch(0.42 0.09 280)',
    hanYura: 'oklch(0.42 0.08 100)',
    unknown: 'oklch(0.3 0.02 260)',
    unknownArchive: 'oklch(0.36 0.02 20)',
    newApplicant: 'oklch(0.4 0.06 250)',
    idlePlaceholder: 'oklch(0.3 0.01 260)',
    currentUser: 'oklch(0.4 0.03 200)',
  },

  status: {
    online: 'oklch(0.62 0.14 145)',
    awayEx: 'oklch(0.55 0.06 20)',
    awayIdle: 'oklch(0.7 0.12 85)',
  },

  reaction: {
    mineBg: 'oklch(0.28 0.05 260)',
    mineBorder: 'oklch(0.55 0.12 260)',
    bg: 'oklch(0.24 0.01 260)',
    border: 'oklch(0.3 0.01 260)',
  },

  deleted: { line: 'oklch(0.3 0.02 20)', label: 'oklch(0.55 0.06 20)' },

  overlay: { bg: 'oklch(0.13 0.008 260)' },
  tooltip: { bg: 'oklch(0.11 0.008 260)', border: 'oklch(0.26 0.01 260)' },
  lock: { border: 'oklch(0.35 0.05 20)', text: 'oklch(0.82 0.02 20)' },

  approvedGreen: 'oklch(0.7 0.14 145)',

  tone: {
    settled: 'oklch(0.6 0.05 60)',
    confirmed: 'oklch(0.6 0.05 145)',
    typing: 'oklch(0.6 0.02 260)',
    active: 'oklch(0.55 0.01 260)',
  },

  input: { bg: 'oklch(0.24 0.01 260)', placeholder: 'oklch(0.45 0.01 260)' },

  sectionDivider: 'oklch(0.28 0.01 260)', // separates chat content blocks
  subtleDivider: 'oklch(0.3 0.01 260)', // hairlines inside chrome (header topic, server rail); subtler than sectionDivider
  tabActiveBg: 'oklch(0.27 0.01 260)',
  tabActiveText: 'oklch(0.96 0.005 260)',
  tabInactiveText: 'oklch(0.65 0.01 260)',

  unreadDot: 'oklch(0.6 0.12 25)',
  mention: { bg: 'oklch(0.3 0.06 260)', text: 'oklch(0.85 0.05 260)' }, // "@everyone" highlight in #공지사항

  serverRail: {
    logoBg: 'oklch(0.4 0.05 260)',
    logoText: 'oklch(0.95 0.01 260)',
    placeholderIcon: 'oklch(0.26 0.01 260)',
    logoOut: 'oklch(0 0 0)',
  },
} as const

export const fontFamily = "-apple-system,'Helvetica Neue',Arial,sans-serif"
export const monoFontFamily = "ui-monospace,'SF Mono',Consolas,monospace"
