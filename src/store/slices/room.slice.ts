import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Slices } from './slices.enum';

interface RoomState {
  name: string;
  users: string[];
}

const initialState: RoomState = {
  name: '',
  users: [],
};

export const roomSlice = createSlice({
  name: Slices.Room,
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUsers: (state, action: PayloadAction<string[]>) => {
      state.users = action.payload;
    },
    setRoom: (state, action: PayloadAction<RoomState>) => {
      state.name = action.payload.name;
      state.users = action.payload.users;
    },
  }
});

export const { setName, setUsers, setRoom } = roomSlice.actions;

export const selectRoom = (state: RootState) => state.room;

export const roomReducer = roomSlice.reducer;
