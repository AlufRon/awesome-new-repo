import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Palette } from 'lucide-react';
import InteractiveHeader from '../components/InteractiveHeader';
import { particleAnimation, scrollAnimation } from '../utils/animations';

const RoleCard = ({ icon: Icon, title, description, onClick, isSelected }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-indigo-500 scale-105' : 'hover:scale-105'}`}
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon className="text-indigo-600 dark:text-indigo-400" size={24} />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const Home = () => {
  const canvasRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      // Initialize particle animation
      particleAnimation(canvas, {
        particleCount: 30,
        color: '#6366f1',
        speed: 0.5
      });

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const roles = [
    {
      icon: Code,
      title: 'Frontend Dev',
      description: 'Creating responsive and interactive user interfaces'
    },
    {
      icon: Database,
      title: 'Backend Dev',
      description: 'Building scalable and efficient server-side solutions'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive and beautiful user experiences'
    }
  ];

  return (
    <div className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 opacity-20 dark:opacity-10"
      />
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
        <InteractiveHeader />
        
        <div className="flex flex-col md:flex-row gap-4 mb-16">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {roles.map((role) => (
            <RoleCard
              key={role.title}
              {...role}
              isSelected={selectedRole === role.title}
              onClick={() => setSelectedRole(role.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;