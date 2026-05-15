import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FilterChips } from '../components/FilterChips';
import {
  ActivityFilters,
  CHAOS_LEVELS,
  ChaosLevel,
  BUDGETS,
  Budget,
  ENERGY_LEVELS,
  EnergyLevel,
  LOCATION_TYPES,
  LocationType,
  OCCASIONS,
  Occasion,
  TIMES_OF_DAY,
  TimeOfDay,
  WEATHER_OPTIONS,
  Weather,
} from '../types/activity';

type FiltersScreenProps = {
  filters: ActivityFilters;
  onChange: <K extends keyof ActivityFilters>(key: K, value: NonNullable<ActivityFilters[K]>) => void;
  onClear: () => void;
  onGenerate: () => void;
};

export const FiltersScreen = ({ filters, onChange, onClear, onGenerate }: FiltersScreenProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Dial in the vibe</Text>
      <Text style={styles.subtitle}>Choose as many filters as you like. If nothing matches perfectly, we will loosen the rules.</Text>
    </View>

    <View style={styles.panel}>
      <FilterChips<Occasion>
        label="Occasion"
        options={OCCASIONS}
        selectedValue={filters.occasion}
        onSelect={(value) => onChange('occasion', value)}
      />
      <FilterChips<Budget>
        label="Budget"
        options={BUDGETS}
        selectedValue={filters.budget}
        onSelect={(value) => onChange('budget', value)}
      />
      <FilterChips<LocationType>
        label="Location type"
        options={LOCATION_TYPES}
        selectedValue={filters.locationType}
        onSelect={(value) => onChange('locationType', value)}
      />
      <FilterChips<EnergyLevel>
        label="Energy level"
        options={ENERGY_LEVELS}
        selectedValue={filters.energyLevel}
        onSelect={(value) => onChange('energyLevel', value)}
      />
      <FilterChips<TimeOfDay>
        label="Time of day"
        options={TIMES_OF_DAY}
        selectedValue={filters.timeOfDay}
        onSelect={(value) => onChange('timeOfDay', value)}
      />
      <FilterChips<Weather>
        label="Weather"
        options={WEATHER_OPTIONS}
        selectedValue={filters.weather}
        onSelect={(value) => onChange('weather', value)}
      />
      <FilterChips<ChaosLevel>
        label="Chaos level"
        options={CHAOS_LEVELS}
        selectedValue={filters.chaosLevel}
        onSelect={(value) => onChange('chaosLevel', value)}
      />

      <View style={styles.actions}>
        <TouchableOpacity accessibilityRole="button" onPress={onGenerate} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Generate with Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" onPress={onClear} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  panel: {
    backgroundColor: '#fffdf9',
    borderColor: '#f0e4d6',
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
  },
  actions: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f47c48',
    borderRadius: 18,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#fff4e8',
    borderRadius: 18,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    color: '#9a5d3a',
    fontSize: 16,
    fontWeight: '900',
  },
});
