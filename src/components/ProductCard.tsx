import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onToggle: () => void | Promise<void>;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onToggle, onPress }) => {
  const isDone = product.isPurchased || product.purchased;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <TouchableOpacity onPress={() => { void onToggle(); }} style={styles.checkbox}>
        <Text style={styles.checkboxText}>{isDone ? '✓' : '○'}</Text>
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={[styles.name, isDone && styles.lineThrough]}>
          {product.name}
        </Text>
        <Text style={styles.merchant}>{product.merchant}</Text>
      </View>
      <Text style={styles.price}>R$ {(product.price || 0).toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  checkbox: { marginRight: 12 },
  checkboxText: { fontSize: 20, color: '#FF6B35', fontWeight: 'bold' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#2D2D2D' },
  lineThrough: { textDecorationLine: 'line-through', color: '#888' },
  merchant: { fontSize: 12, color: '#6B6B6B' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#004E64' },
});