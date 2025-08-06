import React from 'react';
import { ExternalLink, Github, Smartphone, Monitor } from 'lucide-react';
import GlassCard from './GlassCard';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: 'CryptoTrade Pro',
      description: 'Advanced cryptocurrency trading platform with AI-powered market analysis and real-time portfolio management.',
      image: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      technologies: ['React', 'Node.js', 'WebSocket', 'AI/ML'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'NeuroHealth App',
      description: 'Mobile health application using machine learning to provide personalized wellness recommendations.',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'mobile',
      technologies: ['React Native', 'TensorFlow', 'Firebase', 'Python'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'Metaverse Gallery',
      description: 'Virtual reality art gallery built on blockchain technology with NFT marketplace integration.',
      image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      technologies: ['Three.js', 'Solidity', 'IPFS', 'Web3'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'Smart City Dashboard',
      description: 'IoT-powered city management system with real-time analytics and predictive maintenance features.',
      image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      technologies: ['Vue.js', 'Python', 'IoT', 'MongoDB'],
      links: {
        live: '#',
        github: '#'
      }
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            Our <span className="text-neon-purple">Portfolio</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            Explore our latest projects showcasing innovative solutions across
            web applications, mobile apps, and emerging technologies.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <GlassCard key={index} className="overflow-hidden group">
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60"></div>
                
                {/* Project Type Icon */}
                <div className="absolute top-4 left-4">
                  <div className="bg-electric-blue/20 backdrop-blur-sm rounded-lg p-2 border border-electric-blue/30">
                    {project.type === 'mobile' ? (
                      <Smartphone className="w-5 h-5 text-electric-blue" />
                    ) : (
                      <Monitor className="w-5 h-5 text-electric-blue" />
                    )}
                  </div>
                </div>

                {/* Overlay Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.links.live}
                    className="bg-electric-blue/20 backdrop-blur-sm rounded-lg p-2 border border-electric-blue/30 hover:bg-electric-blue/30 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4 text-electric-blue" />
                  </a>
                  <a
                    href={project.links.github}
                    className="bg-electric-blue/20 backdrop-blur-sm rounded-lg p-2 border border-electric-blue/30 hover:bg-electric-blue/30 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4 text-electric-blue" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-jetbrains font-semibold text-white mb-3 group-hover:text-electric-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-vibrant-green/20 text-vibrant-green text-xs font-jetbrains rounded-full border border-vibrant-green/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;