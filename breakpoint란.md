# breakpoint란


## 중단 점[#](https://code.visualstudio.com/docs/editor/debugging#_breakpoints)

에디터의 여백을 클릭 하거나 현재 행에서 F9 를 사용하여 중단 점을 전환 할 수 있습니다 . Run view의 **BREAKPOINTS** 섹션 에서 더 나은  제어 (활성화 / 비활성화 / 다시 적용)를 수행 할 수 있습니다 .

- 편집기 여백의 breakpoint 은 일반적으로 빨간색으로 채워진 원으로 표시됩니다.
- 비활성화 된 breakpoint 은 회색 원으로 채워져 있습니다.
- 디버깅 세션이 시작되면 디버거에 등록 할 수없는 breakpoint 이 회색 빈 원으로 바뀝니다. 라이브 편집을 지원하지 않는 디버그 세션이 실행되는 동안 소스를 편집하는 경우에도 마찬가지입니다.

**다시 적용 모든 breakpoint의** 명령은 원래 위치에 다시 모든 breakpoint을 설정합니다. 디버그 환경이 아직 실행되지 않은 소스 코드에서 "lazy"및 "misplaces" breakpoint 인 경우에 유용합니다.

![](/Users/woowahan16/Projects/wtc/Day3/maeng2418-brightchul-0407chan-learn-node/breakpoints.png)





선택적으로 breakpoint 은 설정을 활성화하여 편집기의 개요 눈금자에 표시 할 수 있습니다 `debug.showBreakpointsInOverviewRuler`.

![](/Users/woowahan16/Projects/wtc/Day3/maeng2418-brightchul-0407chan-learn-node/breakpoints2.png)

