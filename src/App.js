import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './scenes/Home/Home';
import { Profile } from './scenes/Profile/Profile';
import Episode from './scenes/Episode/Episode';
import Location from './scenes/Location/Location';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episode/:id" element={<Episode />} />
          <Route path="/location/:id" element={<Location />} />
          <Route path="/character/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
