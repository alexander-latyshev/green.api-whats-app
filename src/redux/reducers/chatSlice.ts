import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IChat,
  IChatHistory,
  IHistoryResponse,
  IMessageResponse,
} from "../../models/chat";
import { HOST, STORAGE_USER } from "../../api/consts";

export interface IMessageParams {
  message: string;
  phoneNumber: string | undefined;
}

interface IInitialState {
  chats: Array<IChat>;
  selectedChat: IChat | null;
  history: IChatHistory[];
  loading: boolean;
  error: any;
}

const initialState: IInitialState = {
  chats: [],
  selectedChat: null,
  history: [],
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<IMessageResponse, IMessageParams>(
  "chats/sendMessage",
  async ({ message, phoneNumber }) => {
    const { idInstance, apiTokenInstance } = STORAGE_USER;
    const url: string = `${HOST}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: `${phoneNumber}@c.us`,
          message: `${message}`,
        }),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchChatHistory = createAsyncThunk<IHistoryResponse, string>(
  "chats/fetchChatHistory",
  async (phoneNumber) => {
    const { idInstance, apiTokenInstance } = STORAGE_USER;
    if (!phoneNumber) return;
    const url: string = `${HOST}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: `${phoneNumber}@c.us`,
          count: 10,
        }),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, { payload }: PayloadAction<IChat>) => {
      return { ...state, chats: [...state.chats, payload] };
    },
    removeChat: (state, { payload }: PayloadAction<number>) => {
      const filteredChats = state.chats.filter((el) => el.id !== payload);
      return { ...state, chats: filteredChats };
    },
    selectChat: (state, { payload }: PayloadAction<number>) => {
      const selectedChat = state.chats.filter((el) => el.id === payload);
      return { ...state, selectedChat: selectedChat[0] };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendMessage.pending, (state) => {
        return state;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        return {
          ...state,
        };
      })
      .addCase(fetchChatHistory.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(
        fetchChatHistory.rejected,
        (state, { payload }: PayloadAction<any>) => {
          return { ...state, loading: true, error: payload };
        }
      )
      .addCase(
        fetchChatHistory.fulfilled,
        (state, { payload }: PayloadAction<IChatHistory[]>) => {
          return { ...state, history: payload.reverse(), loading: false };
        }
      );
  },
});

export const { addChat, removeChat, selectChat } = chatSlice.actions;
export default chatSlice.reducer;
