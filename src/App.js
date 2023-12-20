import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterGrid from './components/CharacterGrid';
import CharacterProfile from './components/CharacterProfile';
import { Home } from './scenes/Home/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
