import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import AboutUs from './components/Header/AboutUs';
import Contact from './components/Header/Contact';
import Services from './components/Header/Services';
// Importă componentele din folderul Footer (unde sunt deja)
import Reviews from './components/Footer/Reviews';
import Blog from './components/Footer/Blog';
import Policy from './components/Footer/Policy';
import Login from './components/Footer/Login'; 
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recenzii" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/politica" element={<Policy />} />
           <Route path="/login" element={<Login />} />   
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;