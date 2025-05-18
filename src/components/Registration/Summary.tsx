import React from 'react';

interface SummaryData {
  account: {
    fullName: string;
    username: string;
    email: string;
    age: number;
    country: string;
  };
  quiz: {
    addiction: string;
    goal: string;
    duration: string;
    frequency: string;
    motivation: number;
    support: string;
    helpTypes: string[];
    startDate?: string;
  };
}

interface SummaryProps {
  data: SummaryData;
  onEdit: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const Summary: React.FC<SummaryProps> = ({ data, onEdit, onSubmit, isSubmitting = false }) => {
  const { account, quiz } = data;

  const motivationLabels = {
    1: 'Not ready',
    2: 'Thinking about it',
    3: 'Starting to plan',
    4: 'Taking action',
    5: 'Fully committed'
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h2>
        
        {/* Account Information */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{account.fullName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900">{account.username}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{account.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="mt-1 text-sm text-gray-900">{account.age}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900">{account.country}</dd>
            </div>
          </dl>
        </div>

        {/* Quiz Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recovery Profile</h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Focus Area</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.addiction}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Main Goal</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.goal}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Duration of Struggle</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.duration}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Current Frequency</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.frequency}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Motivation Level</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {quiz.motivation} – {motivationLabels[quiz.motivation as keyof typeof motivationLabels]}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Support System</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.support}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Desired Help Types</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul className="list-disc pl-4 space-y-1">
                  {quiz.helpTypes.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </dd>
            </div>
            {quiz.startDate && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Start/Quit Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(quiz.startDate).toLocaleDateString()}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Edit Information
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

export default Summary; 