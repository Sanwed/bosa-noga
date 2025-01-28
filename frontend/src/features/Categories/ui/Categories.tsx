import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { selectCategories, selectCurrentCategory } from '../model/selectors.ts';
import { useEffect } from 'react';
import { changeCurrentCategory, sendCategoriesRequest } from '../model/slice.ts';
import style from './Categories.module.css';
import { sendCatalogRequest } from '../../Catalog/model/slice.ts';
import {Button, Nav, NavItem, NavLink} from "react-bootstrap";

function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const currentCategoryId = useAppSelector(selectCurrentCategory);

  useEffect(() => {
    dispatch(sendCategoriesRequest());
  }, [dispatch]);

  const handleCategoryChange = (categoryId: number) => {
    dispatch(changeCurrentCategory(categoryId));
    dispatch(sendCatalogRequest([categoryId, false]));
  };

  return (
    <Nav className={`${style.catalogCategories} justify-content-center`}>
      {categories.map((category) => (
        <NavItem key={category.id}>
          <NavLink as="button"
            onClick={() => handleCategoryChange(category.id)}
            className={`${category.id === currentCategoryId ? style.active : ''}`}
          >
            {category.title}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}

export { Categories };
