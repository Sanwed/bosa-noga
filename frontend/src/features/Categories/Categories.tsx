import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { changeCurrentCategory, sendCategoriesRequest } from './slice.ts';
import style from './Categories.module.css';
import { sendCatalogRequest } from '../Catalog/slice.ts';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { TryAgain } from '../../components';
import { TryAgainTypes } from '../../types/enums.ts';

function Categories() {
  const dispatch = useAppDispatch();
  const { categories, currentCategoryId, loading, error } = useAppSelector(
    (state) => state.categories,
  );
  const { error: catalogError } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(sendCategoriesRequest());
  }, [dispatch]);

  const handleCategoryRetry = () => {
    dispatch(sendCategoriesRequest());
    if (catalogError) {
      dispatch(sendCatalogRequest([currentCategoryId, false]));
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    dispatch(changeCurrentCategory(categoryId));
    dispatch(sendCatalogRequest([categoryId, false]));
  };

  return (
    <Nav className={`${style.catalogCategories} justify-content-center`}>
      {loading && 'Загрузка категорий...'}
      {error && (
        <TryAgain
          onClick={handleCategoryRetry}
          type={TryAgainTypes.SMALL}
          buttonText="Загрузить категории"
        />
      )}
      {!error &&
        !loading &&
        categories.map((category) => (
          <NavItem key={category.id}>
            <NavLink
              as="button"
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
