import { StyleSheet, Text, View } from 'react-native';
import { ActivityCard } from '../components/ActivityCard';
import { Activity } from '../types/activity';

type FavoritesScreenProps = {
  favorites: Activity[];
  onRemoveFavorite: (activityId: string) => void;
};

export const FavoritesScreen = ({ favorites, onRemoveFavorite }: FavoritesScreenProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Saved ideas stay on this device and are ready whenever you need a plan.</Text>
    </View>

    {favorites.length === 0 ? (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>Generate an activity and tap Save Favorite to keep it here.</Text>
      </View>
    ) : (
      <View style={styles.list}>
        {favorites.map((favorite) => (
          <ActivityCard
            activity={favorite}
            key={favorite.id}
            onRemove={() => onRemoveFavorite(favorite.id)}
          />
        ))}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  header: {
    gap: 8,
  },
  title: {
    color: '#2f2a25',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#74685f',
    fontSize: 16,
    lineHeight: 23,
  },
  list: {
    gap: 18,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#fffdf9',
    borderColor: '#f0e4d6',
    borderRadius: 28,
    borderWidth: 1,
    padding: 28,
  },
  emptyTitle: {
    color: '#2f2a25',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  emptyText: {
    color: '#74685f',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
