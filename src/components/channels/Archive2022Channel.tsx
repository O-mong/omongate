import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HR_BOT, PAYROLL_BOT, PR_BOT, YOON_TAEHO } from '../../content/personas'
import { colors } from '../../styles/tokens'
import { ArchivedHeader } from '../chat/ArchivedHeader'
import { Message } from '../chat/Message'
import { NewMessagesDivider } from '../chat/NewMessagesDivider'
import { SystemLine } from '../primitives/Divider'
import { CodeBlock, InfoCard } from '../primitives/InfoCard'
import { ReactionPill } from '../primitives/ReactionPill'
import { Tooltip } from '../primitives/Tooltip'

export function Archive2022Channel() {
  const { state, view, commands } = useStory()
  const { archives, reactions, messages } = view

  return (
    <div data-screen-label="archive-2022">
      <ArchivedHeader>— 이 채널은 2022년 12월 30일에 보관되었습니다 —</ArchivedHeader>

      <Message persona={YOON_TAEHO} time="2022년 12월 29일 오후 3:10" dense>
        무제한 유급휴가라고 해서 휴가 신청했습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 3:10" dense>
        승인되었습니다.
        <div style={{ marginTop: 10 }}>
          <InfoCard icon="🏖️">
{`신청자: 윤태호
시작일: 2022년 12월 30일
종료일: 후임자 입사 전날
결재자: ${SITE_CONFIG.currentUserName}
결재 시각: 2022년 12월 29일`}
          </InfoCard>
        </div>
      </Message>
      <Message persona={YOON_TAEHO} time="오후 3:12" dense>
        종료일이 날짜가 아니라 '후임자 입사 전날'로 되어 있는데요.
      </Message>
      <Message persona={HR_BOT} time="오후 3:12" dense>
        휴가 종료 전에 안내드리겠습니다.
      </Message>
      <SystemLine>윤태호 님의 휴가가 시작되었습니다.</SystemLine>
      <SystemLine>윤태호 님이 퇴사 처리되었습니다.</SystemLine>

      <Message persona={PR_BOT} time="방금" dense>
        <CodeBlock fontSize={12.5}>
          {`Pull Request #${SITE_CONFIG.deskNumber}\nReviewer: 지정되지 않음\nStatus: `}
          <span style={{ color: colors.approvedGreen }}>✅ Approved</span>
        </CodeBlock>
      </Message>
      <Message persona={YOON_TAEHO} time="방금" dense>
        방금 제 계정으로 승인이 올라갔습니다. 저는 노트북을 껐어요.
      </Message>
      <Message persona={HR_BOT} time="방금" dense>
        리뷰가 정상적으로 완료되었습니다. 바로 Merge해 주세요.
      </Message>
      <Message persona={YOON_TAEHO} time="방금" dense>
        제가 승인한 게 아니라니까요.
      </Message>
      <Message persona={HR_BOT} time="방금" dense>
        해당 리뷰어는 입사 이래 버그를 낸 적이 없습니다.
      </Message>
      <Message persona={YOON_TAEHO} time="방금" dense>
        저는 방금 퇴사 처리됐잖아요.
      </Message>
      <Message persona={HR_BOT} time="방금" dense>
        퇴사 이후로도요.
      </Message>

      <Message persona={PAYROLL_BOT} time="방금" dense>
        <span
          style={{ position: 'relative', width: 'fit-content', display: 'inline-block' }}
          onMouseEnter={() => commands.hover('a22pay')}
          onMouseLeave={commands.unhover}
        >
          <Tooltip visible={archives.a22PayTooltipShown} placement="above">
            재직 상태: 퇴사
            <br />
            근무 상태: 회의 중
            <br />
            휴가 상태: 사용 중
            <br />
            지급 상태: 수령인 없음
          </Tooltip>
          <div style={{ cursor: 'default' }}>
            <CodeBlock fontSize={12.5}>
{`2022_급여명세서.pdf
2023_급여명세서.pdf
2024_급여명세서.pdf
2025_급여명세서.pdf
2026_급여명세서.pdf`}
            </CodeBlock>
          </div>
        </span>
      </Message>

      {state.a2022DelayedShown && (
        <>
          {messages.newMessageBannerShown && <NewMessagesDivider />}
          <Message persona={YOON_TAEHO} time="방금" dense>
            공지에는 아직도 휴가 신청한 사람이 없다고 나오나요?
            <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
              <ReactionPill
                emoji="👀"
                count={reactions.a2022.count}
                active={reactions.a2022.active}
                tooltipShown={reactions.a2022.tooltipShown}
                tooltipText={reactions.a2022.tooltipText}
                onClick={commands.clickA2022Reaction}
                onHoverStart={() => commands.hover('a22react')}
                onHoverEnd={commands.unhover}
              />
            </div>
          </Message>
        </>
      )}
    </div>
  )
}
