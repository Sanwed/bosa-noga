import { Col, Row, Container } from 'react-bootstrap';
import { Banner } from '../../components';
import { Helmet } from 'react-helmet-async';

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена</title>
        <meta
          name="description"
          content="Страница не найдена. Пожалуйста, проверьте правильность введенного адреса или вернитесь на главную страницу."
        />
      </Helmet>
      <Container as="main">
        <Row>
          <Col>
            <Banner />
            <section>
              <h2 className="text-center">Страница не найдена</h2>
              <p>Извините, такая страница не найдена!</p>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { ErrorPage };
