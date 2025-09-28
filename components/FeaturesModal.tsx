import React from 'react';

interface FeaturesModalProps {
  onClose: () => void;
  onSelectFeature: (template: string) => void;
}

const FeatureButton: React.FC<{icon: string, title: string, description: string, onClick: () => void}> = ({ icon, title, description, onClick }) => (
    <button 
        onClick={onClick}
        className="w-full text-left p-4 bg-slate-100 rounded-lg transition-all duration-200 flex items-start space-x-4 hover:bg-white hover:shadow-md hover:-translate-y-px"
    >
        <div className="text-2xl mt-1" role="img" aria-label="feature icon">{icon}</div>
        <div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
    </button>
);

const FeaturesModal: React.FC<FeaturesModalProps> = ({ onClose, onSelectFeature }) => {
    
    const features = [
        {
            icon: '🧪',
            title: 'Love Compatibility Analyzer',
            description: 'Get a fun compatibility report for two people.',
            template: 'Analyze compatibility for NAME1 and NAME2'
        },
        {
            icon: '🧭',
            title: 'Red & Green Flag Detector',
            description: 'Find potential warnings and positives in a situation.',
            template: 'Find red flags and green flags in this situation: [describe your situation here]'
        },
        {
            icon: '🧑‍⚖️',
            title: 'Should I Text Them?',
            description: 'Get a clear "Yes" or "No" verdict with an explanation.',
            template: 'Should I text them? Here is the situation: [describe your situation here]'
        }
    ];

    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-900">AI Features</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close features">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <p className="text-sm text-gray-500 mb-6">Select a tool to start an analysis.</p>
        <div className="space-y-3">
            {features.map(feature => (
                <FeatureButton 
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    onClick={() => onSelectFeature(feature.template)}
                />
            ))}
        </div>
      </div>
    </div>
    );
};

export default FeaturesModal;
