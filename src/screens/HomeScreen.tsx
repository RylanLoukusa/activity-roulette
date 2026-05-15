import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityCard } from '../components/ActivityCard';
import { Activity } from '../types/activity';

type HomeScreenProps = {
  currentActivity: Activity | null;
  isCurrentFavorite: boolean;
  onGenerate: () => void;
  onSaveFavorite: () => void;
};

export const HomeScreen = ({ currentActivity, isCurrentFavorite, onGenerate, onSaveFavorite }: HomeScreenProps) => (
  <View style={styles.container}>
    <View style={styles.hero}>
      <Text style={styles.eyebrow}>Make plans in one tap</Text>
      <Text style={styles.title}>Activity Roulette</Text>
      <Text style={styles.subtitle}>
        Pick the mood, spin the wheel, and get a fun activity idea for solo time, dates, friends, or family.
      </Text>
      <TouchableOpacity accessibilityRole="button" onPress={onGenerate} style={styles.generateButton}>
        <Text style={styles.generateButtonText}>{currentActivity ? 'Generate Activity' : 'Spin'}</Text>
      </TouchableOpacity>
    </View>

    <ActivityCard
      activity={currentActivity}
      isFavorite={isCurrentFavorite}
      onSave={currentActivity ? onSaveFavorite : undefined}
      onSpinAgain={currentActivity ? onGenerate : undefined}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  hero: {
    backgroundColor: '#2f2a25',
    borderRadius: 32,
    padding: 24,
  },
  eyebrow: {
    color: '#ffd7bd',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff8f0',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 43,
  },
  subtitle: {
    color: '#efe2d3',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  generateButton: {
    alignItems: 'center',
    backgroundColor: '#f47c48',
    borderRadius: 22,
    marginTop: 22,
    paddingVertical: 18,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
});
