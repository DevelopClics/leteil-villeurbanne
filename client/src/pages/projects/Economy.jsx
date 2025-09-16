import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Economy({ isNavbarHovered }) {
  const SUB = "Economie";
  const SUBTEXT =
    "Travaillons à remodeler nos modèles économiques en encourageant le réemploi, la mutualisation des forces et des biens, les circuits-courts, le transfert de compétences… tout en cherchant à solidifier les emplois de chacun.";
  const [currentPage, setCurrentPage] = useState(1);
  const projectsRef = useRef(null);
  const projectsPerPage = 10;

  const { isAuthenticated } = useAuth();
  const [economyProjects, setEconomyProjects] = useState([]);

  useEffect(() => {
    const fetchEconomyProjects = async () => {
      try {
        const headers = {};
        if (isAuthenticated) {
          const token = localStorage.getItem("token");
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        }
        const response = await fetch("http://localhost:3001/economyProjects", { headers });
        if (!response.ok) {
          const errorText = await response.text(); // Read the response as text
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setEconomyProjects(data);
      } catch (error) {
        console.error("Error fetching economy projects:", error);
      }
    };

    fetchEconomyProjects();
  }, [isAuthenticated]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = economyProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(economyProjects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    projectsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        text={SUBTEXT}
        category="economy"
        carouselTextId={8}
        isEditable={isAuthenticated}
      />
      <Breadcrumbs breadcrumbsnav="Les projets" breadcrumbssub={SUB} />

      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2 ref={projectsRef}>Les projets économiques</h2>
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>

              {currentProjects.map((item) => (
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
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </Col>{" "}
          </Row>
        </Container>
      </section>
    </>
  );
}