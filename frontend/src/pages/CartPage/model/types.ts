export interface State {
  totalPrice: number;
  products: CartProduct[];
  totalCount: number;
  loading: boolean;
  orderStatus: "complete" | "failed" | null;
}

export interface CartProduct {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
}

export interface CartRequest {
  owner: Owner;
  items: CartRequestItem[];
}

interface Owner {
  phone: string;
  address: string;
}

interface CartRequestItem {
  id: number;
  price: number;
  count: number;
}