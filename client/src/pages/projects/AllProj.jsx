import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import "./AllProj.css";
import TeamCard from "../../components/Cards/TeamCard";

import EditableTitle from "../../components/EditableTitle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AllProj({ isNavbarHovered }) {
  const XS = 12;
  const SM = 12;
  const MD = 6;
  const LG = 4;
  const XL = 3;
  const XXL = 3;
  const IMGPATH = "/images/photos/carousel/projects/";
  const SUB = "Tous les projets";

  const { isAuthenticated } = useAuth();
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const headers = {};
        if (isAuthenticated) {
          const token = localStorage.getItem("token");
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        }
        const response = await fetch("http://localhost:3001/allProjects", {
          headers,
        });
        if (!response.ok) {
          const errorText = await response.text(); // Read the response as text
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }
        const data = await response.json();
        setAllProjects(data);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };

    fetchAllProjects();
  }, [isAuthenticated]);

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        category="projects"
        carouselTextId={4}
        isEditable={isAuthenticated}
      />

      <Breadcrumbs breadcrumbsnav="Les projets" breadcrumbssub={SUB} />
      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{SUB}</h2>
              <Row className="g-4">
                {allProjects.map((item, index) => (
                  <Col
                    key={item.id}
                    xs={XS}
                    sm={SM}
                    md={MD}
                    lg={LG}
                    xl={XL}
                    xxl={XXL}
                  >
                    <div className="square-img-container">
                      <div className="project-category-label">
                        {item.category}
                      </div>

                      <LazyLoadImage
                        wrapperClassName="square-img"
                        src={`${import.meta.env.BASE_URL}${item.src}`}
                        alt={item.alt}
                        effect="blur"
                        width="100%"
                        height="100%"
                      />
                      <div className="project-info-box">
                        <h4 className="project-info-title">{item.title}</h4>
                        <p className="project-info-text">{item.text}</p>
                      </div>
                    </div>
                  </Col>
                ))}

                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Alimentation</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}

                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Culture</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}

                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Economie</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}

                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  {" "}
                  <div className="square-img-container">
                    <div className="project-category-label">Jeunesse</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Alimentation</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Alimentation</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Alimentation</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={XS} sm={SM} md={MD} lg={LG} xl={XL} xxl={XXL}>
                  <div className="square-img-container">
                    <div className="project-category-label">Culture</div>
                    <img
                      src="/images/photos/carousel/projects/AdobeStock_318346130.jpeg"
                      alt="Logo"
                      className="square-img"
                    />
                    <div className="project-info-box">
                      <h4 className="project-info-title">LE TITRE DU PROJET</h4>
                      <p className="project-info-text">
                        Un tout petit descriptif vraiment pas long du tout
                      </p>
                    </div>
                  </div>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
