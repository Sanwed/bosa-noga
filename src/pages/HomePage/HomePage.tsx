import { Banner } from '../../components';
import { TopSales } from '../../features/TopSales';
import { Catalog } from '../../features/Catalog';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>BOSA NOGA Интернет магазин обуви</title>
        <meta
          name="description"
          content="Интернет-магазин BOSA NOGA предлагает широкий ассортимент обуви для всей семьи. У нас вы найдете стильные и качественные модели"
        />
      </Helmet>
      <Container as="main">
        <Row>
          <Col>
            <Banner />
            <TopSales />
            <Catalog />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { HomePage };
