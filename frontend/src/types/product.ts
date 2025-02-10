export interface Product {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

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