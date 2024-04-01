import { configureStore, ThunkAction } from '@reduxjs/toolkit';

import channelReducer from './api/channelAPI';

export const ADD_CHANNEL = 'ADD_CHANNEL'

interface ChannelState {
    Channels: Array<any>;
}

export interface ChannelAction {
    type: typeof ADD_CHANNEL;
    payload: ChannelState;
  }

export const store = configureStore({
  reducer: {
    channels: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ChannelAction>;
