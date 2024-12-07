import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';
import { handleAsync } from '../errorHandling';

const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load achievements from storage
  useEffect(() => {
    const loadAchievements = async () => {
      setLoading(true);
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
        const data = stored ? JSON.parse(stored) : [];
        setAchievements(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  // Save achievements to storage
  const saveAchievements = useCallback(async (newAchievements) => {
    const [, error] = await handleAsync(
      new Promise((resolve) => {
        localStorage.setItem(
          STORAGE_KEYS.ACHIEVEMENTS,
          JSON.stringify(newAchievements)
        );
        resolve();
      })
    );

    if (error) {
      setError(error);
      return false;
    }
    return true;
  }, []);

  // Add new achievement
  const addAchievement = useCallback(async (achievement) => {
    if (achievements.some((a) => a.id === achievement.id)) {
      return false;
    }

    const newAchievements = [...achievements, achievement];
    const success = await saveAchievements(newAchievements);
    
    if (success) {
      setAchievements(newAchievements);
    }
    
    return success;
  }, [achievements, saveAchievements]);

  return {
    achievements,
    loading,
    error,
    addAchievement,
  };
};

export default useAchievements;