import {Link, NavLink, useNavigate} from "react-router";
import {Image, Navbar, Container, Nav} from "react-bootstrap";
import headerLogoSrc from '../../../shared/assets/header-logo.png';
import style from './Header.module.css';

import {
  HeaderSearch,
  setSearchValue,
  setVisibility,
  selectHeaderSearchVisibility,
  selectHeaderSearchValue
} from "../../../features/HeaderSearch";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks";
import {setSearch} from "../../../features/CatalogSearch/model/slice.ts";
import {sendCatalogRequest} from "../../../features/Catalog/model/slice.ts";
import {selectCurrentCategory} from "../../../features/Categories";

const paths = [
  {link: '/', name: 'Главная'},
  {link: '/catalog', name: 'Каталог'},
  {link: '/about', name: 'О магазине'},
  {link: '/contacts', name: 'Контакты'},
]

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearchVisible = useAppSelector(selectHeaderSearchVisibility)
  const currentCategory = useAppSelector(selectCurrentCategory);
  const searchValue = useAppSelector(selectHeaderSearchValue);

  const showSearchForm = () => {
    dispatch(setVisibility(true));
  }

  const search = () => {
    navigate("/catalog");
    dispatch(setSearch(searchValue));
    dispatch(sendCatalogRequest([currentCategory, false]))
    dispatch(setSearchValue(""))
    dispatch(setVisibility(false));
  }

  const onSearchClick = () => {
    if (!isSearchVisible) {
      showSearchForm();
    } else if (isSearchVisible && searchValue === "") {
      dispatch(setVisibility(false));
    } else if (isSearchVisible && searchValue !== "") {
      search();
    }
  }

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
                <div onClick={onSearchClick} className={`${style.headerControlsPic} ${style.headerControlsSearch}`}>
                  {isSearchVisible && <HeaderSearch/>}
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