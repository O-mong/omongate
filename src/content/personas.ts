import { SITE_CONFIG } from '../config/site'
import { colors } from '../styles/tokens'

/** A recurring speaker's avatar + name styling. Centralizing these means a
 *  character's look is defined once and reused everywhere they appear,
 *  instead of the original's copy-pasted inline styles per message. */
export interface Persona {
  name: string
  initials?: string
  avatarBg: string
  avatarImage?: string // photo URL; when set, shown instead of initials-on-color-background
  avatarTextColor?: string
  avatarFontSize?: number
  nameColor?: string
  badge?: 'BOT'
}

export const HR_BOT: Persona = {
  name: `${SITE_CONFIG.botAccountPrefix}-recruit`,
  initials: 'HR',
  avatarBg: colors.avatar.hr,
  badge: 'BOT',
}

export const PR_BOT: Persona = {
  name: `${SITE_CONFIG.botAccountPrefix}-review`,
  initials: 'PR',
  avatarBg: colors.avatar.prBot,
  avatarFontSize: 13,
  badge: 'BOT',
}

export const PAYROLL_BOT: Persona = {
  name: `${SITE_CONFIG.botAccountPrefix}-payroll`,
  initials: '💰',
  avatarBg: colors.avatar.prBot,
  avatarFontSize: 12,
  badge: 'BOT',
}

export const BUILDING_BOT: Persona = {
  name: `${SITE_CONFIG.botAccountPrefix}-building`,
  initials: '🏢',
  avatarBg: colors.avatar.buildingBot,
  avatarFontSize: 12,
  badge: 'BOT',
}

export const APPLICANT_KIM: Persona = {
  name: '김지원',
  initials: '김',
  avatarBg: colors.avatar.applicant,
  avatarFontSize: 14,
}

export const PARK_SEOYEON: Persona = {
  name: '박서연',
  initials: '박',
  avatarBg: colors.avatar.parkSeoyeon,
  avatarFontSize: 14,
}

export const OH_SEJIN: Persona = {
  name: '오세진',
  initials: '오',
  avatarBg: colors.avatar.ohSejin,
  avatarFontSize: 14,
}

export const YOON_TAEHO: Persona = {
  name: '윤',
  initials: '태호',
  avatarBg: colors.avatar.yoonTaeho,
  avatarFontSize: 14,
}

export const HR_OFFICER_01: Persona = {
  name: '인사담당자_01',
  initials: '01',
  avatarBg: colors.avatar.hrOfficer,
  avatarFontSize: 13,
}

export const KIM_DOYUN: Persona = {
  name: '김도윤',
  initials: '김',
  avatarBg: colors.avatar.kimDoyun,
  avatarFontSize: 14,
}

export const HAN_YURA: Persona = {
  name: '한유라',
  initials: '한',
  avatarBg: colors.avatar.hanYura,
  avatarFontSize: 14,
}

// "알 수 없는 사용자" as seen replying at 4:44am in #지원서제출: muted, barely there.
export const UNKNOWN_USER_APPLY: Persona = {
  name: SITE_CONFIG.unknownUserName,
  initials: '?',
  avatarBg: colors.avatar.unknown,
  avatarTextColor: colors.text.muted,
  avatarFontSize: 14,
  nameColor: colors.text.muted,
}

// Same account as seen from inside archive-당신: warmer, closer, since this time it's the
// person about to be replaced by you.
export const UNKNOWN_USER_ARCHIVE: Persona = {
  name: SITE_CONFIG.unknownUserName,
  initials: '?',
  avatarBg: colors.avatar.unknownArchive,
  avatarTextColor: colors.text.unknown,
  avatarFontSize: 14,
  nameColor: colors.text.unknown,
}
