import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        About Me
      </h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Hi there! I'm a passionate full-stack developer with a love for creating
          beautiful, functional, and user-friendly applications. With experience in
          both front-end and back-end development, I enjoy tackling complex problems
          and turning ideas into reality.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          My Journey
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          I started my coding journey in college and have been continuously learning
          and growing since then. I've worked on various projects, from small websites
          to complex enterprise applications, always focusing on writing clean,
          maintainable code.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          What I Do
        </h2>
        <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300 mb-6">
          <li>Develop responsive web applications</li>
          <li>Create efficient backend systems</li>
          <li>Design user-friendly interfaces</li>
          <li>Optimize application performance</li>
          <li>Write clean, maintainable code</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          My Approach
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          I believe in writing clean, efficient code that's not just functional but also
          maintainable and scalable. My approach combines technical expertise with an
          eye for design, ensuring that the end product is both powerful and user-friendly.
        </p>
      </div>
    </div>
  );
};

export default About;