import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { storageService } from '../services/storage';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await storageService.getProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const addProduct = async (productData: { 
    name: string; 
    merchant: string; 
    price: number;
    category?: string;
    description?: string;
  }) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productData.name,
      merchant: productData.merchant,
      price: productData.price,
      category: productData.category || 'Geral',
      description: productData.description || '',
      quantity: 1,
      purchased: false,
      isPurchased: false,
    };
    await storageService.addProduct(newProduct);
    await loadProducts();
  };

  const togglePurchased = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const nextStatus = !(product.isPurchased || product.purchased);
      await storageService.updateProduct(id, { 
        purchased: nextStatus, 
        isPurchased: nextStatus 
      });
      await loadProducts();
    }
  };

  const totalPrice = products.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return {
    products,
    loading,
    addProduct,
    togglePurchased,
    totalPrice,
    reload: loadProducts,
  };
}