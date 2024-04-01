import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChannelState {
  channels: Array<any>;
  loading: boolean;
  error: string | null;
}

const initialState: ChannelState = {
  channels: [],
  loading: false,
  error: null
};

const ChannelSlice = createSlice({
  name: 'Channel',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<any>) => {
      state.channels = action.payload.response.channels;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
    },
  },
});

export const { setChannels, setLoading, setError } = ChannelSlice.actions;
export default ChannelSlice.reducer;

