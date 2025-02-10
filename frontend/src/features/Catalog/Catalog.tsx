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
  const { products, lastLoadedProducts, loading, error } = useAppSelector((state) => state.catalog);
  const currentCategory = useAppSelector((state) => state.categories.currentCategoryId);

  useEffect(() => {
    dispatch(sendCatalogRequest([currentCategory, false]));
  }, [dispatch, currentCategory]);

  const handleLoadMore = () => {
    dispatch(changeOffset(currentCategory));
  };

  if (error) return;

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {hasSearch && <CatalogSearch />}
      <Categories />
      {products.length > 0 && (
        <>
          <Container fluid>
            <Row className="g-4 mb-4">
              {products.map((product) => (
                <ProductCard product={product} key={'catalog' + product.id} />
              ))}
            </Row>
          </Container>
          {lastLoadedProducts.length !== 0 && (
            <div className="text-center">
              <Button variant="outline-primary" onClick={handleLoadMore}>
                Загрузить ещё
              </Button>
            </div>
          )}
        </>
      )}
      {loading && <Loader />}
    </section>
  );
}

export { Catalog };
