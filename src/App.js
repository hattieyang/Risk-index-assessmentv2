import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from "./pages/Category"; 
import ToxicGas from "./pages/ToxicGas"; 
import PersonnelAuth from "./pages/PersonnelAuth"; 
import MajorHazard from "./pages/MajorHazard"; 
import FormulasandReferences from "./pages/FormulasandReferences"; 
import MajorHazardRanking from "./pages/MajorHazardRanking"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category"  element={<Category />}/>
            <Route path="/toxic-gas"  element={<ToxicGas />}/>
            <Route path="/personnel-auth" element={<PersonnelAuth/>}/>
            <Route path="/major-hazard"  element={<MajorHazard/>}/>
            <Route path="/FormulasandReferences" element={<FormulasandReferences/>}/>
            <Route path="/major-hazard-ranking" element={<MajorHazardRanking/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
