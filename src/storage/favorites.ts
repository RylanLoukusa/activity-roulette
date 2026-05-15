import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity } from '../types/activity';

const FAVORITES_STORAGE_KEY = '@activity-roulette/favorites';

export const loadFavorites = async (): Promise<Activity[]> => {
  try {
    const rawFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return rawFavorites ? (JSON.parse(rawFavorites) as Activity[]) : [];
  } catch (error) {
    console.warn('Unable to load favorites from local storage.', error);
    return [];
  }
};

export const saveFavorites = async (favorites: Activity[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.warn('Unable to save favorites to local storage.', error);
    return false;
  }
};
