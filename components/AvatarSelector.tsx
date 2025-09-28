import React, { useRef } from 'react';
import { Avatar } from '../types';
import { PREDEFINED_AVATARS } from '../constants';

interface AvatarSelectorProps {
  onClose: () => void;
  onAvatarChange: (avatar: Avatar) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onClose, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange({ type: 'url', value: reader.result as string });
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Choose Your Avatar</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Select a predefined avatar or upload your own.</p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {PREDEFINED_AVATARS.map((avatar) => (
            <button
              key={avatar.value}
              onClick={() => {
                onAvatarChange(avatar);
                onClose();
              }}
              className="aspect-square flex items-center justify-center text-3xl bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={`Select avatar ${avatar.value}`}
            >
              {avatar.value}
            </button>
          ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={triggerFileUpload}
          className="w-full bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default AvatarSelector;
