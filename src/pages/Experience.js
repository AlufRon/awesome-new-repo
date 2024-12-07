import React from 'react';

const TimelineItem = ({ year, title, company, description, technologies }) => {
  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-0 w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
      <div className="absolute left-1 top-4 h-full w-px bg-gray-300 dark:bg-gray-700"></div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{year}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <div className="text-lg text-indigo-600 dark:text-indigo-400 mb-2">{company}</div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      {technologies && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      year: '2022 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Lead development of enterprise web applications, mentored junior developers, and implemented CI/CD pipelines.',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'MongoDB']
    },
    {
      year: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Digital Innovations Ltd',
      description: 'Developed and maintained multiple client projects, worked with React, Node.js, and AWS cloud services.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
    },
    {
      year: '2018 - 2020',
      title: 'Frontend Developer',
      company: 'WebCraft Studio',
      description: 'Created responsive web applications using modern JavaScript frameworks and collaborated with UX designers.',
      technologies: ['JavaScript', 'React', 'HTML/CSS', 'Redux']
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
            technologies={exp.technologies}
          />
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Education
        </h2>
        <TimelineItem
          year="2014 - 2018"
          title="Bachelor of Science in Computer Science"
          company="Tech University"
          description="Studied computer science with a focus on software engineering and web development. Participated in various hackathons and coding competitions."
          technologies={['Java', 'Python', 'Data Structures', 'Algorithms']}
        />
      </div>
    </div>
  );
};

export default Experience;