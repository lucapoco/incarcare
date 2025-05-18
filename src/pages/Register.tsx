import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { notifications } from '../lib/supabase';
import AccountForm from '../components/Registration/AccountForm';
import PersonalizationQuiz from '../components/Registration/PersonalizationQuiz';
import Summary from '../components/Registration/Summary';

interface AccountData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  country: string;
}

interface QuizData {
  addiction: string;
  goal: string;
  duration: string;
  frequency: string;
  motivation: number;
  support: string;
  helpTypes: string[];
  startDate?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, createProfile, createRecoveryProfile } = useUser();
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccountSubmit = (data: AccountData) => {
    console.log('Account data submitted:', data);
    setAccountData(data);
    setStep(2);
  };

  const handleQuizSubmit = (data: QuizData) => {
    console.log('Quiz data submitted:', data);
    setQuizData(data);
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    if (!accountData || !quizData) {
      console.error('Missing required data:', { accountData, quizData });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    console.log('Starting registration process...');

    try {
      // Step 1: Create the user account
      console.log('Step 1: Creating user account...');
      const { error: signUpError, data } = await signUp(accountData.email, accountData.password);
      
      if (signUpError) {
        console.error('Signup error:', signUpError);
        if (signUpError.message === 'User already registered' || 
            (signUpError as any)?.code === 'user_already_exists') {
          throw new Error('An account with this email already exists. Please sign in instead.');
        }
        throw signUpError;
      }

      if (!data?.user?.id) {
        console.error('No user ID returned from signup');
        throw new Error('Failed to create account. Please try again.');
      }

      const userId = data.user.id;
      console.log('User account created successfully:', userId);

      // Step 2: Create the user profile
      console.log('Step 2: Creating user profile...');
      const { error: profileError } = await createProfile(userId, {
        full_name: accountData.fullName,
        username: accountData.username,
        email: accountData.email,
        age: accountData.age,
        country: accountData.country
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        if (profileError.message?.includes('unique constraint')) {
          throw new Error('This username is already taken. Please choose another one.');
        }
        throw profileError;
      }

      // Step 3: Create the recovery profile
      console.log('Step 3: Creating recovery profile...');
      console.log('Recovery profile data:', {
        addiction_type: quizData.addiction,
        goal: quizData.goal,
        duration: quizData.duration,
        frequency: quizData.frequency,
        motivation_level: quizData.motivation,
        support_level: quizData.support,
        help_types: quizData.helpTypes,
        start_date: quizData.startDate
      });
      
      const { error: recoveryError } = await createRecoveryProfile(userId, {
        addiction_type: quizData.addiction,
        goal: quizData.goal,
        duration: quizData.duration,
        frequency: quizData.frequency,
        motivation_level: quizData.motivation,
        support_level: quizData.support,
        help_types: quizData.helpTypes,
        start_date: quizData.startDate
      });
      
      if (recoveryError) {
        console.error('Recovery profile creation error:', recoveryError);
        throw recoveryError;
      }

      // Step 4: Create welcome notification
      console.log('Step 4: Creating welcome notification...');
      const { error: notificationError } = await notifications.create({
        user_id: userId,
        title: 'Welcome to Your Recovery Journey!',
        message: `Welcome ${accountData.fullName}! Your account has been created successfully. We're here to support your recovery journey.`,
        type: 'success'
      });

      if (notificationError) {
        console.error('Notification creation error:', notificationError);
        // Don't throw error here as it's not critical
      }

      console.log('Registration completed successfully!');

      // If everything is successful, show success message and redirect
      navigate('/dashboard', { 
        state: { 
          message: `Welcome ${accountData.fullName}! Your account has been created successfully. We're here to support your recovery journey.`,
          type: 'success'
        }
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Handle specific error cases
      if (error.message?.includes('already exists') || 
          error.message?.includes('already registered') ||
          error?.code === 'user_already_exists') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.message?.includes('username is already taken')) {
        setError('This username is already taken. Please choose another one.');
      } else {
        setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
      }
      
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountForm onSubmit={handleAccountSubmit} />;
      case 2:
        return (
          <PersonalizationQuiz
            onSubmit={handleQuizSubmit}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return accountData && quizData ? (
          <Summary
            data={{
              account: {
                fullName: accountData.fullName,
                username: accountData.username,
                email: accountData.email,
                age: accountData.age,
                country: accountData.country
              },
              quiz: quizData
            }}
            onEdit={() => setStep(1)}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Create Your Account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1
            ? "Let's get started with your recovery journey"
            : step === 2
            ? "Help us personalize your experience"
            : "Review your information"}
        </p>
      </div>

      {error && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((number) => (
            <React.Fragment key={number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {number}
                </div>
                <span
                  className={`mt-2 text-xs ${
                    step >= number ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {number === 1
                    ? 'Account'
                    : number === 2
                    ? 'Profile'
                    : 'Review'}
                </span>
              </div>
              {number < 3 && (
                <div
                  className={`flex-1 h-0.5 ${
                    step > number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Register;