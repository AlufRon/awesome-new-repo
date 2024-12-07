import React from 'react';

const TimelineItem = ({ year, title, company, description }) => {
  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-0 w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
      <div className="absolute left-1 top-4 h-full w-px bg-gray-300 dark:bg-gray-700"></div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{year}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <div className="text-lg text-indigo-600 dark:text-indigo-400 mb-2">{company}</div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      year: '2022 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Lead development of enterprise web applications, mentored junior developers, and implemented CI/CD pipelines.'
    },
    {
      year: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Digital Innovations Ltd',
      description: 'Developed and maintained multiple client projects, worked with React, Node.js, and AWS cloud services.'
    },
    {
      year: '2018 - 2020',
      title: 'Frontend Developer',
      company: 'WebCraft Studio',
      description: 'Created responsive web applications using modern JavaScript frameworks and collaborated with UX designers.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Work Experience
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            year={exp.year}
            title={exp.title}
            company={exp.company}
            description={exp.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;