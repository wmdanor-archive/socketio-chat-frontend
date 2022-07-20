import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageDataSC } from '../../services/socket-io/types';
import { RootState } from '../store';
import { Slices } from './slices.enum';

interface MessageState {
  messages: MessageDataSC[];
}

const initialState: MessageState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: Slices.Messages,
  initialState,
  reducers: {
    appendMessage: (state, action: PayloadAction<MessageDataSC>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<MessageDataSC[]>) => {
      state.messages = action.payload;
    }
  }
});

export const { appendMessage, setMessages } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export const messagesReducer = messagesSlice.reducer;
