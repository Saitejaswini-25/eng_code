import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Calendar, BookOpen, Edit2, Save, X, Github, Linkedin, Mail, Phone, Clock, MapPin } from 'lucide-react';
import SEO from '../components/common/SEO';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  bio: string;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Session {
  id: string;
  title: string;
  instructor: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'appointments' | 'sessions'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    linkedin: '',
    github: '',
    bio: ''
  });

  // Mock data for appointments and sessions
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Career Counseling Session',
      date: '2024-03-20',
      time: '14:00',
      location: 'Virtual Meeting',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Technical Interview Preparation',
      date: '2024-03-25',
      time: '10:00',
      location: 'Virtual Meeting',
      status: 'upcoming'
    }
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      title: 'Web Development Bootcamp',
      instructor: 'John Doe',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'Data Structures and Algorithms',
      instructor: 'Jane Smith',
      startDate: '2024-04-01',
      endDate: '2024-05-01',
      status: 'upcoming'
    }
  ]);

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
    { id: 'appointments', label: 'My Appointments', icon: <Calendar className="w-5 h-5" /> },
    { id: 'sessions', label: 'My Sessions', icon: <BookOpen className="w-5 h-5" /> }
  ];

  return (
    <>
      <SEO 
        title="My Profile" 
        description="View and manage your profile, appointments, and sessions"
      />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{profileData.name || 'User'}</h1>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="flex border-b">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'profile' | 'appointments' | 'sessions')}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.name || 'Not set'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.phone || 'Not set'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="linkedin"
                          value={profileData.linkedin}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {profileData.linkedin ? (
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {profileData.linkedin}
                            </a>
                          ) : (
                            'Not set'
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GitHub</label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="github"
                          value={profileData.github}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {profileData.github ? (
                            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {profileData.github}
                            </a>
                          ) : (
                            'Not set'
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.bio || 'Not set'}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'appointments' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">My Appointments</h2>
                  {appointments.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-600">
                      No appointments scheduled
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map(appointment => (
                        <div key={appointment.id} className="bg-white border rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{appointment.title}</h3>
                              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(appointment.date)}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                <MapPin className="w-4 h-4" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'sessions' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">My Sessions</h2>
                  {sessions.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-600">
                      No sessions enrolled
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sessions.map(session => (
                        <div key={session.id} className="bg-white border rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{session.title}</h3>
                              <p className="text-gray-600 mt-1">Instructor: {session.instructor}</p>
                              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(session.startDate)} - {formatDate(session.endDate)}</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage; 