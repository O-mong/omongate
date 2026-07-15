import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HR_BOT } from '../../content/personas'
import { colors } from '../../styles/tokens'
import { Message } from '../chat/Message'
import { NewMessagesDivider } from '../chat/NewMessagesDivider'
import { CodeInline } from '../primitives/CodeInline'
import { CodeBlock } from '../primitives/InfoCard'
import { ReactionPill } from '../primitives/ReactionPill'

// #공지사항, the recruitment notice. Body must stay verbatim; only reaction counts/tooltips
// and the post-ending follow-up message are state-driven.
export function NoticeChannel() {
  const { view, commands } = useStory()
  const { reactions, ending, messages } = view

  return (
    <div data-screen-label="공지사항">
      <Message persona={HR_BOT} time="오늘 오전 9:14">
        <span style={{ background: colors.mention.bg, color: colors.mention.text, borderRadius: 3, padding: '0 3px' }}>
          @everyone
        </span>
        <br />
        <br />
        안녕하세요! {SITE_CONFIG.serverName}에서 백엔드/프론트엔드 개발자를 모십니다.
        <br />
        <br />
        💰 연봉 업계 최고 수준
        <br />
        🏠 재택 100% (출근은 하셔야 해요)
        <br />
        <span style={{ cursor: 'default' }} title={ending.unlimitedLeaveHoverText || undefined}>
          🌴 무제한 유급휴가 (신청하신 분은 아직 없습니다)
        </span>
        <br />
        <br />
        지원서류는 이력서 1장이면 됩니다. PDF로 #지원서제출 채널에 올려주세요.
        <br />
        면접은 없습니다. 저희가 이미 충분히 봤거든요.
        <br />
        합격하시면 다음 주 월요일 출근입니다. 사원증은 오늘 아침에 발송됐어요.

        <div style={{ marginTop: 18, fontSize: 15, fontWeight: 700, color: colors.text.name }}>
          ✅ 입사 시 꼭 지켜야 할 규칙
        </div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: colors.text.muted }}>
          (전체 규칙은 입사 당일 노트북 바탕화면에 <CodeInline>README.md</CodeInline>
          로 올라와 있습니다. 이미 열어보신 분도 계시겠지만요.)
        </div>
        <div style={{ marginTop: 8 }}>
          <CodeBlock fontSize={13}>
{`1. 사무실은 7층입니다. 엘리베이터에 7이 없으면 6을 두 번 누르세요.
   6을 한 번만 누르면 8층에 내립니다.
   8층은 내리는 사람만 있고, 타는 사람이 없는 층이에요.

2. 첫 출근 날 노트북을 켜면 "Welcome, [이름]"이 떠요.
   이름이 맞으면 정상 출근입니다.
   틀리면 조용히 노트북을 덮고 집에 가세요.
   그 이름의 분이 곧 오실 거예요. 그분 자리니까요.

3. #archive-2023, #archive-2022 채널에는 들어가지 마세요.
   퇴사하신 분들이 아직 회의 중이에요.
   회의록은 매주 갱신되고 있습니다. 누가 쓰는지는 모르겠지만.

4. 점심은 12:00:00 ~ 12:59:59.
   12:00:01에 도착하면 식당 문이 잠겨 있어요.
   문 앞에 쪽지가 붙어 있을 거예요. "오늘은 굶어도 괜찮아요"
   거짓말입니다. 뭐라도 드세요. 반드시요.

5. 리뷰어를 지정 안 했는데 ✅ Approved가 뜨면 바로 Merge 하세요.
   그분 리뷰는 정확해요. 입사 이래 버그를 낸 적이 없습니다.
   퇴사 이후로도요.

6. 퇴근은 17:59 또는 18:01에 하세요.
   정확히 18:00:00에 로비를 지나면 "수고하셨습니다" 소리가 들려요.
   대답하지 마세요.
   대답하면 내일 아침 당신 자리에 당신이 먼저 와 있습니다.
   더 일찍 온 사람이 자리 주인인 게 회사 룰이에요.

7. 7층 화장실 거울에는 항상 한 명이 더 서 있습니다.
   당신의 다음 주 휴가 신청서를 들고 있어요.
   아직 안 쓰셨죠? 결재는 이미 났습니다.
   잘 다녀오세요.

8. 야근 중 필요한 게 있으면 내선 119를 누르세요.
   "네, 말씀하세요" 하면 10분 안에 책상 위에 올라와 있어요.
   다음 날 모니터에 포스트잇이 붙어 있을 거예요.
   "빚은 갚아야죠"
   갚는 방법은 그쪽에서 정합니다.

9. 규칙을 어겼으면 대표님께 메일을 보내세요.
   제목: 사과드립니다 / 본문: 빈칸
   3초 안에 답장이 옵니다. "괜찮아요. 다음엔 조심하세요."
   3초가 지나면 답장은 오지 않아요.
   대신 오세요. 아니, 벌써 와 계시네요.

10. 동료에게 "여기 좀 이상하지 않아요?"라고 묻지 마세요.
    모두가 하던 일을 멈추고 당신을 봅니다.
    그리고 한 명씩, 천천히, "처음엔 다 그래."
    괜찮아요. 당신도 곧 그렇게 말하게 돼요.
    다음 신입이 물어보면요.`}
          </CodeBlock>
        </div>

        <div
          style={{ marginTop: 18, fontSize: 15, fontWeight: 700, color: colors.text.name, cursor: 'default' }}
          title={ending.vacancyHoverText || undefined}
        >
          💺 현재 빈 자리
        </div>
        <div style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.6, color: colors.text.bodyDim }}>
          {SITE_CONFIG.vacancyCount}개 남았습니다.
          <br />
          어제도 {SITE_CONFIG.vacancyCount}개였어요. 그저께도요.
          <br />
          자리는 늘 하나입니다. 사람이 바뀔 뿐이에요.
        </div>

        <div style={{ marginTop: 18, fontSize: 15, fontWeight: 700, color: colors.text.name }}>📩 지원 방법</div>
        <div style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.6, color: colors.text.bodyDim }}>
          1. #지원서제출 채널에 이력서 PDF 업로드
          <br />
          2. 3초 안에 DM으로 초대링크를 드려요
          <br />
          3. 들어오셔서 역할을 받으면 끝!
          <br />
          &nbsp;&nbsp;&nbsp;(역할은 이미 정해져 있습니다. 고르시는 게 아니에요.)
          <br />
          <br />
          많이 지원해 주세요~ 자리 금방 차요.
          <br />
          찼다가, 비어요. 금방.
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
          <ReactionPill
            emoji="😨"
            count={reactions.fear.count}
            active={reactions.fear.active}
            tooltipShown={reactions.fear.tooltipShown}
            tooltipText={reactions.fear.tooltipText}
            onClick={commands.toggleFear}
            onHoverStart={() => commands.hover('fear')}
            onHoverEnd={commands.unhover}
          />
          <ReactionPill
            emoji="👀"
            count={reactions.eyes.count}
            active={reactions.eyes.active}
            tooltipShown={reactions.eyes.tooltipShown}
            tooltipText={reactions.eyes.tooltipText}
            onClick={commands.toggleEyes}
            onHoverStart={() => commands.hover('eyes')}
            onHoverEnd={commands.unhover}
          />
        </div>
      </Message>

      {ending.endingReached && (
        <>
          {messages.newMessageBannerShown && <NewMessagesDivider />}
          <Message persona={HR_BOT} time="방금">
            지원해 주셔서 감사합니다.
            <br />
            이력서는 잘 봤어요. 지난번보다 좋아졌네요.
            <br />
            다음 지원자분을 위해 자리를 비워주세요.
          </Message>
        </>
      )}
    </div>
  )
}
