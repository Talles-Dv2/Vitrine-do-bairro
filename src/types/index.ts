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

export interface Business {
  id: string;
  name: string;
  category: string;
  address?: string;
  phone?: string;
}

export type RootStackParamList = {
  Home: undefined;
  ProductList: { businessId?: string };
  ProductForm: { productId?: string; businessId?: string };
};

export * from './product';

