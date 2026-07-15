# 아키텍처

이 문서는 코드를 고치기 전에 "어디를 봐야 하는지, 뭘 고치면 되는지"를
알려주기 위한 것입니다. 뭘 하고 싶은지에 따라 아래에서 해당 절만 읽으면
됩니다.

## 한 장 요약

```
사용자 조작 → StoryCommands → storyReducer → StoryState → buildViewModel() → StoryViewModel → 컴포넌트 렌더링
```

- **StoryState** (`src/domain/state.ts`) — 지금까지 어떤 채널을 봤는지, 어떤
  연출이 재생 중인지 등 이야기 진행 전체를 담은 하나의 객체.
- **storyReducer** (`src/domain/reducer.ts`) — `(state, action) => 새 state`.
  상태가 바뀌는 곳은 여기 하나뿐입니다.
- **buildViewModel()** (`src/domain/view/index.ts`) — StoryState 필드를 조합·해석해
  컴포넌트가 바로 쓸 수 있는 형태(라벨, 카운트, 툴팁 문구 등)로 변환.
- **StoryCommands** (`src/hooks/useStoryEngine.ts`) — 컴포넌트가 호출하는
  함수 묶음(`goA2023()`, `toggleFear()` 등). 내부적으로 액션을 디스패치하고,
  필요하면 지연 연출을 예약합니다.
- 컴포넌트는 `useStory()`로 `{ state, view, commands }`를 받습니다. 여러 필드를
  조합하거나 해석해야 하는 값(카운트, 문구, 툴팁 표시 여부 등)은 `view.xxx`를
  읽고, `state.a2025DelayedShown`처럼 이름 그대로 켜고 끄기만 하는 단순 플래그는
  `state.xxx`를 직접 읽습니다. `commands.xxx()`로 명령을 내립니다.

## 폴더별 역할

```
src/domain/              이야기 로직 — React·DOM·타이머 없음
  state.ts                  StoryState 형태 + 초기값
  actions.ts                가능한 모든 상태 전이(StoryAction)
  reducer.ts                storyReducer — 상태가 바뀌는 유일한 곳
  channels.ts               채널 id 목록 + 아카이브 채널 판별
  view/                     StoryState → "지금 뭘 보여줄지" 변환
    nav.ts                    사이드바 채널 목록 (활성/잠김/안읽음 점)
    header.ts                 채팅 상단 라벨/주제/입력창 문구
    rules.ts                  #규칙 채널의 주석·README 카드 내용
    reactions.ts              이모지 리액션(😨👀☔) 상태
    archives.ts               archive 채널들의 지연 메시지/시퀀스
    ending.ts                 멤버 목록·사이드바 상태·엔딩 연출 플래그
    messages.ts               "새 메시지 도착" 배너 표시 여부

src/config/
  site.ts                    서버 이름, 방문자 표시 이름, "249" 자리 번호 같은
                              정체성 값 한 곳에 모아둔 곳 (SITE_CONFIG)
  timing.ts                  모든 지연/유지 시간(ms)·스크롤 문턱값(px) 한 곳에
                              모아둔 곳 (TIMING) — 각 컨트롤러는 여기서 값을
                              가져다 쓰기만 함

src/content/              정적 문구 — 채널 라벨/주제(channelMeta.ts),
                          말하는 사람들의 아바타 색·이니셜(personas.ts)

src/services/progress.ts  진행 상태를 쿠키에 저장/복원하는 함수 두 개
                          (saveProgress/loadProgress)

src/hooks/
  useStoryEngine.ts          reducer + timeline + 아래 controller들을 묶어 StoryCommands로 노출
  timeline.ts                이름 붙은 setTimeout/setInterval, dispose() 하나로 정리
  controllers/               타이머로 진행되는 연출 하나당 파일 하나. dispatch/timeline/stateRef를
                              첫 인자로 받는 평범한 함수들 (endingSequence.ts만 예외 — 재생 여부를
                              기억하는 내부 상태가 있어서 팩토리 형태 유지)
    endingSequence.ts           archive-당신 대화 재생 + 마무리 연출
    archiveEntry.ts              채널 전환 인트로 + 지연된 후속 메시지
    lockToast.ts                 자동으로 사라지는 "잠김" 토스트
  useIsMobile.ts / useMediaQuery.ts   반응형 브레이크포인트 감지

src/context/StoryContext.tsx     <StoryProvider> + useStory() 훅

src/components/
  primitives/                범용 부품 (Avatar, Tooltip, InfoCard, ReactionPill …)
  chat/                      채팅 형태 조각 (Message, ArchivedHeader)
  layout/                    디스코드 껍데기
    AppShell.tsx                화면 폭에 따라 Desktop/MobileShell 중 선택
    DesktopShell.tsx             서버 레일 + 사이드바 + 채팅 + 멤버 목록
    MobileShell.tsx              채널 목록 ⇄ 채팅 단일 화면 + 멤버 드로어
    MessagePane.tsx               두 셸이 공유하는 스크롤 메시지 영역
  channels/                  채널별 컴포넌트 + ChannelRegistry(전환 테이블)

src/styles/tokens.ts         모든 색상을 역할별로 이름 붙인 곳
```

## 자주 하는 작업

**새 채널을 추가하려면**
1. `src/domain/channels.ts`의 `ChannelId`에 id 추가
2. 사이드바에 항목이 필요하면 `src/domain/view/nav.ts`에 케이스 추가
3. `src/components/channels/`에 채널 컴포넌트 작성
4. `src/components/channels/ChannelRegistry.tsx`에 한 줄 추가

