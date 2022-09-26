import { createSlice } from "@reduxjs/toolkit";

// export interface User {
//   id: number;
//   name: string;
// }

export interface infoType {
  userInfo: any;
  address: string | null;
  role: string;
  userName: string;
  userPk: number;
}

interface InitialStateType {
  userInfo: infoType | null;
}

const initialState: InitialStateType = {
  userInfo: null
};

// const tempId = 3;

// slice 안에 들어갈 내용들은 매우 심플하고 직관적이다.
// name, initialState, reducers.
// export const users = createSlice({
//   name: "users",
//   initialState: [
//     { id: 1, name: "User1" },
//     { id: 2, name: "User2" }
//   ] as User[], // 필수로 타입 지정 안해도 되지만, 확실히 하기로 한다.
//   reducers: {
//     addUser(state, action: PayloadAction<User>) {
//       action.payload.id += tempId;
//       // 업데이트 되는 State 를 return 해준다.
//       return [...state, action.payload];
//     }
//   }
// });

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

// 액션과 리듀서를 export 해준다. 이건 그냥 따라하면 된다.
export const { getInfo } = user.actions;
export default user.reducer;
