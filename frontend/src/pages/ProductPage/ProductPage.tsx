import { useNavigate, useParams } from 'react-router';
import { Fragment, useEffect, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  chooseSize,
  increaseCount,
  decreaseCount,
  sendProductRequest,
  resetStore,
} from './slice.ts';
import { Button, ButtonGroup, Col, Container, Row, Table } from 'react-bootstrap';
import { Banner, Loader } from '../../components';
import style from './ProductPage.module.css';
import { addToCart } from '../CartPage';

function ProductPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { product, loading, chosenSize, count } = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const onCartAdd = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        size: chosenSize as string,
        count: count,
        price: product.price,
      }),
    );
    navigate('/cart/');
  };

  useEffect(() => {
    if (productId) {
      dispatch(sendProductRequest(productId));
    }

    return () => {
      dispatch(resetStore());
    };
  }, [productId, dispatch]);

  const isChosen = (size: string) => chosenSize === size;
  const onSizeChoose = (event: MouseEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLSpanElement;
    dispatch(chooseSize(target.textContent!));
  };

  const onIncrease = () => {
    dispatch(increaseCount());
  };

  const onDecrease = () => {
    dispatch(decreaseCount());
  };

  const hasAvailableSizes = () => (product ? product.sizes.some((size) => size.available) : false);
  const isAddCartButtonDisabled = () => !(hasAvailableSizes() && chosenSize);

  return (
    <Container as="main">
      <Row>
        <Col>
          <Banner />
          {loading && <Loader />}
          {!loading && product && (
            <section className={style.catalogItem}>
              <h2 className="text-center mb-4">{product.title}</h2>
              <Row>
                <Col md={5}>
                  <img src={product.images[0]} alt={product.title} />
                </Col>
                <Col md={7}>
                  <Table bordered>
                    <tbody>
                      <tr>
                        <td>Артикул</td>
                        <td>{product.sku}</td>
                      </tr>
                      <tr>
                        <td>Производитель</td>
                        <td>{product.manufacturer}</td>
                      </tr>
                      <tr>
                        <td>Цвет</td>
                        <td>{product.color}</td>
                      </tr>
                      <tr>
                        <td>Материалы</td>
                        <td>{product.material}</td>
                      </tr>
                      <tr>
                        <td>Сезон</td>
                        <td>{product.season}</td>
                      </tr>
                      <tr>
                        <td>Повод</td>
                        <td>{product.reason}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:
                      {product.sizes.map((size) => (
                        <Fragment key={size.size}>
                          {size.available && (
                            <span
                              onClick={onSizeChoose}
                              className={`${style.catalogItemSize} ${isChosen(size.size) ? style.selected : ''}`}
                            >
                              {size.size}
                            </span>
                          )}
                        </Fragment>
                      ))}
                    </p>
                    {hasAvailableSizes() && (
                      <div className="mb-4 d-flex gap-2 justify-content-center">
                        Количество:
                        <ButtonGroup size="sm" className="pl-2">
                          <Button onClick={onDecrease} variant="secondary">
                            -
                          </Button>
                          <Button as="span" variant="outline-primary">
                            {count}
                          </Button>
                          <Button onClick={onIncrease} variant="secondary">
                            +
                          </Button>
                        </ButtonGroup>
                      </div>
                    )}
                  </div>
                  {hasAvailableSizes() && (
                    <Button
                      onClick={onCartAdd}
                      variant="danger"
                      className="w-100"
                      size="lg"
                      disabled={isAddCartButtonDisabled()}
                    >
                      В корзину
                    </Button>
                  )}
                </Col>
              </Row>
            </section>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export { ProductPage };
