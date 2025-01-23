import { Categories, Loader } from '../../../shared/components';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { selectProducts } from '../model/selectors.ts';
import { useEffect } from 'react';
import { changeOffset, sendCatalogRequest } from '../model/slice.ts';
import { ProductCard } from '../../../shared/components/ProductCard';
import { selectCurrentCategory } from '../../../shared/components/Categories';

function Catalog() {
  const dispatch = useAppDispatch();
  const { products, lastLoadedProducts, loading } = useAppSelector(selectProducts);
  const currentCategory = useAppSelector(selectCurrentCategory);

  useEffect(() => {
    dispatch(sendCatalogRequest([currentCategory, false]));
  }, [dispatch, currentCategory]);

  const handleLoadMore = () => {
    dispatch(changeOffset(currentCategory));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {loading && <Loader />}
      <Categories />
      {products.length > 0 && (
        <>
          <div className="row">
            {products.map((product) => (
              <ProductCard product={product} key={'catalog' + product.id} />
            ))}
          </div>
          {lastLoadedProducts.length !== 0 && (
            <div className="text-center">
              <button onClick={handleLoadMore} className="btn btn-outline-primary">
                Загрузить ещё
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export { Catalog };
