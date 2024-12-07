import React from 'react';

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const skillsData = [
    { category: 'Frontend', skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 }
    ]},
    { category: 'Backend', skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'SQL', level: 85 },
      { name: 'MongoDB', level: 80 }
    ]},
    { category: 'Tools & Others', skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Linux', level: 80 }
    ]}
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Skills & Expertise
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category) => (
          <div key={category.category} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {category.category}
            </h2>
            {category.skills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Professional Development
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          I'm constantly learning and expanding my skillset. Currently exploring:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300">
          <li>Web3 Technologies</li>
          <li>Advanced React Patterns</li>
          <li>Cloud Architecture</li>
          <li>Machine Learning</li>
        </ul>
      </div>
    </div>
  );
};

export default Skills;