import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/services.css";
import servicesHero from "../assets/pexelsService.jpg";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setError("");

      const res = await fetch(`${API_URL}/services/active`);

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || "Services konnten nicht geladen werden.",
        );
      }

      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch services error:", err);
      setError(err.message || "Services konnten nicht geladen werden.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div
      className="services"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.82)), url(${servicesHero})`,
      }}
    >
      <h1 className="services-title">Unsere Services</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <p className="price">Preis: {service.price} €</p>

            <NavLink
              className="book-btn"
              to="/booking"
              state={{
                serviceId: service.id,
                serviceTitle: service.title,
              }}
            >
              Jetzt buchen
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
