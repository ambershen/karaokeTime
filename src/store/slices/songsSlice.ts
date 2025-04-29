import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverImage: string;
  lyrics: Array<{ time: number; text: string }>;
  audioUrl: string;
}

interface SongsState {
  songs: Song[];
  filteredSongs: Song[];
  currentSong: Song | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  filteredSongs: [],
  currentSong: null,
  status: 'idle',
  error: null,
};

// Example async thunk for fetching songs
export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  // In a real app, this would be an API call
  return [
    {
      id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      duration: 355,
      coverImage: 'https://example.com/bohemian.jpg',
      lyrics: [
        { time: 0, text: 'Is this the real life?' },
        { time: 5, text: 'Is this just fantasy?' },
        // More lyrics would go here
      ],
      audioUrl: '/songs/bohemian-rhapsody.mp3',
    },
    {
      id: '2',
      title: 'Sweet Child O\'Mine',
      artist: 'Guns N\' Roses',
      duration: 355,
      coverImage: 'https://example.com/sweet-child.jpg',
      lyrics: [
        { time: 0, text: 'She\'s got a smile that it seems to me' },
        { time: 5, text: 'Reminds me of childhood memories' },
        // More lyrics would go here
      ],
      audioUrl: '/songs/sweet-child-o-mine.mp3',
    },
  ];
});

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
    },
    searchSongs: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredSongs = state.songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm) ||
          song.artist.toLowerCase().includes(searchTerm)
      );
    },
    clearSearch: (state) => {
      state.filteredSongs = state.songs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.status = 'succeeded';
        state.songs = action.payload;
        state.filteredSongs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch songs';
      });
  },
});

export const { setCurrentSong, searchSongs, clearSearch } = songsSlice.actions;
export default songsSlice.reducer;