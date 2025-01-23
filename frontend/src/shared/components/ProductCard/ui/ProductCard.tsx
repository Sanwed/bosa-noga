import { Link } from 'react-router';
import { Product } from '../../../types/product.ts';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <div className="col-4">
      <div className="card">
        <img className="card-img-top img-fluid" src={product.images[0]} alt={product.title} />
        <div className="card-body">
          <p className="card-text">{product.title}</p>
          <p className="card-text">{product.price}</p>
          <Link to={`/products/${product.id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
