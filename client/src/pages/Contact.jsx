import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import Datas from "../components/datas/Datas.json";

import Breadcrumbscontact from "../components/breadcrumbs/Breadcrumbscontact";
import FormContact from "../components/elements/FormContact";
import CarouselComponent from "../components/Carousel/Carousel";

export default function Contact({ isNavbarHovered }) {
  const TITLE = "Nous contacter";
  const SUB = "Nous rejoindre";
  const SUBTEXT =
    "Genesia lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tationullamcorper suscipit lobortis nisl ut aliquip.";
  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        text={SUBTEXT}
        slides={Datas.carouselSlides.welcome}
      />
      <Breadcrumbscontact breadcrumbsnav={TITLE} />
      <section className="reason-section">
        <Container className="app-container-padding">
          <Row>
            <Col>
              <h2>{TITLE}</h2>
              <p>
                CONTACTLorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat.
              </p>
              <FormContact />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
