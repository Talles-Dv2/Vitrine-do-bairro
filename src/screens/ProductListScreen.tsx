import React, { useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';

export default function ProductListScreen({ navigation }: any) {
  const { products, loading, togglePurchased, totalPrice, reload } = useProducts();

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lista de Compras" />

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B35" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onToggle={() => { void togglePurchased(item.id); }}
              onPress={() => {}}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Sua lista está vazia!</Text>
              <Text style={styles.emptySubtext}>Adicione produtos para começar.</Text>
            </View>
          }
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total Estimado: R$ {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('ProductForm')}
        >
          <Text style={styles.addButtonText}>+ Adicionar Novo Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E7' },
  emptyContainer: { alignItems: 'center', marginTop: 50, padding: 20 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#004E64' },
  emptySubtext: { fontSize: 14, color: '#6B6B6B', marginTop: 4 },
  footer: { padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#E5E5E5' },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#004E64', marginBottom: 12 },
  addButton: { backgroundColor: '#FF6B35', padding: 14, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});