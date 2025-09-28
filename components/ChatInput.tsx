
import React from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onOpenFeatures: () => void;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

const FeaturesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.981l-1.618 1.618a.75.75 0 0 1-1.06 0l-1.618-1.618a.75.75 0 0 1 0-1.06l1.618-1.618a.75.75 0 0 1 1.06 0l1.618 1.618a.75.75 0 0 1-.981.981A8.97 8.97 0 0 0 15 18a9 9 0 0 0-9-9 8.97 8.97 0 0 0-.69 3.463a.75.75 0 0 1-.981.981L2.71 11.833a.75.75 0 0 1 0-1.06l1.618-1.618a.75.75 0 0 1 1.06 0l1.618 1.618a.75.75 0 0 1-.981.981A8.97 8.97 0 0 0 6 9a9 9 0 0 0-9-9 8.97 8.97 0 0 0 3.463.69a.75.75 0 0 1 .981-.981L1.833 2.71a.75.75 0 0 1-1.06 0L.155 4.328a.75.75 0 0 1 0 1.06l1.618 1.618a.75.75 0 0 1 1.06 0L4.45 5.388a.75.75 0 0 1 0-1.06L2.832 2.71a.75.75 0 0 1 .981-.981C4.59 1.295 5.253 1 6 1a9 9 0 0 1 9 9 8.97 8.97 0 0 1-.69 3.463a.75.75 0 0 1-.981.981l-1.618-1.618a.75.75 0 0 1 0-1.06l1.618-1.618a.75.75 0 0 1 1.06 0l1.618 1.618a.75.75 0 0 1-.981.981A8.97 8.97 0 0 1 15 15a9 9 0 0 1-9-9 8.97 8.97 0 0 1 .69-3.463a.75.75 0 0 1 .819-.162Z" clipRule="evenodd" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSendMessage, isLoading, onOpenFeatures }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSendMessage(value);
      onChange('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="p-4 bg-white/50 border-t border-rose-100">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onOpenFeatures}
          className="p-3 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Open features menu"
        >
          <FeaturesIcon />
        </button>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask LoveSensei anything..."
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none resize-none"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
