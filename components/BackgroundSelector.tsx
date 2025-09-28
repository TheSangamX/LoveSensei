import React from 'react';
import { BackgroundTheme } from '../types';
import { BACKGROUND_THEMES } from '../constants';

interface BackgroundSelectorProps {
  onClose: () => void;
  onBackgroundChange: (className: string) => void;
  currentBackground: string;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ onClose, onBackgroundChange, currentBackground }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Choose a Mood</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Select a background that matches your vibe.</p>

        <div className="grid grid-cols-2 gap-4">
          {BACKGROUND_THEMES.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                onBackgroundChange(theme.className);
                onClose();
              }}
              className="relative w-full h-24 rounded-lg flex flex-col items-center justify-end p-2 text-white font-semibold transition-transform transform hover:scale-105 focus:outline-none"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
            >
              <div className={`absolute inset-0 rounded-lg ${theme.className}`}></div>
              <div className={`absolute inset-0 rounded-lg border-4 transition-colors ${currentBackground === theme.className ? 'border-rose-500' : 'border-transparent'}`}></div>
              <span className="relative z-10">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;
