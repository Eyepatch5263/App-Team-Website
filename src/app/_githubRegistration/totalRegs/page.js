"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const GitHubRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const router = useRouter();

  const branches = [
    'All', 'CSE', 'ECE', 'DEC', 'MECH', 'EE', 'CIVIL', 'EP', 'CHEMICAL', 'DCS', 'ARCHI', 'MS', 'MNC'
  ];

  const genders = ['All', 'Male', 'Female'];

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/githubRegistration/totalRegs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub registrations');
      }
      
      const data = await response.json();
      
      // Handle different possible API response structures
      let registrationsData = [];
      if (Array.isArray(data)) {
        registrationsData = data;
      } else if (data && Array.isArray(data.registrations)) {
        registrationsData = data.registrations;
      } else if (data && Array.isArray(data.data)) {
        registrationsData = data.data;
      } else {
        console.warn('Unexpected API response format:', data);
        registrationsData = [];
      }
      
      setRegistrations(registrationsData);
      setFilteredRegistrations(registrationsData);
      setError('');
    } catch (err) {
      setError('Failed to load GitHub registrations. Please try again later.');
      setRegistrations([]);
      setFilteredRegistrations([]);
      console.error('Error fetching GitHub registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filter and sort registrations
  useEffect(() => {
    let filtered = [...registrations];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.rollNum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Branch filter
    if (selectedBranch && selectedBranch !== 'All') {
      filtered = filtered.filter(reg => reg.branch === selectedBranch);
    }

    // Gender filter
    if (selectedGender && selectedGender !== 'All') {
      filtered = filtered.filter(reg => reg.gender === selectedGender);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
        case 'oldest':
          return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'branch':
          return (a.branch || '').localeCompare(b.branch || '');
        case 'rollNum':
          return (a.rollNum || '').localeCompare(b.rollNum || '');
        default:
          return 0;
      }
    });

    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm, selectedBranch, selectedGender, sortBy]);

  // Hydration fix: Precompute formatted dates on client only
  const [formattedDates, setFormattedDates] = useState([]);

  useEffect(() => {
    const formatDate = (dateString) => {
      if (!dateString) return 'No date';
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInHours < 1) return 'Just registered';
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      if (diffInDays === 1) return '1 day ago';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
    setFormattedDates(
      filteredRegistrations.map(reg => formatDate(reg.createdAt || reg.date))
    );
  }, [filteredRegistrations]);

  const getBranchColor = (branch) => {
    const colors = {
      'CSE': 'from-blue-500/20 to-cyan-600/20 border-blue-400/30',
      'ECE': 'from-green-500/20 to-emerald-600/20 border-green-400/30',
      'EEE': 'from-yellow-500/20 to-orange-600/20 border-yellow-400/30',
      'MECH': 'from-red-500/20 to-pink-600/20 border-red-400/30',
      'CIVIL': 'from-indigo-500/20 to-purple-600/20 border-indigo-400/30',
      'IT': 'from-teal-500/20 to-cyan-600/20 border-teal-400/30',
      'CHEM': 'from-purple-500/20 to-violet-600/20 border-purple-400/30',
      'AERO': 'from-sky-500/20 to-blue-600/20 border-sky-400/30',
      'BIOTEC': 'from-emerald-500/20 to-green-600/20 border-emerald-400/30',
      'OTHER': 'from-gray-500/20 to-slate-600/20 border-gray-400/30'
    };
    return colors[branch] || colors['OTHER'];
  };

  // Removed gender icons as requested

  const getStats = () => {
    const total = registrations.length;
    const branchCounts = registrations.reduce((acc, reg) => {
      acc[reg.branch] = (acc[reg.branch] || 0) + 1;
      return acc;
    }, {});
    
    const genderCounts = registrations.reduce((acc, reg) => {
      acc[reg.gender] = (acc[reg.gender] || 0) + 1;
      return acc;
    }, {});
    
    const topBranch = Object.entries(branchCounts).sort(([,a], [,b]) => b - a)[0];
    
    return {
      total,
      branchCounts,
      genderCounts,
      topBranch: topBranch ? topBranch[0] : 'N/A',
      topBranchCount: topBranch ? topBranch[1] : 0
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className={`${ubuntu.className} font-sans min-h-screen p-5 select-none bg-[#140b29]`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-white text-3xl font-semibold mb-10 text-shadow">
            GitHub Workshop Registrations
          </h1>
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading GitHub registrations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${ubuntu.className} font-sans min-h-screen p-5 select-none bg-[#140b29]`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-white text-3xl font-semibold mb-10 text-shadow">
            GitHub Workshop Registrations
          </h1>
          <div className="text-center">
            <div className="mb-4 p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
              {error}
            </div>
            <button 
              onClick={fetchRegistrations}
              className="py-3 px-8 bg-gradient-to-r from-purple-400 to-pink-600 border-none rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-pink-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${ubuntu.className} font-sans min-h-screen p-5 select-none bg-[#140b29]`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-center text-white text-3xl font-semibold mb-6 text-shadow">
            GitHub Workshop Registrations
          </h1>
          <button
            onClick={() => {
              fetch('/api/githubRegistration/export')
                .then(res => res.blob())
                .then(blob => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'github-registrations.xlsx';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                });
            }}
            className="mt-4 py-3 px-8 bg-green-700 border-2 border-green-400 rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:bg-green-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Export to Excel
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="announcement-card rounded-xl p-6 border-2 border-white/15 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
            <div className="text-purple-300 text-sm">Total Registrations</div>
          </div>
          <div className="announcement-card rounded-xl p-6 border-2 border-white/15 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.topBranch}</div>
            <div className="text-purple-300 text-sm">Most Popular Branch</div>
          </div>
          <div className="announcement-card rounded-xl p-6 border-2 border-white/15 text-center">
            <div className="text-3xl font-bold text-white mb-2">{Object.keys(stats.branchCounts).length}</div>
            <div className="text-purple-300 text-sm">Active Branches</div>
          </div>
          <div className="announcement-card rounded-xl p-6 border-2 border-white/15 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.genderCounts.Male || 0}:{stats.genderCounts.Female || 0}</div>
            <div className="text-purple-300 text-sm">Male : Female</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="announcement-card rounded-2xl p-6 border-2 border-white/15 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-purple-200 text-sm font-medium mb-2">Search Students</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, roll number, or phone..."
                  className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
                <svg className="w-5 h-5 text-white/50 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Branch Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-purple-200 text-sm font-medium mb-2">Filter by Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch === 'All' ? '' : branch} className="bg-[#140b29] text-white">
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-purple-200 text-sm font-medium mb-2">Filter by Gender</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
              >
                {genders.map(gender => (
                  <option key={gender} value={gender === 'All' ? '' : gender} className="bg-[#140b29] text-white">
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-48">
              <label className="block text-purple-200 text-sm font-medium mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
              >
                <option value="newest" className="bg-[#140b29] text-white">Newest First</option>
                <option value="oldest" className="bg-[#140b29] text-white">Oldest First</option>
                <option value="name" className="bg-[#140b29] text-white">Name A-Z</option>
                <option value="branch" className="bg-[#140b29] text-white">Branch A-Z</option>
                <option value="rollNum" className="bg-[#140b29] text-white">Roll Number</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/70 text-sm">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
              {selectedBranch && ` • Filtered by ${selectedBranch}`}
              {selectedGender && ` • Filtered by ${selectedGender}`}
              {searchTerm && ` • Searched for "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Registrations List */}
        {filteredRegistrations.length === 0 ? (
          <div className="text-center">
            <div className="mb-4 p-8 announcement-card rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-white/70 text-lg">
                {searchTerm || selectedBranch || selectedGender ? 'No registrations match your filters.' : 'No GitHub workshop registrations available at the moment.'}
              </p>
              <p className="text-white/50 text-sm mt-2">
                {searchTerm || selectedBranch || selectedGender ? 'Try adjusting your search criteria.' : 'Students will appear here once they register for the GitHub workshop!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRegistrations.map((registration, index) => (
              <div
                key={registration._id || registration.id || index}
                className="announcement-card rounded-xl p-5 border-2 border-white/15 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:shadow-xl"
              >
                {/* Main Registration Info */}
                <div className="flex items-center justify-between mb-4">
                  {/* Left side - Name and Roll Number */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-400/30">
                      <span className="text-white font-bold text-lg">
                        {registration.name?.charAt(0)?.toUpperCase() || 'N'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{registration.name}</h3>
                      <div className="flex items-center gap-2 text-purple-300 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <span>{registration.rollNum}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center - Branch Badge */}
                  <div className="flex-shrink-0 mx-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm text-white font-semibold bg-gradient-to-r ${getBranchColor(registration.branch)} border`}>
                      {registration.branch}
                    </span>
                  </div>

                  {/* Right side - Gender and Date */}
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center justify-end text-purple-300 text-sm mb-1">
                      <span>{registration.gender}</span>
                    </div>
                    <div className="text-white/50 text-xs">
                      {formattedDates[index]}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30">
                      <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-blue-200 text-xs font-medium">Email</div>
                      <div className="text-white text-sm truncate">{registration.email}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/30">
                      <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-green-200 text-xs font-medium">Phone</div>
                      <div className="text-white text-sm">{registration.mobileNum}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button 
            onClick={fetchRegistrations}
            disabled={loading}
            className="py-3 px-8 border-[#a594f9] bg-[#231446] border-2 rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#9d8bfa] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubRegistrations;