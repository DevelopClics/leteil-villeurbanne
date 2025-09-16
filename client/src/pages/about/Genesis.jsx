import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import GenesisComp from "../../components/GenesisComp";
import PageLayout from "../../components/layouts/PageLayout";

export default function Genesis({ isNavbarHovered }) {
  const SUB = "La génèse";

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        category="genesis"
        carouselTextId={1}
      />
      <Breadcrumbs breadcrumbsnav="Qui sommes-nous ?" breadcrumbssub={SUB} />
      <PageLayout title={SUB} DescriptionComponent={<GenesisComp />} />
    </>
  );
}