import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export default function GenesisComp() {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [genesisText, setGenesisText] = useState("");
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    const fetchGenesisText = async () => {
      try {
        const response = await axios.get("http://localhost:3001/genesisText/1");
        setGenesisText(response.data.content);
        setEditedText(response.data.content);
      } catch (error) {
        console.error("Error fetching genesis text:", error);
      }
    };
    fetchGenesisText();
  }, [isAuthenticated]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    console.log("Attempting to save..."); // Add this line
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3001/genesisText/1",
        { content: editedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGenesisText(editedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating genesis text:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(genesisText);
  };

  return (
    <>
      {isAuthenticated && isEditing ? (
        <>
          <textarea
            className="form-control"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows="20" // Adjust rows as needed
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
          {genesisText}
        </p>
      )}
    </>
  );
}
