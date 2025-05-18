import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  priority: 'high' | 'medium' | 'low';
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  priority 
}) => {
  const getPriorityStyles = () => {
    switch(priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return 'border-l-4 border-gray-300';
    }
  };
  
  return (
    <div className={`bg-white rounded-r-lg shadow-sm p-4 ${getPriorityStyles()}`}>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <Link 
        to={buttonLink}
        className="inline-flex items-center text-blue-600 text-sm hover:text-blue-800"
      >
        {buttonText}
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
};

export default ActionCard;