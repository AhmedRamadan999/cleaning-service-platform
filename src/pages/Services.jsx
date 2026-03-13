import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/services.css"

export default function Service() {
  const servicesData = [
    {
      id: 1,
      title: "Haushaltsreinigung",
      desc: "Regelmäßige wöchentliche Reinigung für Ihr Zuhause.",
      price: 49,
    },

    {
      id: 2,
      title: "Grundreinigung",
      desc: "Intensive Reinigung für Küche und Badezimmer.",
      price: 99,
    },

    {
      id: 3,
      title: "Büroreinigung",
      desc: "Professionelle Reinigung für Büros und Arbeitsplätze.",
      price: 69,
    },
  ];

  return (
    <>
    <div className="services">
      <h1 className="services-title">Unsere Services</h1>
      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <p className="price">Preis: {service.price} €</p>
            <NavLink className= "book-btn" to="/booking">Jetzt buchen</NavLink>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
