import { useState, useEffect } from "react";
import "../styles/admin.css";
import React from "react";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editedService, setEditedService] = useState({
    title: "",
    desc: "",
    price: "",
  });

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

  const updateServiceStatus = (id, newStatus) => {
    fetch(`http://localhost:3000/services/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive: newStatus,
      }),
    }).then(() => {
      fetchServices();
    });
  };

  const saveEditedService = (id) => {
    fetch(`http://localhost:3000/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editedService.title,
        desc: editedService.desc,
        price: editedService.price,
      }),
    }).then(() => {
      fetchServices();
      setEditingServiceId(null);
    });
  };

  return (
    <>
      <h2>Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {editingServiceId === service.id ? (
              <input
                type="text"
                value={editedService.title}
                onChange={(e) =>
                  setEditedService({ ...editedService, title: e.target.value })
                }
              />
            ) : (
              <h3>{service.title}</h3>
            )}

            {editingServiceId === service.id ? (
              <textarea
                value={editedService.desc}
                onChange={(e) =>
                  setEditedService({ ...editedService, desc: e.target.value })
                }
              ></textarea>
            ) : (
              <p>{service.desc}</p>
            )}

            {editingServiceId === service.id ? (
              <input
                type="number"
                value={editedService.price}
                onChange={(e) =>
                  setEditedService({ ...editedService, price: e.target.value })
                }
              />
            ) : (
              <p>Price: {service.price} €</p>
            )}

            <select
              value={service.isActive ? "active" : "inactive"}
              onChange={(e) =>
                updateServiceStatus(service.id, e.target.value === "active")
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {editingServiceId === service.id ? (
              <button onClick={() => saveEditedService(service.id)}>
                Save
              </button>
            ) : (
              <button onClick={() => {
                setEditingServiceId(service.id);
                setEditedService({
                  title: service.title,
                  desc: service.desc,
                  price: service.price,
                })
              }}> Edit</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminServices;
