import { useState, useEffect } from "react";
import "../styles/admin.css";
import React from "react";
import ServiceCard from "./ServiceCard";
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

  const createService = () => {
    fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newService.title,
        desc: newService.desc,
        price: newService.price,
      }),
    }).then(() => {
      fetchServices();
      setNewService({
        title: "",
        desc: "",
        price: "",
      });
    });
  };





  return (
    <>
      <h2>Services</h2>
      <div className="services-grid">
        <h3 className="Services-adress">Add New Service</h3>

        <input type="text" 
        placeholder="Title"
        value={newService.title}
        onChange={(e) => 
          setNewService({ ...newService, title: e.target.value})
        }/>
        <textarea placeholder="Description"
        value={newService.desc}
        onChange={(e) => 
          setNewService({ ...newService, desc: e.target.value})
        }></textarea>
        <input type="number"
        placeholder="Price"
        value={newService.price}
        onChange={(e) => 
          setNewService({ ...newService, price: e.target.value})
        } />

        <button className="add-service-btn" onClick={createService}>Add Service</button>

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
