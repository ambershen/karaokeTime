import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isKaraokeMode: boolean;
  vocalVolume: number;
}

const initialState: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  volume: 0.8,
  isMuted: false,
  isKaraokeMode: true,
  vocalVolume: 0.2,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      if (state.volume > 0) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    toggleKaraokeMode: (state) => {
      state.isKaraokeMode = !state.isKaraokeMode;
    },
    setVocalVolume: (state, action: PayloadAction<number>) => {
      state.vocalVolume = action.payload;
    },
    resetPlayer: (state) => {
      state.isPlaying = false;
      state.currentTime = 0;
    },
  },
});

export const {
  play,
  pause,
  setCurrentTime,
  setVolume,
  toggleMute,
  toggleKaraokeMode,
  setVocalVolume,
  resetPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;