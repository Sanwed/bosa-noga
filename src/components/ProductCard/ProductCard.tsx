import { Link } from 'react-router';
import { Product } from '../../types/product.ts';
import { Button, Card, CardBody, Col } from 'react-bootstrap';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <Col md={4} sm={6} xs={12} className="d-flex">
      <Card className="w-100">
        <Card.Img className="img-fluid" src={product.images[0]} alt={product.title} />
        <CardBody className="d-flex flex-column justify-content-end">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price} руб.</Card.Text>
          <Link to={`/products/${product.id}/`}>
            <Button variant="outline-primary">Заказать</Button>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
}

export { ProductCard };
