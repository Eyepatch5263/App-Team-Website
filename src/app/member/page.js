"use client";
import React, { useState, useEffect } from "react";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const OurTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/member");
        if (!response.ok) throw new Error("Failed to fetch members");
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const categorizeMembers = () => {
    const categories = {
      alumni: { title: "Alumni", members: [], priority: 1 },
      leadership: { title: "Leadership Team", members: [], priority: 2 },
      coordinator: { title: "Club Coordinators", members: [], priority: 3 },
      executives: { title: "Executives", members: [], priority: 4 },
      volunteers: { title: "Volunteers", members: [], priority: 5 },
    };

    members.forEach((member) => {
      const role = member.role?.toLowerCase() || "";
      if (role.includes("alumni")) categories.alumni.members.push(member);
      else if (role.includes("secretary") || role.includes("convener"))
        categories.leadership.members.push(member);
      else if (role.includes("coordinator"))
        categories.coordinator.members.push(member);
      else if (role.includes("executive"))
        categories.executives.members.push(member);
      else categories.volunteers.members.push(member);
    });

    return Object.values(categories)
      .filter((category) => category.members.length > 0)
      .sort((a, b) => a.priority - b.priority);
  };

  const renderMemberCard = (member, index) => (
    <div
      key={member.id || `${member.name}-${index}`}
      className="group flex flex-col bg-[#1a1033] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors duration-300"
    >
      {/* Image Container 
        Mobile: aspect-square (1:1) - Keeps it short 
        Desktop: aspect-[3/4] - Keeps it elegant
      */}
      <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden bg-gray-900/50">
        <img
          src={member.profileImageURL}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Desktop Overlay: Slide up social icons (Hidden on mobile) */}
        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6 gap-3">
          {member.linkedInURL && (
            <a
              href={member.linkedInURL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black text-white transition-colors border border-white/20 translate-y-4 group-hover:translate-y-0 duration-300"
            >
              <SocialIcon type="linkedin" />
            </a>
          )}
          {member.githubURL && (
            <a
              href={member.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black text-white transition-colors border border-white/20 translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            >
              <SocialIcon type="github" />
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-5 flex flex-col flex-grow text-center">
        <h3 className="text-sm md:text-lg font-bold text-white leading-tight mb-1">
          {member.name}
        </h3>
        <p className="text-[10px] md:text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 md:mb-3">
          {member.role}
        </p>

        {/* Bio: Hidden on extremely small screens, visible on larger */}
        <p className="hidden md:block text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">
          {member.bio}
        </p>

        {/* Mobile Social Icons (Always visible, simpler) */}
        <div className="flex md:hidden justify-center gap-3 mt-auto pt-2 border-t border-white/5">
           {member.linkedInURL && (
            <a href={member.linkedInURL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <SocialIcon type="linkedin" size="w-4 h-4" />
            </a>
           )}
           {member.githubURL && (
            <a href={member.githubURL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <SocialIcon type="github" size="w-4 h-4" />
            </a>
           )}
        </div>
      </div>
    </div>
  );

  const SocialIcon = ({ type, size = "w-5 h-5" }) => {
    if (type === "linkedin") {
      return (
        <svg className={`${size} fill-current`} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    }
    return (
      <svg className={`${size} fill-current`} viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#140b29]">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#140b29]">
        <div className="text-red-400 px-4 py-2 border border-red-500/20 bg-red-500/10 rounded-lg">
          Error: {error}
        </div>
      </div>
    );

  const categorizedMembers = categorizeMembers();

  return (
    <div
      className={`${ubuntu.className} min-h-screen bg-[#140b29] text-white selection:bg-purple-500/30 pb-20`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Header - Simplified and always visible */}
        <section className="text-center mb-12 md:mb-20 space-y-3 md:space-y-4">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white">
            Our Team
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            The minds behind the magic. Passionate individuals driving innovation
            forward.
          </p>
        </section>

        {/* Categories */}
        {categorizedMembers.map((category) => (
          <div key={category.title} className="mb-16 md:mb-24 last:mb-0">
            <div className="flex items-center gap-4 mb-6 md:mb-10 px-2">
              <h2 className="text-xl md:text-3xl font-bold text-white whitespace-nowrap">
                {category.title}
              </h2>
              <div className="h-[1px] w-full bg-white/10 rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {category.members.map((member, index) =>
                renderMemberCard(member, index)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;