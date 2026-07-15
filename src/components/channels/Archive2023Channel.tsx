import { useStory } from '../../context/StoryContext'
import { BUILDING_BOT, HR_BOT, OH_SEJIN, PARK_SEOYEON } from '../../content/personas'
import { ArchivedHeader } from '../chat/ArchivedHeader'
import { Message } from '../chat/Message'
import { NewMessagesDivider } from '../chat/NewMessagesDivider'
import { CodeInline } from '../primitives/CodeInline'
import { Divider, SystemLine } from '../primitives/Divider'
import { CodeBlock } from '../primitives/InfoCard'
import { ReactionPill } from '../primitives/ReactionPill'
import { Tooltip } from '../primitives/Tooltip'

export function Archive2023Channel() {
  const { state, view, commands } = useStory()
  const { archives, reactions, messages } = view

  return (
    <div data-screen-label="archive-2023">
      <ArchivedHeader>— 이 채널은 2023년 12월 31일에 보관되었습니다 —</ArchivedHeader>

      <Message persona={OH_SEJIN} time="2023년 12월 31일 오후 5:42" dense>
        노트북을 재시작했는데 제 이름이 안 떠요.
      </Message>
      <Message persona={HR_BOT} time="오후 5:42" dense>
        화면에 표시된 이름을 알려주세요.
      </Message>
      <Message persona={OH_SEJIN} time="오후 5:43" dense>
        <CodeInline fontSize={13}>Welcome, {PARK_SEOYEON.name}</CodeInline>이라고 나옵니다.
        <br />
        저희 팀에 {PARK_SEOYEON.name}이라는 분은 없는데요.
      </Message>
      <Message persona={HR_BOT} time="오후 5:43" dense>
        정상입니다.
      </Message>
      <Message persona={OH_SEJIN} time="오후 5:44" dense>
        계정을 잘못 덮어쓴 것 아닌가요?
      </Message>
      <Message persona={HR_BOT} time="오후 5:44" dense>
        {PARK_SEOYEON.name}님의 사원증은 오늘 아침 발송되었습니다.
        <br />
        다음 주 월요일 첫 출근 예정입니다.
      </Message>
      <Message persona={OH_SEJIN} time="오후 5:45" dense>
        지금 2023년인데요.
      </Message>
      <Message persona={HR_BOT} time="오후 5:45" dense>
        네.
      </Message>

      <Divider>오후 6:00 · 퇴근 기록</Divider>

      <Message persona={OH_SEJIN} time="오후 5:59" dense>
        노트북 문제는 월요일에 다시 확인하겠습니다.
        <br />
        일단 퇴근할게요.
      </Message>

      <Message persona={HR_BOT} time="시스템 로그" dense>
        <CodeBlock fontSize={12.5}>
{`17:59:58  ${OH_SEJIN.name} 님이 7층 로비에 진입했습니다.
18:00:00  로비 안내 방송이 재생되었습니다.`}
        </CodeBlock>
      </Message>

      <Message persona={BUILDING_BOT} time="오후 6:00" dense>
        수고하셨습니다.
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          <ReactionPill
            emoji="👋"
            count={reactions.a2023.count}
            active={reactions.a2023.active}
            tooltipShown={reactions.a2023.tooltipShown}
            tooltipText={reactions.a2023.tooltipText}
            onClick={commands.toggleA23ReactionDetail}
            onHoverStart={() => commands.hover('a23wave')}
            onHoverEnd={commands.unhover}
          />
        </div>
        {state.a23ReactionDetailShown && (
          <div style={{ marginTop: 8 }}>
            <CodeBlock fontSize={12.5}>
{`반응자        ${OH_SEJIN.name}
출처          7층 로비
입력          `}
              <span
                style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
                onMouseEnter={() => commands.hover('a23voice')}
                onMouseLeave={commands.unhover}
              >
                <Tooltip visible={archives.a23VoiceTooltipShown} placement="above">
                  인식된 발화
                  <br />
                  "네, 수고하세요."
                  <br />
                  <br />
                  신뢰도 98.7%
                </Tooltip>
                음성 응답
              </span>
{`
감지 시각     오후 6:00:01
동기화        ${BUILDING_BOT.name}`}
            </CodeBlock>
          </div>
        )}
      </Message>

      <Message persona={OH_SEJIN} time="오후 6:02" dense>
        제가 디스코드에 반응을 남긴 적이 없는데요.
      </Message>
      <Message persona={HR_BOT} time="오후 6:02" dense>
        Discord에서 등록된 반응이 아닙니다.
      </Message>
      <Message persona={OH_SEJIN} time="오후 6:02" dense>
        그럼 왜 제 계정으로 되어 있죠?
      </Message>
      <Message persona={HR_BOT} time="오후 6:02" dense>
        {OH_SEJIN.name}님의 응답이 정상적으로 동기화되었습니다.
      </Message>
      <Message persona={OH_SEJIN} time="오후 6:03" dense>
        로비에서 말한 것도 여기 반응으로 남는 건가요?
      </Message>
      <Message persona={HR_BOT} time="오후 6:03" dense>
        네. 퇴근 인사가 확인되었습니다.
      </Message>

      <Message persona={HR_BOT} time="시스템 로그" dense>
        <CodeBlock fontSize={12.5}>
{`18:02:14  ${OH_SEJIN.name} 님의 퇴근 인사가 확인되었습니다.
18:02:14  다음 출근 계정이 활성화되었습니다.`}
        </CodeBlock>
      </Message>

      <Divider>다음 날</Divider>

      <SystemLine>{PARK_SEOYEON.name} 님이 오전 8:56에 로그인했습니다.</SystemLine>
      <SystemLine>{OH_SEJIN.name} 님이 오전 8:57에 로그인했습니다.</SystemLine>
      <Message persona={OH_SEJIN} time="오전 8:58" dense>
        제 자리에 누가 앉아 있습니다.
      </Message>
      <Message persona={HR_BOT} time="오전 8:58" dense>
        더 일찍 오신 분이 자리 주인입니다.
      </Message>
      <Message persona={OH_SEJIN} time="오전 8:59" dense>
        얼굴이 저랑 똑같은데 이름은 {PARK_SEOYEON.name}으로 떠요.
      </Message>
      <Message persona={HR_BOT} time="오전 8:59" dense>
        {PARK_SEOYEON.name}님의 첫 출근이 확인되었습니다.
      </Message>
      <Message persona={OH_SEJIN} time="오전 9:00" dense>
        그럼 저는 어떻게 해야 하나요?
      </Message>
      <Message persona={HR_BOT} time="오전 9:00" dense>
        퇴사 처리가 완료되었습니다.
        <br />
        기존 회의에는 계속 참석해 주세요.
      </Message>

      {state.a2023DelayedShown && (
        <>
          {messages.newMessageBannerShown && <NewMessagesDivider />}
          <Message persona={OH_SEJIN} time="방금" dense>
            {PARK_SEOYEON.name}님은 이번에는 지원하고 들어왔나요?
          </Message>
        </>
      )}
    </div>
  )
}
