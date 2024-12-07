import React, { useState } from 'react';

const ProjectCard = ({ title, description, tags, image, demoLink, githubLink }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'fullstack',
      image: '/api/placeholder/800/400',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com/example/project'
    },
    {
      title: 'Task Management App',
      description: 'A responsive task management application with real-time updates.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      category: 'frontend',
      image: '/api/placeholder/800/400',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com/example/project'
    },
    {
      title: 'API Gateway Service',
      description: 'A microservices API gateway built with Node.js and Express.',
      tags: ['Node.js', 'Express', 'Docker', 'Redis'],
      category: 'backend',
      image: '/api/placeholder/800/400',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com/example/project'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        My Projects
      </h1>

      <div className="flex justify-center mb-8 gap-4">
        {['all', 'frontend', 'backend', 'fullstack'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg ${filter === category 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} 
              capitalize transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;