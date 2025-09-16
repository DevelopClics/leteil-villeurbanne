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

  useEffect(() => {
    const fetchCitiesProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/citiesProjects");
        setCitiesProjects(response.data);
      } catch (error) {
        console.error("Error fetching cities projects:", error);
      }
    };

    fetchCitiesProjects();
  }, []);

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
                  title={item.title}
                  photo={item.photo}
                  alt={item.alt}
                  size={item.size}
                  subtitle={item.subtitle}
                  article={item.article}
                  contacts={item.contacts}
                  links01={item.links01}
                  typelink01={item.typelink01}
                  namelink01={item.namelink01}
                  links02={item.links02}
                  typelink02={item.typelink02}
                  namelink02={item.namelink02}
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