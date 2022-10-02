import { createSlice } from "@reduxjs/toolkit";

export interface infoType {
  userInfo: any;
  address: string | null;
  role: string;
  userName: string;
  userPk: number;
  nickName: string | null;
  ranking: number;
  donation: number;
  ownerPk: number;
  ownerAddress: number;
}

interface InitialStateType {
  userInfo: infoType | null;
}

const initialState: InitialStateType = {
  userInfo: null
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    delInfo: state => {
      state.userInfo = null;
    }
  }
});

// 액션과 리듀서를 export 해준다. 이건 그냥 따라하면 된다.
export const { getInfo, delInfo } = user.actions;
export default user.reducer;
