import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import "../App.css";

import CarouselComponent from "../components/Carousel/Carousel";

import Datas from "../components/datas/Datas.json";
import Reason from "../components/ReasonComp";
import PageLayout from "../components/layouts/PageLayout";
import ReasonComp from "../components/ReasonComp";

export default function Home({ isNavbarHovered }) {
  const SUB = "notre raison d'être";

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        slides={Datas.carouselSlides.welcome}
        carouselTextId={0}
      />
      {/* <ReasonComp title="NOTRE RAISON D'ÊTRE" /> */}
      <PageLayout title={SUB} DescriptionComponent={<ReasonComp />} />
    </>
  );
}
