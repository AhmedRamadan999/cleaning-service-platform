import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import ServiceCard from "./ServiceCard";
import { API_URL } from "../config/api";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [newService, setNewService] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const [editedService, setEditedService] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();

      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setServices([]);
    }
  };

  const updateServiceStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/services/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: newStatus,
        }),
      });

      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  const saveEditedService = async (id) => {
    try {
      await fetch(`${API_URL}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedService.title,
          desc: editedService.desc,
          price: editedService.price,
        }),
      });

      fetchServices();
      setEditingServiceId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const createService = async () => {
    if (!newService.title || !newService.desc || !newService.price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newService.title,
          desc: newService.desc,
          price: newService.price,
        }),
      });

      fetchServices();

      setNewService({
        title: "",
        desc: "",
        price: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <h2>Services</h2>

      <h3 className="Services-adress">Add New Service</h3>

      <div className="add-service-form">
        <input
          type="text"
          placeholder="Title"
          value={newService.title}
          onChange={(e) =>
            setNewService({
              ...newService,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          value={newService.desc}
          onChange={(e) =>
            setNewService({
              ...newService,
              desc: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) =>
            setNewService({
              ...newService,
              price: e.target.value,
            })
          }
        />

        <button className="add-service-btn" onClick={createService}>
          Add Service
        </button>
      </div>

      <div className="admin-services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            editingServiceId={editingServiceId}
            setEditingServiceId={setEditingServiceId}
            editedService={editedService}
            setEditedService={setEditedService}
            updateServiceStatus={updateServiceStatus}
            saveEditedService={saveEditedService}
          />
        ))}
      </div>
    </>
  );
};

export default AdminServices;
