import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface QuizFormData {
  addiction: string;
  goal: string;
  duration: string;
  frequency: string;
  motivation: number;
  support: string;
  helpTypes: string[];
  startDate?: string;
}

interface PersonalizationQuizProps {
  onSubmit: (data: QuizFormData) => void;
  onBack: () => void;
}

const PersonalizationQuiz: React.FC<PersonalizationQuizProps> = ({ onSubmit, onBack }) => {
  const { control, handleSubmit, watch } = useForm<QuizFormData>({
    defaultValues: {
      helpTypes: [],
    }
  });

  const addictionTypes = [
    'Substance Addiction',
    'Alcohol Addiction',
    'Technology Addiction',
    'Gambling Addiction',
    'Smoking Addiction'
  ];

  const goals = [
    'Quit completely',
    'Reduce usage gradually',
    'Understand and track my habits',
    'Learn and stay informed',
    'Support someone else'
  ];

  const durations = [
    'Less than 3 months',
    '3 to 12 months',
    '1 to 5 years',
    'Over 5 years'
  ];

  const frequencies = [
    'Daily',
    'Several times a week',
    'Weekly',
    'Occasionally',
    'I\'ve already quit, just need support'
  ];

  const supportLevels = [
    'Yes, strong support',
    'Some support',
    'Not really',
    'Prefer not to say'
  ];

  const helpOptions = [
    'Daily motivation or reminders',
    'A private place to track progress',
    'Tips and coping strategies',
    'Connection to a support community',
    'Emergency help when struggling'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Addiction Type */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Which addiction are you focusing on?</h3>
        <div className="space-y-2">
          <Controller
            name="addiction"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="space-y-2">
                {addictionTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      {...field}
                      value={type}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Goal */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">What is your main goal with this app?</h3>
        <div className="space-y-2">
          <Controller
            name="goal"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="space-y-2">
                {goals.map((goal) => (
                  <label key={goal} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      {...field}
                      value={goal}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900">{goal}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">How long have you been struggling with this addiction?</h3>
        <div className="space-y-2">
          <Controller
            name="duration"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="space-y-2">
                {durations.map((duration) => (
                  <label key={duration} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      {...field}
                      value={duration}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900">{duration}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Frequency */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">How often do you engage in this behavior?</h3>
        <div className="space-y-2">
          <Controller
            name="frequency"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="space-y-2">
                {frequencies.map((frequency) => (
                  <label key={frequency} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      {...field}
                      value={frequency}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900">{frequency}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Motivation */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">How motivated are you to change right now?</h3>
        <Controller
          name="motivation"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    {...field}
                    value={level}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">
                    {level} – {
                      level === 1 ? 'Not ready' :
                      level === 2 ? 'Thinking about it' :
                      level === 3 ? 'Starting to plan' :
                      level === 4 ? 'Taking action' :
                      'Fully committed'
                    }
                  </span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Support */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Do you currently have support from others?</h3>
        <div className="space-y-2">
          <Controller
            name="support"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="space-y-2">
                {supportLevels.map((level) => (
                  <label key={level} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      {...field}
                      value={level}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900">{level}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Help Types */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">What kind of help do you want from this app?</h3>
        <div className="space-y-2">
          <Controller
            name="helpTypes"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                {helpOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      value={option}
                      checked={field.value.includes(option)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newValues = e.target.checked
                          ? [...field.value, value]
                          : field.value.filter((v: string) => v !== value);
                        field.onChange(newValues);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Start Date */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Would you like to set a start or quit date?</h3>
        <div className="space-y-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="date"
                    {...field}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </label>
                <p className="text-sm text-gray-500">Optional: Choose a date to start your recovery journey</p>
              </div>
            )}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default PersonalizationQuiz; 