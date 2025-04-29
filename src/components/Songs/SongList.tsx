import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { fetchSongs, searchSongs } from '../../store/slices/songsSlice';
import './SongList.css';

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs, filteredSongs, status, error } = useSelector((state: RootState) => state.songs);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs());
    }
  }, [status, dispatch]);
  
  const handleSongSelect = (songId: string) => {
    navigate(`/player/${songId}`);
  };
  
  if (status === 'loading') {
    return <div className="loading-container">
      <div className="neon-text text-2xl">LOADING TREMENDOUS SONGS...</div>
      <div className="loading-bar"></div>
    </div>;
  }
  
  if (status === 'failed') {
    return <div className="error-container neon-box p-6">
      <h3 className="text-2xl neon-glow mb-4">TERRIBLE ERROR!</h3>
      <p>{error || 'Failed to load songs. SAD!'}</p>
      <button 
        onClick={() => dispatch(fetchSongs())}
        className="vaporwave-button mt-4"
      >
        TRY AGAIN
      </button>
    </div>;
  }
  
  return (
    <div className="song-list-container grid-background scanlines">
      <h2 className="text-3xl font-bold gradient-text mb-8 retro-text">CHOOSE A TREMENDOUS SONG</h2>
      
      <div className="search-bar-container mb-8">
        <input 
          type="text"
          placeholder="Search for the BEST songs..."
          className="vaporwave-input w-full max-w-md"
          onChange={(e) => dispatch(searchSongs(e.target.value))}
        />
      </div>
      
      <div className="songs-grid">
        {(status === 'succeeded' ? (filteredSongs.length > 0 ? filteredSongs : songs) : songs).map(song => (
          <div 
            key={song.id} 
            className="song-card neon-box" 
            onClick={() => handleSongSelect(song.id)}
          >
            <div className="song-image-container">
              <img src={song.coverImage} alt={`${song.title} cover`} className="song-image" />
            </div>
            <div className="song-info p-4">
              <h3 className="song-title text-xl font-bold mb-1">{song.title}</h3>
              <p className="song-artist text-sm mb-2">{song.artist}</p>
              <div className="song-duration text-xs">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;