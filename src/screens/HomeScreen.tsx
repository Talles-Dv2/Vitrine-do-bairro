import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { BusinessCard } from '../components/BusinessCard';
import { CategoryChip } from '../components/CategoryChip';
import { colors, spacing } from '../theme/colors';
import { mockBusinesses, categories } from '../data/mockData';
import { Category, Business } from '../types';
import { apiService } from '../services/api';
import { storageService } from '../services/storage';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const remoteData = await apiService.fetchBusinesses();
      setBusinesses(remoteData);
      await storageService.saveCache(remoteData);
    } catch (err) {
      setError('Você está offline. Mostrando dados salvos.');
      const cachedData = await storageService.getCache();
      setBusinesses(cachedData.length > 0 ? cachedData : mockBusinesses);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    setFavoriteIds(await storageService.getFavorites());
  };

  const handleToggleFavorite = async (id: string) => {
    setFavoriteIds(await storageService.toggleFavorite(id));
  };

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'Todos' || b.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [businesses, search, selectedCategory]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header searchValue={search} onSearchChange={setSearch} />
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['Todos', ...categories]}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <CategoryChip
              label={item as Category | 'Todos'}
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item as Category | 'Todos')}
            />
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}

      {error && !loading && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadData}>
            <Text style={styles.retryText}>Tentar de novo</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && (
        <FlatList
          data={filteredBusinesses}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <BusinessCard
              business={item}
              onPress={() => navigation.navigate('Details', { businessId: item.id })}
              isFavorite={(favoriteIds || []).includes(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum comerciante encontrado</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
  },
  list: {
    padding: spacing.md,
  },
  loader: {
    marginTop: 50,
  },
  errorBanner: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#E65100',
    fontWeight: '600',
    flex: 1,
    fontSize: 14,
  },
  retryText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.textLight,
    fontSize: 16,
  },
});