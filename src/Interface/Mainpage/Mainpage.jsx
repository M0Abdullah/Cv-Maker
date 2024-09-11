import React from 'react';
import './Mainpage.css'; 
import cvImage from '../../UseCases/Assets/car.jpg'; // Ensure you have an image in your project
import { useNavigate } from 'react-router-dom';
export default function Mainpage() {
    const navigate = useNavigate()
    return (
    <div className="mainpage-container">
      <div className="content-container">
        <header className="header">
          <h1 className="title">Welcome to Your CV Maker</h1>
          <p className="subtitle">Craft your professional resume effortlessly</p>
        </header>
        <section className="features">
          <div className="feature-item">
            <h2>Easy to Use</h2>
            <p>Create a polished CV quickly with our intuitive interface.</p>
          </div>
          <div className="feature-item">
            <h2>Customizable Templates</h2>
            <p>Choose from a variety of designs to match your style.</p>
          </div>
          <div className="feature-item">
            <h2>Instant Download</h2>
            <p>Download your CV in multiple formats instantly.</p>
          </div>
        </section>
        <section className="cta-section">
          <button className="cta-button" onClick={()=>navigate('/Resumegenerator')} >Get Started</button>
        </section>
      </div>
   
      <div className="image-container">
        <div className="image-overlay">
          <h2 className="overlay-title">Transform Your Career Today!</h2>
          <p className="overlay-description">Start creating a professional CV that stands out from the rest.</p>
        </div>
        <img src={cvImage} alt="CV Maker" className="main-image" />
      </div>
    </div>
  );
}
