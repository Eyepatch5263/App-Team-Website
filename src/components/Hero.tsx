import React, { useCallback } from 'react';
import { ArrowRight, Trophy, Users, Zap } from 'lucide-react';
import GlowButton from './GlowButton';

const Hero: React.FC = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 z-20 relative">
        
        <div className="text-center">
          {/* Main Heading */}
      <div style={{height:'40px'}}></div>
          
          <h1 className="break-words leading-tight pt-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-sansita font-bold text-primary-text mb-3 sm:mb-4 md:mb-6 animate-fade-in relative z-30">
            App Team
            <span className="block text-transparent mt-4 bg-clip-text bg-purple-500">
              NIT Hamirpur
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-sansita text-secondary-text mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in relative z-30 px-2 leading-relaxed">
            The premier technology innovation team of NIT Hamirpur. Building the future 
            through cutting-edge development, competitive excellence, and innovative solutions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8 md:mb-12 animate-fade-in relative z-30 px-2">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sansita font-bold text-accent-primary">10+</div>
              <div className="text-muted-text font-sansita text-xs sm:text-sm">Years Active</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sansita font-bold text-accent-secondary">3</div>
              <div className="text-muted-text font-sansita text-xs sm:text-sm">Major Events</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sansita font-bold text-accent-tertiary">40+</div>
              <div className="text-muted-text font-sansita text-xs sm:text-sm">Active Members</div>
            </div>
          </div>

          {/* Event Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 sm:mb-8 md:mb-12 animate-fade-in relative z-30 px-2">
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-primary font-sansita font-medium">HackOnHills</span>
            </div>
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-accent-secondary/10 border border-accent-secondary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-secondary font-sansita font-medium">Nimbus</span>
            </div>
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-accent-tertiary/10 border border-accent-tertiary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-tertiary font-sansita font-medium">Hillfair</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in relative z-30 px-2">
            <GlowButton 
              className="font-sansita group text-xs sm:text-sm md:text-base w-full xs:w-auto px-4 py-2.5 md:px-6 md:py-3"
              onClick={() => scrollToSection('projects')}
            >
              View Our Projects
              <ArrowRight className="inline-block ml-2 w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
            </GlowButton>
            <GlowButton 
              variant="secondary" 
              className="group text-xs font-sansita sm:text-sm md:text-base w-full xs:w-auto px-4 py-2.5 md:px-6 md:py-3"
              onClick={() => scrollToSection('achievements')}
            >
              <Trophy className="inline-block mr-2 w-3 h-3 md:w-4 md:h-4" />
              Our Achievements
            </GlowButton>
          </div>

          {/* Floating Elements - Hidden on mobile for performance */}
          <div className="hidden lg:block absolute top-20 left-10 animate-float">
            <div className="w-12 h-12 xl:w-16 xl:h-16 border border-accent-primary/20 rounded-lg rotate-45 backdrop-blur-sm"></div>
          </div>
          <div className="hidden lg:block absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <Users className="w-6 h-6 xl:w-8 xl:h-8 text-accent-secondary/40" />
          </div>
          <div className="hidden lg:block absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <div className="w-8 h-8 xl:w-12 xl:h-12 bg-gradient-to-br from-accent-primary/10 to-accent-tertiary/10 rounded-full backdrop-blur-sm"></div>
          </div>
          <div className="hidden lg:block absolute top-60 right-10 animate-pulse-glow">
            <Zap className="w-5 h-5 xl:w-6 xl:h-6 text-accent-tertiary/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);