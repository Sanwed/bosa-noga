import {useAppDispatch, useAppSelector} from "../../../shared/hooks";
import {selectCartData} from "../model/selectors.ts";
import {removeFromCart, sendCartRequest} from "../model/slice.ts";
import {Button, Card, CardBody, Col, FormControl, FormGroup, Row, Table} from "react-bootstrap";
import {Banner, Loader} from "../../../shared/components";
import {Link} from "react-router";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {ChangeEvent, FormEvent, useState} from "react";

function CartPage() {
  const dispatch = useAppDispatch();
  const {products, totalPrice, loading, orderStatus} = useAppSelector(selectCartData);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    agreement: false,
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(sendCartRequest({
      owner: {
        phone: form.phone,
        address: form.address,
      },
      items: products.map((product) => ({
        id: product.id,
        price: product.price,
        count: product.count,
      }))
    }));
    if (!loading && orderStatus === 'complete') {
      setForm({
        phone: "",
        address: "",
        agreement: false,
      });
    }
  }

  const onRemove = (id: number) => {
    dispatch(removeFromCart(id));
  }

  const isOrderSubmitDisabled = () => !products.length || Object.values(form).some((formValue) => !formValue);

  return (
    <main className="container">
      <Row>
        <Col>
          <Banner/>
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
                  <td><Link to={`/products/${product.id}`}>{product.title}</Link></td>
                  <td>{product.size}</td>
                  <td>{product.count}</td>
                  <td>{product.price}</td>
                  <td>{product.price * product.count}</td>
                  <td><Button onClick={() => onRemove(product.id)} variant="outline-danger" size="sm">Удалить</Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right">Общая стоимость</td>
                <td>{totalPrice}</td>
              </tr>
              </tbody>
            </Table>
          </section>
          <section>
            <h2 className="text-center">Оформить заказ</h2>
            {loading && <Loader/>}
            {!loading && orderStatus === 'complete' && <p>Заказ успешно отправлен</p>}
            {!loading && orderStatus === 'failed' && <p>К сожалению произошла ошибка, попробуйте еще раз</p>}
            <Card style={{maxWidth: '30rem', margin: '0 auto'}}>
              <CardBody as="form" onSubmit={onSubmit}>
                <FormGroup>
                  <label htmlFor="phone">Телефон</label>
                  <FormControl id="phone" name="phone" placeholder="Ваш телефон" onChange={onChange} value={form.phone} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="address">Адрес доставки</label>
                  <FormControl id="address" name="address" placeholder="Адрес доставки" onChange={onChange} value={form.address} />
                </FormGroup>
                <FormGroup>
                  <FormCheckInput type="checkbox" id="agreement" name="agreement" onChange={onChange} checked={form.agreement} />
                  <FormCheckLabel htmlFor="agreement">Согласен с правилами доставки</FormCheckLabel>
                </FormGroup>
                <Button disabled={isOrderSubmitDisabled()} type="submit" variant="outline-secondary">Оформить</Button>
              </CardBody>
            </Card>
          </section>
        </Col>
      </Row>
    </main>
  );
}

export {CartPage};
