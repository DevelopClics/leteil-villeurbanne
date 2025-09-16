import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import GenesisComp from "../../components/GenesisComp";
import PageLayout from "../../components/layouts/PageLayout";
import FakeComp from "../../components/FakeComp";

export default function DropProject({ isNavbarHovered }) {
  const SUB = "Déposer un projet";

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        category="projects"
        carouselTextId={1}
      />
      <Breadcrumbs breadcrumbsnav="Qui sommes-nous ?" breadcrumbssub={SUB} />
      <PageLayout title={SUB} DescriptionComponent={<FakeComp />} />
    </>
  );
}