import { useStory } from '../../context/StoryContext'
import { APPLICANT_KIM, HR_BOT, PARK_SEOYEON, UNKNOWN_USER_APPLY } from '../../content/personas'
import { colors } from '../../styles/tokens'
import { Divider } from '../primitives/Divider'
import { Message } from '../chat/Message'
import { AttachmentChip } from '../primitives/InfoCard'
import { ReactionPill } from '../primitives/ReactionPill'

export function ApplyChannel() {
  const { view, commands } = useStory()
  const { reactions } = view

  return (
    <div data-screen-label="지원서제출">
      <Message persona={HR_BOT} time="어제 오후 11:46">
        {APPLICANT_KIM.name}님, 접수되었습니다. 이력서 잘 봤어요. 작년 것보다 좋아졌네요.
      </Message>

      <Message persona={APPLICANT_KIM} time="어제 오후 11:47">
        안녕하세요, 이력서 첨부합니다! 잘 부탁드립니다 🙏
        <AttachmentChip name={`이력서_${APPLICANT_KIM.name}.pdf`} size="214KB" />
      </Message>

      <Message persona={APPLICANT_KIM} time="어제 오후 11:48">
        …접수 답장이 제가 올리기 1분 전에 와 있는데요?
        <br />
        그리고 저 작년에 지원한 적 없어요
      </Message>

      <Message persona={HR_BOT} time="어제 오후 11:48">
        네.
      </Message>

      <Message persona={PARK_SEOYEON} time="오전 2:31">
        혹시 합격 발표는 언제쯤 나나요?
      </Message>

      <Message persona={HR_BOT} time="오전 2:31">
        {PARK_SEOYEON.name}님은 발표 대상이 아닙니다. 이미 저희 직원이세요.
        <br />
        오늘 첫 출근인데 지각하시면 안 돼요. 자리에 명패 놓아뒀습니다.
      </Message>

      <Message persona={PARK_SEOYEON} time="오전 2:32">
        네?? 저 지원한 적도 없는데요. 어제 친구가 초대해줘서 들어온 건데
        <br />
        그리고 제 이름 어떻게 아세요? 닉네임 딴 걸로 해놨는데
      </Message>

      <Divider tone="danger">메시지 3개가 삭제되었습니다 · 오전 2:33</Divider>

      <Message persona={HR_BOT} time="오전 2:34">
        메시지는 지우셔도 괜찮아요. 저희는 이미 읽었습니다.
        <br />
        {PARK_SEOYEON.name}님, 출근길 조심하세요. 오늘 비 와요. 우산은 현관에 걸어뒀어요.
        <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
          <ReactionPill
            emoji="☔"
            count={reactions.umbrella.count}
            active={reactions.umbrella.active}
            tooltipShown={reactions.umbrella.tooltipShown}
            tooltipText={reactions.umbrella.tooltipText}
            onClick={commands.toggleUmbrella}
            onHoverStart={() => commands.hover('umb')}
            onHoverEnd={commands.unhover}
          />
        </div>
      </Message>

      <Message persona={UNKNOWN_USER_APPLY} time="오전 4:44" edited bodyColor={colors.text.muted}>
        나가는 방법 아시는 분
      </Message>
    </div>
  )
}
