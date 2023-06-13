import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HOST, STORAGE_USER } from "../../api/consts";
import { IAccount } from "../../models/account";
import { IAuthResponse } from "../../models/auth";

interface IInitialState {
  account: IAccount | null;
  error: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: IInitialState = {
  account: STORAGE_USER,
  error: false,
  loading: false,
  message: null,
};

export const fetchAuth = createAsyncThunk<IAuthResponse, IAccount>(
  "authorization/fetch",
  async ({ idInstance, apiTokenInstance }, thunkAPI) => {
    const url: string = `${HOST}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.log(thunkAPI.rejectWithValue(e));
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setAccount: (state, { payload }: PayloadAction<IAccount>) => {
      return { ...state, account: payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchAuth.rejected, (state, { error }: any) => {
        console.log(error);
        const errorMessage: string = `${error.name}: ${error.message}`;
        return {
          ...state,
          loading: false,
          error: true,
          message: errorMessage,
        };
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        return { ...state, loading: false, error: false, message: null };
      });
  },
});

export const { setAccount } = authSlice.actions;
export default authSlice.reducer;
