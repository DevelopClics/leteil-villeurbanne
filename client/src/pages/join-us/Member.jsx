import { useState, useEffect } from "react";
import "../../App.css";
import CarouselComponent from "../../components/Carousel/Carousel";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import FakeComp from "../../components/FakeComp";
import PageLayout from "../../components/layouts/PageLayout";

export default function Member({ isNavbarHovered }) {
  const SUB = "Devenir membre";
  const SUBTEXT =
    "Membero lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tationullamcorper suscipit lobortis nisl ut aliquip.";

  return (
    <>
      <CarouselComponent
        isNavbarHovered={isNavbarHovered}
        title={SUB}
        text={SUBTEXT}
        category="member"
      />

      <Breadcrumbs breadcrumbsnav="Nous rejoindre" breadcrumbssub={SUB} />

      <PageLayout title={SUB} DescriptionComponent={<FakeComp />} />
    </>
  );
}