import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

import "../../App.css";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import CarouselComponent from "../../components/Carousel/Carousel";
import FakeComp from "../../components/FakeComp";
import PageLayout from "../../components/layouts/PageLayout";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Places({ isNavbarHovered }) {
  const SUB = "Les villes";
  const { isAuthenticated } = useAuth();
  const [citiesProjects, setCitiesProjects] = useState([]);

  const fetchCitiesProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3001/places");
      setCitiesProjects(response.data);
      console.log("Fetched cities projects:", response.data);
    } catch (error) {
      console.error("Error fetching cities projects:", error);
    }
  };

  useEffect(() => {
    fetchCitiesProjects();
  }, []);

  const handleUpdatePlace = async (id, updatedPlace) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/places/${id}`,
        updatedPlace,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchCitiesProjects(); // Re-fetch data to update the list
      }
    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        category="city"
        carouselTextId={3}
        isEditable={isAuthenticated}
      />
      <Breadcrumbs breadcrumbsnav="Qui sommes-nous ?" breadcrumbssub={SUB} />
      {/* <PageLayout title={SUB} DescriptionComponent={<FakeComp />} /> */}
      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{SUB}</h2>

              {(citiesProjects || []).map((item) => (
                <ProjectLayout
                  key={item.id}
                  item={item}
                  isEditable={isAuthenticated}
                  onUpdate={handleUpdatePlace}
                />
              ))}

              <div className="d-flex justify-content-center mt-4"></div>
            </Col>{" "}
          </Row>
        </Container>
      </section>
    </>
  );
}
