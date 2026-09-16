import { Business } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Lista de categorias para sortear/mapear
const mockCategories = ['Padaria', 'Salão', 'Oficina', 'Mercado'];

export const apiService = {
  async fetchBusinesses(): Promise<Business[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (Math.random() < 0.1) throw new Error('Falha na conexão');

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      return data.map((item: any, index: number) => ({
        id: item.id.toString(),
        name: item.name,
        // Alterna entre as categorias reais para o filtro da Home funcionar:
        category: mockCategories[index % mockCategories.length],
        description: item.email,
        rating: 4.5,
        distance: Number((0.5 + index * 0.2).toFixed(1)),
        openingHours: '08:00 - 18:00',
        products: [],
      }));
    } catch (error) {
      throw new Error('Não foi possível buscar os comerciantes.');
    }
  },
};