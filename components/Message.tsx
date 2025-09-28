import React, { useState } from 'react';
import { ChatMessage, MessageRole, Avatar } from '../types';

interface MessageProps {
  message: ChatMessage;
  userAvatar: Avatar;
  modelAvatar: Avatar;
  onUserAvatarClick: () => void;
  onModelAvatarClick: () => void;
}

interface AvatarDisplayProps {
    avatar: Avatar;
    onClick?: () => void;
    gradient: string;
    ariaLabel: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-600 underline hover:text-rose-800 transition-colors"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};


const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ avatar, onClick, gradient, ariaLabel }) => {
  const isClickable = !!onClick;
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden shrink-0";
  const clickableClasses = isClickable ? "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all" : "";
  const ringColor = gradient.includes('rose') ? "hover:ring-rose-400" : "hover:ring-blue-400";


  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${ringColor}`}
      onClick={onClick}
      aria-label={isClickable ? `Change ${ariaLabel}` : ariaLabel}
      role={isClickable ? "button" : "img"}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={isClickable ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      {avatar.type === 'url' ? (
        <img src={avatar.value} alt={ariaLabel} className="w-full h-full object-cover" />
      ) : (
        <span className={`text-xl bg-gradient-to-br ${gradient} w-full h-full flex items-center justify-center`}>
            {avatar.value}
        </span>
      )}
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ message, userAvatar, modelAvatar, onUserAvatarClick, onModelAvatarClick }) => {
  const isModel = message.role === MessageRole.MODEL;
  const [copied, setCopied] = useState(false);

  if (!message.content) {
    return null;
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LoveSensei Advice',
          text: message.content,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      handleCopy();
      alert('Content copied to clipboard! You can now paste it to share.');
    }
  };

  return (
    <div className={`group flex items-start gap-3 ${!isModel && 'flex-row-reverse'}`}>
      {isModel ? (
        <AvatarDisplay 
            avatar={modelAvatar} 
            onClick={onModelAvatarClick} 
            gradient="from-rose-400 to-red-500"
            ariaLabel="LoveSensei avatar"
        />
      ) : (
        <AvatarDisplay 
            avatar={userAvatar} 
            onClick={onUserAvatarClick} 
            gradient="from-sky-400 to-blue-500"
            ariaLabel="User avatar"
        />
      )}
      <div
        className={`relative px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
          isModel
            ? 'bg-rose-50 border border-rose-200 text-gray-700 rounded-tl-none'
            : 'bg-blue-500 text-white rounded-tr-none'
        }`}
      >
        {isModel ? linkify(message.content) : message.content}
        {isModel && (
          <div className="absolute -bottom-3 right-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
                onClick={handleCopy}
                className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label={copied ? "Copied" : "Copy to clipboard"}
            >
                {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
            {navigator.share && (
                <button
                    onClick={handleShare}
                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label="Share message"
                >
                    <ShareIcon />
                </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;