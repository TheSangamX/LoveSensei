import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import LandingPage from './components/LandingPage';
import { BACKGROUND_THEMES } from './constants';

const App: React.FC = () => {
  const [backgroundClass, setBackgroundClass] = useState(BACKGROUND_THEMES[0].className);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const savedBg = localStorage.getItem('background-theme');
    if (savedBg && BACKGROUND_THEMES.some(theme => theme.className === savedBg)) {
      setBackgroundClass(savedBg);
    }
  }, []);

  const handleBackgroundChange = (newClassName: string) => {
    setBackgroundClass(newClassName);
    localStorage.setItem('background-theme', newClassName);
  };

  return (
    <div className={`h-screen w-screen flex items-center justify-center transition-all duration-500 ${backgroundClass}`}>
      {showChat ? (
        <ChatInterface
          onBackgroundChange={handleBackgroundChange}
          currentBackground={backgroundClass}
        />
      ) : (
        <LandingPage onStartChat={() => setShowChat(true)} />
      )}
    </div>
  );
};

export default App;