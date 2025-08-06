import React from 'react';
import { Users, Clock, Calendar, BookOpen, Code, Palette, Brain, Database } from 'lucide-react';
import GlassCard from './GlassCard';

const Workshops: React.FC = () => {
  const workshops = [
    {
      title: 'Full-Stack Web Development',
      description: 'Learn to build complete web applications using modern technologies like React, Node.js, and databases.',
      icon: <Code className="w-8 h-8" />,
      duration: '8 weeks',
      level: 'Beginner to Intermediate',
      topics: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
      color: 'text-accent-blue',
      bgColor: 'bg-accent-blue/10',
      borderColor: 'border-accent-blue/30'
    },
    {
      title: 'Mobile App Development',
      description: 'Master cross-platform mobile development with Flutter and React Native for iOS and Android.',
      icon: <Palette className="w-8 h-8" />,
      duration: '6 weeks',
      level: 'Intermediate',
      topics: ['Flutter', 'React Native', 'Firebase', 'App Store Deployment'],
      color: 'text-accent-purple',
      bgColor: 'bg-accent-purple/10',
      borderColor: 'border-accent-purple/30'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Dive into artificial intelligence and machine learning with hands-on projects and real-world applications.',
      icon: <Brain className="w-8 h-8" />,
      duration: '10 weeks',
      level: 'Intermediate to Advanced',
      topics: ['Python', 'TensorFlow', 'Neural Networks', 'Computer Vision'],
      color: 'text-accent-teal',
      bgColor: 'bg-accent-teal/10',
      borderColor: 'border-accent-teal/30'
    },
    {
      title: 'Database Design & Management',
      description: 'Learn database fundamentals, SQL, NoSQL, and how to design efficient database systems.',
      icon: <Database className="w-8 h-8" />,
      duration: '4 weeks',
      level: 'Beginner',
      topics: ['SQL', 'MongoDB', 'Database Design', 'Performance Optimization'],
      color: 'text-success-green',
      bgColor: 'bg-success-green/10',
      borderColor: 'border-success-green/30'
    }
  ];

  const upcomingWorkshops = [
    {
      title: 'Git & Version Control Masterclass',
      date: 'March 15, 2025',
      time: '2:00 PM - 4:00 PM',
      type: 'Free Workshop'
    },
    {
      title: 'Introduction to Cloud Computing',
      date: 'March 22, 2025',
      time: '10:00 AM - 12:00 PM',
      type: 'Premium Workshop'
    },
    {
      title: 'UI/UX Design Fundamentals',
      date: 'March 29, 2025',
      time: '3:00 PM - 5:00 PM',
      type: 'Free Workshop'
    }
  ];

  return (
    <section id="workshops" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-white mb-4 md:mb-6">
            Our <span className="text-accent-blue">Workshops</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-neutral-medium max-w-3xl mx-auto leading-relaxed">
            Enhance your skills with our comprehensive workshops designed to take you from beginner to expert. 
            Learn from industry professionals and work on real-world projects.
          </p>
        </div>

        {/* Main Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {workshops.map((workshop, index) => (
            <GlassCard key={index} className="p-6 md:p-8 group">
              <div className={`${workshop.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {workshop.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-space font-semibold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                {workshop.title}
              </h3>
              
              <p className="text-neutral-medium font-inter leading-relaxed mb-6">
                {workshop.description}
              </p>

              {/* Workshop Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-accent-blue" />
                  <span className="text-neutral-medium font-inter">Duration: {workshop.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="w-4 h-4 text-accent-purple" />
                  <span className="text-neutral-medium font-inter">Level: {workshop.level}</span>
                </div>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {workshop.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className={`px-3 py-1 ${workshop.bgColor} ${workshop.color} text-xs font-inter rounded-full border ${workshop.borderColor}`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Upcoming Workshops */}
        <GlassCard className="p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-accent-blue" />
            <h3 className="text-xl md:text-2xl font-space font-semibold text-white">
              Upcoming <span className="text-accent-blue">Sessions</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {upcomingWorkshops.map((session, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-secondary-dark/50 rounded-lg border border-glass-border hover:border-accent-blue/30 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-space font-medium text-sm md:text-base group-hover:text-accent-blue transition-colors duration-300">
                    {session.title}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-inter rounded-full ${
                    session.type === 'Free Workshop' 
                      ? 'bg-success-green/20 text-success-green border border-success-green/30' 
                      : 'bg-warning-orange/20 text-warning-orange border border-warning-orange/30'
                  }`}>
                    {session.type}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-neutral-medium">
                    <Calendar className="w-4 h-4" />
                    <span className="font-inter">{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-medium">
                    <Clock className="w-4 h-4" />
                    <span className="font-inter">{session.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-medium font-inter mb-4">
              Want to stay updated about our workshops and events?
            </p>
            <button className="px-6 py-3 bg-accent-blue hover:bg-accent-blue/90 text-white font-inter font-medium rounded-lg transition-colors duration-300">
              Join Our Newsletter
            </button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default Workshops;