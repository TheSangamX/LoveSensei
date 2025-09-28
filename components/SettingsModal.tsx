import React, { useState } from 'react';
import { BACKGROUND_THEMES, CHAT_BACKGROUND_THEMES } from '../constants';

interface SettingsModalProps {
  onClose: () => void;
  onBackgroundChange: (className: string) => void;
  currentBackground: string;
  onChatBackgroundChange: (className: string) => void;
  currentChatBackground: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onBackgroundChange,
  currentBackground,
  onChatBackgroundChange,
  currentChatBackground,
}) => {
  const [view, setView] = useState<'main' | 'app' | 'chat'>('main');

  const renderMainView = () => (
    <>
      <div className="flex justify-between items-start mb-1">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">Customize your chat experience.</p>
      <div className="space-y-3">
        <button
          onClick={() => setView('app')}
          className="w-full text-left p-3 bg-slate-100 rounded-lg transition-all duration-200 flex items-center space-x-3 hover:bg-white hover:shadow-md hover:-translate-y-px"
        >
          <span className="text-xl" role="img" aria-label="artist palette">🎨</span>
          <span className="font-medium text-slate-700">Customize App Mood</span>
        </button>
        <button
          onClick={() => setView('chat')}
          className="w-full text-left p-3 bg-slate-100 rounded-lg transition-all duration-200 flex items-center space-x-3 hover:bg-white hover:shadow-md hover:-translate-y-px"
        >
          <span className="text-xl" role="img" aria-label="speech bubble">💬</span>
          <span className="font-medium text-slate-700">Customize Chat Background</span>
        </button>
      </div>
    </>
  );

  const renderAppBgView = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setView('main')} className="text-sm font-semibold text-gray-600 hover:text-gray-900">&larr; Back</button>
        <h2 className="text-lg font-bold text-gray-800">App Mood</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Select a background that matches your vibe.</p>
      <div className="grid grid-cols-2 gap-4">
        {BACKGROUND_THEMES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onBackgroundChange(theme.className)}
            className="relative w-full h-24 rounded-lg flex flex-col items-center justify-end p-2 text-white font-semibold transition-transform transform hover:scale-105 focus:outline-none"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
          >
            <div className={`absolute inset-0 rounded-lg ${theme.className}`}></div>
            <div className={`absolute inset-0 rounded-lg border-4 transition-colors ${currentBackground === theme.className ? 'border-rose-500' : 'border-transparent'}`}></div>
            <span className="relative z-10">{theme.name}</span>
          </button>
        ))}
      </div>
    </>
  );

  const renderChatBgView = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setView('main')} className="text-sm font-semibold text-gray-600 hover:text-gray-900">&larr; Back</button>
        <h2 className="text-lg font-bold text-gray-800">Chat Background</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Select a background for the chat area.</p>
      <div className="grid grid-cols-2 gap-4">
        {CHAT_BACKGROUND_THEMES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onChatBackgroundChange(theme.className)}
            className="relative w-full h-24 rounded-lg flex flex-col items-center justify-end p-2 text-gray-800 font-semibold transition-transform transform hover:scale-105 focus:outline-none overflow-hidden border"
          >
            <div className={`absolute inset-0 ${theme.className}`}></div>
            <div className={`absolute inset-0 rounded-lg border-4 transition-colors ${currentChatBackground === theme.className ? 'border-rose-500' : 'border-transparent'}`}></div>
            <span className="relative z-10 px-2 py-1 bg-white/70 rounded-md">{theme.name}</span>
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transition-all duration-300" onClick={(e) => e.stopPropagation()}>
        {view === 'main' && renderMainView()}
        {view === 'app' && renderAppBgView()}
        {view === 'chat' && renderChatBgView()}
      </div>
    </div>
  );
};

export default SettingsModal;