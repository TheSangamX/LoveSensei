import React from 'react';
import { ChatBackgroundTheme } from '../types';
import { CHAT_BACKGROUND_THEMES } from '../constants';

interface ChatBackgroundSelectorProps {
  onClose: () => void;
  onChatBackgroundChange: (className: string) => void;
  currentChatBackground: string;
}

const ChatBackgroundSelector: React.FC<ChatBackgroundSelectorProps> = ({ onClose, onChatBackgroundChange, currentChatBackground }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Choose Chat Background</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Select a background for the chat area.</p>

        <div className="grid grid-cols-2 gap-4">
          {CHAT_BACKGROUND_THEMES.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                onChatBackgroundChange(theme.className);
                onClose();
              }}
              className="relative w-full h-24 rounded-lg flex flex-col items-center justify-end p-2 text-gray-800 font-semibold transition-transform transform hover:scale-105 focus:outline-none overflow-hidden border"
            >
              <div className={`absolute inset-0 ${theme.className}`}></div>
              <div className={`absolute inset-0 rounded-lg border-4 transition-colors ${currentChatBackground === theme.className ? 'border-rose-500' : 'border-transparent'}`}></div>
              <span className="relative z-10 px-2 py-1 bg-white/70 rounded-md">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBackgroundSelector;