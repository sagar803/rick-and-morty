import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './scenes/Home/Home';
import { Profile } from './scenes/Profile/Profile';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/character/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