**새 서사 플래그나 시간차 연출을 추가하려면**
1. `StoryState`(`domain/state.ts`)에 필드 추가
2. 그 필드를 바꾸는 액션(`domain/actions.ts`) + reducer 케이스(`domain/reducer.ts`) 추가
3. 컴포넌트가 이름 그대로 켜고 끄기만 하면 되면 `state.그필드`를 바로 읽으면
   됩니다. 다른 필드와 조합하거나 텍스트로 가공해야 하면 그때 해당
   `domain/view/*.ts`에 파생 필드로 추가하세요.
4. 지연이 필요하면 관련 컨트롤러(`hooks/controllers/`) 안에서 `Timeline.after`/`every`로 예약. 시간 값은 하드코딩하지 말고 `src/config/timing.ts`의 `TIMING`에 이름 붙여 추가한 뒤 가져다 씁니다. 완전히 새로운 독립된 연출이면 컨트롤러 파일을 새로 만들어도 됩니다.

**메시지 사이 간격·전체 호흡을 조정하려면**
`src/config/timing.ts`의 `TIMING` 값만 바꾸면 됩니다 — 채널 전환 인트로 길이,
지연 메시지 간격, archive-당신 대사 틱 간격, 엔딩 연출 각 단계 타이밍, "잠김"
토스트 유지 시간, "새 메시지" 배너/구분선이 사라지기까지의 유예 시간 등 이
앱의 모든 타이밍이 여기 한 곳에 모여 있습니다. 개별 컨트롤러 파일에 흩어
놓지 않은 이유는 실제로 값이 흩어져 있었을 때 근처 주석과 실제 값이
어긋나는 문제(예: "매 1.6초"라고 적힌 주석 옆에 실제로는 3.2초짜리 상수가
있던 사례)가 있었기 때문입니다.

**회사 이름·방문자 호칭·자리 번호를 바꾸려면**
`src/config/site.ts`의 `SITE_CONFIG` 값만 바꾸면 됩니다 — 사이드바 서버명,
공지사항 본문, 각 아카이브 채널의 "249번 자리"/"멤버 249명" 표현, 리액션
카운트, 익명 사용자 이름 등이 전부 이 객체에서 값을 가져다 씁니다. 단,
`currentUserName`/`unknownUserName`에 붙는 한국어 조사(은/는, 이/가, 라는
등)는 기본값 "지원자"처럼 모음으로 끝나는 이름을 전제로 붙어있으므로,
자음으로 끝나는 이름으로 바꾸면 몇몇 문장의 조사를 손으로 고쳐야 합니다.

**새 색상을 추가하려면**
`src/styles/tokens.ts`에 "무엇을 위한 색인지"로 이름 붙여 추가하고 거기서
가져다 씁니다. `grep -rn "oklch(" src`를 이 파일 밖에서 돌렸을 때 항상
아무것도 안 나와야 합니다.

**진행 상태 저장 방식을 바꾸려면**
`src/services/progress.ts`의 `saveProgress`/`loadProgress` 함수 두 개가
전부입니다. 기본은 쿠키(어떤 archive를 봤는지, 엔딩까지 갔는지를 저장해
새로고침·재방문에도 유지). 저장소를 바꾸고 싶으면 이 두 함수 안의
`document.cookie` 부분만 고치면 됩니다. `useStoryEngine.ts`가 이 함수들을
직접 import해서 쓰므로 그 외에는 손댈 곳이 없습니다.
저장 대상은 `StoryState` 전체가 아니라 `extractProgress()`가 뽑아내는
서사 진행 관련 필드(방문한 archive, 지연 메시지 표시 여부, 엔딩 도달 여부
등)뿐입니다 — hover/스크롤 위치 같은 화면 전용 상태는 저장하지 않습니다.
저장 대상을 늘리려면 `SavedProgress` 인터페이스와 `extractProgress()`에
필드를 추가하세요.

**반응형 레이아웃을 손보려면**
`useIsMobile()`이 뷰포트 768px를 기준으로 `AppShell`이 `DesktopShell`/`MobileShell`
중 뭘 렌더링할지 정합니다. 두 셸 모두 `ChannelSidebar`/`ChatHeader`/`MemberList`를
그대로 재사용하며, `fullScreen`/`onBack`/`onToggleMembers`/`width` 같은 prop으로
맥락만 바꿉니다. "지금 채널 목록이 보이는지 채팅이 보이는지"(`MobileShell`의
`panel`/`membersOpen`) 같은 화면 전환 상태는 이야기와 무관하므로 `StoryState`가
아니라 그냥 `useState`로 처리되어 있습니다.

## 브라우저 없이 동작 확인하기

테스트 러너가 따로 없습니다. 브라우저가 없는 환경에서 로직을 확인해야 하면:

```bash
npx vite build --ssr <임시 진입점>.tsx --outDir dist-ssr-smoke --emptyOutDir
node dist-ssr-smoke/<임시 진입점>.js
```

진입점 스크립트에서 `[...actions].reduce(storyReducer, initialStoryState)`로
원하는 상태를 직접 만들고, `buildViewModel()`에 통과시킨 뒤,
`StoryContext.Provider`(현재 `context/StoryContext.tsx`에서 export되어
있음)에 그 값을 넣어 `react-dom/server`의 `renderToStaticMarkup`으로 실제
컴포넌트 트리를 렌더링하면 됩니다. reducer, view 파생 로직, JSX를 실제
타이머/DOM 측정 없이 그대로 실행해보는 방법이라, 렌더 크래시나 "이 아카이브를
본 뒤에 저 주석이 실제로 나타나는가" 같은 서사 연결 문제를 잡아낼 수
있습니다. 확인 후 임시 진입점 파일과 `dist-ssr-smoke/`는 지우세요.
