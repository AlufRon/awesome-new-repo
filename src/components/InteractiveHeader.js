import React, { useState, useEffect } from 'react';

const titles = [
  'a Code Wizard! ✨',
  'a Frontend Architect 🏗️',
  'a Backend Explorer 🚀',
  'a UX Craftsman 🎨'
];

const InteractiveHeader = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let timeoutId;

    const typeText = () => {
      if (currentIndex < titles[titleIndex].length) {
        currentText += titles[titleIndex][currentIndex];
        setDisplayText(currentText);
        currentIndex++;
        timeoutId = setTimeout(typeText, 100);
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(eraseText, 2000);
      }
    };

    const eraseText = () => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setDisplayText(currentText);
        timeoutId = setTimeout(eraseText, 50);
      } else {
        setIsTyping(true);
        setTitleIndex((prev) => (prev + 1) % titles.length);
        currentIndex = 0;
        timeoutId = setTimeout(typeText, 500);
      }
    };

    timeoutId = setTimeout(typeText, 500);

    return () => clearTimeout(timeoutId);
  }, [titleIndex]);

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Hey, I'm{' '}
        <span className="text-indigo-600 dark:text-indigo-400 inline-block min-w-[280px] text-left">
          {displayText}
          {isTyping && (
            <span className="animate-pulse ml-1">|</span>
          )}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        A passionate full-stack developer crafting beautiful and functional web experiences.
      </p>
    </div>
  );
};

export default InteractiveHeader;