import { SITE_CONFIG } from '../../config/site'
import { useStory } from '../../context/StoryContext'
import { HR_BOT, HR_OFFICER_01 } from '../../content/personas'
import { ArchivedHeader } from '../chat/ArchivedHeader'
import { Message } from '../chat/Message'
import { NewMessagesDivider } from '../chat/NewMessagesDivider'
import { Divider, SystemLine } from '../primitives/Divider'
import { CodeBlock, InfoCard } from '../primitives/InfoCard'

// archive-2021 is a past record like any other archive, no separate reveal gesture or
// exposition about why the system exists. Just the one recurring fact the other archives
// already imply: a new hire arrives, one existing person leaves, the numbers snap back.
export function Archive2021Channel() {
  const { state, view } = useStory()
  const { messages } = view

  return (
    <div data-screen-label="archive-2021">
      <ArchivedHeader>— 이 채널은 2021년 1월 4일에 보관되었습니다 —</ArchivedHeader>

      <Message persona={HR_BOT} pinned="📌 고정됨" dense>
        채용 공고가 자동으로 재게시되었습니다.
        <div style={{ marginTop: 8 }}>
          <InfoCard icon="📋">
{`Omong 내부 개발팀 채용 공고

현재 빈 자리: ${SITE_CONFIG.vacancyCount}개
어제도 ${SITE_CONFIG.vacancyCount}개였습니다.
그저께도 ${SITE_CONFIG.vacancyCount}개였습니다.

자리는 늘 하나입니다.
사람이 바뀔 뿐이에요.`}
          </InfoCard>
        </div>
        <div style={{ marginTop: 8 }}>
          <InfoCard icon="📄">
{`최초 작성: 2019년 3월 4일
게시 일시: 2021년 1월 4일 오전 9:14
최근 게시: 오늘 오전 9:14
작성자: 없음
상태: 모집 중`}
          </InfoCard>
        </div>
      </Message>

      <Message persona={HR_OFFICER_01} time="2021년 1월 4일 오전 9:03" dense>
        방금 신규 입사 처리가 완료됐는데 채용 공고가 다시 올라왔습니다.
      </Message>
      <Message persona={HR_BOT} time="오전 9:03" dense>
        정상입니다.
      </Message>
      <Message persona={HR_OFFICER_01} time="오전 9:03" dense>
        한 명이 들어왔으니 빈자리는 {SITE_CONFIG.vacancyCount - 1}개여야 하는 것 아닌가요?
      </Message>
      <Message persona={HR_BOT} time="오전 9:03" dense>
        기존 담당자 한 명이 퇴사 처리되었습니다.
      </Message>
      <Message persona={HR_OFFICER_01} time="오전 9:04" dense>
        그래서 다시 한 자리가 빈 건가요?
      </Message>
      <Message persona={HR_BOT} time="오전 9:04" dense>
        네.
      </Message>
      <Message persona={HR_OFFICER_01} time="오전 9:04" dense>
        그러면 이 자리는 계속 채용해도 채워지지 않는 거네요.
      </Message>
      <Message persona={HR_BOT} time="오전 9:04" dense>
        매번 정상적으로 채워지고 있습니다.
      </Message>
      <Message persona={HR_OFFICER_01} time="오전 9:05" dense>
        그런데 왜 채용 공고가 다시 올라오죠?
      </Message>
      <Message persona={HR_BOT} time="오전 9:05" dense>
        사람이 바뀌어야 하니까요.
      </Message>
      <Message persona={HR_OFFICER_01} time="오전 9:05" dense>
        자리는 늘 하나인 거네요.
      </Message>
      <Message persona={HR_BOT} time="오전 9:05" dense>
        사람이 바뀔 뿐이에요.
      </Message>

      <Divider>역할 배정</Divider>

      <SystemLine>신규 입사자에게 역할을 배정했습니다.</SystemLine>

      <Message persona={HR_OFFICER_01} time="오전 9:05" dense>
        백엔드인가요, 프론트엔드인가요?
      </Message>
      <Message persona={HR_BOT} time="오전 9:05" dense>
        {SITE_CONFIG.deskNumber}번 자리 담당자입니다.
      </Message>
      <Message persona={HR_OFFICER_01} time="오전 9:06" dense>
        그런 직무는 인사 시스템에 없는데요.
      </Message>
      <Message persona={HR_BOT} time="오전 9:06" dense>
        역할은 이미 정해져 있습니다.
        <br />
        고르시는 것이 아닙니다.
      </Message>

      <Message persona={HR_BOT} time="시스템 로그" dense>
        <CodeBlock fontSize={12.5}>
{`08:55:59  멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개
08:56:00  신규 입사자 입장
08:56:00  멤버 ${SITE_CONFIG.deskNumber + 1}명 / 빈자리 ${SITE_CONFIG.vacancyCount - 1}개
08:56:01  기존 담당자 퇴사 처리
08:56:01  멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개
08:56:02  채용 공고 재게시`}
        </CodeBlock>
      </Message>

      <Message persona={HR_BOT} time="반복 기록" dense>
        <CodeBlock fontSize={12.5}>
{`2022년 12월 30일  멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개
2023년 12월 31일  멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개
2024년 7월 18일   멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개
2025년 11월 14일  멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개
오늘               멤버 ${SITE_CONFIG.deskNumber}명 / 빈자리 ${SITE_CONFIG.vacancyCount}개`}
        </CodeBlock>
      </Message>

      {state.a2021DelayedShown && (
        <>
          {messages.newMessageBannerShown && <NewMessagesDivider />}
          <Message persona={HR_OFFICER_01} time="방금" dense>
            지금 자리에 앉아 있는 사람은 빈자리를 채운 것 아닌가요?
          </Message>
          <Message persona={HR_BOT} time="방금" dense>
            맞습니다.
          </Message>
          <Message persona={HR_OFFICER_01} time="방금" dense>
            그런데 왜 아직도 빈자리라고 나오죠?
          </Message>
        </>
      )}
      {state.a2021DelayedShown2 && (
        <Message persona={HR_BOT} time="방금" dense>
          다음 분을 모집 중입니다.
        </Message>
      )}
    </div>
  )
}
