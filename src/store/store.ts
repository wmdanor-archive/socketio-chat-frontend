import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './slices/messages.slice';
import { roomReducer } from './slices/room.slice';
import { Slices } from './slices/slices.enum';
import { userReducer } from './slices/user.slice';


export const store = configureStore({
  reducer: {
    [Slices.User]: userReducer,
    [Slices.Room]: roomReducer,
    [Slices.Messages]: messagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
