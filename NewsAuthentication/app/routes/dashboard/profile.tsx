import React, { useState, useEffect } from 'react'; 
import Sidebar from '../../components/sidebar'; 
import Navbar from '../../components/navbar';   
import {
  UserCircleIcon as UserIconOutline, // Renamed for clarity if UserCircleIcon (solid) is used in Navbar
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  CameraIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import userAvatar from '../../assets/images/user-avatar.png';


// If using React Router for currentPath:
import { useLocation } from 'react-router-dom';

// --- ProfilePageContent (Main content of the profile page) ---
// (This is the large component from the previous response. I'll put a placeholder here for brevity,
//  but you should paste the full ProfilePageContent component from the previous message here.)

interface UserProfileData {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
}

const initialUserProfile: UserProfileData = {
  name: 'Bola Ahmed Tinubu',
  email: 'bola.tinubu@example.com',
  phone: '+234 800 123 4567',
  bio: 'Dedicated to fostering innovation and growth. Passionate about technology and its impact on society. Currently focused on leveraging AI for truth and transparency with Verifact.',
  avatarUrl: 'https://images.app.goo.gl/vx4JeMqBAgWE4sEJA',
};

const updateUserProfile = async (data: UserProfileData): Promise<{ success: boolean; message: string }> => {
  console.log("Updating profile with:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (data.name !== "Error User") {
    return { success: true, message: "Profile updated successfully!" };
  } else {
    return { success: false, message: "Failed to update profile. Please try again." };
  }
};

const ProfilePageContent: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>(initialUserProfile);
  const [formData, setFormData] = useState<UserProfileData>(initialUserProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData(profileData);
    }
    setIsEditing(!isEditing);
    setNotification(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);
    const result = await updateUserProfile(formData);
    setIsLoading(false);
    if (result.success) {
      setProfileData(formData);
      setIsEditing(false);
      setNotification({ type: 'success', message: result.message });
    } else {
      setNotification({ type: 'error', message: result.message });
    }
    setTimeout(() => setNotification(null), 5000);
  };

  const renderDisplayField = (label: string, value: string | undefined, icon: React.ElementType) => {
    const IconComponent = icon;
    return (
      <div className="sm:col-span-1">
        <dl>
          <dt className="text-sm font-medium text-slate-500 flex items-center">
            <IconComponent className="h-5 w-5 mr-2 text-slate-400" aria-hidden="true" />
            {label}
          </dt>
          <dd className="mt-1 text-sm text-slate-900">{value || 'N/A'}</dd>
        </dl>
      </div>
    );
  };

  const renderEditField = (
    label: string,
    name: keyof UserProfileData,
    type: 'text' | 'email' | 'tel' | 'textarea' = 'text'
  ) => {
    const commonProps = {
      id: name, name: name, value: formData[name] || '', onChange: handleInputChange,
      className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
      disabled: isLoading,
    };
    return (
      <div className="sm:col-span-1">
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        {type === 'textarea' ? <textarea {...commonProps} rows={4} /> : <input type={type} {...commonProps} />}
      </div>
    );
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold leading-tight text-slate-900">Your Profile</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your personal information and account settings.</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button type="button" onClick={handleEditToggle}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${isEditing ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400' : 'border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500'}`}>
            {isEditing ? <><XCircleIcon className="-ml-1 mr-2 h-5 w-5" />Cancel</> : <><PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" />Edit Profile</>}
          </button>
        </div>
      </div>
      {notification && (
        <div className={`mb-6 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} role="alert">
          <div className="flex">
            <div className="flex-shrink-0">{notification.type === 'success' ? <CheckCircleIcon className="h-5 w-5 text-green-400" /> : <XCircleIcon className="h-5 w-5 text-red-400" />}</div>
            <div className="ml-3"><p className="text-sm font-medium">{notification.message}</p></div>
          </div>
        </div>
      )}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="sm:flex sm:items-center sm:space-x-5">
            <div className="relative flex-shrink-0">
              <img className="h-24 w-24 rounded-full object-cover ring-4 ring-white sm:h-32 sm:w-32" src={isEditing ? formData.avatarUrl || profileData.avatarUrl : profileData.avatarUrl} alt="User Avatar" />
              {isEditing && (
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 mb-1 mr-1 bg-white p-1.5 rounded-full shadow-md hover:bg-slate-50 cursor-pointer" title="Change avatar">
                  <CameraIcon className="h-5 w-5 text-slate-600" />
                  <input
                    id="avatar-upload"
                    name="avatar-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    title="Upload a new avatar"
                    aria-label="Upload a new avatar"
                  />
                </label>
              )}
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              {isEditing ? <input type="text" name="name" id="name-edit" value={formData.name} onChange={handleInputChange} className="text-2xl font-bold text-slate-900 sm:text-3xl border-b-2 border-slate-300 focus:border-sky-500 outline-none pb-1 w-full" disabled={isLoading} placeholder="Enter your full name" title="Full Name" /> : <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{profileData.name}</h2>}
              <p className="text-sm font-medium text-slate-500">{profileData.email}</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <dl className="divide-y divide-slate-200">
            <div className="px-6 py-5 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label htmlFor="bio" className="block text-sm font-medium text-slate-700">About</label>
                {isEditing ? <textarea id="bio" name="bio" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50" value={formData.bio} onChange={handleInputChange} placeholder="Tell us a little about yourself..." disabled={isLoading} /> : <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{profileData.bio || 'No biography provided.'}</p>}
              </div>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-3">
              <h3 className="sm:col-span-3 text-lg leading-6 font-medium text-slate-900">Contact Information</h3>
              {isEditing ? renderEditField('Full Name', 'name') : renderDisplayField('Full Name', profileData.name, UserIconOutline)}
              {isEditing ? renderEditField('Email Address', 'email', 'email') : renderDisplayField('Email Address', profileData.email, EnvelopeIcon)}
              {isEditing ? renderEditField('Phone Number', 'phone', 'tel') : renderDisplayField('Phone Number', profileData.phone, DevicePhoneMobileIcon)}
            </div>
          </dl>
          {isEditing && (
            <div className="px-6 py-4 bg-slate-50 text-right border-t border-slate-200">
              <button type="button" onClick={handleEditToggle} disabled={isLoading} className="mr-3 inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50">
                {isLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" />}Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
// --- End ProfilePageContent ---


// This is the actual page component you would route to.
const ProfilePage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Determine currentPath (you might use React Router's useLocation here)
  // const location = useLocation();
  // const currentPath = location.pathname;
  const currentPath = "/dashboard/profile"; // Placeholder for this page

  const handleMobileNavToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    // Ensure sidebar is expanded when mobile nav opens
    if (!isMobileSidebarOpen) {
      setIsSidebarCollapsed(false);
    }
  };
  
  const handleMobileNavClose = () => {
    setIsMobileSidebarOpen(false);
  };


  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Mobile Sidebar Overlay/Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={handleMobileNavClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:inset-auto lg:translate-x-0 
          ${isMobileSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}
      >
        <Sidebar
          // currentPath={currentPath}
          // Pass the correct collapsed state based on mobile view
          isSidebarCollapsed={isMobileSidebarOpen ? false : isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          className="h-screen" // Sidebar takes full screen height
          onNavigate={handleMobileNavClose} // To close mobile nav on item click
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMobileNavToggle={handleMobileNavToggle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <ProfilePageContent />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;