import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Youth({ isNavbarHovered }) {
  const SUB = "Jeunesse";
  const SUBTEXT =
    "Pour lutter contre le décrochage de la jeunesse, présentons leurs d’autres horizons académiques, professionnels et de loisirs, créons des occasions de rencontres entre jeunes des villes et jeunes ruraux et travaillons avec eux à la création de projets.";
  const [currentPage, setCurrentPage] = useState(1);
  const projectsRef = useRef(null);
  const projectsPerPage = 10;

  const { isAuthenticated } = useAuth();
  const [youthProjects, setYouthProjects] = useState([]);

  useEffect(() => {
    const fetchYouthProjects = async () => {
      try {
        const headers = {};
        if (isAuthenticated) {
          const token = localStorage.getItem("token");
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        }
        const response = await fetch("http://localhost:3001/youthProjects", { headers });
        if (!response.ok) {
          const errorText = await response.text(); // Read the response as text
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setYouthProjects(data);
      } catch (error) {
        console.error("Error fetching youth projects:", error);
      }
    };

    fetchYouthProjects();
  }, [isAuthenticated]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = youthProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(youthProjects.length / projectsPerPage);

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
        category="youth"
        carouselTextId={7}
        isEditable={isAuthenticated}
      />
      <Breadcrumbs breadcrumbsnav="Les projets" breadcrumbssub={SUB} />

      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2 ref={projectsRef}>Les projets jeunesse</h2>
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
                  item={item}
                  isEditable={isAuthenticated}
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