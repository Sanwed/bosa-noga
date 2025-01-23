import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCategories, selectCurrentCategory } from '../model/selectors.ts';
import { useEffect } from 'react';
import { changeCurrentCategory, sendCategoriesRequest } from '../model/slice.ts';
import * as style from './Categories.module.css';
import { sendCatalogRequest } from '../../../../features/Catalog/model/slice.ts';

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
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((category) => (
        <li key={category.id} className="nav-item">
          <button
            onClick={() => handleCategoryChange(category.id)}
            className={`nav-link ${category.id === currentCategoryId ? style.active : ''}`}
          >
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export { Categories };
