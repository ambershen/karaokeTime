import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  username: string;
  avatarUrl?: string;
  favoriteGenres: string[];
  favoriteSongs: string[];
  recentlyPlayed: string[];
}

interface UserState {
  currentUser: UserProfile | null;
  isLoggedIn: boolean;
  theme: 'default' | 'retrowave' | 'cyberpunk';
  performanceScore: Record<string, number>;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  theme: 'default',
  performanceScore: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    setTheme: (state, action: PayloadAction<'default' | 'retrowave' | 'cyberpunk'>) => {
      state.theme = action.payload;
    },
    addFavoriteSong: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        if (!state.currentUser.favoriteSongs.includes(action.payload)) {
          state.currentUser.favoriteSongs.push(action.payload);
        }
      }
    },
    removeFavoriteSong: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.favoriteSongs = state.currentUser.favoriteSongs.filter(
          (id) => id !== action.payload
        );
      }
    },
    addRecentlyPlayed: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        // Remove if already exists to avoid duplicates
        state.currentUser.recentlyPlayed = state.currentUser.recentlyPlayed.filter(
          (id) => id !== action.payload
        );
        // Add to the beginning of the array
        state.currentUser.recentlyPlayed.unshift(action.payload);
        // Keep only the last 10 songs
        if (state.currentUser.recentlyPlayed.length > 10) {
          state.currentUser.recentlyPlayed = state.currentUser.recentlyPlayed.slice(0, 10);
        }
      }
    },
    updatePerformanceScore: (state, action: PayloadAction<{ songId: string; score: number }>) => {
      const { songId, score } = action.payload;
      state.performanceScore[songId] = score;
    },
  },
});

export const {
  login,
  logout,
  setTheme,
  addFavoriteSong,
  removeFavoriteSong,
  addRecentlyPlayed,
  updatePerformanceScore,
} = userSlice.actions;

export default userSlice.reducer;