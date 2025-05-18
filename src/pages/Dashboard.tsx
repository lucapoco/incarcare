import React, { useEffect, useState } from 'react';
import { 
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Target,
  Heart,
  AlertCircle,
  X
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { profile, recoveryProfile } = useUser();
  const location = useLocation();
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'success'
      });
    }
  }, [location.state]);

  // Calculate days since start
  const daysSinceStart = recoveryProfile?.start_date
    ? Math.floor((new Date().getTime() - new Date(recoveryProfile.start_date).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const stats = [
    {
      icon: Calendar,
      label: 'Days in Recovery',
      value: daysSinceStart,
      color: 'bg-blue-500',
    },
    {
      icon: Clock,
      label: 'Current Streak',
      value: '7 days',
      color: 'bg-green-500',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '3',
      color: 'bg-purple-500',
    },
    {
      icon: Heart,
      label: 'Support Sessions',
      value: '12',
      color: 'bg-red-500',
    },
  ];

  const goals = [
    'Complete 30 days sober',
    'Attend weekly support meetings',
    'Practice daily meditation',
    'Journal every evening',
  ];

  const upcomingEvents = [
    {
      title: 'Support Group Meeting',
      date: 'Tomorrow, 3:00 PM',
      type: 'Group Session',
    },
    {
      title: 'Wellness Check-in',
      date: 'Friday, 2:00 PM',
      type: 'Personal',
    },
    {
      title: 'Mindfulness Workshop',
      date: 'Saturday, 10:00 AM',
      type: 'Workshop',
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-lg ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex justify-between items-start">
            <p className={`text-sm ${
              notification.type === 'success' ? 'text-green-800' : 'text-blue-800'
            }`}>
              {notification.message}
            </p>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}
        </h1>
        <p className="mt-1 text-gray-600">
          Here's your recovery journey overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className={`${stat.color} rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Goals and Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Goals</h2>
          <ul className="space-y-3">
            {goals.map((goal, index) => (
              <li key={index} className="flex items-center">
                <Target className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;