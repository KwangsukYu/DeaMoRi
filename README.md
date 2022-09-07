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