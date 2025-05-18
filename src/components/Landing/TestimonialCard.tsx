import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <svg className="w-10 h-10 text-blue-500 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8v12H0V14c0-2.21 1.79-4 4-4h2c0-1.105-.895-2-2-2V4c3.314 0 6 2.686 6 4zm12 0v12h-10V14c0-2.21 1.79-4 4-4h2c0-1.105-.895-2-2-2V4c3.314 0 6 2.686 6 4z" />
      </svg>
      <p className="text-gray-600 mb-4">{quote}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;