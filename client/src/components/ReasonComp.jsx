import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export default function ReasonComp() {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [reasonText, setReasonText] = useState("");
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const fetchReasonText = async () => {
      try {
        const response = await axios.get("http://localhost:3001/reasonText/1");
        setReasonText(response.data.content);
        setEditedText(response.data.content);
      } catch (error) {
        console.error("Error fetching reason text:", error);
      }
    };
    fetchReasonText();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3001/reasonText/1",
        { content: editedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReasonText(editedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating reason text:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(reasonText);
  };

  return (
    <>
      {isAuthenticated && isEditing ? (
        <>
          <textarea
            className="form-control"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows="10" // Adjust rows as needed
          />
          <button className="btn btn-success mt-2" onClick={handleSaveClick}>
            Enregistrer
          </button>
          <button
            className="btn btn-secondary mt-2 ms-2"
            onClick={handleCancelClick}
          >
            Annuler
          </button>
        </>
      ) : (
        <p>
          {isAuthenticated && (
            <button className="btn btn-main-blue" onClick={handleEditClick}>
              Modifier le texte
            </button>
          )}
          {reasonText}
        </p>
      )}
    </>
  );
}
