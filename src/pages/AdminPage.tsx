// src/pages/AdminPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Edit, X,
  ArrowLeft, Calendar, Clock, Trophy, Sparkles, Bell, Plus, Trash2, ExternalLink,
  Users, MapPin // <-- add this
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import MemberForm from '../components/MemberForm'; // Assuming MemberForm is in components

// Interfaces (Ensure consistency across all files using these interfaces)
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
  isVisible?: boolean; // Crucial: Add this property for visibility toggle
}

interface Announcement {
  _id: string;
  type: 'Event' | 'Workshop' | 'Achievement' | 'General' | 'Urgent';
  title: string;
  description: string;
  date: string; // Stored as string, convert to Date for form
  time?: string;
  location?: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


const MEMBERS_API_BASE = `${import.meta.env.VITE_BACKEND_URI}/api/members`

const ANNOUNCEMENTS_API_BASE =`${import.meta.env.VITE_BACKEND_URI}/api/announcements`;


const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'members' | 'announcements'>('members');

  // --- Member Management States ---
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMemberEmail, setEditingMemberEmail] = useState<string | undefined>();
  const [memberEmailInput, setMemberEmailInput] = useState(''); // For searching member to edit

  // --- Announcement Management Functions ---
  const fetchMembers = useCallback(async () => {
    setLoadingMembers(true);
    try {
      // Fetch all members, including hidden ones, for admin view
      const response = await fetch(`${MEMBERS_API_BASE}/?isVisible=all`); // Modified to fetch all members for admin
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
    fetchMembers(); // Refresh member list after form close
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

  const handleToggleMemberVisibility = async (email: string, isCurrentlyVisible: boolean | undefined) => {
    // If isVisible is undefined (e.g., old data without the field), assume it's visible or treat as false for toggle purpose.
    // The backend default should handle setting it to true if missing on first save.
    const targetVisibility = isCurrentlyVisible === undefined ? false : !isCurrentlyVisible;

    try {
      const response = await fetch(`${MEMBERS_API_BASE}/profile/${encodeURIComponent(email)}/visibility`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: targetVisibility }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Member profile ${targetVisibility ? 'shown' : 'hidden'} successfully!`);
        fetchMembers(); // Refresh list
      } else {
        alert(`Failed to update visibility: ${data.message}`);
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Error toggling member visibility.');
    }
  };


  // --- Announcement Management States ---
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
        body: JSON.stringify(announcementFormData), // Use announcementFormData directly
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`Announcement ${editingAnnouncementId ? 'updated' : 'created'} successfully!`);
        fetchAnnouncements(); // Refresh the list
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
      date: announcement.date.split('T')[0], // Format date for input type="date"
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

  // Helper for icons and colors
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Event': return <Calendar className="w-5 h-5" />;
      case 'Workshop': return <Users className="w-5 h-5" />;
      case 'Achievement': return <Trophy className="w-5 h-5" />;
      case 'Urgent': return <Bell className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 transition-colors duration-300 font-inter font-medium"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-space font-bold text-primary-text mb-3 md:mb-4">
            Admin <span className="text-accent-primary">Dashboard</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-inter text-secondary-text max-w-2xl mx-auto leading-relaxed">
            Manage members and announcements.
          </p>
        </div>

        <GlassCard className="p-6 md:p-8 mb-8">
          <div className="flex border-b border-glass-border mb-6">
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'members'
                  ? 'text-accent-primary border-b-2 border-accent-primary'
                  : 'text-secondary-text hover:text-primary-text'
              }`}
              onClick={() => setActiveTab('members')}
            >
              Member Management
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'announcements'
                  ? 'text-accent-primary border-b-2 border-accent-primary'
                  : 'text-secondary-text hover:text-primary-text'
              }`}
              onClick={() => setActiveTab('announcements')}
            >
              Announcement Management
            </button>
          </div>

          {activeTab === 'members' && (
            <div>
              {/* Add New Member - Centered */}
              <div className="flex justify-center mb-6"> {/* Changed from justify-end */}
                <GlowButton onClick={() => { setShowMemberForm(true); setEditingMemberEmail(undefined); }} className="group text-sm md:text-base">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Add New Member
                </GlowButton>
              </div>

              {/* Edit Existing Member Input */}
              <GlassCard className="p-4 mb-6">
                <p className="text-secondary-text mb-3 text-sm md:text-base">
                  Enter member's email to edit their profile:
                </p>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    value={memberEmailInput}
                    onChange={(e) => setMemberEmailInput(e.target.value)}
                    placeholder="Enter email to edit profile"
                    className="flex-1 px-3 py-2 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 text-sm md:text-base"
                  />
                  <button
                    onClick={handleEditMemberProfile}
                    disabled={!memberEmailInput.trim()}
                    className="px-3 md:px-4 py-2 bg-accent-primary text-white rounded-lg font-inter font-medium hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm md:text-base"
                  >
                    Edit
                  </button>
                </div>
              </GlassCard>

              {/* Member List */}
              <h3 className="text-xl font-space font-semibold text-primary-text mb-4">Existing Members</h3>
              {loadingMembers ? (
                <div className="text-center text-secondary-text">Loading members...</div>
              ) : members.length === 0 ? (
                <p className="text-center text-secondary-text">No members found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <GlassCard key={member._id} className="p-4 flex items-center space-x-4">
                      {member.personalInfo.profileImage && (
                        <img
                          src={member.personalInfo.profileImage}
                          alt={member.personalInfo.fullName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-accent-primary flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-space font-semibold text-primary-text">{member.personalInfo.fullName}</h4>
                        <p className="text-sm text-secondary-text">{member.professionalInfo.role}</p>
                        <p className="text-xs text-muted-text">{member.personalInfo.email}</p>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingMemberEmail(member.personalInfo.email);
                            setShowMemberForm(true);
                          }}
                          className="p-2 text-accent-secondary hover:text-accent-secondary/80 hover:bg-accent-secondary/10 rounded-lg transition-colors duration-300"
                          title="Edit Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleMemberVisibility(member.personalInfo.email, member.isVisible)}
                          className={`p-2 rounded-lg transition-colors duration-300 ${
                            member.isVisible
                              ? 'text-accent-success hover:text-accent-success/80 hover:bg-accent-success/10'
                              : 'text-muted-text hover:text-accent-success hover:bg-accent-success/10'
                          }`}
                          title={member.isVisible ? 'Hide Profile' : 'Show Profile'}
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.personalInfo.email)}
                          className="p-2 text-accent-error hover:text-accent-error/80 hover:bg-accent-error/10 rounded-lg transition-colors duration-300"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}

              {/* Member Form - Adjusted max-w for larger display */}
              {showMemberForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
                  <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
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
                <GlowButton onClick={() => setShowAnnouncementForm(true)} className="group text-sm md:text-base">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Create New Announcement
                </GlowButton>
              </div>

              {showAnnouncementForm && (
                <GlassCard className="p-6 md:p-8 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-space font-semibold text-primary-text">
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
                      <label className="block text-sm font-inter text-secondary-text mb-2">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={announcementFormData.title}
                        onChange={handleAnnouncementInputChange}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="e.g., Hackathon 7.0 Announced!"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-inter text-secondary-text mb-2">Description *</label>
                      <textarea
                        name="description"
                        value={announcementFormData.description}
                        onChange={handleAnnouncementInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="Provide details about the announcement..."
                        required
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Type *</label>
                        <select
                          name="type"
                          value={announcementFormData.type}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-tertiary-dark text-primary-text border border-accent-primary rounded-md font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
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
                        <label className="block text-sm font-inter text-secondary-text mb-2">Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={announcementFormData.date}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Time (Optional)</label>
                        <input
                          type="text"
                          name="time"
                          value={announcementFormData.time}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          placeholder="e.g., 10:00 AM IST"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Location (Optional)</label>
                        <input
                          type="text"
                          name="location"
                          value={announcementFormData.location}
                          onChange={handleAnnouncementInputChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          placeholder="e.g., Online / College Auditorium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-inter text-secondary-text mb-2">External Link (Optional)</label>
                      <input
                        type="url"
                        name="link"
                        value={announcementFormData.link}
                        onChange={handleAnnouncementInputChange}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="https://example.com/more-info"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-inter text-secondary-text mb-2">Priority *</label>
                      <select
                        name="priority"
                        value={announcementFormData.priority}
                        onChange={handleAnnouncementInputChange}
                        className="w-full px-4 py-3 bg-tertiary-dark text-primary-text border border-accent-primary rounded-md font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
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
                      <label className="text-sm font-inter text-secondary-text">Active (Show on public site)</label>
                    </div>

                    {announcementErrorMessage && (
                      <div className="flex items-center text-accent-error font-inter text-sm mt-4">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {announcementErrorMessage}
                      </div>
                    )}

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={resetAnnouncementForm}
                        className="px-6 py-3 bg-glass-white border border-glass-border text-secondary-text rounded-lg font-inter font-medium hover:bg-hover-bg transition-colors duration-300"
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
              <h3 className="text-xl font-space font-semibold text-primary-text mb-4">Existing Announcements</h3>
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
                          <span className={`px-2 py-1 rounded-full text-xs font-inter font-semibold ${getTypeColor(announcement.type)}`}>
                            {announcement.type}
                          </span>
                          <h4 className="text-lg font-space font-semibold text-primary-text">{announcement.title}</h4>
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
                            className={`p-2 rounded-lg transition-colors duration-300 ${
                              announcement.isActive
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
        </GlassCard>
      </div>
    </section>
  );
};

export default AdminPage;
