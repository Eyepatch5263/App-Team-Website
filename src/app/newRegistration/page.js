"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const RegistrationForm = () => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   mobileNum: '',
  //   rollNum: '',
  //   branch: '',
  //   skills: '',
  //   whyJoin: ''
  // });
  
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  // const [validationErrors, setValidationErrors] = useState({});
  
  // const router = useRouter();

  // const branches = [
  //   'CSE', 'ECE', 'DEC', 'MECH', 'CIVIL', 'EE', 'EP', 'CHEMICAL', 'DCS', 'ARCHI', 'MS', 'MNC'
  // ];

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
    
  //   // Clear validation error when user starts typing
  //   if (validationErrors[name]) {
  //     setValidationErrors(prev => ({
  //       ...prev,
  //       [name]: ''
  //     }));
  //   }
  // };

  // const validateForm = () => {
  //   const errors = {};
    
  //   // Name validation
  //   if (!formData.name.trim()) {
  //     errors.name = 'Name is required';
  //   } else if (formData.name.trim().length < 2) {
  //     errors.name = 'Name must be at least 2 characters';
  //   }
    
  //   // Email validation
  //   const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  //   if (!formData.email.trim()) {
  //     errors.email = 'Email is required';
  //   } else if (!emailRegex.test(formData.email)) {
  //     errors.email = 'Please enter a valid email';
  //   }
    
  //   // Mobile number validation
  //   const mobileRegex = /^[0-9]{10}$/;
  //   if (!formData.mobileNum.trim()) {
  //     errors.mobileNum = 'Mobile number is required';
  //   } else if (!mobileRegex.test(formData.mobileNum.replace(/\s/g, ''))) {
  //     errors.mobileNum = 'Please enter a valid 10-digit mobile number';
  //   }
    
  //   // Roll number validation
  //   if (!formData.rollNum.trim()) {
  //     errors.rollNum = 'Roll number is required';
  //   }
    
  //   // Branch validation
  //   if (!formData.branch) {
  //     errors.branch = 'Please select a branch';
  //   }
    
  //   // Why join validation
  //   if (!formData.whyJoin.trim()) {
  //     errors.whyJoin = 'Please tell us why you want to join';
  //   } else if (formData.whyJoin.trim().length < 10) {
  //     errors.whyJoin = 'Please provide at least 10 characters';
  //   }
    
  //   setValidationErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');
    
  //   if (!validateForm()) {
  //     return;
  //   }
    
  //   setLoading(true);
    
  //   try {
  //     const response = await fetch('/api/newRegistration', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
      
  //     const data = await response.json();
      
  //     if (!response.ok) {
  //       throw new Error(data.error || 'Registration failed');
  //     }
      
  //     setSuccess('Registration successful! Welcome to the community.');
  //     setFormData({
  //       name: '',
  //       email: '',
  //       mobileNum: '',
  //       rollNum: '',
  //       branch: '',
  //       skills: '',
  //       whyJoin: ''
  //     });
      
  //     // Redirect after 2 seconds
  //     setTimeout(() => {
  //       router.push('/registration'); // or wherever you want to redirect
  //     }, 2000);
      
  //   } catch (err) {
  //     setError(err.message || 'Registration failed. Please try again.');
  //     console.error('Registration error:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const goBack = () => {
  //   router.back();
  // };

  // return (
  //   <div className={`${ubuntu.className} font-sans min-h-screen p-5 select-none bg-[#140b29]`}>
  //     <div className="max-w-2xl mx-auto">
  //       {/* Header */}
  //       <div className="flex flex-col items-center mb-10">
  //         <h1 className="text-center text-white text-3xl font-semibold mb-6 text-shadow">
  //           Student Registration
  //         </h1>
  //         <button 
  //           onClick={goBack}
  //           className="py-3 px-6 bg-[#231446] border-2 border-[#a594f9] rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#9d8bfa] flex items-center gap-2"
  //         >
  //           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  //           </svg>
  //           Back
  //         </button>
  //       </div>

  //       {/* Success Message */}
  //       {success && (
  //         <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
  //           <div className="flex items-center justify-center gap-2 mb-2">
  //             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  //             </svg>
  //             <span className="font-semibold">Registered!</span>
  //           </div>
  //           <p>{success}</p>
  //         </div>
  //       )}

  //       {/* Error Message */}
  //       {error && (
  //         <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
  //           <div className="flex items-center justify-center gap-2 mb-2">
  //             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //             </svg>
  //             <span className="font-semibold">Error</span>
  //           </div>
  //           <p>{error}</p>
  //         </div>
  //       )}

  //       {/* Registration Form */}
  //       <div className="announcement-card rounded-2xl p-8 border-2 border-white/15 shadow-2xl backdrop-blur-sm">
  //         <div className="flex items-center gap-2 mb-6">
  //           <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  //           </svg>
  //           <h2 className="text-purple-200 font-medium text-lg uppercase tracking-wide">
  //             Registration Details
  //           </h2>
  //         </div>

  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           {/* Name Field */}
  //           <div>
  //             <label className="block text-purple-200 text-sm font-medium mb-2">
  //               Full Name *
  //             </label>
  //             <input
  //               type="text"
  //               name="name"
  //               value={formData.name}
  //               onChange={handleInputChange}
  //               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
  //               placeholder="Enter your full name"
  //             />
  //             {validationErrors.name && (
  //               <p className="text-red-400 text-xs mt-1">{validationErrors.name}</p>
  //             )}
  //           </div>

  //           {/* Email and Mobile Row */}
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="block text-purple-200 text-sm font-medium mb-2">
  //                 Email Address *
  //               </label>
  //               <input
  //                 type="email"
  //                 name="email"
  //                 value={formData.email}
  //                 onChange={handleInputChange}
  //                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
  //                 placeholder="your.email@example.com"
  //               />
  //               {validationErrors.email && (
  //                 <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
  //               )}
  //             </div>

  //             <div>
  //               <label className="block text-purple-200 text-sm font-medium mb-2">
  //                 Mobile Number *
  //               </label>
  //               <input
  //                 type="tel"
  //                 name="mobileNum"
  //                 value={formData.mobileNum}
  //                 onChange={handleInputChange}
  //                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
  //                 placeholder="1234567890"
  //               />
  //               {validationErrors.mobileNum && (
  //                 <p className="text-red-400 text-xs mt-1">{validationErrors.mobileNum}</p>
  //               )}
  //             </div>
  //           </div>

  //           {/* Roll Number and Branch Row */}
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="block text-purple-200 text-sm font-medium mb-2">
  //                 Roll Number *
  //               </label>
  //               <input
  //                 type="text"
  //                 name="rollNum"
  //                 value={formData.rollNum}
  //                 onChange={handleInputChange}
  //                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
  //                 placeholder="25BWXYZ"
  //               />
  //               {validationErrors.rollNum && (
  //                 <p className="text-red-400 text-xs mt-1">{validationErrors.rollNum}</p>
  //               )}
  //             </div>

  //             <div>
  //               <label className="block text-purple-200 text-sm font-medium mb-2">
  //                 Branch *
  //               </label>
  //               <select
  //                 name="branch"
  //                 value={formData.branch}
  //                 onChange={handleInputChange}
  //                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
  //               >
  //                 <option value="" className="bg-[#140b29] text-white">Select your branch</option>
  //                 {branches.map(branch => (
  //                   <option key={branch} value={branch} className="bg-[#140b29] text-white">
  //                     {branch}
  //                   </option>
  //                 ))}
  //               </select>
  //               {validationErrors.branch && (
  //                 <p className="text-red-400 text-xs mt-1">{validationErrors.branch}</p>
  //               )}
  //             </div>
  //           </div>

  //           {/* Skills Field */}
  //           <div>
  //             <label className="block text-purple-200 text-sm font-medium mb-2">
  //               Skills Or Interests
  //             </label>
  //             <input
  //               type="text"
  //               name="skills"
  //               value={formData.skills}
  //               onChange={handleInputChange}
  //               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
  //               placeholder="Any technical skill or soft skill"
  //             />
  //           </div>

  //           {/* Why Join Field */}
  //           <div>
  //             <label className="block text-purple-200 text-sm font-medium mb-2">
  //               Why do you want to join? *
  //             </label>
  //             <textarea
  //               name="whyJoin"
  //               value={formData.whyJoin}
  //               onChange={handleInputChange}
  //               rows="4"
  //               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 resize-none"
  //               placeholder="Tell us about your motivation, goals, and what you hope to achieve..."
  //             />
  //             {validationErrors.whyJoin && (
  //               <p className="text-red-400 text-xs mt-1">{validationErrors.whyJoin}</p>
  //             )}
  //             <p className="text-white/40 text-xs mt-1">
  //               {formData.whyJoin.length}/500 characters
  //             </p>
  //           </div>

  //           {/* Submit Button */}
  //           <div className="pt-4">
  //             <button 
  //               type="submit"
  //               disabled={loading}
  //               className="w-full py-4 px-8 bg-gradient-to-r from-purple-400 to-pink-600 border-none rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-pink-700 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  //             >
  //               {loading ? (
  //                 <>
  //                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
  //                   Submitting...
  //                 </>
  //               ) : (
  //                 <>
                    
  //                   Submit Registration
  //                 </>
  //               )}
  //             </button>
  //           </div>
  //         </form>

  //         {/* Footer */}
  //         <div className="flex justify-center items-center mt-6 pt-4 border-t border-white/10">
  //           <div className="flex items-center gap-1 text-white/50 text-xs">
  //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  //             </svg>
  //             Secure Registration
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div className='flex justify-center items-center min-h-screen text-4xl bg-[#140b29] text-white font-semibold'>
        Registrations are closed !
      </div>
    </>
  )
};

export default RegistrationForm;