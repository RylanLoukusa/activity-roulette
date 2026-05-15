import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { activities } from './src/data/activities';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { FiltersScreen } from './src/screens/FiltersScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { loadFavorites, saveFavorites } from './src/storage/favorites';
import { Activity, ActivityFilters } from './src/types/activity';
import { getMatchingActivity } from './src/utils/activityMatcher';

type Tab = 'home' | 'filters' | 'favorites';

const initialFilters: ActivityFilters = {
  occasion: null,
  budget: null,
  locationType: null,
  energyLevel: null,
  timeOfDay: null,
  weather: null,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [filters, setFilters] = useState<ActivityFilters>(initialFilters);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [favorites, setFavorites] = useState<Activity[]>([]);

  useEffect(() => {
    const hydrateFavorites = async () => {
      const storedFavorites = await loadFavorites();
      setFavorites(storedFavorites);
    };

    hydrateFavorites();
  }, []);

  const isCurrentFavorite = useMemo(
    () => Boolean(currentActivity && favorites.some((favorite) => favorite.id === currentActivity.id)),
    [currentActivity, favorites],
  );

  const generateActivity = useCallback(() => {
    const nextActivity = getMatchingActivity(activities, filters, currentActivity?.id);
    setCurrentActivity(nextActivity);
    setActiveTab('home');
  }, [currentActivity?.id, filters]);

  const updateFilter = useCallback(
    <K extends keyof ActivityFilters>(key: K, value: NonNullable<ActivityFilters[K]>) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [key]: currentFilters[key] === value ? null : value,
      }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const persistFavorites = async (nextFavorites: Activity[], successMessage: string) => {
    setFavorites(nextFavorites);
    const didSave = await saveFavorites(nextFavorites);

    if (!didSave) {
      Alert.alert('Storage issue', 'We could not update favorites on this device. Please try again.');
      return;
    }

    Alert.alert('Activity Roulette', successMessage);
  };

  const addFavorite = useCallback(async () => {
    if (!currentActivity || favorites.some((favorite) => favorite.id === currentActivity.id)) {
      return;
    }

    await persistFavorites([currentActivity, ...favorites], 'Saved to favorites.');
  }, [currentActivity, favorites]);

  const removeFavorite = useCallback(
    async (activityId: string) => {
      await persistFavorites(
        favorites.filter((favorite) => favorite.id !== activityId),
        'Removed from favorites.',
      );
    },
    [favorites],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View style={styles.navBar}>
          <NavButton active={activeTab === 'home'} label="Home" onPress={() => setActiveTab('home')} />
          <NavButton active={activeTab === 'filters'} label="Filters" onPress={() => setActiveTab('filters')} />
          <NavButton
            active={activeTab === 'favorites'}
            label={`Favorites ${favorites.length ? `(${favorites.length})` : ''}`}
            onPress={() => setActiveTab('favorites')}
          />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'home' && (
            <HomeScreen
              currentActivity={currentActivity}
              isCurrentFavorite={isCurrentFavorite}
              onGenerate={generateActivity}
              onSaveFavorite={addFavorite}
            />
          )}
          {activeTab === 'filters' && (
            <FiltersScreen
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
              onGenerate={generateActivity}
            />
          )}
          {activeTab === 'favorites' && (
            <FavoritesScreen favorites={favorites} onRemoveFavorite={removeFavorite} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const NavButton = ({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityState={{ selected: active }}
    onPress={onPress}
    style={[styles.navButton, active && styles.navButtonActive]}
  >
    <Text style={[styles.navButtonText, active && styles.navButtonTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff8f0',
    flex: 1,
  },
  appShell: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  navBar: {
    backgroundColor: '#ffffff',
    borderColor: '#f0e4d6',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 6,
  },
  navButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    paddingVertical: 11,
  },
  navButtonActive: {
    backgroundColor: '#2f2a25',
  },
  navButtonText: {
    color: '#74685f',
    fontSize: 13,
    fontWeight: '900',
  },
  navButtonTextActive: {
    color: '#fff8f0',
  },
  content: {
    paddingBottom: 36,
    paddingTop: 20,
  },
});
