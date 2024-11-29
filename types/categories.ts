export interface CategoriesResponse {
  statusCode: number;
  message: string;
  data: Array<{
    id: string;
    name: string;
    createdAt: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}
