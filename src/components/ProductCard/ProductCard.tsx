import { Link } from 'react-router';
import { Product } from '../../types/product.ts';
import { Button, Card, CardBody, Col } from 'react-bootstrap';

import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <Col md={4} sm={6} xs={12} className="d-flex">
      <Card className="w-100">
        <Swiper
          style={{width: '100%', height: '100%'}}
          modules={[Pagination, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {product.product_images.map((image) => (
            <SwiperSlide key={image.image_url}>
              <Card.Img className="img-fluid" src={image.image_url} alt={product.title} />
            </SwiperSlide>
          ))}
        </Swiper>
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
