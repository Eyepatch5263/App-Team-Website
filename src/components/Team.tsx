import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Github, Linkedin, Twitter, Code, Palette, Brain, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';


interface Member {
  _id: string;
  personalInfo: {
    fullName: string;
    email: string;
    year?: string;
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
}

const Team: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'none' | 'role' | 'year'>('none');

  const fetchMembers = useCallback(async () => {
    try {
      const backendUri = import.meta.env.VITE_BACKEND_URI;
      if (!backendUri) {
        return;
      }
      const response = await fetch(`${backendUri}/api/members`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setMembers(data.data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const getRoleIcon = useCallback((role: string) => {
    if (role.toLowerCase().includes('design')) return <Palette className="w-4 h-4 md:w-5 md:h-5" />;
    if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('ml')) return <Brain className="w-4 h-4 md:w-5 md:h-5" />;
    return <Code className="w-4 h-4 md:w-5 md:h-5" />;
  }, []);

  const sortedMembers = useMemo(() => {
    const sorted = [...members];
    if (sortBy === 'role') {
      sorted.sort((a, b) =>
        a.professionalInfo.role.localeCompare(b.professionalInfo.role)
      );
    } else if (sortBy === 'year') {
      const yearOrder: Record<string, number> = { '1st': 1, '2nd': 2, '3rd': 3, '4th': 4 };
      sorted.sort((a, b) => {
        const aYear = yearOrder[a.personalInfo.year || ''] || 0;
        const bYear = yearOrder[b.personalInfo.year || ''] || 0;
        return aYear - bYear;
      });
    }
    return sorted;
  }, [members, sortBy]);

  const MemberCard: React.FC<{ member: Member }> = React.memo(({ member }) => (
    <GlassCard className="p-4 md:p-6 text-center group overflow-hidden relative">
      <div className="relative mb-4 md:mb-6 mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent-primary/30 group-hover:border-accent-primary transition-colors duration-300">
        <img
          src={member.personalInfo.profileImage || '/AppTeam.png'}
          alt={member.personalInfo.fullName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/AppTeam.png';
          }}
        />
      </div>

      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="text-accent-primary">
          {getRoleIcon(member.professionalInfo.role)}
        </div>
        <h3 className="text-lg md:text-xl font-sansita font-semibold text-primary-text group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
          {member.personalInfo.fullName}
        </h3>
      </div>

      <p className="text-accent-secondary font-sansita font-medium mb-2 text-xs md:text-sm line-clamp-2">
        {member.professionalInfo.role}
      </p>

      {member.membershipInfo.position && (
        <p className="text-accent-tertiary font-sansita text-xs mb-3 md:mb-4">
          {member.membershipInfo.position}
        </p>
      )}

      <p className="text-muted-text font-sansita text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">
        {member.professionalInfo.bio}
      </p>

      <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4 md:mb-6">
        {member.professionalInfo.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="px-2 md:px-3 py-1 bg-accent-tertiary/10 text-accent-tertiary text-xs font-sansita rounded-full border border-accent-tertiary/30">
            {skill}
          </span>
        ))}
        {member.professionalInfo.skills.length > 3 && (
          <span className="px-2 md:px-3 py-1 bg-neutral-500/10 text-neutral-400 text-xs font-sansita rounded-full border border-neutral-500/30">
            +{member.professionalInfo.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex justify-center space-x-3 md:space-x-4">
        {member.professionalInfo.githubUrl && (
          <a href={member.professionalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-transform transform hover:scale-110 text-muted-text">
            <Github className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
        {member.professionalInfo.linkedinUrl && (
          <a href={member.professionalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-transform transform hover:scale-110 text-muted-text">
            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
        {member.professionalInfo.twitterUrl && (
          <a href={member.professionalInfo.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-transform transform hover:scale-110 text-muted-text">
            <Twitter className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
        {member.professionalInfo.portfolioUrl && (
          <a href={member.professionalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-transform transform hover:scale-110 text-muted-text">
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
      </div>
    </GlassCard>
  ));

  if (loading) {
    return (
      <section className="py-16 md:py-24 text-center">
        <p className="text-secondary-text">Loading team members...</p>
      </section>
    );
  }

  return (
    <section id="team" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl lg:text-4xl font-sansita font-bold text-primary-text mb-2">
            Meet Our <span className="text-accent-primary">Team</span>
          </h2>
          <p className="text-secondary-text font-sansita max-w-2xl mx-auto">
            Developers, designers, thinkers, and creators working together to build amazing tech.
          </p>
        </div>


        {/* No Members Fallback */}
        {sortedMembers.length === 0 ? (
          <p className="text-center font-sansita text-secondary-text">No members found.</p>
        ) : (
          <>
            {['4th', '3rd'].map((year) => {
              const yearMembers = sortedMembers.filter(
                (member) => member.personalInfo.year === year
              );
              if (yearMembers.length === 0) return null;
              return (
                <div key={year} className="mb-10">
                  <h3 className="text-2xl font-bold mb-6 font-sansita text-accent-primary text-center">
                    {year === "4th" ? "Final Year" : "3rd Year"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {(year === "4th"
                      ? [...yearMembers].sort((a, b) => {
                        const order = ["Secretary", "Convenenor", "Coordinater"];
                        const aIndex = order.indexOf(a.membershipInfo.position || "");
                        const bIndex = order.indexOf(b.membershipInfo.position || "");
                        if (aIndex === -1 && bIndex === -1) return 0;
                        if (aIndex === -1) return 1;
                        if (bIndex === -1) return -1;
                        return aIndex - bIndex;
                      })
                      : yearMembers
                    ).map((member) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl lg:text-4xl font-sansita font-bold text-primary-text mb-2">
            Meet Our <span className="text-accent-primary">Alumni</span>
          </h2>
          {sortedMembers.length === 0 ? (
            <p className="text-center font-sansita text-secondary-text">No members found.</p>
          ) : (
            <>
              {['5th'].map((year) => {
                const yearMembers = sortedMembers.filter(
                  (member) => member.personalInfo.year === year
                );
                if (yearMembers.length === 0) return null;
                return (
                  <div key={year} className="mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {yearMembers.map((member) => (
                        <MemberCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Team);
