import { Link } from 'react-router';
import { Image, Navbar, Container, Nav } from 'react-bootstrap';
import headerLogoSrc from '../../assets/header-logo.png';
import { NavList } from '../../components';
import style from './Header.module.css';
import { MainSearch } from '../../features/MainSearch';
import { useAppSelector } from '../../hooks';

function Header() {
  const paths = [
    { link: '/', name: 'Главная' },
    { link: '/catalog/', name: 'Каталог' },
    { link: '/about/', name: 'О магазине' },
    { link: '/contacts/', name: 'Контакты' },
  ];

  const totalCount = useAppSelector((state) => state.cart.totalCount);

  return (
    <header>
      <Navbar expand="md" variant="light" className="bg-light">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Image src={headerLogoSrc} alt="Bosa Noga" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="header-nav" />
          <Navbar.Collapse id="header-nav">
            <Nav style={{ marginRight: 'auto' }}>
              <NavList paths={paths} />
            </Nav>
            <div className={style.headerControlsPics}>
              <MainSearch className={`${style.headerControlsPic} ${style.headerControlsSearch}`} />
              <Link to="/cart/">
                <div className={`${style.headerControlsPic} ${style.headerControlsCart}`}>
                  {totalCount > 0 && (
                    <div className={`${style.headerControlsCartFull}`}>{totalCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export { Header };
