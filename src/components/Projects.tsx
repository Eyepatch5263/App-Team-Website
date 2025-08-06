import React from 'react';
import { ExternalLink, Github, Smartphone, Monitor, Globe } from 'lucide-react';
import GlassCard from './GlassCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'HackOnHills 6.0',
      description: 'Information platform for HackOnHills 6.0 held in April 2025. Complete event management and participant engagement system.',
      image: '/img1.png',
      type: 'app',
      status: 'Live',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      event: 'HOH 6.0',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'Hillfair 2K24',
      description: 'Comprehensive platform for our cultural festival Hillfair 2K24. Features event schedules, registrations, and live updates.',
      image: '/img2.png',
      type: 'mobile',
      status: 'Live',
      technologies: ['React Native', 'Firebase', 'Express.js', 'PostgreSQL'],
      event: 'Hillfair',
      links: {
        live: 'https://play.google.com/store/apps/details?id=com.appteam.hillfair2k24&hl=en-US',
        github: '#'
      }
    },
    {
      title: 'NIMBUS 2K25',
      description: 'Advanced platform for our technical festival NIMBUS 2K25. Includes competition management and real-time leaderboards.',
      image: '/img3.png',
      type: 'mobile',
      status: 'Live',
      technologies: ['Flutter', 'Dart', 'AWS', 'GraphQL'],
      event: 'Nimbus',
      links: {
        live: 'https://play.google.com/store/apps/details?id=com.appteam.nimbus2k25&hl=en-US',
        github: '#'
      }
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Winner':
      case 'Champion':
        return 'text-accent-success bg-accent-success/10 border-accent-success/30';
      case 'Live':
        return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30';
      case 'Beta':
        return 'text-accent-secondary bg-accent-secondary/10 border-accent-secondary/30';
      default:
        return 'text-muted-text bg-neutral-500/10 border-neutral-500/30';
    }
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case 'HOH 6.0':
        return 'text-accent-primary';
      case 'Nimbus':
        return 'text-accent-secondary';
      case 'Hillfair':
        return 'text-accent-tertiary';
      default:
        return 'text-muted-text';
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-primary-text mb-4 md:mb-6">
            Our <span className="text-accent-secondary">Projects</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-secondary-text max-w-3xl mx-auto leading-relaxed">
            Discover our innovative applications built for competitions and real-world impact.
            Each project represents our commitment to excellence and cutting-edge development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <GlassCard key={index} className="overflow-hidden group flex flex-col">
              {/* Project Image */}
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-secondary-dark to-primary-dark flex items-center justify-center p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{ 
                    filter: 'drop-shadow(0 10px 20px rgba(37, 99, 235, 0.15))',
                  }}
                />
                
                {/* Subtle overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent"></div>

                {/* Project Type & Status */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="bg-accent-primary/10 backdrop-blur-sm rounded-lg p-2 border border-accent-primary/30">
                    {project.type === 'mobile' ? (
                      <Smartphone className="w-4 h-4 text-accent-primary" />
                    ) : project.type === 'web' ? (
                      <Monitor className="w-4 h-4 text-accent-primary" />
                    ) : (
                      <Globe className="w-4 h-4 text-accent-primary" />
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-inter border backdrop-blur-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </div>

                {/* Event Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 bg-secondary-dark/70 backdrop-blur-sm rounded-full text-xs font-inter border border-glass-border ${getEventColor(project.event)}`}>
                    {project.event}
                  </div>
                </div>

                {/* Overlay Links */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.links.live}
                    className="bg-accent-primary/10 backdrop-blur-sm rounded-lg p-2 border border-accent-primary/30 hover:bg-accent-primary/20 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 text-accent-primary" />
                  </a>
                  <a
                    href={project.links.github}
                    className="bg-accent-primary/10 backdrop-blur-sm rounded-lg p-2 border border-accent-primary/30 hover:bg-accent-primary/20 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 text-accent-primary" />
                  </a>
                </div>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-space font-semibold text-primary-text mb-3 group-hover:text-accent-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-secondary-text font-inter leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent-tertiary/10 text-accent-tertiary text-xs font-inter rounded-full border border-accent-tertiary/30"
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

export default Projects;