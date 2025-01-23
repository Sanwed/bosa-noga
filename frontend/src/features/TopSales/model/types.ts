import { Product } from '../../../shared/types/product.ts';

export interface State {
  products: Product[];
  loading: boolean;
  error: boolean;
}
