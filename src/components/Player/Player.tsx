import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { play, pause, setCurrentTime, setVolume, toggleKaraokeMode, setVocalVolume } from '../../store/slices/playerSlice';
import './Player.css';

const Player = () => {
  const { songId } = useParams<{ songId: string }>();
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { songs } = useSelector((state: RootState) => state.songs);
  const { isPlaying, volume, isKaraokeMode, vocalVolume } = useSelector((state: RootState) => state.player);
  
  const [currentLyric, setCurrentLyric] = useState<string>('');
  const [nextLyric, setNextLyric] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  
  // Find the current song from the store
  const currentSong = songs.find(song => song.id === songId);
  
  useEffect(() => {
    // Reset player state when component mounts
    dispatch(setCurrentTime(0));
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = volume;
    }
    
    // Clean up when component unmounts
    return () => {
      dispatch(pause());
    };
  }, [dispatch, songId, volume]);
  
  useEffect(() => {
    // Handle play/pause
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          dispatch(pause());
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, dispatch]);
  
  // Update current time and find current lyrics
  const handleTimeUpdate = () => {
    if (audioRef.current && currentSong) {
      const currentTime = audioRef.current.currentTime;
      dispatch(setCurrentTime(currentTime));
      setProgress((currentTime / currentSong.duration) * 100);
      
      // Find current and next lyrics
      const lyrics = currentSong.lyrics;
      let currentLyricText = '';
      let nextLyricText = '';
      
      for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].time <= currentTime) {
          currentLyricText = lyrics[i].text;
          if (i < lyrics.length - 1) {
            nextLyricText = lyrics[i + 1].text;
          }
        }
      }
      
      setCurrentLyric(currentLyricText);
      setNextLyric(nextLyricText);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const handleVocalVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVocalVolume = parseFloat(e.target.value);
    dispatch(setVocalVolume(newVocalVolume));
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && currentSong) {
      const newProgress = parseFloat(e.target.value);
      const newTime = (newProgress / 100) * currentSong.duration;
      audioRef.current.currentTime = newTime;
      dispatch(setCurrentTime(newTime));
      setProgress(newProgress);
    }
  };
  
  if (!currentSong) {
    return <div className="not-found-container neon-box p-6">
      <h2 className="text-3xl neon-glow mb-4">SONG NOT FOUND!</h2>
      <p>This song doesn't exist. SAD!</p>
    </div>;
  }
  
  return (
    <div className="player-container grid-background scanlines">
      {/* Hidden audio element for playback */}
      <audio 
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(pause())}
      />
      
      <div className="player-header">
        <div className="song-info">
          <h2 className="text-3xl gradient-text mb-2">{currentSong.title}</h2>
          <p className="text-xl neon-glow">{currentSong.artist}</p>
        </div>
        
        <div className="album-cover neon-box">
          <img src={currentSong.coverImage} alt={`${currentSong.title} cover`} />
        </div>
      </div>
      
      <div className="lyrics-display neon-box p-6">
        <div className="current-lyric gradient-text text-4xl mb-4">{currentLyric}</div>
        <div className="next-lyric text-xl opacity-70">{nextLyric}</div>
      </div>
      
      <div className="player-controls">
        <div className="progress-container">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleProgressChange}
            className="progress-slider"
          />
          <div className="time-display">
            {audioRef.current ? 
              `${Math.floor(audioRef.current.currentTime / 60)}:${Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0')}` : 
              '0:00'} / 
            {`${Math.floor(currentSong.duration / 60)}:${(currentSong.duration % 60).toString().padStart(2, '0')}`}
          </div>
        </div>
        
        <div className="control-buttons">
          <button 
            className="control-button rewind-button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime -= 10;
              }
            }}
          >
            -10s
          </button>
          
          <button 
            className="control-button play-pause-button"
            onClick={() => dispatch(isPlaying ? pause() : play())}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          
          <button 
            className="control-button forward-button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime += 10;
              }
            }}
          >
            +10s
          </button>
        </div>
        
        <div className="volume-controls">
          <div className="volume-control">
            <span>Master Volume</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
          
          <div className="karaoke-controls">
            <button 
              className={`karaoke-mode-button ${isKaraokeMode ? 'active' : ''}`}
              onClick={() => dispatch(toggleKaraokeMode())}
            >
              {isKaraokeMode ? 'KARAOKE MODE: ON' : 'KARAOKE MODE: OFF'}
            </button>
            
            {isKaraokeMode && (
              <div className="vocal-volume-control">
                <span>Vocal Volume</span>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={vocalVolume} 
                  onChange={handleVocalVolumeChange}
                  className="volume-slider"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;