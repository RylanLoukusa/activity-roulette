import { Activity, ActivityFilters } from '../types/activity';

const getRandomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)] as T;

const matchesWeather = (activity: Activity, selectedWeather: ActivityFilters['weather']) => {
  if (!selectedWeather || selectedWeather === 'Any') {
    return true;
  }

  return activity.weather.includes(selectedWeather) || activity.weather.includes('Any');
};

const matchesLocation = (activity: Activity, selectedLocation: ActivityFilters['locationType']) => {
  if (!selectedLocation || selectedLocation === 'Either') {
    return true;
  }

  return activity.locationType.includes(selectedLocation) || activity.locationType.includes('Either');
};

const scoreActivity = (activity: Activity, filters: ActivityFilters) => {
  let score = 0;

  if (filters.occasion && activity.occasion.includes(filters.occasion)) score += 4;
  if (filters.budget && activity.budget.includes(filters.budget)) score += 3;
  if (matchesLocation(activity, filters.locationType)) score += filters.locationType ? 2 : 0;
  if (filters.energyLevel && activity.energyLevel.includes(filters.energyLevel)) score += 2;
  if (filters.timeOfDay && activity.timeOfDay.includes(filters.timeOfDay)) score += 2;
  if (matchesWeather(activity, filters.weather)) score += filters.weather && filters.weather !== 'Any' ? 1 : 0;

  return score;
};

export const getMatchingActivity = (
  allActivities: Activity[],
  filters: ActivityFilters,
  excludedActivityId?: string,
): Activity | null => {
  if (allActivities.length === 0) {
    return null;
  }

  const pool = allActivities.filter((activity) => activity.id !== excludedActivityId);
  const availableActivities = pool.length > 0 ? pool : allActivities;

  const exactMatches = availableActivities.filter((activity) => {
    const occasionMatch = !filters.occasion || activity.occasion.includes(filters.occasion);
    const budgetMatch = !filters.budget || activity.budget.includes(filters.budget);
    const locationMatch = matchesLocation(activity, filters.locationType);
    const energyMatch = !filters.energyLevel || activity.energyLevel.includes(filters.energyLevel);
    const timeMatch = !filters.timeOfDay || activity.timeOfDay.includes(filters.timeOfDay);
    const weatherMatch = matchesWeather(activity, filters.weather);

    return occasionMatch && budgetMatch && locationMatch && energyMatch && timeMatch && weatherMatch;
  });

  if (exactMatches.length > 0) {
    return getRandomItem(exactMatches);
  }

  const scoredActivities = availableActivities
    .map((activity) => ({ activity, score: scoreActivity(activity, filters) }))
    .sort((a, b) => b.score - a.score);

  const highestScore = scoredActivities[0]?.score ?? 0;
  const relaxedMatches = scoredActivities
    .filter((item) => item.score === highestScore && highestScore > 0)
    .map((item) => item.activity);

  return getRandomItem(relaxedMatches.length > 0 ? relaxedMatches : availableActivities);
};
