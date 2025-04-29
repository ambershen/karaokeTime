import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useSelector((state: RootState) => state.user);
  
  return (
    <div className="home-container grid-background scanlines">
      <div className="hero-section">
        <h1 className="text-5xl font-bold gradient-text mb-6">KARAOKE TIME</h1>
        <h2 className="text-3xl neon-glow mb-8">The GREATEST Karaoke Experience Ever!</h2>
        
        <div className="cta-buttons">
          <button 
            onClick={() => navigate('/songs')} 
            className="vaporwave-button text-xl mr-4 retro-text"
          >
            START SINGING NOW!
          </button>
          
          {!isLoggedIn && (
            <button 
              onClick={() => navigate('/profile')} 
              className="vaporwave-button text-xl retro-text"
            >
              CREATE PROFILE
            </button>
          )}
        </div>
      </div>
      
      {isLoggedIn && currentUser && (
        <div className="mt-12 neon-box p-6 max-w-md mx-auto">
          <h3 className="text-2xl mb-4 retro-text">Welcome back, {currentUser.username}!</h3>
          <p className="mb-4">Ready to show off your AMAZING singing skills?</p>
          <div className="flex justify-between">
            <button 
              onClick={() => navigate('/profile')} 
              className="vaporwave-button"
            >
              MY PROFILE
            </button>
            <button 
              onClick={() => navigate(`/songs/recent`)} 
              className="vaporwave-button"
            >
              RECENT SONGS
            </button>
          </div>
        </div>
      )}
      
      <div className="features-section mt-16">
        <h3 className="text-2xl neon-glow mb-6 retro-text">TREMENDOUS FEATURES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card neon-box p-4">
            <h4 className="text-xl mb-2">HUGE Song Library</h4>
            <p>The best songs. All the hits. Believe me!</p>
          </div>
          <div className="feature-card neon-box p-4">
            <h4 className="text-xl mb-2">PERFECT Vocal Effects</h4>
            <p>You'll sound better than ever before. It's true!</p>
          </div>
          <div className="feature-card neon-box p-4">
            <h4 className="text-xl mb-2">AMAZING Performance Tracking</h4>
            <p>We track your scores. The highest scores ever!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;