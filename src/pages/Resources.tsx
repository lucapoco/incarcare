import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, FileText, Video, Podcast } from 'lucide-react';
import ResourceCard from '../components/Resources/ResourceCard';
import { resources } from '../lib/supabase';

const resourceCategories = [
  { id: 'all', label: 'All Resources' },
  { id: 'substance', label: 'Substance Addiction' },
  { id: 'alcohol', label: 'Alcohol Addiction' },
  { id: 'gambling', label: 'Gambling Addiction' },
  { id: 'technology', label: 'Technology Addiction' },
  { id: 'coping', label: 'Coping Strategies' },
  { id: 'relapse', label: 'Relapse Prevention' }
];

const resourceTypes = [
  { id: 'all', label: 'All Types', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'article', label: 'Articles', icon: <FileText className="w-4 h-4" /> },
  { id: 'video', label: 'Videos', icon: <Video className="w-4 h-4" /> },
  { id: 'audio', label: 'Podcasts', icon: <Podcast className="w-4 h-4" /> }
];

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [resourcesList, setResourcesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const data = await resources.get();
        setResourcesList(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);
  
  // Filter resources based on search, category, and type
  const filteredResources = resourcesList.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
      <p className="text-gray-600 mb-8">Explore our library of expert-reviewed content to support your recovery journey.</p>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {resourceCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {resourceTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">No resources found matching your criteria.</p>
            <button 
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Need Help Banner */}
      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Can't Find What You Need?</h2>
        <p className="text-gray-700 mb-4">Our team can help you find specific resources or connect you with additional support.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Contact Support Team
        </button>
      </div>
    </div>
  );
};

export default Resources;