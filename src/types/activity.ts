export type Occasion = 'Solo' | 'Date' | 'Friends' | 'Family';
export type Budget = 'Free' | 'Cheap' | 'Moderate' | 'Expensive';
export type LocationType = 'Indoor' | 'Outdoor' | 'Either';
export type EnergyLevel = 'Chill' | 'Moderate' | 'Active' | 'Adventurous';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';
export type Weather = 'Any' | 'Sunny' | 'Rainy' | 'Cold' | 'Hot';
export type ChaosLevel = 'Safe' | 'Spontaneous' | 'Adventurous' | 'Chaotic';

export interface ActivityFilters {
  occasion: Occasion | null;
  budget: Budget | null;
  locationType: LocationType | null;
  energyLevel: EnergyLevel | null;
  timeOfDay: TimeOfDay | null;
  weather: Weather | null;
  chaosLevel: ChaosLevel | null;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  estimatedCost: Budget;
  vibe: string;
  duration: string;
  backupIdea: string;
  tags: string[];
  occasion: Occasion[];
  budget: Budget[];
  locationType: LocationType[];
  energyLevel: EnergyLevel[];
  timeOfDay: TimeOfDay[];
  weather: Weather[];
  chaosLevel: ChaosLevel;
}

export const OCCASIONS: Occasion[] = ['Solo', 'Date', 'Friends', 'Family'];
export const BUDGETS: Budget[] = ['Free', 'Cheap', 'Moderate', 'Expensive'];
export const LOCATION_TYPES: LocationType[] = ['Indoor', 'Outdoor', 'Either'];
export const ENERGY_LEVELS: EnergyLevel[] = ['Chill', 'Moderate', 'Active', 'Adventurous'];
export const TIMES_OF_DAY: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
export const WEATHER_OPTIONS: Weather[] = ['Any', 'Sunny', 'Rainy', 'Cold', 'Hot'];
export const CHAOS_LEVELS: ChaosLevel[] = ['Safe', 'Spontaneous', 'Adventurous', 'Chaotic'];
