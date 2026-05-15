import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterChipsProps<T extends string> = {
  label: string;
  options: readonly T[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
};

export const FilterChips = <T extends string>({
  label,
  options,
  selectedValue,
  onSelect,
}: FilterChipsProps<T>) => (
  <View style={styles.group}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chips}>
      {options.map((option) => {
        const isSelected = selectedValue === option;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, isSelected && styles.selectedChip]}
          >
            <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  group: {
    gap: 10,
    marginBottom: 18,
  },
  label: {
    color: '#2f2a25',
    fontSize: 15,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#fffdf9',
    borderColor: '#eadfd1',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedChip: {
    backgroundColor: '#2f2a25',
    borderColor: '#2f2a25',
  },
  chipText: {
    color: '#6e6258',
    fontSize: 14,
    fontWeight: '700',
  },
  selectedChipText: {
    color: '#fff8f0',
  },
});
