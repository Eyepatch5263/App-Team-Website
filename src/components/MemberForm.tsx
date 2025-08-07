import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, X, Loader } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';

// API_BASE - CONDITIONAL FOR DEVELOPMENT VS. PRODUCTION
const API_BASE = `${import.meta.env.VITE_BACKEND_URI}/api/members`


interface MemberFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    rollNumber: string;
    branch: string;
    year: string;
    profileImage: string;
  };
  professionalInfo: {
    role: string;
    bio: string;
    skills: string[];
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
  };
  membershipInfo: {
    memberType: string;
    position: string;
  };
}

interface MemberFormProps {
  onClose: () => void;
  editingEmail?: string;
}

const MemberForm: React.FC<MemberFormProps> = ({ onClose, editingEmail }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<MemberFormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      rollNumber: '',
      branch: '',
      year: '1st',
      profileImage: 'https://placehold.co/150x150/e0e0e0/000000?text=Profile', // Default placeholder
    },
    professionalInfo: {
      role: '',
      bio: '',
      skills: [],
      portfolioUrl: '',
      githubUrl: '',
      linkedinUrl: '',
      twitterUrl: '',
    },
    membershipInfo: {
      memberType: 'active',
      position: '',
    },
  });
  const [skillsInput, setSkillsInput] = useState('');


  // Fetch member data if in editing mode
  useEffect(() => {
    if (editingEmail) {
      setIsEditing(true);
      const fetchMemberData = async () => {
        try {
          const response = await fetch(`${API_BASE}/profile/${encodeURIComponent(editingEmail)}`);
          const data = await response.json();
          if (data.success && data.data) {
            setFormData({
              ...data.data,
              professionalInfo: {
                ...data.data.professionalInfo,
                skills: Array.isArray(data.data.professionalInfo.skills)
                  ? data.data.professionalInfo.skills
                  : [],
              },
            });
            setSkillsInput(data.data.professionalInfo.skills.join(', '));
          } else {
            setErrorMessage(data.message || 'Failed to fetch member data for editing.');
            setSubmitStatus('error');
          }
        } catch (error) {
          console.error('Error fetching member data:', error);
          setErrorMessage('Network error or failed to fetch member data.');
          setSubmitStatus('error');
        }
      };
      fetchMemberData();
    } else {
      setIsEditing(false);
      // Reset form for new member creation
      setFormData({
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          rollNumber: '',
          branch: '',
          year: '1st',
          profileImage: 'https://placehold.co/150x150/e0e0e0/000000?text=Profile',
        },
        professionalInfo: {
          role: '',
          bio: '',
          skills: [],
          portfolioUrl: '',
          githubUrl: '',
          linkedinUrl: '',
          twitterUrl: '',
        },
        membershipInfo: {
          memberType: 'active',
          position: '',
        },
      });
      setSkillsInput('');
    }
  }, [editingEmail]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Handle nested state updates
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent], // Cast to any to access dynamically
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        membershipInfo: {
          ...prev.membershipInfo,
          [name]: value,
        }
      }));
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
    setFormData((prev) => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        skills: e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Basic validation
    if (!formData.personalInfo.fullName || !formData.personalInfo.email || !formData.personalInfo.rollNumber || !formData.professionalInfo.role || !formData.professionalInfo.bio) {
      setErrorMessage('Please fill in all required fields (Full Name, Email, Roll Number, Role, Bio).');
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      const url = isEditing ? `${API_BASE}/profile/${encodeURIComponent(editingEmail || '')}` : API_BASE;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setErrorMessage(isEditing ? 'Profile updated successfully!' : 'Member created successfully!');
        // Optionally, reset form or close after success
        setTimeout(() => onClose(), 1500); // Close after showing success
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Network error. Please check your connection.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for dynamic input classes
  const inputClass = "w-full px-4 py-3 bg-tertiary-dark border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300";


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-md p-4">
      <div className="relative w-full  max-h-[50vh] overflow-y-auto overflow-x-hidden">
        <GlassCard className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-sansita font-bold text-primary-text">
              {isEditing ? 'Edit Member Profile' : 'Add New Member'}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-text hover:text-primary-text transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <h3 className="text-lg font-sansita font-semibold text-accent-primary border-b border-glass-border pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Full Name *</label>
                <input
                  type="text"
                  name="personalInfo.fullName"
                  value={formData.personalInfo.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Email *</label>
                <input
                  type="email"
                  name="personalInfo.email"
                  value={formData.personalInfo.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="john.doe@example.com"
                  required
                  disabled={isEditing} // Email should not be editable
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Phone *</label>
                <input
                  type="tel"
                  name="personalInfo.phone"
                  value={formData.personalInfo.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+91-1234567890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Roll Number *</label>
                <input
                  type="text"
                  name="personalInfo.rollNumber"
                  value={formData.personalInfo.rollNumber}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="21XXXXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Branch *</label>
                <input
                  type="text"
                  name="personalInfo.branch"
                  value={formData.personalInfo.branch}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Computer Science Engineering"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Year *</label>
                <select
                  name="personalInfo.year"
                  value={formData.personalInfo.year}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Profile Image URL</label>
                <input
                  type="url"
                  name="personalInfo.profileImage"
                  value={formData.personalInfo.profileImage}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
            </div>

            {/* Professional Info */}
            <h3 className="text-lg font-sansita font-semibold text-accent-primary border-b border-glass-border pb-2 mb-4 pt-6">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-inter text-secondary-text mb-2">Role *</label>
                <input
                  type="text"
                  name="professionalInfo.role"
                  value={formData.professionalInfo.role}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Frontend Developer / UI/UX Designer"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-sansita text-secondary-text mb-2">Bio *</label>
                <textarea
                  name="professionalInfo.bio"
                  value={formData.professionalInfo.bio}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass}
                  placeholder="A passionate developer skilled in React and Node.js..."
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-sansita text-secondary-text mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="professionalInfo.skills" // Note: name property here is just for onChange context
                  value={skillsInput}
                  onChange={handleSkillsChange}
                  className={inputClass}
                  placeholder="React, Node.js, MongoDB, Figma, Python"
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Portfolio URL</label>
                <input
                  type="url"
                  name="professionalInfo.portfolioUrl"
                  value={formData.professionalInfo.portfolioUrl}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">GitHub URL</label>
                <input
                  type="url"
                  name="professionalInfo.githubUrl"
                  value={formData.professionalInfo.githubUrl}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  name="professionalInfo.linkedinUrl"
                  value={formData.professionalInfo.linkedinUrl}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Twitter URL</label>
                <input
                  type="url"
                  name="professionalInfo.twitterUrl"
                  value={formData.professionalInfo.twitterUrl}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </div>

            {/* Membership Info */}
            <h3 className="text-lg font-sansita font-semibold text-accent-primary border-b border-glass-border pb-2 mb-4 pt-6">Membership Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Member Type *</label>
                <select
                  name="memberType" 
                  value={formData.membershipInfo.memberType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="core">Core Member</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-sansita text-secondary-text mb-2">Position (e.g., Lead, Coordinator)</label>
                <input
                  type="text"
                  name="position" 
                  value={formData.membershipInfo.position}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Technical Lead"
                />
              </div>
            </div>


            {/* Submission Status */}
            {submitStatus === 'success' && (
              <div className="flex items-center bg-accent-success/10 text-accent-success px-4 py-3 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="font-sansita text-sm">{errorMessage}</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="flex items-center bg-accent-error/10 text-accent-error px-4 py-3 rounded-lg">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-accent-error font-sansita text-sm">{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-glass-white border border-glass-border text-secondary-text rounded-lg font-sansita font-medium hover:bg-hover-bg transition-colors duration-300"
              >
                Cancel
              </button>
              <GlowButton
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className='flex justify-center items-center'>
                    <Loader className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    <p className='font-sansita'>{isEditing ? 'Updating...' : 'Creating...'}</p>
                  </div>
                ) : (
                  <div className='flex justify-center items-center'>
                    <Send className="w-4 h-4 mr-2" />
                    <p className='font-sansita'>
                      {isEditing ? 'Update Profile' : 'Create Profile'}
                    </p>
                  </div>
                )}
              </GlowButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default MemberForm;
