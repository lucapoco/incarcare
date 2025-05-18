import React from 'react';
import { Award, Target, TrendingUp } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { useUser } from '../contexts/UserContext';

const Progress: React.FC = () => {
  const { recoveryProfile } = useUser();

  const achievements = [
    {
      title: '7 Days Milestone',
      description: 'Completed your first week of recovery',
      date: '2024-05-10',
      icon: Award,
    },
    {
      title: 'Support Champion',
      description: 'Attended 5 support sessions',
      date: '2024-05-15',
      icon: Target,
    },
    {
      title: 'Goal Setter',
      description: 'Set and achieved your first recovery goal',
      date: '2024-05-18',
      icon: TrendingUp,
    },
  ];

  const weeklyProgress = [
    { day: 'Monday', completed: true },
    { day: 'Tuesday', completed: true },
    { day: 'Wednesday', completed: true },
    { day: 'Thursday', completed: true },
    { day: 'Friday', completed: false },
    { day: 'Saturday', completed: false },
    { day: 'Sunday', completed: false },
  ];

  const monthlyGoals = [
    { goal: 'Complete 30 days sober', progress: 75 },
    { goal: 'Attend 8 support meetings', progress: 60 },
    { goal: 'Complete mindfulness course', progress: 40 },
    { goal: 'Journal daily', progress: 90 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
          <p className="mt-1 text-gray-600">Track your recovery journey and achievements</p>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week's Progress</h2>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`
                  w-10 h-10 mx-auto rounded-full flex items-center justify-center
                  ${day.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}
                `}>
                  {day.completed ? '✓' : '·'}
                </div>
                <p className="mt-1 text-xs text-gray-600">{day.day.slice(0, 3)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Goals */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goals</h2>
          <div className="space-y-4">
            {monthlyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{goal.goal}</span>
                  <span className="text-gray-900 font-medium">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <achievement.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Achieved on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Progress; 