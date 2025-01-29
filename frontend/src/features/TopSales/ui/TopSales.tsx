import { Loader } from '../../../shared/components';
import * as style from './TopSales.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { selectTopSales } from '../model/selectors.ts';
import { sendTopSalesRequest } from '../model/slice.ts';
import { ProductCard } from '../../../shared/components/ProductCard';

function TopSales() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(selectTopSales);

  useEffect(() => {
    dispatch(sendTopSalesRequest());
  }, [dispatch]);

  if (!loading && products.length === 0) return;

  return (
    <section className={style.topSales}>
      <h2 className="text-center">Хиты продаж</h2>
      {loading && <Loader />}
      <div className="row g-4">
        {products.length > 0 &&
          products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

export { TopSales };
