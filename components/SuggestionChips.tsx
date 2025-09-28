import React from 'react';
import { Language } from '../types';

interface SuggestionChipsProps {
  onSelectSuggestion: (suggestion: string) => void;
  language: Language;
}

const englishSuggestions = [
  'Should I text my ex? 🤔',
  'Help me get over my breakup 💔',
  'Write a cute text for my crush 😊',
  'Give me an Instagram caption about self-love ✨',
  'Give me a short reel script 🎬',
  'Tell me a love shayari ✍️',
];

const hinglishSuggestions = [
  'Kya mujhe ex ko text karna chahiye? 🤔',
  'Mere ex ko bhulne mein madad karo 💔',
  'Mere crush ke liye ek cute text likho 😊',
  'Self-love par Instagram caption do ✨',
  'Ek choti si reel script do 🎬',
  'Ek love shayari sunao ✍️',
];


const SuggestionChips: React.FC<SuggestionChipsProps> = ({ onSelectSuggestion, language }) => {
  const suggestions = language === 'hinglish' ? hinglishSuggestions : englishSuggestions;
  const promptText = language === 'hinglish' ? 'Yeh pooch kar try karein:' : 'Try asking:';
  
  return (
    <div className="px-4 pb-2 border-t border-rose-100 bg-white/50">
      <p className="text-xs text-gray-500 font-semibold mb-2 pt-2">{promptText}</p>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {suggestions.map((text) => (
          <button
            key={text}
            onClick={() => onSelectSuggestion(text)}
            className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-rose-200 transition-colors shrink-0"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionChips;
