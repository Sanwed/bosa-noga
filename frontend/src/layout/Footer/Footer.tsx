import { Col, Container, Nav, Row } from 'react-bootstrap';
import style from './Footer.module.css';
import { NavList } from '../../components';

function Footer() {
  const paths = [
    { link: '/about', name: 'О магазине' },
    { link: '/catalog', name: 'Каталог' },
    { link: '/contacts', name: 'Контакты' },
  ];

  return (
    <footer className="bg-light">
      <Container className={style.footer}>
        <Row>
          <Col>
            <section>
              <h5>Информация</h5>
              <Nav className="flex-column">
                <NavList paths={paths} />
              </Nav>
            </section>
          </Col>
          <Col>
            <section>
              <h5>Принимаем к оплате</h5>
              <div className={style.footerPay}>
                <div className={`${style.footerPaySystems} ${style.footerPaySystemsPaypal}`}></div>
                <div
                  className={`${style.footerPaySystems} ${style.footerPaySystemsMasterCard}`}
                ></div>
                <div className={`${style.footerPaySystems} ${style.footerPaySystemsVisa}`}></div>
                <div className={`${style.footerPaySystems} ${style.footerPaySystemsYandex}`}></div>
                <div
                  className={`${style.footerPaySystems} ${style.footerPaySystemsWebmoney}`}
                ></div>
                <div className={`${style.footerPaySystems} ${style.footerPaySystemsQiwi}`}></div>
              </div>
            </section>
            <section>
              <div className={style.footerCopyright}>
                2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. Все права
                защищены.
                <br />
                Доставка по всей России!
              </div>
            </section>
          </Col>
          <Col>
            <section className={style.footerContacts}>
              <h5>Контакты</h5>
              <a href="tel:+7-495-790-35-03" className={style.footerContactsPhone}>
                +7 495 79 03 5 03
              </a>
              <span>Ежедневно: с 09-00 до 21-00</span>
              <a href="mailto:office@bosanoga.ru" className={style.footerContactsEmail}>
                office@bosanoga.ru
              </a>
              <div className={style.footerSocialLinks}>
                <div className={`${style.footerSocialLink} ${style.footerSocialLinkTwitter}`}></div>
                <div className={`${style.footerSocialLink} ${style.footerSocialLinkVk}`}></div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export { Footer };
