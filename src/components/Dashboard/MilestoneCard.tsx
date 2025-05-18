import React from 'react';

interface MilestoneCardProps {
  title: string;
  description: string;
  progress: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ title, description, progress }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow duration-300">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">Progress</span>
        <span className="text-xs font-medium">{progress}%</span>
      </div>
    </div>
  );
};

export default MilestoneCard;