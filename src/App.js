import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AjoutMarque from "./pages/acceuil/ajoutMarque/page";
import AjoutCategorie from "./pages/acceuil/ajoutCategorie/page";
import Login from "./pages/login/page"
import AjoutModel from "./pages/acceuil/ajoutModel/page"
import ListeMarque from "./pages/acceuil/ListeMarque/page"
import ListeCategories from './pages/acceuil/ListeCategories/page';
import ListeModel from './pages/acceuil/ListeModel/page'




function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login />} /> 
          <Route path="/ajoutMarque" element={<AjoutMarque />} /> 
          <Route path="/ajoutCategorie" element={<AjoutCategorie />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/ajoutModel" element={<AjoutModel />} /> 
          <Route path="/listeMarque" element={<ListeMarque />} /> 
          <Route path="/listeCategories" element={<ListeCategories />} /> 
          <Route path="/listeModel" element={<ListeModel />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
