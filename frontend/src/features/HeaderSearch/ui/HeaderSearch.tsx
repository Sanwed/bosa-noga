import style from "./HeaderSearch.module.css";
import {useAppSelector, useAppDispatch} from "../../../shared/hooks";
import {selectHeaderSearchValue} from "../model/selectors.ts";
import {ChangeEvent, useEffect, useRef} from "react";
import {setSearchValue, setVisibility} from "../model/slice.ts";

function HeaderSearch() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectHeaderSearchValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  }

  return (
    <form onClick={(event) => event.stopPropagation()} data-id="search-form" className={`${style.headerControlsSearchForm} form-inline`}>
      <input ref={inputRef} onChange={onChange} type="search" className={style.formControl}
             placeholder="Поиск" value={searchValue}/>
    </form>
  )
}

export {HeaderSearch}