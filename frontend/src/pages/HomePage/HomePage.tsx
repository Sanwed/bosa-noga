import { Banner } from '../../components';
import { TopSales } from '../../features/TopSales';
import { Catalog } from '../../features/Catalog';
import { Col, Container, Row } from 'react-bootstrap';

function HomePage() {
  return (
    <Container as="main">
      <Row>
        <Col>
          <Banner />
          <TopSales />
          <Catalog />
        </Col>
      </Row>
    </Container>
  );
}

export { HomePage };
