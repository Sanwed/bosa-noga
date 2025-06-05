import { Loader, TryAgain } from '../../components';
import { Categories } from '../Categories';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { changeOffset, sendCatalogRequest } from './slice.ts';
import { ProductCard } from '../../components';
import { CatalogSearch } from '../CatalogSearch';
import { Button, Container, Row } from 'react-bootstrap';
import { sendCategoriesRequest } from '../Categories/slice.ts';

interface Props {
  hasSearch?: boolean;
}

function Catalog({ hasSearch = false }: Props) {
  const dispatch = useAppDispatch();
  const { products, lastLoadedProducts, loading, loaderTop, error, loadMoreError } = useAppSelector(
    (state) => state.catalog,
  );
  const { error: categoryError } = useAppSelector((state) => state.categories);
  const memoizedSearch = useAppSelector((state) => state.catalogSearch.memoizedSearch);
  const currentCategory = useAppSelector((state) => state.categories.currentCategoryId);

  useEffect(() => {
    dispatch(sendCatalogRequest([currentCategory, false]));
  }, [dispatch, currentCategory]);

  const handleTryAgain = (loadMore: boolean) => {
    dispatch(sendCatalogRequest([currentCategory, loadMore]));
    if (categoryError) {
      dispatch(sendCategoriesRequest());
    }
  };

  const handleLoadMore = () => {
    dispatch(changeOffset(currentCategory));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {hasSearch && <CatalogSearch />}
      <Categories />
      {error && <TryAgain onClick={() => handleTryAgain(false)} />}
      {loading && loaderTop && <Loader />}
      {products.length > 0 ? (
        <>
          <Container fluid>
            <Row className="g-4 mb-4">
              {products.map((product) => (
                <ProductCard product={product} key={'catalog' + product.id} />
              ))}
            </Row>
          </Container>
          {loading && !loaderTop && <Loader />}
          {loadMoreError && (
            <TryAgain onClick={() => handleTryAgain(true)}>
              Что-то пошло не так во время загрузки товаров, попробуйте еще раз
            </TryAgain>
          )}
          {!loading && !loadMoreError && lastLoadedProducts.length >=6 && (
            <div className="text-center">
              <Button variant="outline-primary" onClick={handleLoadMore}>
                Загрузить ещё
              </Button>
            </div>
          )}
        </>
      ) : (
        !error && !loading && <p>Товаров по запросу {memoizedSearch} не найдено</p>
      )}
    </section>
  );
}

export { Catalog };
