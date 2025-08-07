import React from 'react';
import { Code, Users, Trophy, Target } from 'lucide-react';
import GlassCard from './GlassCard';

const About: React.FC = () => {
  const values = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We push boundaries with cutting-edge technologies and creative problem-solving approaches.',
      color: 'text-accent-primary'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Spirit',
      description: 'Our diverse team brings together unique perspectives to create exceptional solutions.',
      color: 'text-accent-secondary'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Excellence Driven',
      description: 'We strive for perfection in every project, from concept to deployment and beyond.',
      color: 'text-accent-tertiary'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Impact Focused',
      description: 'Every app we build aims to solve real problems and make a meaningful difference.',
      color: 'text-accent-success'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sansita font-bold text-primary-text mb-4 md:mb-6">
            About <span className="text-accent-primary">AppTeam</span>
          </h2>
          <p className="text-base md:text-xl font-sansita text-secondary-text max-w-4xl mx-auto leading-relaxed">
            We are the premier technology innovation team of NIT Hamirpur, dedicated to creating innovative mobile and web applications. 
            AppTeam designs official applications for both Cultural and Technical Annual festivals of NITH, representing our college 
            with excellence. Through our apps, we inform users about ongoing and upcoming events and conduct various online activities 
            like quizzes, newsfeeds, and interactive experiences.
          </p>
        </div>

        {/* Mission Statement */}
        <GlassCard className="p-6 md:p-8 mb-12 md:mb-16 text-center">
          <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text mb-4">
            Our <span className="text-accent-secondary">Mission</span>
          </h3>
          <p className="text-base md:text-lg font-sansita text-secondary-text leading-relaxed max-w-4xl mx-auto">
            To bridge the gap between academic learning and industry excellence by developing 
            world-class applications, participating in competitive programming events, and fostering 
            a culture of continuous innovation within our college community and beyond.
          </p>
        </GlassCard>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <GlassCard key={index} className="p-6 text-center group">
              <div className={`${value.color} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                {value.icon}
              </div>
              <h3 className="text-lg font-sansita font-semibold text-primary-text mb-3 group-hover:text-accent-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-secondary-text font-sansita text-sm leading-relaxed">
                {value.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Code Snippet Display */}
        <div className="mt-12 md:mt-16">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl font-sansita font-semibold text-primary-text mb-6 text-center">
              Our Development <span className="text-accent-tertiary">Philosophy</span>
            </h3>
            <div className="bg-secondary-dark/50 rounded-lg p-6 border border-glass-border">
              <pre className="text-sm font-sansita text-secondary-text overflow-x-auto">
                <code>
{`class AppTeamNITH {
  constructor() {
    this.mission = "Build exceptional apps";
    this.values = ["Innovation", "Excellence", "Collaboration"];
    this.events = ["HackOnHills", "Nimbus", "Hillfair"];
  }

  async developApp(idea) {
    const solution = await this.innovate(idea);
    const app = await this.build(solution);
    return this.deploy(app);
  }

  compete() {
    return this.skills + this.teamwork + this.passion;
  }
}`}
                </code>
              </pre>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default About;