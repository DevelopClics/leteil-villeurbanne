import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../App.css";

export default function PageLayout({ title, DescriptionComponent }) {
  return (
    <>
      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{title}</h2>

              {DescriptionComponent}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
