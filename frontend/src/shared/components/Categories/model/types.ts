export interface Category {
  id: number;
  title: string;
}

export interface State {
  categories: Category[];
  loading: boolean;
  error: boolean;
  currentCategoryId: number;
}
