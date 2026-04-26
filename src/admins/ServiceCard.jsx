import React from "react";

const ServiceCard = ({
  service,
  editingServiceId,
  setEditingServiceId,
  editedService,
  setEditedService,
  updateServiceStatus,
  saveEditedService,
}) => {
  return (
    <div className="admin-service-card">
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
        <button
          className="save-btn"
          onClick={() => saveEditedService(service.id)}
        >
          Save
        </button>
      ) : (
        <button
          className="edit-btn"
          onClick={() => {
            setEditingServiceId(service.id);
            setEditedService({
              title: service.title,
              desc: service.desc,
              price: service.price,
            });
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default ServiceCard;
