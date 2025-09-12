import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../App.css";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import "./Team.css";
import CarouselComponent from "../../components/Carousel/Carousel";

import TeamCard from "../../components/Cards/TeamCard";
import PageLayout from "../../components/layouts/PageLayout";
import GenesisComp from "../../components/GenesisComp";
import { useAuth } from "../../context/AuthContext";

export default function Team({ isNavbarHovered }) {
  const XS = 12;
  const SM = 12;
  const MD = 6;
  const LG = 4;
  const XL = 3;
  const XXL = 2;

  const SUB = "L'équipe";

  const [teamMembers, setTeamMembers] = useState({
    office: [],
    employees: [],
    administration: [],
    instruction: [],
    scientific: [],
  });
  const [carouselSlides, setCarouselSlides] = useState([]);
  const { isAuthenticated: isLoggedIn } = useAuth();
  const [isEditable, setIsEditable] = useState(isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamMembersResponse = await fetch(
          "http://localhost:3001/teammembers"
        );
        if (!teamMembersResponse.ok) {
          throw new Error(`HTTP error! status: ${teamMembersResponse.status}`);
        }
        const teamMembersData = await teamMembersResponse.json();
        setTeamMembers(teamMembersData);

        const carouselImagesResponse = await fetch(
          "http://localhost:3001/carouselImages"
        );
        if (!carouselImagesResponse.ok) {
          throw new Error(
            `HTTP error! status: ${carouselImagesResponse.status}`
          );
        }
        const carouselImagesData = await carouselImagesResponse.json();
        setCarouselSlides(carouselImagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateTeamMember = async (category, id, updatedMember) => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await fetch(
        `http://localhost:3001/teammembers/${category}/${id}`,
        {
          method: "PUT", // or PATCH depending on your API design
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedMember),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update local state after successful API call
      setTeamMembers((prevMembers) => ({
        ...prevMembers,
        [category]: prevMembers[category].map((member) =>
          member.id === id ? updatedMember : member
        ),
      }));
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  const handleDeleteTeamMember = async (category, id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/teammembers/${category}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update local state after successful API call
      setTeamMembers((prevMembers) => ({
        ...prevMembers,
        [category]: prevMembers[category].filter((member) => member.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        slides={carouselSlides}
        carouselTextId={2}
      />
      <Breadcrumbs breadcrumbsnav="Qui sommes-nous ?" breadcrumbssub={SUB} />

      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{SUB}</h2>

              {/* OFFICE */}
              <div style={{ marginBottom: "8vh" }}>
                <h4>Bureau</h4>
                <hr />
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit.
                </p>
                <Row className="g-4">
                  <TeamCard
                    items={teamMembers.office}
                    isEditable={isEditable}
                    onUpdate={handleUpdateTeamMember}
                    onDelete={handleDeleteTeamMember}
                    category="office"
                  />
                </Row>
              </div>
              {/* END OFFICE */}
              {/* EMPLOYEES */}
              <div style={{ marginBottom: "8vh" }}>
                <h4>Employés</h4>
                <hr />
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit.
                </p>
                <Row className="g-4">
                  <TeamCard
                    items={teamMembers.employees}
                    isEditable={isEditable}
                    onUpdate={handleUpdateTeamMember}
                    onDelete={handleDeleteTeamMember}
                    category="employees"
                  />
                </Row>
              </div>
              {/* END EMPLOYEES */}
              {/* ADMINISTRATION ADVISOR */}
              <div style={{ marginBottom: "8vh" }}>
                <h4>conseil d'administration</h4>
                <hr />
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit.
                </p>
                <Row className="g-4">
                  <TeamCard
                    items={teamMembers.administration}
                    isEditable={isEditable}
                    onUpdate={handleUpdateTeamMember}
                    onDelete={handleDeleteTeamMember}
                    category="administration"
                  />
                </Row>
              </div>
              {/* END ADMINISTRATION ADVISOR*/}
              {/* INSTRUCTION COMITY */}
              <div style={{ marginBottom: "8vh" }}>
                <h4>comité d'instruction</h4>
                <hr />
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit.
                </p>
                <Row className="g-4">
                  <TeamCard
                    items={teamMembers.instruction}
                    isEditable={isEditable}
                    onUpdate={handleUpdateTeamMember}
                    onDelete={handleDeleteTeamMember}
                    category="instruction"
                  />
                </Row>
              </div>
              {/* END INSTRUCTION COMITY */}
              {/* SCIENTIFIC ADVISOR */}
              <div style={{ marginBottom: "8vh" }}>
                <h4>conseil scientifique</h4>
                <hr />
                <p className="text">
                  Lorem ipsum dolor sit amet, consectuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit.
                </p>
                <Row className="g-4">
                  <TeamCard
                    items={teamMembers.scientific}
                    isEditable={isEditable}
                    onUpdate={handleUpdateTeamMember}
                    onDelete={handleDeleteTeamMember}
                    category="scientific"
                  />
                </Row>
              </div>
              {/* END SCIENTIFIC ADVISOR*/}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
