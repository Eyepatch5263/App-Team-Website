import React, { useState } from 'react';
import { User, Mail, Phone, Code, Send, CheckCircle, AlertCircle } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';

interface FormData {
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
    hoursPerWeek: number;
    preferredRole: string;
  };
}

const TeamApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      rollNumber: '',
      branch: '',
      year: ''
    },
    technicalInfo: {
      primarySkills: [],
      programmingLanguages: [],
      frameworks: [],
      experience: '',
      portfolioUrl: '',
      githubUrl: ''
    },
    motivation: {
      whyJoin: '',
      contribution: '',
      previousProjects: ''
    },
    availability: {
      hoursPerWeek: 0,
      preferredRole: ''
    }
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Technical Skills', icon: <Code className="w-5 h-5" /> },
    { number: 3, title: 'Motivation', icon: <Mail className="w-5 h-5" /> },
    { number: 4, title: 'Availability', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Flutter', 'React Native',
    'UI/UX Design', 'Machine Learning', 'Data Science', 'DevOps', 'Blockchain', 'Cybersecurity'
  ];

  const frameworkOptions = [
    'React', 'Vue.js', 'Angular', 'Express.js', 'Django', 'Flask', 'Spring Boot',
    'Flutter', 'React Native', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes'
  ];

  const roleOptions = [
    'Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Mobile Developer',
    'UI/UX Designer', 'DevOps Engineer', 'AI/ML Engineer'
  ];

  const handleInputChange = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => {
      const currentArray = (prev[section] as any)[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        const { fullName, email, phone, rollNumber, branch, year } = formData.personalInfo;
        return !!(fullName && email && phone && rollNumber && branch && year);
      case 2:
        const { primarySkills, programmingLanguages, experience } = formData.technicalInfo;
        return !!(primarySkills.length > 0 && programmingLanguages.length > 0 && experience);
      case 3:
        const { whyJoin, contribution } = formData.motivation;
        return !!(whyJoin && contribution);
      case 4:
        const { hoursPerWeek, preferredRole } = formData.availability;
        return !!(hoursPerWeek > 0 && preferredRole);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://appteam-website-1.onrender.com/api/team/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <GlassCard className="p-8 text-center max-w-2xl mx-auto">
        <CheckCircle className="w-16 h-16 text-success-green mx-auto mb-4" />
        <h3 className="text-2xl font-space font-bold text-primary-text mb-4">
          Application Submitted Successfully!
        </h3>
        <p className="text-primary-text/80 font-inter leading-relaxed mb-6">
          Thank you for your interest in joining AppTeam! We've received your application and will review it carefully.
          You'll hear back from us within 5-7 business days.
        </p>
        <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-4">
          <p className="text-accent-blue font-inter text-sm">
            <strong>Next Steps:</strong> Keep an eye on your email for updates. If selected, you'll be invited for a technical interview.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${currentStep >= step.number
                  ? 'bg-accent-blue border-accent-blue text-white'
                  : 'border-glass-border text-primary-text/60'
                }`}>
                {step.icon}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-space font-medium ${currentStep >= step.number ? 'text-primary-text' : 'text-primary-text/60'
                  }`}>
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-4 transition-colors duration-300 ${currentStep > step.number ? 'bg-accent-blue' : 'bg-glass-border'
                  }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <GlassCard className="p-6 md:p-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold text-primary-text mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Roll Number *</label>
                <input
                  type="text"
                  value={formData.personalInfo.rollNumber}
                  onChange={(e) => handleInputChange('personalInfo', 'rollNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                  placeholder="21XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Branch *</label>
                <select
                  value={formData.personalInfo.branch}
                  onChange={(e) => handleInputChange('personalInfo', 'branch', e.target.value)}
                  className="w-full px-4 py-3 bg-tertiary-dark text-primary-text border border-accent-primary rounded-md font-inter focus:border-grey focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="CHE">Chemical Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Year *</label>
                <select
                  value={formData.personalInfo.year}
                  onChange={(e) => handleInputChange('personalInfo', 'year', e.target.value)}
                  className="w-full px-4 py-3 bg-tertiary-dark text-primary-text border border-accent-primary rounded-md font-inter focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Technical Skills */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold text-primary-text mb-6">
              Technical Skills
            </h3>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-3">Primary Skills * (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.technicalInfo.primarySkills.includes(skill)}
                      onChange={() => handleArrayChange('technicalInfo', 'primarySkills', skill)}
                      className="w-4 h-4 text-accent-blue bg-glass-white border-glass-border rounded focus:ring-accent-blue focus:ring-2"
                    />
                    <span className="text-sm font-inter text-primary-text">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-3">Programming Languages * (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['JavaScript', 'Python', 'Java', 'C++', 'C', 'Go', 'Rust', 'TypeScript'].map((lang) => (
                  <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.technicalInfo.programmingLanguages.includes(lang)}
                      onChange={() => handleArrayChange('technicalInfo', 'programmingLanguages', lang)}
                      className="w-4 h-4 text-accent-blue bg-glass-white border-glass-border rounded focus:ring-accent-blue focus:ring-2"
                    />
                    <span className="text-sm font-inter text-primary-text">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-3">Frameworks & Tools (Optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {frameworkOptions.map((framework) => (
                  <label key={framework} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.technicalInfo.frameworks.includes(framework)}
                      onChange={() => handleArrayChange('technicalInfo', 'frameworks', framework)}
                      className="w-4 h-4 text-accent-blue bg-glass-white border-glass-border rounded focus:ring-accent-blue focus:ring-2"
                    />
                    <span className="text-sm font-inter text-primary-text">{framework}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Experience Level *</label>
                <select
                  value={formData.technicalInfo.experience}
                  onChange={(e) => handleInputChange('technicalInfo', 'experience', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                >
                  <option value="">Select Experience Level</option>
                  <option value="Beginner">Beginner (0-1 years)</option>
                  <option value="Intermediate">Intermediate (1-3 years)</option>
                  <option value="Advanced">Advanced (3+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Portfolio URL (Optional)</label>
                <input
                  type="url"
                  value={formData.technicalInfo.portfolioUrl}
                  onChange={(e) => handleInputChange('technicalInfo', 'portfolioUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-2">GitHub URL (Optional)</label>
              <input
                type="url"
                value={formData.technicalInfo.githubUrl}
                onChange={(e) => handleInputChange('technicalInfo', 'githubUrl', e.target.value)}
                className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
        )}

        {/* Step 3: Motivation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold text-primary-text mb-6">
              Motivation & Goals
            </h3>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-2">Why do you want to join AppTeam? * (Max 500 characters)</label>
              <textarea
                value={formData.motivation.whyJoin}
                onChange={(e) => handleInputChange('motivation', 'whyJoin', e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300 resize-vertical"
                placeholder="Tell us what motivates you to join our team..."
              />
              <div className="text-right text-xs text-primary-text/60 mt-1">
                {formData.motivation.whyJoin.length}/500
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-2">How can you contribute to AppTeam? * (Max 500 characters)</label>
              <textarea
                value={formData.motivation.contribution}
                onChange={(e) => handleInputChange('motivation', 'contribution', e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300 resize-vertical"
                placeholder="Describe your unique skills and what you can bring to the team..."
              />
              <div className="text-right text-xs text-primary-text/60 mt-1">
                {formData.motivation.contribution.length}/500
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter text-primary-text/80 mb-2">Previous Projects (Optional, Max 500 characters)</label>
              <textarea
                value={formData.motivation.previousProjects}
                onChange={(e) => handleInputChange('motivation', 'previousProjects', e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300 resize-vertical"
                placeholder="Briefly describe any relevant projects you've worked on..."
              />
              <div className="text-right text-xs text-primary-text/60 mt-1">
                {formData.motivation.previousProjects.length}/500
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold text-primary-text mb-6">
              Availability & Role Preference
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Hours per week you can commit *</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={formData.availability.hoursPerWeek || ''}
                  onChange={(e) => handleInputChange('availability', 'hoursPerWeek', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-primary-text/50 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-primary-text/80 mb-2">Preferred Role *</label>
                <select
                  value={formData.availability.preferredRole}
                  onChange={(e) => handleInputChange('availability', 'preferredRole', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-colors duration-300"
                >
                  <option value="">Select Preferred Role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-6">
              <h4 className="text-lg font-space font-semibold text-primary-text mb-3">
                What happens next?
              </h4>
              <ul className="space-y-2 text-primary-text/80 font-inter text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-green mt-0.5 flex-shrink-0" />
                  <span>We'll review your application within 5-7 business days</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-green mt-0.5 flex-shrink-0" />
                  <span>If selected, you'll be invited for a technical interview</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-green mt-0.5 flex-shrink-0" />
                  <span>Successful candidates will join our next onboarding session</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-glass-border">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-inter font-medium transition-colors duration-300 ${currentStep === 1
                ? 'bg-glass-white/50 text-primary-text/50 cursor-not-allowed'
                : 'bg-glass-white border border-glass-border text-primary-text hover:bg-glass-white/80'
              }`}
          >
            Previous
          </button>

          <div className="text-sm font-inter text-primary-text/60">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < 4 ? (
            <GlowButton
              onClick={handleNext}
              className={`${!validateStep(currentStep) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </GlowButton>
          ) : (
            <GlowButton
              onClick={handleSubmit}
              disabled={!validateStep(4) || isSubmitting}
              className={`${(!validateStep(4) || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </GlowButton>
          )}
        </div>

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400 font-inter text-sm">
              Something went wrong. Please try again later.
            </span>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default TeamApplication;