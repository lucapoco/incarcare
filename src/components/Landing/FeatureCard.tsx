import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationType?: 'float' | 'pulse' | 'spin';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, animationType = 'float' }) => {
  const getAnimationClass = () => {
    switch (animationType) {
      case 'float':
        return 'animate-float';
      case 'pulse':
        return 'animate-pulse-custom';
      case 'spin':
        return 'animate-spin-slow';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className={`mb-4 ${getAnimationClass()}`}>{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;