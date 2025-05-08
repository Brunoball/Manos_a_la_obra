import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage"; 


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/AuthPage" element={<AuthPage />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
