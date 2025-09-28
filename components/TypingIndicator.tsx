import React from 'react';
import { Avatar } from '../types';

interface TypingIndicatorProps {
  avatar: Avatar;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ avatar }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden shrink-0">
         {avatar.type === 'url' ? (
            <img src={avatar.value} alt="LoveSensei is typing" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl bg-gradient-to-br from-rose-400 to-red-500 w-full h-full flex items-center justify-center">
                {avatar.value}
            </span>
          )}
      </div>
      <div className="flex items-center space-x-1.5 p-3 bg-rose-50 border border-rose-200 rounded-2xl rounded-tl-none">
        <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;