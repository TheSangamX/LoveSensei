import React from 'react';
import { Language } from '../types';

// Icons
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-rose-500">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-1.383-.595A8.32 8.32 0 0 1 8.5 16.31c-1.076-1.076-1.587-2.482-1.638-3.799A4.75 4.75 0 0 1 9.5 8.5a4.75 4.75 0 0 1 4.242 2.653c.123.239.246.485.362.748.243.537.488 1.109.682 1.733A8.32 8.32 0 0 1 16.5 16.31c-.378.43-.807.818-1.282 1.15-.224.153-.455.297-.693.433a15.247 15.247 0 0 1-1.383.595l-.022.012-.007.004-.004.001a.752.752 0 0 1-.67-.006l-.003-.001Z" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500 hover:text-gray-800 transition-colors">
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903a.5.5 0 01-.353.852H17.647a.5.5 0 01-.354-.853l-1.903-1.903a7.5 7.5 0 11-9.288 9.288l1.903-1.903a.5.5 0 01.853.353v1.454a.5.5 0 01-.852.353l-1.903-1.903a7.5 7.5 0 01-3.364-12.548zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    </svg>
);


interface HeaderProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onOpenSettings }) => {
    return (
        <div className="p-4 bg-white/60 border-b border-rose-100 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
                <HeartIcon />
                <div>
                    <h1 className="text-xl font-bold text-gray-800">LoveSensei</h1>
                    <p className="text-sm text-gray-500">Your AI Relationship Coach</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-200 rounded-full p-1 text-sm">
                    <button
                        onClick={() => onLanguageChange('english')}
                        className={`px-3 py-1 rounded-full transition-colors ${language === 'english' ? 'bg-white shadow' : 'text-gray-600'}`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => onLanguageChange('hinglish')}
                        className={`px-3 py-1 rounded-full transition-colors ${language === 'hinglish' ? 'bg-white shadow' : 'text-gray-600'}`}
                    >
                        HI
                    </button>
                </div>
                <button onClick={onOpenSettings} aria-label="Open settings">
                    <SettingsIcon />
                </button>
            </div>
        </div>
    );
};

export default Header;
