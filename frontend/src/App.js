import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import AuthPage from './components/AuthPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} onLogin={setUser} />} />
        <Route path="/auth" element={<AuthPage onLogin={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
