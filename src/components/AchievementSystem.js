import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Zap } from 'lucide-react';

const achievements = [
  {
    id: 'portfolio_visit',
    title: 'Portfolio Explorer',
    icon: Trophy,
    description: 'Visited all sections of the portfolio',
    condition: (stats) => stats.visitedPages.length >= 6,
  },
  {
    id: 'code_viewer',
    title: 'Code Enthusiast',
    icon: Star,
    description: 'Viewed project source code',
    condition: (stats) => stats.projectsViewed >= 1,
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    icon: Award,
    description: 'Visited during night hours',
    condition: (stats) => {
      const hour = new Date().getHours();
      return hour >= 20 || hour <= 5;
    },
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    icon: Zap,
    description: 'Spent time reading about skills',
    condition: (stats) => stats.timeOnSkillsPage >= 30,
  },
];

const AchievementPopup = ({ achievement, onClose }) => (
  <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm animate-slide-up">
    <div className="flex items-center gap-3">
      <achievement.icon className="text-yellow-500" size={24} />
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      ×
    </button>
  </div>
);

const AchievementSystem = () => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('portfolio_stats');
    return saved ? JSON.parse(saved) : {
      visitedPages: [],
      projectsViewed: 0,
      timeOnSkillsPage: 0,
      unlockedAchievements: [],
    };
  });

  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    // Save stats to localStorage whenever they change
    localStorage.setItem('portfolio_stats', JSON.stringify(stats));

    // Check for new achievements
    achievements.forEach(achievement => {
      if (!stats.unlockedAchievements.includes(achievement.id) && achievement.condition(stats)) {
        setStats(prev => ({
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, achievement.id]
        }));
        setNewAchievement(achievement);
      }
    });
  }, [stats]);

  useEffect(() => {
    // Clear achievement popup after 5 seconds
    if (newAchievement) {
      const timeout = setTimeout(() => setNewAchievement(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [newAchievement]);

  const updateStats = (update) => {
    setStats(prev => ({
      ...prev,
      ...update
    }));
  };

  return (
    <>
      {newAchievement && (
        <AchievementPopup
          achievement={newAchievement}
          onClose={() => setNewAchievement(null)}
        />
      )}
    </>
  );
};

export { AchievementSystem, achievements };
export const useAchievements = () => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('portfolio_stats');
    return saved ? JSON.parse(saved) : {
      visitedPages: [],
      projectsViewed: 0,
      timeOnSkillsPage: 0,
      unlockedAchievements: [],
    };
  });

  const updateStats = (update) => {
    setStats(prev => {
      const newStats = { ...prev, ...update };
      localStorage.setItem('portfolio_stats', JSON.stringify(newStats));
      return newStats;
    });
  };

  return { stats, updateStats };
};