import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import "../../App.css";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import CarouselComponent from "../../components/Carousel/Carousel";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Culture({ isNavbarHovered }) {
  const SUB = "Culture";
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const headers = {};
        if (isAuthenticated) {
          const token = localStorage.getItem("token");
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        }
        const response = await fetch("http://localhost:3001/cultureProjects", { headers });
        if (!response.ok) {
          const errorText = await response.text(); // Read the response as text
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [isAuthenticated]);

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        category="culture"
        carouselTextId={5}
      />
      <Breadcrumbs breadcrumbsnav="Nos projets" breadcrumbssub={SUB} />
      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{SUB}</h2>

              {projects.map((item) => (
                <ProjectLayout
                  key={item.id}
                  title={item.title}
                  photo={item.src}
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