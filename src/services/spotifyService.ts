import axios from 'axios';

// Spotify API endpoints
const AUTH_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';

// You would need to register your app with Spotify and get these values
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'YOUR_CLIENT_ID';
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';

interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  preview_url: string | null;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

// Function to get access token
const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post<SpotifyAuthResponse>(
      AUTH_ENDPOINT,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

// Function to search for tracks
export const searchSpotifyTracks = async (query: string) => {
  if (!query) return [];
  
  try {
    const accessToken = await getAccessToken();
    
    const response = await axios.get<SpotifySearchResponse>(
      `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    
    // Transform Spotify tracks to our app's song format
    return response.data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      duration: Math.floor(track.duration_ms / 1000),
      coverImage: track.album.images[0]?.url || 'https://via.placeholder.com/300',
      audioUrl: track.preview_url || '',
      // We don't have lyrics from Spotify API, so we'll use empty lyrics
      lyrics: [{ time: 0, text: 'Lyrics not available' }]
    }));
  } catch (error) {
    console.error('Error searching Spotify tracks:', error);
    throw error;
  }
};