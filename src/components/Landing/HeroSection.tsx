import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white animate-gradient bg-[length:400%_400%]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjQiPjxwYXRoIGQ9Ik01IDEwaDEwdjEwSDV6TTM1IDEwaDEwdjEwSDM1ek01IDM1aDEwdjEwSDV6TTM1IDM1aDEwdjEwSDM1eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-48 md:py-64 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-fade-in">
            Your Journey to Recovery Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-12 animate-fade-in animation-delay-300">
            24/7 AI-powered support, personalized recovery plans, and a community that understands. All in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in animation-delay-600">
            <Link 
              to="/register" 
              className="inline-block bg-white text-blue-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 text-center"
            >
              Start Now - It's Free
            </Link>
            <Link 
              to="/resources" 
              className="inline-block bg-transparent text-white border-2 border-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition duration-300 text-center"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto translate-y-1">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;