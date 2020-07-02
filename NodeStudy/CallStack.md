## 호출스택(Call Stack)

현재 실행중인 서브루틴에 대한 정보들을 담아두는 스택구조의 메모리영역.

콜스택에는 크게 매개변수에 대한 정보, 반환 주소에 대한 정보, 지역변수에 대한 정보가 담긴다.

코드의 실행순서

```jsx
function first() {
  second();
  console.log('첫 번째');
}
function second() {
  third();
  console.log('두 번째');
}
function third() {
  console.log('세 번째');
}
first();
third();
```

**쌓이는 순서 :** main() → first() → second() → third()

**실행 순서 :** third() → second() → first() → main()

first()가 호출되고, frist 안의 sceond가 호출되고, 마지막에 second 안의 third가 호출됩니다. 호출된 순서와는 반대로 실행되는 LIFO 구조입니다. ⇒ 호출**스택**

third가 실행되고 지워지고, second가 실행되고 지워지고, frist가 실행되고 지워지면 main만 남게되고, 그 후 third()가 호출됩니다. 그러면 third가 스택에 들어가고, 실행되고 다시 지워집니다. 마지막으로 전역 컨텍스트 main이 지워지고 그러면 호출 스택에는 아무것도 남지 않게 되고 실행 완료입니다.