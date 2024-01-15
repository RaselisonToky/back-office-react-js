import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AjoutMarque from "./pages/acceuil/ajoutMarque/page";
import AjoutCategorie from "./pages/acceuil/ajoutCategorie/page";
import Login from "./pages/login/page"






function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login />} /> 
          <Route path="/ajoutMarque" element={<AjoutMarque />} /> 
          <Route path="/ajoutCategorie" element={<AjoutCategorie />} /> 
          <Route path="/login" element={<Login />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
