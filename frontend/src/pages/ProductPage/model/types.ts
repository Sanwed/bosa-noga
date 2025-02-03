export interface ProductAdvanced {
  id: number;
  category: number;
  color: string;
  heelSize: string;
  images: string[];
  manufacturer: string;
  material: string;
  price: number;
  reason: string;
  season: string;
  sizes: Size[];
  sku: string;
  title: string;
}

export interface Size {
  size: string;
  available: boolean;
}

export interface State {
  loading: boolean,
  product: ProductAdvanced | null;
  error: boolean;
  chosenSize: string | null;
  count: number;
}