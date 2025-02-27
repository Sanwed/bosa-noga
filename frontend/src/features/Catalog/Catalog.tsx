import { Loader } from '../../components';
import { Categories } from '../Categories';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { changeOffset, sendCatalogRequest } from './slice.ts';
import { ProductCard } from '../../components';
import { CatalogSearch } from '../CatalogSearch';
import { Button, Container, Row } from 'react-bootstrap';

interface Props {
  hasSearch?: boolean;
}

function Catalog({ hasSearch = false }: Props) {
  const dispatch = useAppDispatch();
  const { products, lastLoadedProducts, loading, loaderTop, error, loadMoreError } = useAppSelector((state) => state.catalog);
  const {search, memoizedSearch} = useAppSelector((state) => state.catalogSearch)
  const currentCategory = useAppSelector((state) => state.categories.currentCategoryId);

  useEffect(() => {
    dispatch(sendCatalogRequest([currentCategory, false]));
  }, [dispatch, currentCategory]);

  const handleTryAgain = (loadMore: boolean) => {
    dispatch(sendCatalogRequest([currentCategory, loadMore]));
  }

  const handleLoadMore = () => {
    dispatch(changeOffset(currentCategory));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {hasSearch && <CatalogSearch />}
      <Categories />
      {error && (<>
        <p className="text-center my-2">Что-то пошло не так, попробуйте еще раз</p>
        <Button onClick={() => handleTryAgain(false)} style={{margin: '0 auto', display: 'block'}} variant="danger">Попробовать еще раз</Button>
      </>)}
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
          {loadMoreError && (<>
            <p className="text-center my-2">Что-то пошло не так во время загрузки товаров, попробуйте еще раз</p>
            <Button onClick={() => handleTryAgain(true)} style={{margin: '0 auto', display: 'block'}} variant="danger">Попробовать еще раз</Button>
          </>)}
          {!loadMoreError && lastLoadedProducts.length !== 0 && (
            <div className="text-center">
              <Button variant="outline-primary" onClick={handleLoadMore}>
                Загрузить ещё
              </Button>
            </div>
          )}
        </>
      ) : !error && <p>Товаров по запросу {memoizedSearch} не найдено</p>}
    </section>
  );
}

export { Catalog };
