import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import { API_URL } from "../config/api";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/contact`);
      const data = await res.json();

      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setContacts([]);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
      });

      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/contact/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <h2>Contact Messages</h2>

      <div className="bookings-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="booking-card">
            <h3>{contact.name}</h3>

            <p>Email: {contact.email}</p>
            <p>Subject: {contact.subject}</p>
            <p>Message: {contact.message}</p>

            <p>
              Status:{" "}
              <span
                className={
                  contact.status === "replied"
                    ? "status-done"
                    : "status-pending"
                }
              >
                {contact.status === "replied" ? "Replied" : "Pending"}
              </span>
            </p>

            <div className="card-buttons">
              {contact.status !== "replied" && (
                <button
                  className="btn-accept"
                  onClick={() => updateStatus(contact.id, "replied")}
                >
                  Mark as Replied
                </button>
              )}

              <button
                className="btn-delete"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminContacts;
