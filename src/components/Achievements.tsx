import React, { useEffect, useRef, useState, useCallback } from "react";
import GlassCard from "./GlassCard";
import { ChevronLeft, ChevronRight, Camera, X } from "lucide-react"; // Added X for close icon

const Achievements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const pauseTimeoutRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollSpeed = useRef(isMobile ? 1 : 1);

  const achievementGallery = [
    {
      id: 1,
      title: "HOH 6.0",
      image: "/img9.jpeg",
      description: "Successfully organized HackOnHills-6.0.",
      event: "HOH 6.0",
      year: "2025",
      type: "Competition Organized",
    },
    {
      id: 2,
      title: "Our Team",
      image: "/img12.jpeg",
      description: "Our whole team in one frame.",
      event: "Photo shoot",
      year: "2025",
      type: "Recognition",
    },
    {
      id: 3,
      title: "Innovation Award",
      image: "/img5.jpeg",
      description: "Best Techno Innovation Team.",
      event: "Tech Innovation",
      year: "2025",
      type: "Innovation",
    },
    {
      id: 4,
      title: "Leadership Award",
      image: "/img11.jpeg",
      description: "Organized standout tech initiatives.",
      event: "Leadership",
      year: "2025",
      type: "Leadership",
    },
  ];

  const galleryMemories = [
    {
      id: 2,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (3).jpeg",
      title: "Workshop Moments",
      description: "Learning and sharing knowledge together",
    },
    {
      id: 3,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (4).jpeg",
      title: "Celebration Time",
      description: "Celebrating our achievements and milestones",
    },
    {
      id: 4,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (6).jpeg",
      title: "Project Showcase",
      description: "Presenting our innovative projects",
    },
    {
      id: 5,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (7).jpeg",
      title: "Coding Sessions",
      description: "Collaborative coding and problem solving",
    },
    {
      id: 7,
      image: "/img12.jpeg",
      title: "Complete Team",
      description: "Our amazing team together",
    },
    {
      id: 8,
      image: "/img5.jpeg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 9,
      image: "/IMG-1.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 10,
      image: "/IMG-2.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 11,
      image: "/IMG-3.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 12,
      image: "/IMG-4.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 13,
      image: "/IMG-5.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 16,
      image:"img_16.jpg",
      title:"Behind the scenes",
      description: "Our amazing team together",
    }
  ];

  const duplicatedGallery = [...achievementGallery, ...achievementGallery, ...achievementGallery];
  const numOriginalItems = achievementGallery.length;


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      scrollSpeed.current = 1;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePause = useCallback(() => {
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  }, []);

  const handleResume = useCallback(() => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(
      () => setIsAutoScrolling(true),
      1500
    );
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isAutoScrolling) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    const getCardWidth = () => {
      const card = scrollContainer.querySelector(
        "div.flex-shrink-0"
      ) as HTMLElement;
      const gap = window.innerWidth < 768 ? 16 : 24;
      return card ? card.offsetWidth + gap : 400;
    };

    let cardWidth = getCardWidth(); 

    const resetPoint = cardWidth * numOriginalItems;

    const autoScroll = () => {
      if (!scrollContainer) return;

      cardWidth = getCardWidth(); 

      scrollContainer.scrollLeft += scrollSpeed.current;

      if (scrollContainer.scrollLeft >= resetPoint) {
        scrollContainer.scrollLeft -= resetPoint; 
      }

      animationFrameId.current = requestAnimationFrame(autoScroll);
    };

    animationFrameId.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAutoScrolling, isMobile, numOriginalItems]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Attach event listeners for pause/resume
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (isMobile) {
      const onTouchStart = () => handlePause();
      const onTouchEnd = () => handleResume();
      scrollContainer.addEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      scrollContainer.addEventListener("touchend", onTouchEnd, {
        passive: true,
      });
      return () => {
        scrollContainer.removeEventListener("touchstart", onTouchStart);
        scrollContainer.removeEventListener("touchend", onTouchEnd);
      };
    } else {
      const onMouseEnter = () => handlePause();
      const onMouseLeave = () => handleResume();
      scrollContainer.addEventListener("mouseenter", onMouseEnter);
      scrollContainer.addEventListener("mouseleave", onMouseLeave);
      return () => {
        scrollContainer.removeEventListener("mouseenter", onMouseEnter);
        scrollContainer.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [isMobile, handlePause, handleResume]);

  // Navigation buttons
  const scrollLeft = () => {
    if (scrollRef.current) {
      handlePause(); // Pause auto-scroll immediately

      const card = scrollRef.current.querySelector(
        "div.flex-shrink-0"
      ) as HTMLElement;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const scrollAmount = card ? card.offsetWidth + gap : 400;
      const originalContentWidth = card.offsetWidth * numOriginalItems + (numOriginalItems - 1) * gap;


      if (scrollRef.current.scrollLeft < scrollAmount) {
        scrollRef.current.scrollLeft += originalContentWidth;
      }

      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      handleResume(); 
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      handlePause(); // Pause auto-scroll immediately

      const card = scrollRef.current.querySelector(
        "div.flex-shrink-0"
      ) as HTMLElement;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const scrollAmount = card ? card.offsetWidth + gap : 400;
      const originalContentWidth = card.offsetWidth * numOriginalItems + (numOriginalItems - 1) * gap;


      const threshold = originalContentWidth * (duplicatedGallery.length / numOriginalItems - 1) - scrollAmount;
      if (scrollRef.current.scrollLeft >= threshold) {
         scrollRef.current.scrollLeft -= originalContentWidth;
      }


      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      handleResume(); 
    }
  };


  const getTypeColor = (type: string) => {
    switch (type) {
      case "Competition Organized":
        return "text-white bg-accent-primary/20 border-accent-primary/30";
      case "Recognition":
        return "text-white bg-accent-secondary/20 border-accent-secondary/30";
      case "Innovation":
        return "text-white bg-accent-tertiary/20 border-accent-tertiary/30";
      case "Leadership":
        return "text-white bg-accent-success/20 border-accent-success/30";
      default:
        return "text-white bg-neutral-500/20 border-neutral-500/30";
    }
  };

  const timeline = [
    {
      year: "2014",
      title: "Team Formation",
      description:
        "AppTeam was founded with a vision to excel in competitive programming and app development.",
      color: "border-accent-primary",
    },
    {
      year: "2016",
      title: "HackOnHills Announced",
      description:
        "Announced our first hackathon and successfully organized it, marking our entry in finding solutions to real-world problems.",
      color: "border-accent-secondary",
    },
    {
      year: "2025",
      title: "Triple Crown",
      description:
        "Achieved success in HOH 6.0, Nimbus, and Hillfair, cementing our position as elite developers.",
      color: "border-accent-tertiary",
    },
  ];

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);


  return (
    <section id="achievements" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sansita font-bold text-primary-text mb-4 md:mb-6">
            Our <span className="text-accent-tertiary">Achievements</span>
          </h2>
          <p className="text-base md:text-xl font-sansita text-secondary-text max-w-3xl mx-auto leading-relaxed">
            Celebrating our journey of excellence, innovation, and competitive
            success in the world of app development and technology competitions.
          </p>
        </div>

        {/* Achievement Gallery */}
        <div className="relative mb-12 md:mb-16">
          <GlassCard className="p-4 md:p-8">
            {/* Gallery Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text">
                Achievement <span className="text-accent-primary">Gallery</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 md:p-3 bg-accent-primary/10 hover:bg-accent-primary/20 active:bg-accent-primary/30 border border-accent-primary/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-accent-primary group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 md:p-3 bg-accent-primary/10 hover:bg-accent-primary/20 active:bg-accent-primary/30 border border-accent-primary/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-accent-primary group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Scrolling Gallery */}
            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {duplicatedGallery.map((achievement, idx) => (
                <div
                  key={achievement.id + "-" + idx}
                  className="flex-shrink-0 w-80 sm:w-96 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl border border-glass-border bg-secondary-dark/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-accent-primary/10">
                    {/* Achievement Image */}
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-70"></div>

                      {/* Achievement Type Badge */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <div
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-sansita border backdrop-blur-sm ${getTypeColor(
                            achievement.type
                          )}`}
                        >
                          <span className="hidden sm:inline">
                            {achievement.type}
                          </span>
                          <span className="sm:hidden">
                            {achievement.type.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <div className="bg-accent-primary/80 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 border border-glass-border">
                          <span className="text-white font-sansita text-xs">
                            {achievement.year}
                          </span>
                        </div>
                      </div>

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Achievement Details */}
                    <div className="p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-sansita font-semibold text-primary-text mb-2 md:mb-3 group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
                        {achievement.title}
                      </h4>

                      <p className="text-secondary-text font-sansita text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                        {achievement.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-sansita text-accent-secondary truncate">
                          {achievement.event}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Auto-scroll indicator */}
            <div className="flex justify-center mt-4 md:mt-6">
              <div className="flex items-center space-x-2 text-secondary-text text-xs md:text-sm font-sansita">
                <div
                  className={`w-2 h-2 bg-accent-primary rounded-full transition-all duration-300 ${
                    isAutoScrolling ? "animate-pulse scale-110" : "opacity-50"
                  }`}
                ></div>
                <span>
                  {isAutoScrolling
                    ? "Auto-scrolling gallery  •  Hover to pause"
                    : "Auto-scroll paused • Will resume shortly"}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mb-12 md:mb-16">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text mb-6 text-center">
              Our <span className="text-accent-primary">Memories</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {galleryMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-glass-border bg-secondary-dark/30 hover:border-accent-primary/30 transition-all duration-300"
                  onClick={() => setSelectedImage(memory.image)} // Open modal on click
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>

            {galleryMemories.length === 0 && (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-muted-text mx-auto mb-4" />
                <p className="text-secondary-text font-sansita">
                  No memories found yet.
                </p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Timeline */}
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text mb-6 md:mb-8 text-center">
            Our <span className="text-accent-primary">Journey</span>
          </h3>
          <div className="space-y-6 md:space-y-8">
            {timeline.map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 md:space-x-4"
              >
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${event.color} bg-primary-dark mt-2 flex-shrink-0`}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-base md:text-lg font-sansita font-semibold text-primary-text">
                      {event.title}
                    </span>
                    <span className="text-sm font-sansita text-secondary-text bg-secondary-dark/50 px-2 py-1 rounded w-fit">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-secondary-text font-sansita leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent-primary transition-colors duration-200"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <img
            src={selectedImage}
            alt="Full-screen memory"
            className="max-w-full max-h-full object-contain"
            loading="eager" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Achievements;