import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeFromCart, sendCartRequest, resetOrderStatus } from './slice.ts';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormControl,
  FormGroup,
  Row,
  Table,
  Modal,
} from 'react-bootstrap';
import { Banner, Loader } from '../../components';
import { Link } from 'react-router';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { useState, useEffect } from 'react';
import { CartRequestTypes } from '../../types/enums.ts';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import {  } from './slice.ts';

function CartPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      address: '',
      agreement: false,
    },
  });

  const dispatch = useAppDispatch();
  const { products, totalPrice, loading, orderStatus } = useAppSelector((state) => state.cart);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    if (!loading && orderStatus === CartRequestTypes.SUCCESS) {
      reset();
      setShowSuccess(true);
    } else if (!loading && orderStatus === CartRequestTypes.FAILURE) {
      setShowFailure(true);
    }
    dispatch(resetOrderStatus());
  }, [loading, orderStatus, dispatch, reset]);

  const onSuccessModalClose = () => {
    setShowSuccess(false);
  };

  const onFailureModalClose = () => {
    setShowFailure(false);
  };

  const onSubmit = (data: { phone: string; address: string; agreement: boolean }) => {
    dispatch(
      sendCartRequest({
        owner: {
          phone: data.phone,
          address: data.address,
        },
        items: products.map((product) => ({
          id: product.id,
          price: product.price,
          count: product.count,
        })),
      }),
    );
  };

  const onRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Helmet>
        <title>Корзина</title>
        <meta name="description" content="Корзина товаров" />
        <link rel="canonical" href="/cart" />
      </Helmet>
      <Container as="main">
        <Row>
          <Col>
            <Banner />
            <section>
              <h2 className="text-center">Корзина</h2>
              <Table bordered>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td scope="row">{index + 1}</td>
                      <td>
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                      </td>
                      <td>{product.size}</td>
                      <td>{product.count}</td>
                      <td>{product.price}</td>
                      <td>{product.price * product.count}</td>
                      <td>
                        <Button
                          onClick={() => onRemove(product.id)}
                          variant="outline-danger"
                          size="sm"
                        >
                          Удалить
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-right">
                      Общая стоимость
                    </td>
                    <td>{totalPrice}</td>
                  </tr>
                </tbody>
              </Table>
            </section>
            <section>
              <h2 className="text-center">Оформить заказ</h2>
              {loading && <Loader />}
              <Card style={{ maxWidth: '30rem', margin: '0 auto' }}>
                <CardBody as="form" onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup className="mb-2">
                    <label htmlFor="phone">Телефон</label>
                    <InputMask
                      id="phone"
                      placeholder="+7"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      maskChar={null}
                      mask="+7 (999) 999-99-99"
                      {...register('phone', {
                        required: 'Телефон обязателен',
                        validate: (value) =>
                          /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value) ||
                          'Некорректный формат телефона',
                      })}
                    />
                    {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <label htmlFor="address">Адрес доставки</label>
                    <FormControl
                      id="address"
                      placeholder="Адрес доставки"
                      isInvalid={!!errors.address}
                      {...register('address', {
                        required: 'Адрес обязателен для заполнения',
                      })}
                    />
                    {errors.address && (
                      <span className="text-danger">{errors.address.message}</span>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-2 d-flex gap-2">
                    <FormCheckInput
                      type="checkbox"
                      id="agreement"
                      {...register('agreement', {
                        required: 'Обязательное поле',
                      })}
                    />
                    <FormCheckLabel htmlFor="agreement">
                      Согласен с правилами доставки
                    </FormCheckLabel>
                  </FormGroup>
                  <Button
                    disabled={!products.length || !isValid}
                    type="submit"
                    variant="outline-secondary"
                  >
                    Оформить
                  </Button>
                </CardBody>
              </Card>
            </section>
          </Col>
        </Row>
      </Container>
      <Modal show={showSuccess} onHide={onSuccessModalClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Заказ успешно оформлен</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ваш заказ успешно оформлен. Доставка будет произведена по адресу в течение 10 лет.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onSuccessModalClose}>
            ОК
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFailure} onHide={onFailureModalClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Ошибка оформления заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Произошла ошибка при оформлении заказа. Попробуйте еще раз.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onFailureModalClose}>
            ОК
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { CartPage };
