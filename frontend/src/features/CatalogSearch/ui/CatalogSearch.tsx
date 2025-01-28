import {useAppDispatch, useAppSelector} from "../../../shared/hooks";
import {selectSearchValue} from "../model/selectors.ts";
import {ChangeEvent, KeyboardEvent} from "react";
import {setSearch} from "../model/slice.ts";
import {selectCurrentCategory} from "../../Categories";
import {sendCatalogRequest} from "../../Catalog/model/slice.ts";
import {FormControl} from "react-bootstrap";

function CatalogSearch() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);
  const currentCategoryId = useAppSelector(selectCurrentCategory);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  }

  const onSearch = () => {
    dispatch(sendCatalogRequest([currentCategoryId, false]));
  }

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  return (
    <FormControl onKeyDown={onEnter} onBlur={onSearch} onChange={onChange} type="search" name="search"
                 placeholder="Поиск" value={searchValue}/>
  )
}

export {CatalogSearch};
