import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';

export const styles = StyleSheet.create({
  // --- Estilos de cabeçalho do Card (Favoritos) ---
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  titleContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  heartButton: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 24,
  },

  // --- Demais estilos do Card ---
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  category: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  rating: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  distance: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  
  // --- Estilos gerais mantidos para as telas ---
  container: { flex: 1, backgroundColor: colors.background },
  desc: { fontSize: 14, color: colors.textLight, lineHeight: 20 },
});