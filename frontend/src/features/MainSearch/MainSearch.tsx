import style from './MainSearch.module.css';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { ChangeEvent, useEffect, useRef } from 'react';
import { setSearchValue, setVisibility } from './slice.ts';
import { useNavigate } from 'react-router';
import { setSearch } from '../CatalogSearch/slice.ts';
import { sendCatalogRequest } from '../Catalog/slice.ts';

interface Props {
  className?: string;
}

function MainSearch({ className = '' }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearchVisible = useAppSelector((state) => state.mainSearch.isVisible);
  const currentCategoryId = useAppSelector((state) => state.categories.currentCategoryId);
  const searchValue = useAppSelector((state) => state.mainSearch.searchValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchVisible) {
      inputRef.current?.focus();
    }
  }, [isSearchVisible]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  const onSearch = () => {
    if (!isSearchVisible) {
      dispatch(setVisibility(true));
    } else if (isSearchVisible && searchValue === '') {
      dispatch(setVisibility(false));
    } else if (isSearchVisible && searchValue !== '') {
      navigate('/catalog/');
      dispatch(setSearch(searchValue));
      dispatch(sendCatalogRequest([currentCategoryId, false]));
      dispatch(setSearchValue(''));
      dispatch(setVisibility(false));
    }
  };

  return (
    <button tabIndex={0} className={`${className} ${style.mainSearch}`} onClick={onSearch}>
      {isSearchVisible && (
        <form
          onClick={(event) => event.stopPropagation()}
          className={`${style.headerControlsSearchForm} form-inline`}
        >
          <input
            ref={inputRef}
            onChange={onChange}
            type="search"
            className={style.formControl}
            placeholder="Поиск"
            value={searchValue}
          />
        </form>
      )}
    </button>
  );
}

export { MainSearch };
