import { Loader, TryAgain } from '../../components';
import style from './TopSales.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendTopSalesRequest } from './slice.ts';
import { ProductCard } from '../../components';
import { Row } from 'react-bootstrap';

function TopSales() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(sendTopSalesRequest());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(sendTopSalesRequest());
  };

  return (
    <section className={style.topSales}>
      <h2 className="text-center">Хиты продаж</h2>
      {error && <TryAgain onClick={handleRetry} />}
      {loading && <Loader />}
      <Row className="g-4">
        {products.length > 0 &&
          products.map((product) => <ProductCard key={product.id} product={product} />)}
      </Row>
    </section>
  );
}

export { TopSales };
