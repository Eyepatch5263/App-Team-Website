// import React, { useState, useEffect, useCallback } from 'react';
// import { Github, Linkedin, Twitter, Code, Palette, Brain, Plus, Edit, ExternalLink, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import GlassCard from '../components/GlassCard';
// import GlowButton from '../components/GlowButton';
// import MemberForm from '../components/MemberForm';

// interface Member {
//   _id: string;
//   personalInfo: {
//     fullName: string;
//     email: string;
//     profileImage?: string;
//   };
//   professionalInfo: {
//     role: string;
//     bio: string;
//     skills: string[];
//     portfolioUrl?: string;
//     githubUrl?: string;
//     linkedinUrl?: string;
//     twitterUrl?: string;
//   };
//   membershipInfo: {
//     memberType: string;
//     position?: string;
//   };
// }

// const API_BASE = 'https://appteam-website-1.onrender.com/api/members';

// const AddMembersPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showMemberForm, setShowMemberForm] = useState(false);
//   const [editingEmail, setEditingEmail] = useState<string | undefined>();
//   const [memberEmail, setMemberEmail] = useState('');
//   const [showEmailInput, setShowEmailInput] = useState(false);

//   const fetchMembers = useCallback(async () => {
//     try {
//       const response = await fetch(API_BASE);
//       const data = await response.json();

//       if (data.success) {
//         setMembers(data.data);
//       } else {
//         setMembers([]);
//       }
//     } catch (error) {
//       console.error('Failed to fetch members:', error);
//       setMembers([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMembers();
//   }, [fetchMembers]);

//   const getRoleIcon = useCallback((role: string) => {
//     if (role.toLowerCase().includes('design')) return <Palette className="w-4 h-4 md:w-5 md:h-5" />;
//     if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('ml')) return <Brain className="w-4 h-4 md:w-5 md:h-5" />;
//     return <Code className="w-4 h-4 md:w-5 md:h-5" />;
//   }, []);

//   const handleEditProfile = useCallback(() => {
//     if (memberEmail.trim()) {
//       setEditingEmail(memberEmail.trim());
//       setShowMemberForm(true);
//       setShowEmailInput(false);
//       setMemberEmail('');
//     }
//   }, [memberEmail]);

//   const handleFormClose = useCallback(() => {
//     setShowMemberForm(false);
//     setEditingEmail(undefined);
//     fetchMembers(); // Refresh the members list
//   }, [fetchMembers]);

//   const MemberCard: React.FC<{ member: Member }> = React.memo(({ member }) => (
//     <GlassCard className="p-4 md:p-6 text-center group overflow-hidden">
//       <div className="relative mb-4 md:mb-6 mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent-primary/30 group-hover:border-accent-primary transition-colors duration-300">
//         <img
//           src={member.personalInfo.profileImage || '/AppTeam.png'}
//           alt={member.personalInfo.fullName}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           loading="lazy"
//           decoding="async"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = '/AppTeam.png';
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//       </div>

//       <div className="flex items-center justify-center space-x-2 mb-2">
//         <div className="text-accent-primary">
//           {getRoleIcon(member.professionalInfo.role)}
//         </div>
//         <h3 className="text-lg md:text-xl font-space font-semibold text-primary-text group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
//           {member.personalInfo.fullName}
//         </h3>
//       </div>

//       <p className="text-accent-secondary font-inter font-medium mb-2 text-xs md:text-sm line-clamp-2">
//         {member.professionalInfo.role}
//       </p>

//       {member.membershipInfo.position && (
//         <p className="text-accent-tertiary font-inter text-xs mb-3 md:mb-4">
//           {member.membershipInfo.position}
//         </p>
//       )}

//       <p className="text-muted-text font-inter text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">
//         {member.professionalInfo.bio}
//       </p>

//       <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4 md:mb-6">
//         {member.professionalInfo.skills.slice(0, 3).map((skill, i) => (
//           <span
//             key={i}
//             className="px-2 md:px-3 py-1 bg-accent-tertiary/10 text-accent-tertiary text-xs font-inter rounded-full border border-accent-tertiary/30"
//           >
//             {skill}
//           </span>
//         ))}
//         {member.professionalInfo.skills.length > 3 && (
//           <span className="px-2 md:px-3 py-1 bg-neutral-500/10 text-neutral-400 text-xs font-inter rounded-full border border-neutral-500/30">
//             +{member.professionalInfo.skills.length - 3}
//           </span>
//         )}
//       </div>

//       <div className="flex justify-center space-x-3 md:space-x-4">
//         {member.professionalInfo.githubUrl && (
//           <a href={member.professionalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110">
//             <Github className="w-4 h-4 md:w-5 md:h-5" />
//           </a>
//         )}
//         {member.professionalInfo.linkedinUrl && (
//           <a href={member.professionalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110">
//             <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
//           </a>
//         )}
//         {member.professionalInfo.twitterUrl && (
//           <a href={member.professionalInfo.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110">
//             <Twitter className="w-4 h-4 md:w-5 md:h-5" />
//           </a>
//         )}
//         {member.professionalInfo.portfolioUrl && (
//           <a href={member.professionalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110">
//             <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
//           </a>
//         )}
//       </div>
//     </GlassCard>
//   ));

//   if (loading) {
//     return (
//       <section className="py-16 md:py-24 relative min-h-screen">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-accent-primary mx-auto"></div>
//             <p className="text-secondary-text mt-4">Loading team members...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 md:py-24 relative min-h-screen">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mb-6 md:mb-8">
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 transition-colors duration-300 font-inter font-medium"
//           >
//             <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
//             <span>Back to Home</span>
//           </button>
//         </div>

//         <div className="text-center mb-8 md:mb-12">
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-space font-bold text-primary-text mb-3 md:mb-4">
//             Manage <span className="text-accent-primary">Team Members</span>
//           </h1>
//           <p className="text-sm md:text-base lg:text-lg font-inter text-secondary-text max-w-2xl mx-auto leading-relaxed">
//             Add new team members or edit existing profiles. Manage the AppTeam roster and showcase our talented developers.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
//           <GlowButton onClick={() => setShowMemberForm(true)} className="group text-sm md:text-base">
//             <Plus className="w-4 h-4 mr-2" />
//             Add New Member
//           </GlowButton>

//           <GlowButton
//             variant="secondary"
//             onClick={() => setShowEmailInput(!showEmailInput)}
//             className="group text-sm md:text-base"
//           >
//             <Edit className="w-4 h-4 mr-2" />
//             Edit Member Profile
//           </GlowButton>
//         </div>

//         {showEmailInput && (
//           <div className="max-w-md mx-auto mb-6 md:mb-8">
//             <GlassCard className="p-3 md:p-4">
//               <div className="flex gap-2">
//                 <input
//                   type="email"
//                   value={memberEmail}
//                   onChange={(e) => setMemberEmail(e.target.value)}
//                   placeholder="Enter email to edit profile"
//                   className="flex-1 px-3 py-2 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 text-sm md:text-base"
//                 />
//                 <button
//                   onClick={handleEditProfile}
//                   disabled={!memberEmail.trim()}
//                   className="px-3 md:px-4 py-2 bg-accent-primary text-white rounded-lg font-inter font-medium hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm md:text-base"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </GlassCard>
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//           {members.map((member) => (
//             <MemberCard key={member._id} member={member} />
//           ))}
//         </div>

//         {showMemberForm && (
//           <MemberForm 
//             onClose={handleFormClose}
//             editingEmail={editingEmail}
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default React.memo(AddMembersPage);
