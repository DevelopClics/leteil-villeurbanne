import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "../../App.css";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import CarouselComponent from "../../components/Carousel/Carousel";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Culture({ isNavbarHovered }) {
  const SUB = "Culture";
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [singleProject, setSingleProject] = useState(null);
  const navigate = useNavigate();

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
          setSingleProject(data);
        } else {
          // Fetch all culture projects
          const response = await fetch("http://localhost:3001/projects", { headers });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }
          const data = await response.json();
          setProjects(data.filter(project => project.category === "culture"));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [isAuthenticated, id]);

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
        setProjects(prevProjects =>
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
        category="culture"
        carouselTextId={5}
        isEditable={isAuthenticated}
      />
      <Breadcrumbs breadcrumbsnav="Nos projets" breadcrumbssub={SUB} />
      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{SUB}</h2>

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
                projects.map((item) => (
                  <ProjectLayout
                    key={item.id}
                    item={item}
                    isEditable={isAuthenticated}
                    onUpdate={handleUpdateProject}
                  />
                ))
              )}

              <div className="d-flex justify-content-center mt-4"></div>
            </Col>{" "}
          </Row>
        </Container>
      </section>
    </>
  );
}