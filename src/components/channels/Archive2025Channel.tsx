import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HR_BOT, KIM_DOYUN, PARK_SEOYEON } from '../../content/personas'
import { ArchivedHeader } from '../chat/ArchivedHeader'
import { Message } from '../chat/Message'
import { NewMessagesDivider } from '../chat/NewMessagesDivider'
import { CodeInline } from '../primitives/CodeInline'
import { Divider, SystemLine } from '../primitives/Divider'
import { CodeBlock, InfoCard } from '../primitives/InfoCard'

export function Archive2025Channel() {
  const { state, view } = useStory()
  const { messages } = view

  return (
    <div data-screen-label="archive-2025">
      <ArchivedHeader>— 이 채널은 2025년 11월 14일에 보관되었습니다 —</ArchivedHeader>

      <Message persona={KIM_DOYUN} time="2025년 11월 14일 오후 11:47" dense>
        지금 배포 인증서가 만료돼서 핫픽스를 못 올리고 있습니다.
        <br />
        야간 담당자 연락처 아시는 분 계신가요?
      </Message>
      <Message persona={HR_BOT} time="오후 11:47" dense>
        내선 119로 요청해 주세요.
      </Message>
      <Message persona={KIM_DOYUN} time="오후 11:47" dense>
        119요? 사내 긴급전화 번호가 맞나요?
      </Message>
      <Message persona={HR_BOT} time="오후 11:47" dense>
        네. 필요한 내용을 말씀하시면 됩니다.
      </Message>

      <Message persona={HR_BOT} time="시스템 로그" dense>
        <CodeBlock fontSize={12.5}>
{`23:48:03  내선 119 연결
23:48:04  응답: "네, 말씀하세요."
23:48:11  요청 내용: 배포용 인증서
23:48:12  요청 접수 완료`}
        </CodeBlock>
      </Message>

      <Message persona={KIM_DOYUN} time="오후 11:48" dense>
        목소리가 제 목소리랑 똑같았는데요.
      </Message>
      <Message persona={HR_BOT} time="오후 11:48" dense>
        야간에는 음질이 좋지 않을 수 있습니다.
      </Message>

      <Divider>10분 뒤</Divider>

      <SystemLine>23:58:12 요청 물품이 전달되었습니다.</SystemLine>

      <Message persona={KIM_DOYUN} time="오후 11:58" dense>
        책상 위에 USB가 하나 놓여 있습니다.
        <br />
        방금까지 아무것도 없었는데요.
      </Message>

      <Message persona={HR_BOT} time="오후 11:58" dense>
        <InfoCard icon="💾">
{`USB_LABEL: ${SITE_CONFIG.currentUserName}
내용: 배포용 인증서
발급일: 내일
소유자: 미입사
반납 장소: 8층`}
        </InfoCard>
      </Message>

      <Message persona={KIM_DOYUN} time="오후 11:58" dense>
        <CodeInline>{SITE_CONFIG.currentUserName}</CodeInline>라는 분은 저희 직원이 아닌데요.
      </Message>
      <Message persona={HR_BOT} time="오후 11:58" dense>
        다음 주 월요일 출근 예정입니다.
      </Message>
      <Message persona={KIM_DOYUN} time="오후 11:58" dense>
        아직 입사하지 않은 사람 인증서를 제가 왜 가지고 있죠?
      </Message>
      <Message persona={HR_BOT} time="오후 11:58" dense>
        요청하신 물품이 맞다면 사용하셔도 됩니다.
      </Message>

      <Divider>다음 날</Divider>

      <SystemLine>{`오전 8:56 ${KIM_DOYUN.name} 님이 로그인했습니다.`}</SystemLine>
      <SystemLine>오전 8:57 모니터에서 새 메모가 감지되었습니다.</SystemLine>

      <Message persona={HR_BOT} time="오전 8:57" dense>
        <InfoCard icon="📝">빚은 갚아야죠.</InfoCard>
      </Message>

      <Message persona={KIM_DOYUN} time="오전 8:57" dense>
        이 메모 누가 붙인 건가요?
      </Message>
      <Message persona={HR_BOT} time="오전 8:57" dense>
        요청 물품 반납 안내입니다.
      </Message>
      <Message persona={KIM_DOYUN} time="오전 8:58" dense>
        어디에 반납하면 되나요?
      </Message>
      <Message persona={HR_BOT} time="오전 8:58" dense>
        엘리베이터에서 6층을 한 번 눌러 주세요.
        <br />
        도착한 층의 빈 책상 위에 두시면 됩니다.
      </Message>

      <Message persona={HR_BOT} time="엘리베이터 로그" dense>
        <CodeBlock fontSize={12.5}>
{`09:04:11  6 버튼 입력 1회
09:04:12  목적지 8층
09:04:19  탑승 인원 1명
09:04:31  하차 인원 1명
09:04:32  승차 인원 0명
09:04:33  엘리베이터 문 닫힘`}
        </CodeBlock>
      </Message>

      <Message persona={KIM_DOYUN} time="오전 9:04" dense>
        여기 8층인데요.
        <br />
        엘리베이터 버튼에는 8이 없었습니다.
      </Message>
      <Message persona={HR_BOT} time="오전 9:04" dense>
        요청 물품을 빈 책상 위에 놓아주세요.
      </Message>
      <Message persona={KIM_DOYUN} time="오전 9:05" dense>
        빈 책상이 하나도 없습니다.
      </Message>
      <Message persona={HR_BOT} time="오전 9:05" dense>
        명패가 없는 자리를 이용해 주세요.
      </Message>
      <Message persona={KIM_DOYUN} time="오전 9:05" dense>
        명패가 전부 붙어 있습니다.
        <br />
        제 이름도 있고, {PARK_SEOYEON.name} 씨 이름도 있고, <CodeInline>{SITE_CONFIG.currentUserName}</CodeInline>라는 이름도 있어요.
      </Message>
      <Message persona={HR_BOT} time="오전 9:05" dense>
        {SITE_CONFIG.currentUserName}님의 자리는 아직 비어 있습니다.
      </Message>
      <Message persona={KIM_DOYUN} time="오전 9:06" dense>
        여기 있는 사람들 전부 엘리베이터만 보고 있어요.
        <br />
        아무도 타려고 하지 않습니다.
      </Message>

      <Divider>사과 메일</Divider>

      <SystemLine>규칙 위반이 감지되었습니다.</SystemLine>
      <SystemLine>사유: 지정되지 않은 층의 인원에게 질문함</SystemLine>

      <Message persona={HR_BOT} time="오전 9:06" dense>
        대표님께 사과 메일을 보내주세요.
        <br />
        제목은 <CodeInline>사과드립니다</CodeInline>, 본문은 비워 두시면 됩니다.
      </Message>

      <Message persona={HR_BOT} time="메일 로그" dense>
        <CodeBlock fontSize={12.5}>
{`09:06:41  안내 전송
09:06:44  메일 작성 시작
09:06:45  메일 전송 완료
09:06:45  제목: 사과드립니다
09:06:45  본문: 빈칸`}
        </CodeBlock>
      </Message>

      <Message persona={KIM_DOYUN} time="오전 9:06" dense>
        3초 안에 보냈습니다.
      </Message>
      <Message persona={HR_BOT} time="오전 9:06" dense>
        확인 중입니다.
      </Message>
      <Message persona={KIM_DOYUN} time="오전 9:06" dense>
        답장이 안 옵니다.
      </Message>

      <SystemLine>09:06:49 8층 출입 인원 2명</SystemLine>

      <Message persona={KIM_DOYUN} time="오전 9:06" dense>
        엘리베이터는 올라온 적이 없는데 누가 제 뒤에 서 있습니다.
      </Message>
      <Message persona={HR_BOT} time="오전 9:06" dense>
        사과가 접수되었습니다.
        <br />
        대신 오셨습니다. 아니, 벌써 와 계시네요.
      </Message>

      {state.a2025DelayedShown && (
        <>
          {messages.newMessageBannerShown && <NewMessagesDivider />}
          <Message persona={KIM_DOYUN} time="방금" dense>
            아직 8층입니다.
            <br />
            다음 사람이 오면 USB만 전해주면 되는 건가요?
          </Message>
        </>
      )}
    </div>
  )
}
