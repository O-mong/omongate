import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HR_BOT, UNKNOWN_USER_ARCHIVE } from '../../content/personas'
import { colors } from '../../styles/tokens'
import { ArchivedHeader } from '../chat/ArchivedHeader'
import { Message } from '../chat/Message'
import { Avatar } from '../primitives/Avatar'
import { EditedTag } from '../primitives/Badge'
import { CodeInline } from '../primitives/CodeInline'
import { Divider, SystemLine } from '../primitives/Divider'
import { CodeBlock, InfoCard } from '../primitives/InfoCard'
import { Tooltip } from '../primitives/Tooltip'

export function ArchiveYouChannel() {
  const { view, commands } = useStory()
  const { archives } = view
  const [seq1, seq2, seq3, seq4, seq5, seq6, seq7] = archives.youSequence

  return (
    <div data-screen-label="archive-당신">
      <ArchivedHeader>— 이 채널은 다음 주 월요일에 보관될 예정입니다 —</ArchivedHeader>

      <Message persona={HR_BOT} time="인사 처리 기록">
        <CodeBlock>
{`오늘 08:51  ${SITE_CONFIG.currentUserName} 프로필 생성
오늘 08:52  신원 확인 완료
오늘 08:53  면접 면제
오늘 08:54  사원증 발급
오늘 08:55  사원증 배송 시작
오늘 08:56  ${SITE_CONFIG.deskNumber}번 자리 역할 배정
오늘 08:56  README.md 열람
오늘 08:57  첫 출근 기록 생성
오늘 09:14  채용 공고 열람`}
        </CodeBlock>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <InfoCard icon="📄" fontSize={12}>
{`이력서_${SITE_CONFIG.currentUserName}.pdf
생성: 어제
마지막 수정: 다음 주 월요일
제출 여부: 미제출
검토 결과: 합격
HR 코멘트: 지난번보다 좋아졌네요.`}
          </InfoCard>
          <InfoCard icon="🪪" fontSize={12}>
{`사원번호: ${SITE_CONFIG.deskNumber}
이름: ${SITE_CONFIG.currentUserName}
직무: 백엔드 / 프론트엔드
역할: ${SITE_CONFIG.deskNumber}번 자리 담당자
발급 상태: 완료
배송 상태: 현관 앞
수령 서명: ${SITE_CONFIG.currentUserName}`}
          </InfoCard>
        </div>
      </Message>

      <Divider>기존 담당자</Divider>

      <Message persona={UNKNOWN_USER_ARCHIVE} time="오전 8:56" dense bodyColor={colors.text.bodyDim}>
        노트북에 <CodeInline fontSize={13}>Welcome, {SITE_CONFIG.currentUserName}</CodeInline>라고 떠요.
      </Message>
      <Message persona={HR_BOT} time="오전 8:56" dense>
        정상입니다.
      </Message>
      <Message persona={UNKNOWN_USER_ARCHIVE} time="오전 8:56" dense bodyColor={colors.text.bodyDim}>
        저는 아직 여기 앉아 있는데요.
      </Message>
      <Message persona={HR_BOT} time="오전 8:56" dense>
        다음 담당자가 확인되었습니다.
      </Message>
      <Message persona={UNKNOWN_USER_ARCHIVE} time="오전 8:57" dense bodyColor={colors.text.bodyDim}>
        {SITE_CONFIG.currentUserName}라는 사람이 누구예요?
      </Message>
      <Message persona={HR_BOT} time="오전 8:57" dense>
        현재 이 채널을 보고 있습니다.
      </Message>
      <Message persona={UNKNOWN_USER_ARCHIVE} time="오전 8:57" dense bodyColor={colors.text.bodyDim}>
        보고 계세요?
      </Message>

      {seq1 && <SystemLine>{SITE_CONFIG.unknownUserName}가 메시지를 삭제했습니다.</SystemLine>}

      {seq2 && (
        <div style={{ display: 'flex', gap: 16, padding: '8px 0' }}>
          <Avatar
            bg={UNKNOWN_USER_ARCHIVE.avatarBg}
            initials={UNKNOWN_USER_ARCHIVE.initials}
            textColor={UNKNOWN_USER_ARCHIVE.avatarTextColor}
            fontSize={UNKNOWN_USER_ARCHIVE.avatarFontSize}
            ringColor={colors.main}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative', width: 'fit-content' }}
              onMouseEnter={() => commands.hover('youprof')}
              onMouseLeave={commands.unhover}
            >
              <span style={{ fontWeight: 600, fontSize: 15, color: colors.text.unknown, cursor: 'default' }}>
                {UNKNOWN_USER_ARCHIVE.name}
              </span>
              <span style={{ fontSize: 12, color: colors.text.muted }}>오전 4:44</span>
              <Tooltip visible={archives.youProfileTooltipShown} placement="below">
                이전 이름: {SITE_CONFIG.currentUserName}
                <br />
                역할: {SITE_CONFIG.deskNumber}번 자리 담당자
                <br />
                상태: 퇴사 예정
                <br />
                후임자: 당신
              </Tooltip>
            </div>
            <div style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.65, color: colors.text.bodyDim }}>
              나가는 방법 아시는 분 <EditedTag>(복구됨)</EditedTag>
            </div>
          </div>
        </div>
      )}

      {seq3 && (
        <Message persona={UNKNOWN_USER_ARCHIVE} time="방금" dense bodyColor={colors.text.bodyDim}>
          저는 지원한 적이 없어요.
        </Message>
      )}
      {seq4 && (
        <Message persona={UNKNOWN_USER_ARCHIVE} time="방금" dense bodyColor={colors.text.bodyDim}>
          처음에는 다 그렇게 말해요.
        </Message>
      )}
      {seq5 && (
        <Message persona={UNKNOWN_USER_ARCHIVE} time="방금" dense bodyColor={colors.text.bodyDim}>
          공지를 읽으면 이미 늦은 거예요.
        </Message>
      )}
      {seq6 && (
        <Message persona={UNKNOWN_USER_ARCHIVE} time="방금" dense bodyColor={colors.text.bodyDim}>
          월요일에는 17시 59분이나 18시 1분에 나가세요.
          <br />
          정각에 인사하지 마세요.
        </Message>
      )}
      {seq7 && (
        <>
          <SystemLine>기존 담당자의 퇴사 처리가 완료되었습니다.</SystemLine>
          <SystemLine>{SITE_CONFIG.currentUserName}님의 첫 출근이 완료되었습니다.</SystemLine>
        </>
      )}
    </div>
  )
}
