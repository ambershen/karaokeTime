import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';

// Import pages and components later

import Home from './components/Home/Home';
import SongList from './components/Songs/SongList';
import Player from './components/Player/Player';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-dark-purple text-white grid-background">
          <header className="py-4 px-6 border-b-2 border-neon-pink shadow-neon">
            <nav className="flex justify-between items-center">
              <h1 className="text-4xl font-bold gradient-text">KaraokeTime</h1>
              <div className="nav-links">
                <Link to="/" className="mr-4 hover:text-neon-pink transition-colors">Home</Link>
                <Link to="/songs" className="mr-4 hover:text-neon-pink transition-colors">Songs</Link>
                <Link to="/profile" className="hover:text-neon-pink transition-colors">Profile</Link>
              </div>
            </nav>
          </header>
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/songs" element={<SongList />} />
              <Route path="/songs/recent" element={<SongList />} />
              <Route path="/player/:songId" element={<Player />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App
