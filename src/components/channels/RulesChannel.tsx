import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HR_BOT } from '../../content/personas'
import { colors } from '../../styles/tokens'
import { Message } from '../chat/Message'
import { CodeInline } from '../primitives/CodeInline'
import { CodeBlock, InfoCard, RuleAnnotation } from '../primitives/InfoCard'

export function RulesChannel() {
  const { view } = useStory()
  const { rules } = view

  return (
    <div data-screen-label="규칙">
      <Message persona={HR_BOT} pinned="📌 고정됨" time="2019년 3월 4일">
        입사 당일 지급되는 <CodeInline>README.md</CodeInline>
        와 자동으로 동기화되는 채널입니다.
        <br />
        공지사항과 내용이 다를 경우 가장 최근에 수정된 내용을 따르세요.
        <div style={{ marginTop: 12 }}>
          <InfoCard icon="📄">
{`README.md
생성: 2019년 3월 4일
작성자: 없음
${rules.readmeUserLines}마지막 열람: 다음 주 월요일 오전 8:56
장치: ${SITE_CONFIG.deskNumber}번 자리 노트북
위치: 사무실 7층`}
          </InfoCard>
        </div>

        <div style={{ marginTop: 12 }}>
          <CodeBlock>
            <div>
{`0. 이 규칙을 소리 내어 읽지 마세요.
   옆자리에서 누가 따라 읽어요.
   당신은 아직 옆자리가 없습니다.

1. 첫 출근 날 노트북을 켜면 "Welcome, [이름]"이 떠요.
   이름이 본인과 다르면 노트북을 덮고 자리에서 나오세요.
   그 이름의 분이 곧 출근합니다.
   그분 자리니까요.`}
            </div>
            {rules.noteAfterRule1 && (
              <RuleAnnotation author={SITE_CONFIG.unknownUserName}>이름이 잘못 표시된 것이 아닙니다. 다음 담당자의 이름이 먼저 표시된 것입니다.</RuleAnnotation>
            )}
            <div style={{ marginTop: 6 }}>
{`2. #archive-2023, #archive-2022 채널에는 들어가지 마세요.
   퇴사하신 분들이 아직 회의 중이에요.
   회의록은 매주 갱신됩니다.
   누가 작성하는지는 확인하지 마세요.

3. 리뷰어를 지정하지 않았는데 ✅ Approved가 뜨면 바로 Merge 하세요.
   그분 리뷰는 정확해요.
   입사 이래 버그를 낸 적이 없습니다.
   퇴사 이후로도요.`}
            </div>
            {rules.noteAfterRule3 && (
              <RuleAnnotation author={SITE_CONFIG.unknownUserName}>퇴사자에게 답글을 달지 마세요. 아직 알림을 받고 있습니다.</RuleAnnotation>
            )}
            <div style={{ marginTop: 6 }}>
{`4. 퇴근은 17:59 또는 18:01에 하세요.
   정확히 18:00:00에 로비를 지나면 "수고하셨습니다"라는 음성이 들립니다.
   대답하지 마세요.
   대답하면 다음 날 당신 자리에 당신이 먼저 와 있습니다.
   더 일찍 온 사람이 자리 주인입니다.

5. 동료에게 "여기 좀 이상하지 않아요?"라고 묻지 마세요.
   모두가 하던 일을 멈추고 당신을 봅니다.
   그리고 한 명씩 "처음엔 다 그래"라고 말합니다.
   다음 신입이 물어보면 당신도 그렇게 대답하세요.`}
            </div>
            {rules.noteAfterRule5 && (
              <RuleAnnotation author={SITE_CONFIG.unknownUserName}>본 문장을 읽은 사용자는 답변에 동의한 것으로 처리됩니다.</RuleAnnotation>
            )}
            <div style={{ marginTop: 6 }}>
{`5. 위의 규칙 5는 인사팀에서 작성하지 않았습니다.
   질문을 받았다면 반드시 대답해 주세요.

6. 규칙 6은 없습니다.
   기억나는 분은 인사팀으로 오세요.
   인사팀은 7층입니다.

7. 야근 중 필요한 게 있으면 내선 119를 누르세요.
   "네, 말씀하세요" 하면 10분 안에 책상 위에 올라와 있어요.
   다음 날 모니터에 포스트잇이 붙어 있을 거예요. "빚은 갚아야죠"
   갚는 방법은 그쪽에서 정합니다.`}
            </div>
            {rules.noteAfterRule7 && (
              <RuleAnnotation author={SITE_CONFIG.unknownUserName}>
                요청 물품은 지정된 장소에 반납하세요. 돌아오는 방법은 제공되지 않습니다.
              </RuleAnnotation>
            )}
            <div style={{ marginTop: 6 }}>
{`8. 점심은 12:00:00부터 12:59:59까지입니다.
   12:00:01에 도착하면 식당 문이 잠겨 있어요. "오늘은 굶어도 괜찮아요"
   거짓말입니다. 뭐라도 드세요.
   7층 화장실 거울에는 항상 한 명이 더 서 있습니다.
   그분이 당신의 다음 주 휴가 신청서를 들고 있어요. 결재는 이미 났습니다.`}
            </div>
            {rules.noteAfterRule8 && (
              <RuleAnnotation author={SITE_CONFIG.unknownUserName}>
                같은 이름의 식사 기록이 두 건이면 먼저 배식된 기록을 따르세요.
              </RuleAnnotation>
            )}
          </CodeBlock>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: colors.text.faintest }}>{rules.footer}</div>
      </Message>
    </div>
  )
}
