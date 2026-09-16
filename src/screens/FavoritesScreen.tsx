import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BusinessCard } from '../components/BusinessCard';
import { colors, spacing } from '../theme/colors';
import { storageService } from '../services/storage';
import { Business } from '../types';

export const FavoritesScreen: React.FC<any> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Business[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favIds = await storageService.getFavorites();
    const cachedData = await storageService.getCache();
    const favBusinesses = cachedData.filter(b => favIds.includes(b.id));
    setFavorites(favBusinesses);
  };

  const handleToggleFavorite = async (id: string) => {
    await storageService.toggleFavorite(id);
    loadFavorites();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Meus Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <BusinessCard
            business={item}
            onPress={() => navigation.navigate('Details', { businessId: item.id })}
            isFavorite={true}
            onToggleFavorite={() => handleToggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum favorito adicionado ainda.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.text, margin: spacing.md },
  list: { padding: spacing.md },
  emptyText: { textAlign: 'center', marginTop: 40, color: colors.textLight, fontSize: 16 },
});