import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Activity } from '../types/activity';

type ActivityCardProps = {
  activity: Activity | null;
  isFavorite?: boolean;
  onSave?: () => void;
  onRemove?: () => void;
  onSpinAgain?: () => void;
};

export const ActivityCard = ({ activity, isFavorite = false, onSave, onRemove, onSpinAgain }: ActivityCardProps) => {
  if (!activity) {
    return (
      <View style={[styles.card, styles.emptyCard]}>
        <Text style={styles.emptyTitle}>Ready when you are.</Text>
        <Text style={styles.emptyText}>Choose a few filters and tap Generate Activity to get a fresh idea.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Your next activity</Text>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.description}>{activity.description}</Text>

      <View style={styles.metaGrid}>
        <Meta label="Cost" value={activity.estimatedCost} />
        <Meta label="Vibe" value={activity.vibe} />
        <Meta label="Duration" value={activity.duration} />
      </View>

      <View style={styles.backupBox}>
        <Text style={styles.backupLabel}>Backup idea</Text>
        <Text style={styles.backupText}>{activity.backupIdea}</Text>
      </View>

      <View style={styles.tags}>
        {activity.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>#{tag}</Text>
        ))}
      </View>

      {(onSave || onRemove || onSpinAgain) && (
        <View style={styles.actions}>
          {onSpinAgain && (
            <TouchableOpacity accessibilityRole="button" onPress={onSpinAgain} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Spin Again</Text>
            </TouchableOpacity>
          )}
          {onSave && (
            <TouchableOpacity
              accessibilityRole="button"
              disabled={isFavorite}
              onPress={onSave}
              style={[styles.primaryButton, isFavorite && styles.disabledButton]}
            >
              <Text style={styles.primaryButtonText}>{isFavorite ? 'Saved' : 'Save Favorite'}</Text>
            </TouchableOpacity>
          )}
          {onRemove && (
            <TouchableOpacity accessibilityRole="button" onPress={onRemove} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const Meta = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.metaItem}>
    <Text style={styles.metaLabel}>{label}</Text>
    <Text style={styles.metaValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffdf9',
    borderColor: '#f0e4d6',
    borderRadius: 28,
    borderWidth: 1,
    padding: 22,
    shadowColor: '#6f5038',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 34,
  },
  kicker: {
    color: '#f47c48',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#2f2a25',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32,
  },
  description: {
    color: '#5f554d',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
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
  metaGrid: {
    gap: 10,
    marginTop: 18,
  },
  metaItem: {
    backgroundColor: '#fff4e8',
    borderRadius: 18,
    padding: 14,
  },
  metaLabel: {
    color: '#9a6a45',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: '#2f2a25',
    fontSize: 15,
    fontWeight: '700',
  },
  backupBox: {
    backgroundColor: '#f6fbf6',
    borderRadius: 18,
    marginTop: 16,
    padding: 14,
  },
  backupLabel: {
    color: '#56815c',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  backupText: {
    color: '#415243',
    fontSize: 14,
    lineHeight: 21,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    color: '#f47c48',
    fontSize: 13,
    fontWeight: '800',
  },
  actions: {
    gap: 10,
    marginTop: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f47c48',
    borderRadius: 18,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#2f2a25',
    borderRadius: 18,
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: '#fff8f0',
    fontSize: 16,
    fontWeight: '900',
  },
  disabledButton: {
    backgroundColor: '#c7bdb2',
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: '#fff1f1',
    borderRadius: 18,
    paddingVertical: 15,
  },
  removeButtonText: {
    color: '#bb4a4a',
    fontSize: 16,
    fontWeight: '900',
  },
});
