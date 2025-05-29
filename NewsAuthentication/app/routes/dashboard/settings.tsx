import React, { useState } from 'react';
import {
  CpuChipIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  CogIcon,
  KeyIcon,
  PaintBrushIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CheckIcon,
  ChevronRightIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Profile settings
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    bio: 'Fact-checking enthusiast and researcher',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    securityAlerts: true,
    
    // Privacy settings
    profileVisibility: 'public',
    dataSharing: false,
    analyticsTracking: true,
    
    // Appearance settings
    theme: 'system',
    language: 'en',
    compactMode: false,
    
    // Security settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy & Safety', icon: ShieldCheckIcon },
    { id: 'appearance', label: 'Appearance', icon: PaintBrushIcon },
    { id: 'security', label: 'Security', icon: KeyIcon },
    { id: 'data', label: 'Data & Storage', icon: DocumentTextIcon },
    { id: 'help', label: 'Help & Support', icon: QuestionMarkCircleIcon },
  ];

  interface ProfileSettings {
    fullName: string;
    email: string;
    username: string;
    bio: string;
  }

  interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
    securityAlerts: boolean;
  }

  interface PrivacySettings {
    profileVisibility: string;
    dataSharing: boolean;
    analyticsTracking: boolean;
  }

  interface AppearanceSettings {
    theme: string;
    language: string;
    compactMode: boolean;
  }

  interface SecuritySettings {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: string;
  }

  type FormData = ProfileSettings &
    NotificationSettings &
    PrivacySettings &
    AppearanceSettings &
    SecuritySettings;

  interface Passwords {
    current: string;
    new: string;
    confirm: string;
  }

  const handleInputChange = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simulate save action
    console.log('Settings saved:', formData);
    // You would typically make an API call here
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Profile Settings</h2>
        <p className="text-slate-600">Manage your personal information and profile visibility.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-12 h-12 text-white" />
            </div>
            <button
              className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              title="Change profile picture"
              aria-label="Change profile picture"
            >
              <PaintBrushIcon className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-slate-800">{formData.fullName}</h3>
            <p className="text-slate-600">@{formData.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
              placeholder="Enter your full name"
              title="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
              placeholder="Enter your username"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              aria-label='email'
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors resize-none"
              placeholder="Tell us about yourself"
              title="Bio"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Notification Settings</h2>
        <p className="text-slate-600">Choose how you want to be notified about updates and activities.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="space-y-6">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account activity' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get instant notifications on your device' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of your fact-checking activities' },
            { key: 'securityAlerts', label: 'Security Alerts', desc: 'Get notified about important security events' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
              <div>
                <h4 className="font-medium text-slate-800">{item.label}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
              <button
                onClick={() => handleInputChange(item.key as keyof FormData, !formData[item.key as keyof FormData])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                  formData[item.key as keyof typeof formData] ? 'bg-sky-600' : 'bg-slate-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData[item.key as keyof typeof formData] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Security Settings</h2>
        <p className="text-slate-600">Manage your account security and authentication preferences.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwords.new}
              onChange={(e) => handlePasswordChange('new', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange('confirm', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
              placeholder="Confirm your new password"
              title="Confirm New Password"
            />
          </div>
          <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-medium">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
          <div>
            <h4 className="font-medium text-slate-800">Enable 2FA</h4>
            <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => handleInputChange('twoFactorAuth', !formData.twoFactorAuth)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
              formData.twoFactorAuth ? 'bg-sky-600' : 'bg-slate-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Appearance Settings</h2>
        <p className="text-slate-600">Customize how Verifact looks and feels.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'light', label: 'Light', icon: SunIcon },
                { key: 'dark', label: 'Dark', icon: MoonIcon },
                { key: 'system', label: 'System', icon: ComputerDesktopIcon },
              ].map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => handleInputChange('theme', theme.key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.theme === theme.key
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-slate-200 bg-white/50 hover:border-slate-300'
                  }`}
                >
                  <theme.icon className="w-8 h-8 mx-auto mb-2 text-slate-700" />
                  <p className="text-sm font-medium text-slate-800">{theme.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Language</h3>
            <select
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition-colors"
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
            <div>
              <h4 className="font-medium text-slate-800">Compact Mode</h4>
              <p className="text-sm text-slate-600">Use a more compact layout to fit more content</p>
            </div>
            <button
              onClick={() => handleInputChange('compactMode', !formData.compactMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                formData.compactMode ? 'bg-sky-600' : 'bg-slate-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.compactMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'security':
        return renderSecuritySection();
      case 'appearance':
        return renderAppearanceSection();
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <CogIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600">Coming Soon</h3>
              <p className="text-slate-500">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                title='sidebar'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-xl">
                  <CpuChipIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-slate-800">Verifact</h1>
                  <p className="text-sm text-slate-600">Settings</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                title="Help"
                aria-label="Help"
              >
                <QuestionMarkCircleIcon className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200/50 transition-transform duration-300 ease-in-out`}>
          <div className="h-full overflow-y-auto p-6 pt-8 lg:pt-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100/50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRightIcon className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-200/50">
              <button className="w-full flex items-center px-4 py-3 text-left rounded-xl text-rose-600 hover:bg-rose-50 transition-colors">
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {renderSection()}
            
            {/* Save Button */}
            {(activeSection === 'profile' || activeSection === 'notifications' || activeSection === 'appearance') && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center"
                >
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;