export interface Product {
  id: string;
  name: string;
  merchant: string;
  price: number;
  category: string;
  description?: string;
  quantity: number;
  purchased: boolean;
  isPurchased: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  AddProduct: undefined;
  ProductDetail: { product: Product };
};

export interface Product {
  id: string;
  name: string;
  merchant: string;
  price: number;
  category: string;
  quantity: number;
  isPurchased: boolean;
}