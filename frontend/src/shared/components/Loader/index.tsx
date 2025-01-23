import * as style from './Loader.module.css';

function Loader() {
  return (
    <div className={style.preloader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export { Loader };
