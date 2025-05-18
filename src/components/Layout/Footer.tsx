import React from 'react';
import { LifeBuoy, Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <LifeBuoy className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-xl">Recovery Road</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering individuals on their journey to recovery through technology, community, and evidence-based support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zM9 9.109c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zM17 16h-2v-3.501c0-.753-.255-1.499-1.296-1.499-.824 0-1.293.534-1.293 1.499V16h-2v-6h2v1.447c.386-.584 1.156-1.447 2.348-1.447 1.429 0 2.241 1.141 2.241 3v3z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition-colors">Get Support</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
            </ul>
          </div>
          
          {/* Emergency Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Emergency Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>National Helpline: 1-800-662-HELP (4357)</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Suicide Prevention: 988</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Crisis Text Line: Text HOME to 741741</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors group">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span className="group-hover:underline">Find Local Treatment Centers</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@recoveryroad.com" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@recoveryroad.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+18005551234" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (800) 555-1234</span>
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Join Our Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Recovery Road. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;