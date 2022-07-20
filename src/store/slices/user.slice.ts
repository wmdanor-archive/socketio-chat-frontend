import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Slices } from './slices.enum';

interface UserState {
  name: string;
}

// const initialState: UserState = {};

const initialState: UserState = {
  name: Math.random().toString(),
};

export const userSlice = createSlice({
  name: Slices.User,
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload;
    },
  }
});

export const { setName } = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.name;

export const userReducer = userSlice.reducer;
