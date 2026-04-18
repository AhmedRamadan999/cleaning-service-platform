import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/services.css";
import { useState, useEffect } from "react";
export default function Services() {
 
  //  const servicesData = [
  //   {
  //     id: 1,
  //     title: "Haushaltsreinigung",
  //     desc: "Regelmäßige wöchentliche Reinigung für Ihr Zuhause.",
  //     price: 49,
  //   },

  //   {
  //     id: 2,
  //     title: "Grundreinigung",
  //     desc: "Intensive Reinigung für Küche und Badezimmer.",
  //     price: 99,
  //   },

  //   {
  //     id: 3,
  //     title: "Büroreinigung",
  //     desc: "Professionelle Reinigung für Büros und Arbeitsplätze.",
  //     price: 69,
  //   },
  // ];
  const [services, setServices] = useState([]);
const API_URL = import.meta.env.VITE_API_URL;
  const fetchServices = () => {
    fetch(`${API_URL}/services/active`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      <div className="services">
        <h1 className="services-title">Unsere Services</h1>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <p className="price">Preis: {service.price} €</p>
              <NavLink
                className="book-btn"
                to="/booking"
                state={{ serviceId: service.id, serviceTitle: service.title }}
              >
                Jetzt buchen
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
