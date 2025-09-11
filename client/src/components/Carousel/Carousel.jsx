import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Carousel.css";

const CarouselComponent = ({
  isNavbarHovered,
  title,
  slides,
  carouselTextId,
}) => {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const fetchCarouselText = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/carouselText/${carouselTextId}`
        );
        setText(response.data.content);
        setEditedText(response.data.content);
      } catch (error) {
        console.error("Error fetching carousel text:", error);
      }
    };
    if (carouselTextId !== undefined) {
      fetchCarouselText();
    }
  }, [carouselTextId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/carouselText/${carouselTextId}`,
        { content: editedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setText(editedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating carousel text:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  return (
    <section
      className={`hero-section ${isNavbarHovered ? "navbar-hovered" : ""} ${
        slides.length === 0 ? "empty-carousel-background" : ""
      }`}
    >
      <Carousel controls={true} indicators={true}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              src={`${import.meta.env.BASE_URL}${slide.src}`}
              alt={slide.alt}
              className="d-block w-100 hero-image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="hero-text">
        <div className="hero-title-block">
          <h1>{title}</h1>
        </div>
        <div className="hero-paragraph-block">
          {isAuthenticated && isEditing ? (
            <>
              <textarea
                className="form-control"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows="10"
              />
              <button
                className="btn btn-success mt-2"
                onClick={handleSaveClick}
              >
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
                <button
                  className="btn btn-main-blue"
                  onClick={handleEditClick}
                >
                  Modifier le texte
                </button>
              )}
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarouselComponent;