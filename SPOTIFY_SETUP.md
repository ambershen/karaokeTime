# Spotify API Setup for Karaoke Time

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Spotify Developer account

### Spotify API Setup
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app name and description, then click "Create"
5. Note your Client ID and Client Secret

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### Usage
- Browse the default song list on the Songs page
- Use the search bar to find songs via Spotify
- Click on a song to start playing it
- Adjust volume and karaoke settings as needed