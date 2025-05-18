import React from 'react';
import { BookOpen, FileText, Video, Podcast, ArrowRight } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  time: string;
  difficulty: string;
  content_url?: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getTypeIcon = () => {
    switch(resource.type) {
      case 'article':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-600" />;
      case 'audio':
        return <Podcast className="w-5 h-5 text-purple-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-green-600" />;
    }
  };
  
  const getDifficultyColor = () => {
    switch(resource.difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    if (resource.content_url) {
      window.open(resource.content_url, '_blank');
    }
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer"
      onClick={handleClick}
    >
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {getTypeIcon()}
            <span className="ml-2 text-sm text-gray-600 capitalize">{resource.type}</span>
          </div>
          <span className="text-xs text-gray-500">{resource.time}</span>
        </div>
        <h3 className="font-bold text-lg">{resource.title}</h3>
      </div>
      
      {/* Card Body */}
      <div className="p-4 flex-grow">
        <p className="text-gray-600 mb-4">{resource.description}</p>
        <div className="flex items-center mt-auto">
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}>
            {resource.difficulty}
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 capitalize">
            {resource.category.replace('-', ' ')}
          </span>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors">
          View Resource
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;