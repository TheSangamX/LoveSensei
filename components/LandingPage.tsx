import React from 'react';

interface LandingPageProps {
  onStartChat: () => void;
}

const AiFeature: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white/50 rounded-lg h-full">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-600">{description}</p>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl w-[95vw] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl text-center border border-gray-200">
      <div className="text-5xl mb-4" role="img" aria-label="sparkling heart">💖</div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome to LoveSensei</h1>
      <p className="text-base sm:text-lg text-gray-600 mt-2 mb-6 sm:mb-8">Your private AI for modern love, dating, and shareable content.</p>

       <div className="w-full my-4 sm:my-6">
        <h2 className="text-xl font-bold text-gray-700 mb-6">Explore My Features</h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <AiFeature 
            icon="🤖"
            title="Chat-Based Coach"
            description="Ask anything about dating, relationships, and self-love."
          />
          <AiFeature 
            icon="💬"
            title="DM Generator"
            description="Craft the perfect text for your crush or a witty reply to your ex."
          />
           <AiFeature 
            icon="❤️"
            title="Caption Creator"
            description="Get viral captions & bios for Instagram, Tinder, or WhatsApp."
          />
          <AiFeature 
            icon="💔"
            title="Breakup Healer"
            description="Receive healing tips, motivational quotes, and a plan to move on."
          />
           <AiFeature 
            icon="✍️"
            title="Shayari & Quotes"
            description="Generate aesthetic quotes and shayari for your social media status."
          />
           <AiFeature 
            icon="🎬"
            title="Reel Script Maker"
            description="Get short, dialogue-based scripts for your next viral reel."
          />
           <AiFeature 
            icon="🧪"
            title="Compatibility Test"
            description="Get a fun compatibility report based on names or zodiacs."
          />
           <AiFeature 
            icon="🧭"
            title="Flag Detector"
            description="Analyze your situation for relationship red & green flags."
          />
           <AiFeature 
            icon="🧑‍⚖️"
            title="Should I Text Them?"
            description="Get a clear 'Yes' or 'No' on whether you should send that text."
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 max-w-md">
        🤫 No Signup, 100% Anonymous. Your chats are deleted when you leave.
      </p>

      <button
        onClick={onStartChat}
        className="mt-6 px-10 py-4 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-100"
      >
        Start Chatting Now
      </button>
    </div>
  );
};

export default LandingPage;