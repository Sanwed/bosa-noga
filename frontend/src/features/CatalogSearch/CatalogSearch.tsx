import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, KeyboardEvent } from 'react';
import { setMemoizedSearch, setSearch } from './slice.ts';
import { sendCatalogRequest } from '../Catalog/slice.ts';
import { FormControl } from 'react-bootstrap';

function CatalogSearch() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.catalogSearch.search);
  const currentCategoryId = useAppSelector((state) => state.categories.currentCategoryId);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };

  const onSearch = () => {
    dispatch(setMemoizedSearch(searchValue));
    dispatch(sendCatalogRequest([currentCategoryId, false]));
  };

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <FormControl
      onKeyDown={onEnter}
      onBlur={onSearch}
      onChange={onChange}
      type="search"
      name="search"
      placeholder="Поиск"
      value={searchValue}
    />
  );
}

export { CatalogSearch };
