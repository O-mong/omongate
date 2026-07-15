// Identity/branding values. Change these to re-skin the story without touching every channel.
// Note: currentUserName/unknownUserName assume a vowel-ending name like "지원자" for the
// Korean particles (은/는, 이/가, 라는 등) used around them elsewhere. A consonant-ending
// name will need those particles fixed by hand.
export const SITE_CONFIG = {
  serverName: 'Omong 내부 개발팀',
  currentUserName: '지원자',
  nextApplicantName: '새로운 지원자',
  unknownUserName: '알 수 없는 사용자',
  botAccountPrefix: 'omong', // bot names are `${prefix}-recruit`, `${prefix}-review`, etc.
  deskNumber: 249,
  vacancyCount: 1,
} as const
