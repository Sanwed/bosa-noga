import { Product } from '../../../shared/types/product.ts';

export interface State {
  products: Product[];
  lastLoadedProducts: Product[];
  loading: boolean;
  error: boolean;
  offset: number;
}
