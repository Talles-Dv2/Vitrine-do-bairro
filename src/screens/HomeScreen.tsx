import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useProducts } from '../hooks/useProducts';

export default function HomeScreen({ navigation }: any) {
  const { products, totalPrice, reload } = useProducts();

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Vitrine do Bairro" />
      
      <View style={styles.content}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Resumo das Compras</Text>
          <Text style={styles.cardText}>Itens cadastrados: {products.length}</Text>
          <Text style={styles.cardTotal}>Total estimado: R$ {totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ProductList')}
        >
          <Text style={styles.buttonText}>Ver Minha Lista de Compras</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('ProductForm')}
        >
          <Text style={styles.secondaryButtonText}>+ Cadastrar Novo Produto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E7' },
  content: { padding: 20, flex: 1, justifyContent: 'center' },
  cardInfo: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#004E64', marginBottom: 8 },
  cardText: { fontSize: 16, color: '#2D2D2D', marginBottom: 4 },
  cardTotal: { fontSize: 18, fontWeight: 'bold', color: '#FF6B35', marginTop: 8 },
  primaryButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: {
    backgroundColor: '#004E64',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});