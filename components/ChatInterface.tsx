import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MessageRole, Language, Avatar } from '../types';
import { startLoveSenseiChat } from '../services/geminiService';
import Header from './Header';
import Message from './Message';
import ChatInput from './ChatInput';
import { Chat } from '@google/genai';
import TypingIndicator from './TypingIndicator';
import AvatarSelector from './AvatarSelector';
import { CHAT_BACKGROUND_THEMES } from '../constants';
import SettingsModal from './SettingsModal';
import SuggestionChips from './SuggestionChips';
import FeaturesModal from './FeaturesModal';

const defaultUserAvatar: Avatar = { type: 'emoji', value: '👤' };
const defaultModelAvatar: Avatar = { type: 'emoji', value: '❤️' };

interface ChatInterfaceProps {
  onBackgroundChange: (className: string) => void;
  currentBackground: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBackgroundChange, currentBackground }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('english');
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [userAvatar, setUserAvatar] = useState<Avatar>(defaultUserAvatar);
  const [modelAvatar, setModelAvatar] = useState<Avatar>(defaultModelAvatar);
  const [avatarSelectorTarget, setAvatarSelectorTarget] = useState<'user' | 'model' | null>(null);
  
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [chatBackgroundClass, setChatBackgroundClass] = useState(CHAT_BACKGROUND_THEMES[0].className);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputText, setInputText] = useState('');


  useEffect(() => {
    const savedBg = localStorage.getItem('chat-background-theme');
    if (savedBg && CHAT_BACKGROUND_THEMES.some(theme => theme.className === savedBg)) {
      setChatBackgroundClass(savedBg);
    }
  }, []);

  const handleChatBackgroundChange = (newClassName: string) => {
    setChatBackgroundClass(newClassName);
    localStorage.setItem('chat-background-theme', newClassName);
  };
  
  const loadAvatar = (key: string, setter: (avatar: Avatar) => void, defaultValue: Avatar) => {
    try {
      const savedAvatar = localStorage.getItem(key);
      if (savedAvatar) {
        setter(JSON.parse(savedAvatar));
      }
    } catch (error) {
      console.error(`Failed to load avatar from localStorage for key: ${key}`, error);
      setter(defaultValue);
    }
  };
  
  const saveAvatar = (key: string, avatar: Avatar) => {
    try {
      localStorage.setItem(key, JSON.stringify(avatar));
    } catch (error) {
      console.error(`Failed to save avatar to localStorage for key: ${key}`, error);
    }
  };

  useEffect(() => {
    loadAvatar('user-avatar', setUserAvatar, defaultUserAvatar);
    loadAvatar('model-avatar', setModelAvatar, defaultModelAvatar);
  }, []);

  useEffect(() => {
    saveAvatar('user-avatar', userAvatar);
  }, [userAvatar]);

  useEffect(() => {
    saveAvatar('model-avatar', modelAvatar);
  }, [modelAvatar]);

  const initializeChat = useCallback(() => {
    try {
      chatRef.current = startLoveSenseiChat(language);
      
      const initialGreeting = language === 'english' 
        ? "Hey there! I'm LoveSensei ✨ Your go-to AI for all things heart-related. What's on your mind today? 😊"
        : "Namaste! Main hoon LoveSensei ✨ aapke dil ke saare mamlon ke liye. Aaj aapke mann mein kya hai? 😊";

      setMessages([
        {
          id: `init-${language}-${Date.now()}`,
          role: MessageRole.MODEL,
          content: initialGreeting,
        },
      ]);
      setShowSuggestions(true); // Show suggestions for new chat
    } catch (err) {
      console.error("Initialization error:", err);
      setError("Failed to initialize the chat.");
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    setIsLoading(true);
    initializeChat();
  }, [initializeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = useCallback(async (text: string) => {
    setShowSuggestions(false);
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content: text,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: MessageRole.MODEL, content: "" }]);

    try {
      if (!chatRef.current) {
        throw new Error("Chat not initialized");
      }
      const stream = await chatRef.current.sendMessageStream({ message: text });

      let fullResponse = "";
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, content: fullResponse } : msg
          )
        );
      }
    } catch (err) {
      console.error("Error sending message to Gemini:", err);
      const errorMessage = language === 'english' 
        ? "Oh no, my heart-wires are a bit tangled right now. 💔 Could you try asking that again in a moment?"
        : "Oh no, mere dil ke taar thode ulajh gaye hain. 💔 Kya aap thodi der mein phir se pooch sakte hain?";
      
      setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, content: errorMessage } : msg
          )
        );
      setError("Failed to get a response.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language]);
  
  const handleLanguageChange = useCallback((newLang: Language) => {
    if (newLang !== language && !isLoading) {
      setLanguage(newLang);
    }
  }, [language, isLoading]);

  const handleAvatarChange = (newAvatar: Avatar) => {
    if (avatarSelectorTarget === 'user') {
      setUserAvatar(newAvatar);
    } else if (avatarSelectorTarget === 'model') {
      setModelAvatar(newAvatar);
    }
    setAvatarSelectorTarget(null);
  };

  const handleSelectFeature = (template: string) => {
    setInputText(template);
    setIsFeaturesModalOpen(false);
  };

  return (
    <div className="flex flex-col h-[95vh] w-[95vw] max-w-2xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {avatarSelectorTarget && (
        <AvatarSelector 
          onClose={() => setAvatarSelectorTarget(null)} 
          onAvatarChange={handleAvatarChange} 
        />
      )}
      {isSettingsModalOpen && (
        <SettingsModal
          onClose={() => setIsSettingsModalOpen(false)}
          onBackgroundChange={onBackgroundChange}
          currentBackground={currentBackground}
          onChatBackgroundChange={handleChatBackgroundChange}
          currentChatBackground={chatBackgroundClass}
        />
      )}
      {isFeaturesModalOpen && (
        <FeaturesModal
          onClose={() => setIsFeaturesModalOpen(false)}
          onSelectFeature={handleSelectFeature}
        />
      )}
      <Header 
        language={language} 
        onLanguageChange={handleLanguageChange} 
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />
      <div className={`flex-1 p-6 overflow-y-auto transition-colors duration-300 ${chatBackgroundClass}`}>
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              userAvatar={userAvatar}
              modelAvatar={modelAvatar}
              onUserAvatarClick={() => setAvatarSelectorTarget('user')}
              onModelAvatarClick={() => setAvatarSelectorTarget('model')}
            />
          ))}
          {isLoading && messages[messages.length - 1]?.role === MessageRole.USER && <TypingIndicator avatar={modelAvatar} />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {error && <p className="text-center text-red-500 text-sm pb-2">{error}</p>}
      {showSuggestions && <SuggestionChips onSelectSuggestion={handleSendMessage} language={language} />}
      <ChatInput 
        value={inputText}
        onChange={setInputText}
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        onOpenFeatures={() => setIsFeaturesModalOpen(true)}
      />
    </div>
  );
};

export default ChatInterface;
