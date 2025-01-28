import {Link, NavLink} from "react-router";
import {Col, Image, Navbar, Row, Container, Nav} from "react-bootstrap";
import headerLogoSrc from '../../../shared/assets/header-logo.png';
import style from './Header.module.css';

const paths = [
  {link: '/', name: 'Главная'},
  {link: '/catalog', name: 'Каталог'},
]

function Header() {
  return (
    <header>
      <Navbar expand="sm" variant="light" className="bg-light">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Image src={headerLogoSrc} alt="Bosa Noga"/>
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav style={{marginRight: 'auto'}}>
              {paths.map((path, index) => (
                <Nav.Item key={index}>
                  <NavLink to={path.link} className={({isActive}) => isActive ? "active" : ""}>
                    {({isActive}) => (
                      <Nav.Link as="span" active={isActive}>
                        {path.name}
                      </Nav.Link>
                    )}
                  </NavLink>
                </Nav.Item>
              ))}
            </Nav>
            <div>
              <div className={style.headerControlsPics}>
                <div className={`${style.headerControlsPic} ${style.headerControlsSearch}`}>
                  <form data-id="search-form" className={`${style.headerControlsSearchForm} form-inline`}>
                    <input type="search" className={style.formControl} placeholder="Поиск"/>
                  </form>
                </div>
                <div className={`${style.headerControlsPic} ${style.headerControlsCart}`}>
                  <div className={`${style.headerControlsCartFull}`}>1</div>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export {Header};