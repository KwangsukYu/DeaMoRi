# TypeScript

## type of TypeScript

<br>

⭐ Type 시스템 <br>
└ 명시적 정의(변수 선언 시 타입 정의) <br>
`let a: boolean = "x"` <br>
→ 🚫 boolean 타입에 string타입 할당 불가 알림 <br>

 <br>

└ 변수만 생성(타입 추론) <br>
`let b = "hello"` <br>
→ b가 string 타입이라고 추론 <br>
b = 1 <br>
→ 🚫 string 타입에 number타입 할당 불가 알림 <br>

 <br>

📌 Types of TS(기본) <br>
✅ 배열: 자료형[] <br>
✅ 숫자: number <br>
✅ 문자열: string <br>
✅ 논리: boolean <br>
✅ optional  <br>
```
const player : {
    name: string,
    age?:number
} = {
    name: "nico"
}
```

❌ player.age가 undefined일 가능성 알림 <br>
```
if(player.age < 10) {
}
```
⭕ player.age가 undefined일 가능성 체크 <br>
```
if(player.age && player.age < 10) {
}
```
❗ ?를 :앞에 붙이면 optional <br>

✅ Alias(별칭) 타입 <br>
```
type Player = {
    name: string,
    age?:number
}

const player : Player = {
    name: "nico"
}
```

⭐ 함수에서는 어떻게 쓸까
```
type Player = {
    name: string,
    age?:number
}

function playerMaker1(name:string) : Player {
    return {
        name
    }
}

const playerMaker2 = (name:string) : Player => ({name})

const nico = playerMaker1("nico")
nico.age = 12
```


Function(=Method) Overloading은 직접 작성하기보다 외부 라이브러리에 자주 보이는 형태로, 하나의 함수가 복수의 Call Signature를 가질 때 발생한다

type Add = {
(a: number, b: number): number,
(a: number, b: string): number
}

const add: Add = (a, b) => {
if (typeof b === "string") return a;
return a + b;
}

매개변수의 데이터 타입이 다른 경우 예외 처리

type Add2 = {
(a: number, b: number): number,
(a: number, b: number, c: number): number
}

const add2: Add2 = (a, b, c?: number) => {
if (c) return a + b + c;
return a + b;
}

매개변수의 수가 다른 경우 예외 처리

위와 같은 함수는 거의 없지만 외부 라이브러리에서 활용될 수 있다

router.push("/home");

router.push({
path: "/home",
state: 1
});

예를 들어, Next.js의 라우터 push가 대충 두 가지 방법으로 페이지를 이동한다고 할 때,

type Config = {
path: string,
state: number
}

type Push = {
(config: Config): void,
(config: string): void
}

const push: Push = (config) => {
if (typeof config === "string") console.log(config);
else console.log(config.path);
}

패키지나 라이브러리는 위와 같이 두 가지 경우의 Overloading으로 디자인되어 있을 것이다