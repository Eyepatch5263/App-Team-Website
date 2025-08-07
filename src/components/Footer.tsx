import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/appteam-nith', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/company/appteam-nith/', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/appteam_nith?igsh=MWRuM3dhanB6ZzQxdA==', label: 'Instagram' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const events = [
    { name: 'HackOnHills 7.0', href: '#' },
    { name: 'Nimbus', href: '#' },
    { name: 'Hillfair', href: '#' },
  ];

  return (
    <footer className="bg-secondary-dark/50 backdrop-blur-md border-t border-glass-border">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/AppTeam.png"
                  alt="AppTeam Logo"
                  className="w-12 h-12 rounded-full ring-2 ring-accent-primary/20"
                />
              </div>
              <span className="text-xl font-sansita font-bold text-primary-text">
                AppTeam
              </span>
            </div>
            <p className="text-secondary-text font-sansita leading-relaxed max-w-md mb-6">
              Premier technology innovation team of NIT Hamirpur, pushing the boundaries of innovation through 
              competitive programming, app development, and cutting-edge technology solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-sansita font-semibold text-primary-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary-text font-sansita hover:text-accent-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-lg font-sansita font-semibold text-primary-text mb-4">
              Events
            </h3>
            <ul className="space-y-2">
              {events.map((event, index) => (
                <li key={index}>
                  <a
                    href={event.href}
                    className="text-secondary-text font-sansita hover:text-accent-secondary transition-colors duration-300"
                  >
                    {event.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-text font-sansita text-sm">
            © {currentYear} AppTeam, NIT Hamirpur. Built with passion and code.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-secondary-text font-sansita text-sm hover:text-accent-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-text font-sansita text-sm hover:text-accent-primary transition-colors duration-300">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;