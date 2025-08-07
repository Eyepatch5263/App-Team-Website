import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertCircle, Edit, X, Calendar, Clock, Bell, Plus, Trash2, ExternalLink,
  Users, MapPin, FileSpreadsheet,Github, Linkedin,
} from 'lucide-react';

import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import MemberForm from '../components/MemberForm';

interface Member {
  _id: string;
  personalInfo: {
    fullName: string;
    email: string;
    profileImage?: string;
  };
  professionalInfo: {
    role: string;
    bio: string;
    skills: string[];
    portfolioUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
  };
  membershipInfo: {
    memberType: string;
    position?: string;
  };
  isVisible?: boolean;
}

interface Announcement {
  _id: string;
  type: 'Event' | 'Workshop' | 'Achievement' | 'General' | 'Urgent';
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamApplication {
  _id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    rollNumber: string;
    branch: string;
    year: string;
  };
  technicalInfo: {
    primarySkills: string[];
    programmingLanguages: string[];
    frameworks: string[];
    experience: string;
    portfolioUrl: string;
    githubUrl: string;
  };
  motivation: {
    whyJoin: string;
    contribution: string;
    previousProjects: string;
  };
  availability: {
    preferredRole: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled';
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}


const MEMBERS_API_BASE = `${import.meta.env.VITE_BACKEND_URI}/api/members`

const ANNOUNCEMENTS_API_BASE = `${import.meta.env.VITE_BACKEND_URI}/api/announcements`;

const TEAM_API_BASE = `${import.meta.env.VITE_BACKEND_URI}/api/team`;


const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'announcements' | 'team-applications'>('members');

