import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, BookOpen, Shield } from 'lucide-react';
import HeroSection from '../components/Landing/HeroSection';
import FeatureCard from '../components/Landing/FeatureCard';
import TestimonialCard from '../components/Landing/TestimonialCard';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Recovery Road Helps You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Sparkles className="w-10 h-10 text-blue-500" />}
              title="AI Support 24/7" 
              description="Access our AI counseling chatbot anytime you need support, day or night."
              animationType="pulse"
            />
            <FeatureCard 
              icon={<Heart className="w-10 h-10 text-green-500" />}
              title="Personalized Recovery" 
              description="Get a customized recovery plan based on your specific situation and goals."
              animationType="float"
            />
            <FeatureCard 
              icon={<BookOpen className="w-10 h-10 text-purple-500" />}
              title="Educational Resources" 
              description="Access our library of expert resources on multiple addiction types."
              animationType="spin"
            />
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-red-500" />}
              title="Complete Privacy" 
              description="Your data is protected with medical-grade encryption and privacy controls."
              animationType="pulse"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Recovery Road helped me stay on track when I couldn't access in-person meetings. The 24/7 support made all the difference."
              author="Michael K."
              role="In recovery for 2 years"
            />
            <TestimonialCard 
              quote="The personalized plan helped me understand my triggers and develop healthier coping mechanisms. I'm grateful for this platform."
              author="Sarah L."
              role="In recovery for 8 months"
            />
            <TestimonialCard 
              quote="Having resources and support available on my phone meant I could get help exactly when I needed it most."
              author="James T."
              role="In recovery for 1 year"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Recovery Journey Today</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">Join thousands of individuals who have found support, guidance, and hope on their path to recovery.</p>
          <Link to="/register" className="inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;