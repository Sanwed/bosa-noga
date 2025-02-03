import {Link, useParams} from "react-router";
import {Fragment, useEffect, MouseEvent} from "react";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks";
import {chooseSize, increaseCount, decreaseCount, sendProductRequest, resetStore} from "../model/slice.ts";
import {Button, ButtonGroup, Col, Row, Table} from "react-bootstrap";
import {Banner, Loader} from "../../../shared/components";
import style from './ProductPage.module.css';
import {selectProductData} from "../model/selectors.ts";

function ProductPage() {
  const {productId} = useParams();
  const dispatch = useAppDispatch();
  const {product, loading, chosenSize, count} = useAppSelector(selectProductData);

  useEffect(() => {
    if (productId) {
      dispatch(sendProductRequest(productId));
    }

    return () => {
      dispatch(resetStore());
    }
  }, [productId, dispatch]);

  const isChosen = (size: string) => chosenSize === size;
  const onSizeChoose = (event: MouseEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLSpanElement;
    dispatch(chooseSize(target.textContent!));
  }

  const onIncrease = () => {
    dispatch(increaseCount());
  }

  const onDecrease = () => {
    dispatch(decreaseCount());
  }

  const hasAvailableSizes = () => product ? product.sizes.some((size) => size.available) : false;
  const isAddCartButtonDisabled = () => !(hasAvailableSizes() && chosenSize);

  return (
    <main className="container">
      <Row>
        <Col>
          <Banner/>
          {loading && <Loader/>}
          {!loading && product && (
            <section className={style.catalogItem}>
              <h2 className="text-center">{product.title}</h2>
              <Row>
                <Col md={5}>
                  <img src={product.images[0]} alt={product.title}/>
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
                    <p>Размеры в наличии:
                      {product.sizes.map((size) => (
                        <Fragment key={size.size}>
                          {size.available && (
                            <span onClick={onSizeChoose}
                                  className={`${style.catalogItemSize} ${isChosen(size.size) ? style.selected : ''}`}>
                              {size.size}
                            </span>
                          )}
                        </Fragment>
                      ))}
                    </p>
                    {hasAvailableSizes() && (
                      <div>Количество:
                        <ButtonGroup size="sm" className="pl-2">
                          <Button onClick={onDecrease} variant="secondary">-</Button>
                          <Button as="span" variant="outline-primary">{count}</Button>
                          <Button onClick={onIncrease} variant="secondary">+</Button>
                        </ButtonGroup>
                      </div>
                    )}
                  </div>
                  {hasAvailableSizes() && (
                    <Button variant="danger" className="w-100" size="lg" disabled={isAddCartButtonDisabled()}>
                      <Link to="/cart">
                        В корзину
                      </Link>
                    </Button>
                  )}
                </Col>
              </Row>
            </section>
          )}
        </Col>
      </Row>
    </main>
  );
}

export {ProductPage};
