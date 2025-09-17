import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Food({ isNavbarHovered }) {
  const SUB = "Alimentation";
  const SUBTEXT =
    "Favorisons une production et une consommation alimentaire saine, responsable de l’environnement, qui fonctionne en circuit court, qui prend soin des producteurs et qui est accessible aux plus précaires.";
  const [currentPage, setCurrentPage] = useState(1);
  const projectsRef = useRef(null);
  const projectsPerPage = 10;

  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [foodProjects, setFoodProjects] = useState([]);
  const [singleProject, setSingleProject] = useState(null);
  const navigate = useNavigate();

  console.log('id:', id, 'singleProject:', singleProject);

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

        if (id) {
          // Fetch single project
          const response = await fetch(`http://localhost:3001/projects/${id}`, { headers });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }
          const data = await response.json();
          console.log('Fetched single project data:', data);
          setSingleProject(data);
        } else {
          // Fetch all food projects
          const response = await fetch("http://localhost:3001/projects", { headers });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }
          const data = await response.json();
          setFoodProjects(data.filter(project => project.category === "food"));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [isAuthenticated, id]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = foodProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(foodProjects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    projectsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateProject = async (projectId, updatedData) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (isAuthenticated) {
        const token = localStorage.getItem("token");
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
      const response = await fetch(`http://localhost:3001/projects/${projectId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const updatedProject = await response.json();

      // Update the single project state if in single view
      if (id) {
        setSingleProject(updatedProject);
      } else {
        // Update the list of projects if in list view
        setFoodProjects(prevProjects =>
          prevProjects.map(project =>
            project.id === projectId ? updatedProject : project
          )
        );
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        text={SUBTEXT}
        category="food"
        carouselTextId={6}
        isEditable={isAuthenticated}
      />
      <Breadcrumbs breadcrumbsnav="Les projets" breadcrumbssub={SUB} />

      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2 ref={projectsRef}>Les projets alimentation</h2>
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

              {id && singleProject ? (
                <ProjectLayout
                  key={singleProject.id}
                  item={singleProject}
                  isEditable={isAuthenticated}
                  onBackClick={() => navigate('/all-projects')}
                  backButtonText="Revenir à tous les projets"
                  onUpdate={handleUpdateProject}
                />
              ) : (
                currentProjects.map((item) => (
                  <ProjectLayout
                    key={item.id}
                    item={item}
                    isEditable={isAuthenticated}
                    onUpdate={handleUpdateProject}
                  />
                ))
              )}
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
