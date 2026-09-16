import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './BusinessCardStyle';
import { Business } from '../types';

// Adicione as props opcionais isFavorite e onToggleFavorite aqui:
interface BusinessCardProps {
  business: Business;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.headerRow}>
      <View style={styles.titleContainer}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.category}>{business.category}</Text>
      </View>
      {onToggleFavorite && (
        <TouchableOpacity onPress={onToggleFavorite} style={styles.heartButton}>
          <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.rating}>⭐ {business.rating.toFixed(1)}</Text>
      <Text style={styles.distance}>{business.distance} km</Text>
    </View>
    <Text style={styles.description} numberOfLines={2}>
      {business.description}
    </Text>
  </TouchableOpacity>
);