import { useState, useEffect } from "react";
import "../styles/admin.css";
import React from "react";
const AdminServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = () => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
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
      <h2>Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <p>Price: {service.price} €</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminServices;
