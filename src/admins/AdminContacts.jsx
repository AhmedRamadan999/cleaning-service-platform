import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import { API_URL } from "../config/api";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      setError("");

      const res = await fetch(`${API_URL}/contact`);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || "Contact messages konnten nicht geladen werden.",
        );
      }

      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("FETCH CONTACTS ERROR:", err);
      setError(err.message);
      setContacts([]);
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Contact konnte nicht gelöscht werden.");
      }

      fetchContacts();
    } catch (err) {
      console.log("DELETE CONTACT ERROR:", err);
      setError(err.message);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/contact/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Status konnte nicht geändert werden.");
      }

      fetchContacts();
    } catch (err) {
      console.log("UPDATE CONTACT STATUS ERROR:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <h2>Contact Messages</h2>

      {error && <p className="booking-error">{error}</p>}

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
