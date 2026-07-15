import { SITE_CONFIG } from '../config/site'
import type { ChannelId } from '../domain/channels'
import { APPLICANT_KIM, PARK_SEOYEON } from './personas'

// Static copy for the channel list and chat header, kept out of the view logic so wording
// can be edited without touching a component or selector.
export const CHANNEL_LABELS: Record<ChannelId, string> = {
  notice: '공지사항',
  apply: '지원서제출',
  rules: '규칙',
  a2025: 'archive-2025',
  a2024: 'archive-2024',
  a2023: 'archive-2023',
  a2022: 'archive-2022',
  a2021: 'archive-2021',
  you: 'archive-당신',
}

export const CHANNEL_TOPICS: Record<ChannelId, string> = {
  notice: '채용 공고 및 안내 · 마지막 채용: 어제 · 그 전: 어제',
  apply: '이력서는 PDF 1장 · 접수 즉시 열람됩니다. 업로드 전에도요',
  rules: `${SITE_CONFIG.deskNumber}번 자리 README.md 자동 동기화`,
  a2025: '야간 장애 대응 및 요청 내역',
  a2024: '구내식당 및 휴가 처리 문의',
  a2023: `${SITE_CONFIG.deskNumber}번 자리 인수인계`,
  a2022: '휴가 및 업무 인계',
  a2021: '채용 공고 자동 재게시 오류',
  you: `${SITE_CONFIG.deskNumber}번 자리 신규 담당자`,
}

// Static typing-indicator text. archive-2025/2024 override this dynamically once their
// delayed follow-up lands (see deriveHeader); the entries here are just the pre-visit default.
export const CHANNEL_TYPING: Record<ChannelId, string> = {
  notice: '',
  apply: `${PARK_SEOYEON.name}님이 입력 중… (오전 2:34부터)`,
  rules: '',
  a2025: '',
  a2024: '',
  a2023: '',
  a2022: '',
  a2021: '',
  you: '',
}

export const AWAY_MEMBERS: readonly string[] = [
  APPLICANT_KIM.name,
  PARK_SEOYEON.name,
  `${SITE_CONFIG.currentUserName}_044`,
  `${SITE_CONFIG.currentUserName}_043`,
  `${SITE_CONFIG.currentUserName}_042`,
  `${SITE_CONFIG.currentUserName}_041`,
  `${SITE_CONFIG.currentUserName}_040`,
  `${SITE_CONFIG.currentUserName}_039`,
]
