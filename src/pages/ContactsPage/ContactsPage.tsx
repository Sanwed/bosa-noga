import { Col, Container, Row } from 'react-bootstrap';
import { Banner } from '../../components';
import { Helmet } from 'react-helmet-async';

function ContactsPage() {
  return (
    <>
      <Helmet>
        <title>Контакты</title>
        <meta
          name="description"
          content="Контакты. Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W Plaza."
        />
        <link rel="canonical" href="/contacts" />
      </Helmet>

      <Container as="main">
        <Row>
          <Col>
            <Banner />
            <section>
              <h2 className="text-center">Контакты</h2>
              <p>
                Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17,
                бизнес-центр W Plaza.
              </p>
              <h5 className="text-center">Координаты для связи:</h5>
              <p>
                Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a> (ежедневно: с 09-00 до
                21-00)
              </p>
              <p>
                Email: <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
              </p>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { ContactsPage };
