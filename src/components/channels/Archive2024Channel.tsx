import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HAN_YURA, HR_BOT } from '../../content/personas'
import { colors } from '../../styles/tokens'
import { ArchivedHeader } from '../chat/ArchivedHeader'
import { Message } from '../chat/Message'
import { NewMessagesDivider } from '../chat/NewMessagesDivider'
import { Divider, SystemLine } from '../primitives/Divider'
import { CodeBlock, InfoCard } from '../primitives/InfoCard'

// The "오늘은 굶어도 괜찮아요" memo. Unlike every other archive reveal, this one toggles
// back and forth on each click instead of only ever revealing forward.
function ToggleNote() {
  const { state, commands } = useStory()
  const toggled = state.a2024NoteToggled
  return (
    <div onClick={commands.toggleA2024Note} style={{ cursor: 'pointer', width: 'fit-content' }}>
      <InfoCard icon="📝">{toggled ? '먼저 먹은 사람이 돌아갑니다.' : '오늘은 굶어도 괜찮아요.'}</InfoCard>
    </div>
  )
}

export function Archive2024Channel() {
  const { state, view } = useStory()
  const { messages } = view

  return (
    <div data-screen-label="archive-2024">
      <ArchivedHeader>— 이 채널은 2024년 7월 18일에 보관되었습니다 —</ArchivedHeader>

      <Message persona={HAN_YURA} time="2024년 7월 18일 오전 11:58" dense>
        오전 회의가 조금 늦게 끝날 것 같습니다.
        <br />
        식당은 1시까지 맞죠?
      </Message>
      <Message persona={HR_BOT} time="오전 11:58" dense>
        점심시간은 12:00:00부터 12:59:59까지입니다.
      </Message>

      <Message persona={HR_BOT} time="출입 로그" dense>
        <CodeBlock fontSize={12.5}>
{`11:59:59  식당 출입문 잠금 해제
12:00:00  ${SITE_CONFIG.deskNumber}번 좌석 배식 완료
12:00:01  ${HAN_YURA.name} 사원증 태그
12:00:01  출입 거부
12:00:01  식당 출입문 잠금`}
        </CodeBlock>
      </Message>

      <Message persona={HAN_YURA} time="오후 12:00" dense>
        1초 늦었다고 문이 잠겼습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 12:00" dense>
        문 앞의 안내를 확인해 주세요.
      </Message>

      <Message persona={HR_BOT} time="메모" dense>
        <ToggleNote />
      </Message>

      <Message persona={HAN_YURA} time="오후 12:01" dense>
        그냥 오늘 점심은 건너뛰겠습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 12:01" dense>
        해당 안내는 사실이 아닙니다.
        <br />
        뭐라도 드세요. 반드시요.
      </Message>

      <Divider>화장실 기록</Divider>

      <Message persona={HAN_YURA} time="오후 12:07" dense>
        7층 화장실에 왔는데 거울에 사람이 한 명 더 비칩니다.
      </Message>
      <Message persona={HR_BOT} time="오후 12:07" dense>
        거울을 직접 확인하지 마세요.
      </Message>
      <Message persona={HAN_YURA} time="오후 12:07" dense>
        이미 봤습니다.
        <br />
        제 뒤에는 아무도 없는데 거울 속에는 제가 두 명이에요.
      </Message>
      <Message persona={HR_BOT} time="오후 12:07" dense>
        두 분 중 휴가 신청서를 들고 있지 않은 분이 자리로 돌아가시면 됩니다.
      </Message>
      <Message persona={HAN_YURA} time="오후 12:08" dense>
        둘 다 저인데요.
      </Message>
      <Message persona={HR_BOT} time="오후 12:08" dense>
        휴가 신청서를 확인해 주세요.
        <div style={{ marginTop: 8 }}>
          <InfoCard icon="🏖️">
{`신청자: ${HAN_YURA.name}
신청일: 내일
휴가 시작: 다음 주 월요일
휴가 종료: 후임자 입사 전날
결재 상태: 승인
결재자: 없음
작성 위치: 7층 화장실 거울 앞
서명: ${HAN_YURA.name}`}
          </InfoCard>
        </div>
      </Message>
      <Message persona={HAN_YURA} time="오후 12:08" dense>
        저는 이 휴가를 신청한 적이 없습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 12:08" dense>
        승인된 휴가는 취소할 수 없습니다.
      </Message>
      <Message persona={HAN_YURA} time="오후 12:09" dense>
        그럼 거울 속 사람이 신청한 건가요?
      </Message>
      <Message persona={HR_BOT} time="오후 12:09" dense>
        신청자는 {HAN_YURA.name}님 한 분입니다.
      </Message>

      <Divider>두 번째 배식 기록</Divider>

      <SystemLine>{`12:00:02 ${HAN_YURA.name} 사원증 태그`}</SystemLine>
      <SystemLine>12:00:02 식당 출입 승인</SystemLine>
      <SystemLine>{`12:00:03 ${SITE_CONFIG.deskNumber}번 좌석 배식 완료`}</SystemLine>

      <Message persona={HAN_YURA} time="오후 12:10" dense>
        저는 아직 화장실에 있습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 12:10" dense>
        식사가 확인되었습니다.
      </Message>
      <Message persona={HAN_YURA} time="오후 12:10" dense>
        누가 먹고 있는 건데요?
      </Message>
      <Message persona={HR_BOT} time="오후 12:10" dense>
        정상 출근 중인 {HAN_YURA.name}님입니다.
      </Message>
      <Message persona={HAN_YURA} time="오후 12:11" dense>
        그럼 저는 누구죠?
      </Message>
      <div style={{ fontSize: 12.5, color: colors.text.faintest, fontStyle: 'italic', padding: '4px 0 4px 56px' }}>
        답변 없음.
      </div>

      <Divider>오후 기록</Divider>

      <SystemLine>13:00:00 점심시간 종료</SystemLine>
      <SystemLine>{`13:00:01 ${HAN_YURA.name} 님이 자리로 복귀했습니다.`}</SystemLine>
      <SystemLine>{`13:00:01 ${HAN_YURA.name} 님의 휴가가 시작되었습니다.`}</SystemLine>
      <SystemLine>13:00:02 현재 휴가 신청자 0명</SystemLine>

      <Message persona={HAN_YURA} time="오후 1:00" dense>
        방금 휴가가 시작됐다고 나오는데 저는 자리에 있습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 1:00" dense>
        정상입니다.
      </Message>
      <Message persona={HAN_YURA} time="오후 1:01" dense>
        제 자리에도 누가 앉아 있습니다.
      </Message>
      <Message persona={HR_BOT} time="오후 1:01" dense>
        식사를 마친 분이 정상 출근자로 처리됩니다.
      </Message>
      <Message persona={HAN_YURA} time="오후 1:01" dense>
        얼굴이 저랑 똑같아요.
      </Message>
      <Message persona={HR_BOT} time="오후 1:01" dense>
        다음 주 휴가 잘 다녀오세요.
        <br />
        결재는 이미 완료되었습니다.
      </Message>

      {state.a2024DelayedShown && (
        <>
          {messages.newMessageBannerShown && <NewMessagesDivider />}
          <Message persona={HAN_YURA} time="방금" dense>
            공지에는 아직도 휴가 신청한 사람이 없다고 적혀 있나요?
          </Message>
        </>
      )}
      {state.a2024DelayedShown2 && (
        <Message persona={HAN_YURA} time="방금" dense>
          거울 쪽 {HAN_YURA.name}는 아직 점심을 먹지 않았어요.
        </Message>
      )}
    </div>
  )
}
