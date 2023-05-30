import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HOST } from "../../api/consts";
import { IUser } from "../../models/user";

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null,
};

export const fetchAuthorization = createAsyncThunk<any, Record<string, string>>(
  "authorization/fetch",
  async (user: IUser) => {
    // { idInstance, apiTokenInstance }
    const { idInstance, apiTokenInstance } = user;
    console.log(user);
    const url: string = `${HOST}/waInstance=${await idInstance}/getSettings/${await apiTokenInstance}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result, "result");
      return result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      return { ...state, user: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAuthorization.fulfilled, (state) => {
      return state;
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
