import React, { useState } from "react";
import "../styles/home.css";
import pexels from "../assets/pexels.jpg";
import beforeRoom from "../assets/before_room.png";
import afterRoom from "../assets/after_room.png";
import ahmedImg from "../assets/Ahmed.jpeg";
import issaImg from "../assets/issa.jpg";
import mohammedImg from "../assets/mohammed.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const submitRating = () => {
    if (rating === 0) {
      alert("Bitte Bewertung auswählen");
      return;
    }

    const newReview = {
      stars: rating,
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    setRating(0);
  };
  return (
    <div className="home-layout">
      <div className="home-content">
        {/* HERO */}
        <section className="hero">
          <img src={pexels} alt="cleaning" />
          <div className="hero-text">
            <h1>Professional Cleaning Service</h1>
            <Link to="/services" className="btn">
              Jetzt Service wählen
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services">
          <h2>Unsere Services</h2>

          <div className="services-grid">
            <div className="service-card">
              <h3>Hausreinigung</h3>
              <p>Professionelle Reinigung für Ihr Zuhause.</p>
            </div>

            <div className="service-card">
              <h3>Büroreinigung</h3>
              <p>Saubere Büros sorgen für produktives Arbeiten.</p>
            </div>

            <div className="service-card">
              <h3>Fensterreinigung</h3>
              <p>Kristallklare Fenster ohne Streifen.</p>
            </div>
          </div>
        </section>

        {/* BEFORE AFTER */}
        <section className="before-after">
          <h2>Vorher / Nachher</h2>

          <div className="before-after-grid">
            <div className="box">
              <h4>Vorher</h4>
              <img src={beforeRoom} alt="Before rom" />
            </div>

            <div className="box">
              <h4>Nachher</h4>
              <img src={afterRoom} alt="After rom" />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}

        <section className="testimonials">
          <h2>Kundenbewertungen</h2>

          <div className="rating-system">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ⭐
              </span>
            ))}

            <p>Ihre Bewertung: {rating} / 5</p>
            <button onClick={submitRating} className="rate-btn">
              Bewertung senden
            </button>
          </div>
        </section>

        {/* TEAM */}
        <section className="team">
          <h2>Unser Team</h2>

          <div className="team-container">
            <div className="member">
              <img src={issaImg} alt="Issa" />
              <h3>Issa Hamadi</h3>
              <p className="role">Teamleiter</p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>

            <div className="member">
              <img src={ahmedImg} alt="Ahmed" />
              <h3>Ahmed</h3>
              <p className="role">Chef</p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
            <div className="member">
              <img src={mohammedImg} alt="Mohammed" />
              <h3>Mohammed</h3>
              <p className="role">Project Managment</p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
