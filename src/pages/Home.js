import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Hey, I'm <span className="text-indigo-600 dark:text-indigo-400">Your Name</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        A passionate full-stack developer crafting beautiful and functional web experiences.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/projects"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
        >
          View My Work
          <ArrowRight size={20} />
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
        >
          Get in Touch
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Frontend Dev</h3>
          <p className="text-gray-600 dark:text-gray-300">Creating responsive and interactive user interfaces</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Backend Dev</h3>
          <p className="text-gray-600 dark:text-gray-300">Building scalable and efficient server-side solutions</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">UI/UX Design</h3>
          <p className="text-gray-600 dark:text-gray-300">Designing intuitive and beautiful user experiences</p>
        </div>
      </div>
    </div>
  );
};

export default Home;