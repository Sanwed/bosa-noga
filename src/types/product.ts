export interface Product {
  id: number;
  category: number;
  title: string;
  price: number;
  product_images: {
    image_url: string,
  }[];
}

export interface ProductAdvanced extends Product {
  color: string;
  heelSize: string;
  manufacturer: string;
  material: string;
  reason: string;
  season: string;
  product_sizes: Size[];
  sku: string;
}

export interface Size {
  size: string;
  available: boolean;
}