  // --- Member Management States ---
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMemberEmail, setEditingMemberEmail] = useState<string | undefined>();
  const [memberEmailInput, setMemberEmailInput] = useState('');

  const fetchMembers = useCallback(async () => {
    setLoadingMembers(true);
    try {
      const response = await fetch(`${MEMBERS_API_BASE}/?isVisible=all`);
      const data = await response.json();
      if (data.success) {
        setMembers(data.data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setMembers([]);
    } finally {
      setLoadingMembers(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleMemberFormClose = () => {
    setShowMemberForm(false);
    setEditingMemberEmail(undefined);
    setMemberEmailInput('');
    fetchMembers();

  };

  const handleEditMemberProfile = () => {
    if (memberEmailInput.trim()) {
      setEditingMemberEmail(memberEmailInput.trim());
      setShowMemberForm(true);
    }
  };


  const handleDeleteMember = async (email: string) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      try {
        const response = await fetch(`${MEMBERS_API_BASE}/profile/${encodeURIComponent(email)}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Member deleted successfully!');
          fetchMembers(); // Refresh list
        } else {
          alert(`Failed to delete member: ${data.message}`);
        }
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Error deleting member.');
      }
    }
  };

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [isSubmittingAnnouncement, setIsSubmittingAnnouncement] = useState(false);
  const [announcementFormData, setAnnouncementFormData] = useState<Partial<Announcement>>({
    type: 'General',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    link: '',
    priority: 'medium',
    isActive: true, // Default to true here
  });
  const [announcementErrorMessage, setAnnouncementErrorMessage] = useState('');

  // --- Team Applications Management States ---
  const [teamApplications, setTeamApplications] = useState<TeamApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [isExportingApplications, setIsExportingApplications] = useState(false);

  // --- Announcement Management Functions ---
  const fetchAnnouncements = useCallback(async () => {
    setLoadingAnnouncements(true);
    try {
      const response = await fetch(`${ANNOUNCEMENTS_API_BASE}?isActive=all`); // Fetch all announcements for admin view
      const data = await response.json();
      if (data.success) {
        setAnnouncements(data.data.announcements);
      } else {
        console.error('Failed to fetch announcements:', data.message);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoadingAnnouncements(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const resetAnnouncementForm = () => {
    setAnnouncementFormData({
      type: 'General',
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      link: '',
      priority: 'medium',
      isActive: true, // Reset to true
    });
    setEditingAnnouncementId(null);
    setShowAnnouncementForm(false);
    setAnnouncementErrorMessage('');
  };

  const handleAnnouncementInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setAnnouncementFormData((prev) => {
      if (name === 'isActive' && type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        return { ...prev, isActive: checked };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAnnouncement(true);
    setAnnouncementErrorMessage('');

    try {
      const url = editingAnnouncementId
        ? `${ANNOUNCEMENTS_API_BASE}/${editingAnnouncementId}`
        : ANNOUNCEMENTS_API_BASE;
      const method = editingAnnouncementId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcementFormData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`Announcement ${editingAnnouncementId ? 'updated' : 'created'} successfully!`);
        fetchAnnouncements();
        resetAnnouncementForm();
      } else {
        setAnnouncementErrorMessage(data.message || 'Something went wrong. Please try again.');
        console.error('Failed to save announcement:', data.message || 'Unknown error', data);
      }
    } catch (error) {
      setAnnouncementErrorMessage('Network error. Please check your connection.');
      console.error('Error saving announcement:', error);
    } finally {
      setIsSubmittingAnnouncement(false);
    }
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setAnnouncementFormData({
      ...announcement,
      date: announcement.date.split('T')[0],
    });
    setEditingAnnouncementId(announcement._id);
    setShowAnnouncementForm(true);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
      try {
        const response = await fetch(`${ANNOUNCEMENTS_API_BASE}/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Announcement deleted successfully!');
          fetchAnnouncements();
        } else {
          alert(`Failed to delete announcement: ${data.message}`);
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Error deleting announcement.');
      }
    }
  };

  const handleToggleAnnouncementStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`${ANNOUNCEMENTS_API_BASE}/${id}/toggle`, {
        method: 'PATCH',
      });
      const data = await response.json();
      if (data.success) {
        alert(`Announcement ${isActive ? 'deactivated' : 'activated'} successfully!`);
        fetchAnnouncements();
      } else {
        alert(`Failed to toggle status: ${data.message}`);
      }
    } catch (error) {
      console.error('Error toggling announcement status:', error);
      alert('Error toggling announcement status.');
    }
  };

  // --- Team Applications Management Functions ---
  const fetchTeamApplications = useCallback(async () => {
    setLoadingApplications(true);
    try {
      const response = await fetch(`${TEAM_API_BASE}/applications`);
      const data = await response.json();
      if (data.success) {
        setTeamApplications(data.data.applications);
      } else {
        console.error('Failed to fetch team applications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching team applications:', error);
    } finally {
      setLoadingApplications(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'team-applications') {
      fetchTeamApplications();
    }
  }, [activeTab, fetchTeamApplications]);

  const handleExportApplications = async () => {
    setIsExportingApplications(true);
    try {
      const response = await fetch(`${TEAM_API_BASE}/export/excel`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `team_applications_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        alert('Team applications exported successfully!');
      } else {
        const data = await response.json();
        alert(`Failed to export: ${data.message}`);
      }
    } catch (error) {
      console.error('Error exporting applications:', error);
      alert('Error exporting applications.');
    } finally {
      setIsExportingApplications(false);
    }
  };


  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Event': return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30';
      case 'Workshop': return 'text-accent-secondary bg-accent-secondary/10 border-accent-secondary/30';
      case 'Achievement': return 'text-accent-tertiary bg-accent-tertiary/10 border-accent-tertiary/30';
      case 'Urgent': return 'text-accent-error bg-accent-error/10 border-accent-error/30';
      default: return 'text-accent-success bg-accent-success/10 border-accent-success/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-accent-error';
      case 'medium': return 'border-l-accent-warning';
      default: return 'border-l-accent-success';
    }
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="md:mx-10 mx-0 px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-sansita font-bold text-primary-text mb-3 md:mb-4">
            Admin <span className="text-accent-primary">Dashboard</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-sansita text-secondary-text max-w-2xl mx-auto leading-relaxed">
            Manage members and announcements.
          </p>
        </div>

        <GlassCard className="p-6 md:p-8 mb-8">
          <div className="flex border-b border-glass-border mb-6">
            <button
              className={`flex-1 py-3 text-center font-sansita font-semibold text-sm md:text-lg transition-colors duration-300 ${activeTab === 'members'
                ? 'text-accent-primary border-b-2 border-accent-primary'
                : 'text-secondary-text hover:text-primary-text'
                }`}
              onClick={() => setActiveTab('members')}
            >
              Members
            </button>
            <button
              className={`flex-1 py-3 text-center font-sansita font-semibold text-sm md:text-lg transition-colors duration-300 ${activeTab === 'announcements'
                ? 'text-accent-primary border-b-2 border-accent-primary'
                : 'text-secondary-text hover:text-primary-text'
                }`}
              onClick={() => setActiveTab('announcements')}
            >
              Announcement
            </button>
            <button
              className={`flex-1 py-3 text-center font-sansita font-semibold text-sm md:text-lg transition-colors duration-300 ${activeTab === 'team-applications'
                ? 'text-accent-primary border-b-2 border-accent-primary'
                : 'text-secondary-text hover:text-primary-text'
                }`}
              onClick={() => setActiveTab('team-applications')}
            >
              Team Applications
            </button>
          </div>

          {activeTab === 'members' && (
            <div>
              <div className="flex justify-center items-center mb-6">
                <GlowButton onClick={() => { setShowMemberForm(true); setEditingMemberEmail(undefined); }} className="group text-sm md:text-base flex justify-center items-center">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  <p className='font-sansita'>Add New Member</p>
                </GlowButton>
              </div>

              {/* Edit Existing Member Input */}
              <GlassCard className="p-4 mb-6">
                <p className="text-secondary-text font-sansita mb-3 text-sm md:text-base">
                  Enter member's email to edit their profile:
                </p>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    value={memberEmailInput}
                    onChange={(e) => setMemberEmailInput(e.target.value)}
                    placeholder="Enter email to edit profile"
                    className="flex-1 px-3 py-2 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 text-sm md:text-base"
                  />
                  <button
                    onClick={handleEditMemberProfile}
                    disabled={!memberEmailInput.trim()}
                    className="px-3 md:px-4 py-2 bg-accent-primary text-white rounded-lg font-sansita font-medium hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm md:text-base"
                  >
                    Edit
                  </button>
                </div>
              </GlassCard>

              {/* Member List */}
              <h3 className="text-xl font-sansita font-semibold text-primary-text mb-4">Existing Members</h3>
              {loadingMembers ? (
                <div className="text-center text-secondary-text">Loading members...</div>
              ) : members.length === 0 ? (
                <p className="text-center text-secondary-text">No members found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {members.map((member) => (
                    <GlassCard key={member._id} className="p-4 flex items-center space-x-4">
                      {member.personalInfo.profileImage && (
                        <img
                          src={member.personalInfo.profileImage}
                          alt={member.personalInfo.fullName}
                          className={`w-16 h-16 rounded-full object-cover border-2  ${member.membershipInfo.memberType === 'active'
                              ? 'border-accent-primary'
                              : 'border-yellow-500'
                            } border-accent-primary flex-shrink-0`}
                        />
                      )}
                      <div className='flex flex-col'>
                        <div className='flex flex-col'>
                          <h4 className="text-lg font-sansita font-semibold text-primary-text">{member.personalInfo.fullName}</h4>
                          <p className="text-sm font-sansita text-secondary-text">{member.professionalInfo.role}</p>
                          <p className="text-xs font-sansita text-muted-text">{member.personalInfo.email}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                          </div>
                          <div className='flex gap-3'>
                            {member.professionalInfo.githubUrl && (
                              <a
                                href={member.professionalInfo.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline text-xs flex items-center"
                                title="GitHub"
                              >
                                <Github className='w-4 h-4'/>
                                <p className='ml-1'>Github</p>
                              </a>
                            )}
                            {member.professionalInfo.linkedinUrl && (
                              <a
                                href={member.professionalInfo.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline text-xs flex items-center"
                                title="LinkedIn"
                              >
                                <Linkedin className='w-4 h-4'/>
                                <p className='ml-1'>LinkedIn</p>
                                
                              </a>
                            )}
                            {member.professionalInfo.portfolioUrl && (
                              <a
                                href={member.professionalInfo.portfolioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline text-xs flex items-center"
                                title="Portfolio"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Portfolio
                              </a>
                            )}
                          </div>
                        </div>
                      </div>


                      <div className="flex mt-3 space-x-3">
                        <button
                          onClick={() => {
                            setEditingMemberEmail(member.personalInfo.email);
                            setShowMemberForm(true);
                          }}
                          className=" text-gray-400 rounded-lg transition-colors duration-300"
                          title="Edit Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.personalInfo.email)}
                          className=" text-accent-error  rounded-lg transition-colors duration-300"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}

              {showMemberForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
                  <div className="relative w-full max-w-4xl h-[90vh] overflow-y-auto">
                    <MemberForm onClose={handleMemberFormClose} editingEmail={editingMemberEmail} />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              {/* Add New Announcement - Centered */}
              <div className="flex justify-center mb-6">
                <GlowButton onClick={() => setShowAnnouncementForm(true)} className="group flex justify-center items-center text-sm md:text-base">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  <p className='font-sansita'>Create New Announcement</p>
                </GlowButton>
              </div>

              {showAnnouncementForm && (
                <GlassCard className="p-6 md:p-8 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-sansita font-semibold text-primary-text">
                      {editingAnnouncementId ? 'Edit Announcement' : 'Create New Announcement'}
                    </h3>
                    <button
                      onClick={resetAnnouncementForm}
                      className="text-muted-text hover:text-primary-text transition-colors duration-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleAnnouncementSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-sansita text-secondary-text mb-2">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={announcementFormData.title}
                        onChange={handleAnnouncementInputChange}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="e.g., Hackathon 7.0 Announced!"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sansita text-secondary-text mb-2">Description *</label>
                      <textarea
                        name="description"
                        value={announcementFormData.description}
                        onChange={handleAnnouncementInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="Provide details about the announcement..."
                        required
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-sansita text-secondary-text mb-2">Type *</label>
                        <select
                          name="type"
                          value={announcementFormData.type}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-tertiary-dark text-primary-text border border-accent-primary rounded-md font-sansita focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        >
                          <option value="General">General</option>
                          <option value="Event">Event</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Achievement">Achievement</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-sansita text-secondary-text mb-2">Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={announcementFormData.date}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-sansita text-secondary-text mb-2">Time (Optional)</label>
                        <input
                          type="text"
                          name="time"
                          value={announcementFormData.time}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          placeholder="e.g., 10:00 AM IST"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-sansita text-secondary-text mb-2">Location (Optional)</label>
                        <input
                          type="text"
                          name="location"
                          value={announcementFormData.location}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          placeholder="e.g., Online / College Auditorium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-sansita text-secondary-text mb-2">External Link (Optional)</label>
                      <input
                        type="url"
                        name="link"
                        value={announcementFormData.link}
                        onChange={handleAnnouncementInputChange}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="https://example.com/more-info"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sansita text-secondary-text mb-2">Priority *</label>
                      <select
                        name="priority"
                        value={announcementFormData.priority}
                        onChange={handleAnnouncementInputChange}
                        className="w-full px-4 py-3 bg-tertiary-dark text-primary-text border border-accent-primary rounded-md font-sansita focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={!!announcementFormData.isActive}
                        onChange={handleAnnouncementInputChange}
                        className="mr-2 h-4 w-4 text-accent-primary rounded border-glass-border focus:ring-accent-primary"
                      />
                      <label className="text-sm font-sansita text-secondary-text">Active (Show on public site)</label>
                    </div>

                    {announcementErrorMessage && (
                      <div className="flex items-center text-accent-error font-sansita text-sm mt-4">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {announcementErrorMessage}
                      </div>
                    )}

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={resetAnnouncementForm}
                        className="px-6 py-3 bg-glass-white border border-glass-border text-secondary-text rounded-lg font-sansita font-medium hover:bg-hover-bg transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <GlowButton
                        type="submit"
                        disabled={isSubmittingAnnouncement}
                        className={isSubmittingAnnouncement ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        {isSubmittingAnnouncement ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {editingAnnouncementId ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            {editingAnnouncementId ? 'Update' : 'Create'} Announcement
                          </>
                        )}
                      </GlowButton>
                    </div>
                  </form>
                </GlassCard>
              )}


              {/* Announcement List */}
              <h3 className="text-xl font-sansita font-semibold text-primary-text mb-4">Existing Announcements</h3>
              {loadingAnnouncements ? (
                <div className="text-center text-secondary-text">Loading announcements...</div>
              ) : announcements.length === 0 ? (
                <p className="text-center text-secondary-text">No announcements found.</p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <GlassCard key={announcement._id} className={`p-4 border-l-4 ${getPriorityColor(announcement.priority)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-sansita font-semibold ${getTypeColor(announcement.type)}`}>
                            {announcement.type}
                          </span>
                          <h4 className="text-lg font-sansita font-semibold text-primary-text">{announcement.title}</h4>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditAnnouncement(announcement)}
                            className="p-2 text-accent-secondary hover:text-accent-secondary/80 hover:bg-accent-secondary/10 rounded-lg transition-colors duration-300"
                            title="Edit Announcement"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleAnnouncementStatus(announcement._id, announcement.isActive)}
                            className={`p-2 rounded-lg transition-colors duration-300 ${announcement.isActive
                              ? 'text-accent-success hover:text-accent-success/80 hover:bg-accent-success/10'
                              : 'text-muted-text hover:text-accent-success hover:bg-accent-success/10'
                              }`}
                            title={announcement.isActive ? 'Deactivate' : 'Activate'}
                          >
                            <Bell className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAnnouncement(announcement._id)}
                            className="p-2 text-accent-error hover:text-accent-error/80 hover:bg-accent-error/10 rounded-lg transition-colors duration-300"
                            title="Delete Announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-secondary-text mb-2">{announcement.description}</p>
                      <div className="flex items-center text-muted-text text-xs space-x-4">
                        {announcement.date && (
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" /> {new Date(announcement.date).toLocaleDateString()}
                          </span>
                        )}
                        {announcement.time && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {announcement.time}
                          </span>
                        )}
                        {announcement.link && (
                          <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                            <ExternalLink className="w-3 h-3 mr-1" /> {announcement.link}
                          </a>
                        )}
                        {announcement.location && !announcement.link && (
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> {announcement.location}
                          </span>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'team-applications' && (
            <div>
              {/* Export Button */}
              <div className="flex justify-center mb-6">
                <GlowButton
                  onClick={handleExportApplications}
                  className="group text-sm md:text-base flex justify-center items-center"
                  disabled={isExportingApplications}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <p className='font-sansita'>{isExportingApplications ? 'Exporting...' : 'Export to Excel'}</p>
                </GlowButton>
              </div>

              {/* Applications List */}
              {loadingApplications ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto"></div>
                  <p className="text-secondary-text mt-4">Loading team applications...</p>
                </div>
              ) : teamApplications.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-secondary-text mx-auto mb-4" />
                  <p className="text-secondary-text">No team applications found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {teamApplications.map((application) => (
                    <GlassCard key={application._id} className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-sansita font-bold text-primary-text mb-1">
                            {application.personalInfo.fullName}
                          </h3>
                          <div className="text-sm text-secondary-text space-y-1">
                            <p>{application.personalInfo.email}</p>
                            <p>{application.personalInfo.rollNumber} - {application.personalInfo.branch} ({application.personalInfo.year})</p>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${application.status === 'pending'
                            ? 'text-accent-warning bg-accent-warning/10 border-accent-warning/30'
                            : application.status === 'approved'
                              ? 'text-accent-success bg-accent-success/10 border-accent-success/30'
                              : application.status === 'rejected'
                                ? 'text-accent-error bg-accent-error/10 border-accent-error/30'
                                : 'text-accent-blue bg-accent-blue/10 border-accent-blue/30'
                            }`}>
                            {application.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-sansita font-semibold text-primary-text mb-2">Technical Info</h4>
                          <div className="text-secondary-text space-y-1">
                            <p><strong>Role:</strong> {application.availability.preferredRole}</p>
                            <p><strong>Experience:</strong> {application.technicalInfo.experience}</p>
                            <p><strong>Skills:</strong> {application.technicalInfo.primarySkills.join(', ')}</p>
                            <p><strong>Languages:</strong> {application.technicalInfo.programmingLanguages.join(', ')}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-sansita font-semibold text-primary-text mb-2">Motivation</h4>
                          <div className="text-secondary-text space-y-1">
                            <p><strong>Why Join:</strong> {application.motivation.whyJoin.substring(0, 100)}...</p>
                            <p><strong>Contribution:</strong> {application.motivation.contribution.substring(0, 100)}...</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-sansita font-semibold text-primary-text mb-2">Application Info</h4>
                          <div className="text-secondary-text space-y-1">
                            <p><strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
                            <p><strong>Phone:</strong> {application.personalInfo.phone}</p>
                            {application.technicalInfo.portfolioUrl && (
                              <p>
                                <strong>Portfolio:</strong>
                                <a href={application.technicalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline ml-1">
                                  <ExternalLink className="w-3 h-3 inline" />
                                </a>
                              </p>
                            )}
                            {application.technicalInfo.githubUrl && (
                              <p>
                                <strong>GitHub:</strong>
                                <a href={application.technicalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline ml-1">
                                  <ExternalLink className="w-3 h-3 inline" />
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {application.adminNotes && (
                        <div className="mt-4 p-3 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
                          <p className="text-sm text-accent-blue">
                            <strong>Admin Notes:</strong> {application.adminNotes}
                          </p>
                        </div>
                      )}
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
};

export default AdminPage;
