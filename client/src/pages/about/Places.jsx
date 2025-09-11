import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState } from "react";

import "../../App.css";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import CarouselComponent from "../../components/Carousel/Carousel";
import Datas from "../../components/datas/Datas.json";
import FakeComp from "../../components/FakeComp";
import PageLayout from "../../components/layouts/PageLayout";
import ProjectLayout from "../../components/layouts/ProjectLayout";

export default function Places({ isNavbarHovered }) {
  const SUB = "Les villes";
  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        slides={Datas.carouselSlides.cities}
        carouselTextId={3}
      />
      <Breadcrumbs breadcrumbsnav="Qui sommes-nous ?" breadcrumbssub={SUB} />
      {/* <PageLayout title={SUB} DescriptionComponent={<FakeComp />} /> */}
      <section className="reason-section" style={{ paddingTop: "50px" }}>
        <Container className="app-container-padding">
          <Row>
            <Col>
              <div className="d-flex justify-content-center mt-4"></div>
              <h2>Les villes</h2>
              {Datas.citiesProjects.map((item) => (
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
