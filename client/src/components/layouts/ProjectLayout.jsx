import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../App.css";

export default function ProjectLayout({
  title,
  subtitle,
  article,
  photo,
  alt,
  size,

  contacts,
  links01,
  typelink01,
  namelink01,
  links02,
  typelink02,
  namelink02,
}) {
  return (
    <div className="mb-5 clearfix">
      <h4>{title}</h4>
      <hr />
      <div>
        <div
          className="mb-1 mb-xl-4 me-3 me-3 me-xl-5 me-xxl-5 col-sm-5 col-md-5 col-xl-4 col-xxl-5  img-fluid float-start"
          style={{ width: size + "%" }}
        >
          <LazyLoadImage
            src={`${import.meta.env.BASE_URL}${photo}`}
            alt={alt}
            effect="blur"
            width="100%"
          />
        </div>

        <h5 className="text-uppercase">{subtitle}</h5>
        <p className="lh-1 no-padding-left">{article}</p>
        <p>
          <strong>
            <span>{contacts}</span>&nbsp;
            <span>{typelink01} </span>
            <a href={links01} target="_blank">
              {namelink01}
            </a>
          </strong>
        </p>
        <p>
          <strong>
            <span>{typelink02} </span>
            <a href={links02} target="_blank">
              {namelink02}
            </a>
          </strong>
        </p>
      </div>
    </div>
  );
}
