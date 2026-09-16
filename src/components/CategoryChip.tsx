import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';
import { Category } from '../types';

export const CategoryChip: React.FC<{
  label: Category | 'Todos';
  selected: boolean;
  onPress: () => void;
}> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
  >
    <Text style={[styles.label, selected && styles.labelSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  labelSelected: {
    color: colors.white,
    fontWeight: '600',
  },
});