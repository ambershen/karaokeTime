import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { login, logout, setTheme } from '../../store/slices/userSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn, theme, performanceScore } = useSelector((state: RootState) => state.user);
  const { songs } = useSelector((state: RootState) => state.songs);
  
  const [username, setUsername] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login({
        id: Date.now().toString(),
        username: username,
        favoriteGenres: selectedGenres,
        favoriteSongs: [],
        recentlyPlayed: [],
      }));
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const handleThemeChange = (newTheme: 'default' | 'retrowave' | 'cyberpunk') => {
    dispatch(setTheme(newTheme));
  };
  
  const genreOptions = ['Pop', 'Rock', 'Hip Hop', 'Country', 'Electronic', 'R&B', 'Jazz', 'Classical'];
  
  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  return (
    <div className="profile-container grid-background scanlines">
      {!isLoggedIn ? (
        <div className="login-section neon-box p-6">
          <h2 className="text-3xl gradient-text mb-6 retro-text">CREATE YOUR PROFILE</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Choose a TREMENDOUS Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="vaporwave-input w-full"
                required
              />
            </div>
            
            <div className="mb-6">
              <p className="mb-2">Select Your FAVORITE Genres:</p>
              <div className="genre-options">
                {genreOptions.map(genre => (
                  <label key={genre} className="genre-option">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      className="hidden"
                    />
                    <span className={`genre-badge ${selectedGenres.includes(genre) ? 'selected' : ''}`}>
                      {genre}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <button type="submit" className="vaporwave-button w-full text-xl retro-text">
              CREATE PROFILE
            </button>
          </form>
        </div>
      ) : (
        <div className="user-profile">
          <div className="profile-header neon-box p-6 mb-8">
            <h2 className="text-3xl gradient-text mb-4">{currentUser?.username}'s Profile</h2>
            <div className="theme-selector mb-4">
              <p className="mb-2">Choose Your AMAZING Theme:</p>
              <div className="theme-options">
                <button 
                  className={`theme-option ${theme === 'default' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('default')}
                >
                  DEFAULT
                </button>
                <button 
                  className={`theme-option ${theme === 'retrowave' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('retrowave')}
                >
                  RETROWAVE
                </button>
                <button 
                  className={`theme-option ${theme === 'cyberpunk' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('cyberpunk')}
                >
                  CYBERPUNK
                </button>
              </div>
            </div>
            <button onClick={handleLogout} className="vaporwave-button">
              LOGOUT
            </button>
          </div>
          
          <div className="stats-section">
            <h3 className="text-2xl neon-glow mb-6 retro-text">YOUR TREMENDOUS STATS</h3>
            
            <div className="stats-grid">
              <div className="stat-card neon-box p-4">
                <h4 className="text-xl mb-2">Favorite Genres</h4>
                <div className="genre-tags">
                  {currentUser?.favoriteGenres.map(genre => (
                    <span key={genre} className="genre-tag">{genre}</span>
                  ))}
                </div>
              </div>
              
              <div className="stat-card neon-box p-4">
                <h4 className="text-xl mb-2">Songs Performed</h4>
                <p className="text-4xl gradient-text">
                  {Object.keys(performanceScore).length}
                </p>
              </div>
              
              <div className="stat-card neon-box p-4">
                <h4 className="text-xl mb-2">Best Performance</h4>
                {Object.keys(performanceScore).length > 0 ? (
                  <div>
                    <p className="text-lg">
                      {songs.find(s => s.id === Object.keys(performanceScore).reduce(
                        (a, b) => performanceScore[a] > performanceScore[b] ? a : b
                      ))?.title || 'Unknown'}
                    </p>
                    <p className="text-3xl neon-glow">
                      {Math.max(...Object.values(performanceScore))}%
                    </p>
                  </div>
                ) : (
                  <p>No performances yet</p>
                )}
              </div>
            </div>
            
            {currentUser?.favoriteSongs.length > 0 && (
              <div className="favorites-section mt-8">
                <h4 className="text-xl mb-4">Favorite Songs</h4>
                <div className="favorites-list">
                  {currentUser.favoriteSongs.map(songId => {
                    const song = songs.find(s => s.id === songId);
                    return song ? (
                      <div key={songId} className="favorite-song-item neon-box p-2">
                        <span>{song.title}</span>
                        <span className="text-sm opacity-70">{song.artist}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;