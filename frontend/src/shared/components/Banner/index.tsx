import { Image } from 'react-bootstrap';
import bannerImage from '../../assets/banner.jpg';
import * as style from './Banner.module.css';

function Banner() {
  return (
    <div className={style.banner}>
      <Image src={bannerImage} className="img-fluid" alt="К весне готовы!" />
      <h2 className={style.bannerHeader}>К весне готовы!</h2>
    </div>
  );
}

export { Banner };
