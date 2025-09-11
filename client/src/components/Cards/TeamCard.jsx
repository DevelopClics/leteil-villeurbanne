import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Row, Col } from "react-bootstrap";

import { Button } from "react-bootstrap";
import "./TeamCard.css";

export default TeamCard;

function TeamCard({ items = [] }) {
  return (
    <Row className="g-2 g-sm-2 g-lg-4">
      {items.map((item, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <div className="square-img-container">
              <Card.Img
                className="square-img"
                variant="top"
                src={`${import.meta.env.BASE_URL}${item.src}`}
                alt={item.alt}
              />
            </div>

            <Card.Body>
              <Card.Title>
                {item.surname} {item.lastname}
              </Card.Title>
              <Card.Text>
                <span style={{ fontSize: "0.75em" }}>{item.occupation}</span>
                <br />
                <span style={{ fontSize: "0.75em" }}>{item.contact}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
