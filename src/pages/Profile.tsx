import React, { useState } from 'react';
import { User, Bell, Shield, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { signOut } = useUser();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'privacy':
        return <PrivacyTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <ProfileTab />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Account</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 md:border-r border-gray-200">
            <nav className="p-4">
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profile Information</span>
              </button>
              
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="w-5 h-5 mr-3" />
                <span>Notifications</span>
              </button>
              
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('privacy')}
              >
                <Shield className="w-5 h-5 mr-3" />
                <span>Privacy & Security</span>
              </button>
              
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Account Settings</span>
              </button>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  const { user, profile, recoveryProfile, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    username: profile?.username || '',
    email: user?.email || '',
    age: profile?.age || '',
    country: profile?.country || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await updateProfile({
        full_name: formData.fullName,
        username: formData.username,
        age: parseInt(formData.age as string),
        country: formData.country
      });

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded transition duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {/* Profile Avatar */}
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-6 mr-4">
          <User className="w-12 h-12 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{profile?.full_name || 'User'}</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Recovery Information */}
      {recoveryProfile && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Recovery Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Started On</p>
              <p className="font-medium">
                {recoveryProfile.start_date ? new Date(recoveryProfile.start_date).toLocaleDateString() : 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recovery Type</p>
              <p className="font-medium">{recoveryProfile.addiction_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Goal</p>
              <p className="font-medium">{recoveryProfile.goal}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Support Level</p>
              <p className="font-medium">{recoveryProfile.support_level}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input 
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input 
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Your country"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  fullName: profile?.full_name || '',
                  username: profile?.username || '',
                  email: user?.email || '',
                  age: profile?.age || '',
                  country: profile?.country || ''
                });
              }}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

const NotificationsTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
      {/* Add notification settings here */}
    </div>
  );
};

const PrivacyTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>
      {/* Add privacy settings here */}
    </div>
  );
};

const SettingsTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      {/* Add account settings here */}
    </div>
  );
};

export default Profile;