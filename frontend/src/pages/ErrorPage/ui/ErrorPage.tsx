import {Col, Row, Container} from "react-bootstrap";
import {Banner} from "../../../shared/components";

function ErrorPage() {
  return (
    <Container as="main">
      <Row>
        <Col>
          <Banner/>
          <section>
            <h2 className="text-center">Страница не найдена</h2>
            <p>Извините, такая страница не найдена!</p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export { ErrorPage };
