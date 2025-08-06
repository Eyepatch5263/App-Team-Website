import React from 'react';
import { Code, Smartphone, Globe, Brain, Shield, Zap } from 'lucide-react';
import GlassCard from './GlassCard';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Full-Stack Development',
      description: 'End-to-end web applications using cutting-edge technologies like React, Node.js, and cloud infrastructure.',
      color: 'text-electric-blue'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications with seamless user experiences and robust performance.',
      color: 'text-vibrant-green'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI & Machine Learning',
      description: 'Intelligent systems and AI-powered solutions that transform data into actionable insights.',
      color: 'text-neon-purple'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Blockchain Solutions',
      description: 'Decentralized applications, smart contracts, and blockchain integration for Web3 experiences.',
      color: 'text-electric-blue'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Cybersecurity',
      description: 'Advanced security audits, penetration testing, and implementation of robust security measures.',
      color: 'text-vibrant-green'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Optimization',
      description: 'Lightning-fast applications with optimized performance, scalability, and user experience.',
      color: 'text-neon-purple'
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            Our <span className="text-electric-blue">Services</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            We deliver comprehensive digital solutions that push the boundaries of technology
            and create exceptional user experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard key={index} className="p-8 group">
              <div className={`${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-jetbrains font-semibold text-white mb-4 group-hover:text-electric-blue transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 font-inter leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 w-full h-0.5 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;