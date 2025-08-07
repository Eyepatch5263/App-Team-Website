import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, LoaderIcon } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      const data = await response.json();

      if (response.ok && data.success) {
        setToast({ message: data.message, type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setToast({ message: data.message || 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch (err) {
      console.error('Network error:', err);
      setToast({ message: 'Network error. Please check your connection.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'hello@appteam.dev',
      link: 'mailto:hello@appteam.dev'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91 9263771537',
      link: 'tel:+919263771537'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: 'NIT Hamirpur, Himachal Pradesh',
      link: 'https://g.co/kgs/MB5Gt2H'
    }
  ];


  return (
    <section id="connect" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sansita font-bold text-primary-text mb-4 md:mb-6">
            Get In <span className="text-accent-primary">Touch</span>
          </h2>
          <p className="text-sansita md:text-xl font-sansita text-secondary-text max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate or have questions about our projects? We'd love to hear from you.
            Let's build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text mb-6 md:mb-8">
                Contact <span className="text-accent-secondary">Information</span>
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent-primary/5 transition-colors duration-300 group"
                  >
                    <div className="text-accent-primary group-hover:scale-110 transition-transform duration-300 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-primary-text font-sansita font-medium mb-1 group-hover:text-accent-primary transition-colors duration-300">
                        {info.title}
                      </h4>
                      <p className="text-secondary-text font-sansita text-sm md:text-base">
                        {info.details}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
                {/* google map */}
                <div className="mt-8 rounded-xl overflow-hidden border border-glass-border shadow-lg">
                <iframe
                  title="NIT Hamirpur Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.057732780425!2d76.52739321513244!3d31.70813698129786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b5a6e2e2fbf2b%3A0x6e7e0e92ce40938e!2sNIT%20Hamirpur!5e0!3m2!1sen!2sin!4v1718030000000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>

            </GlassCard>

          {/* Contact Form */}
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text mb-6 md:mb-8">
              Send Us a <span className="text-accent-primary">Message</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-sansita text-secondary-text mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 font-sansita bg-glass-white border border-glass-border rounded-lg text-primary-text placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-sansita text-secondary-text mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-sansita text-secondary-text mb-2">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-sansita text-secondary-text mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-sansita placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 resize-vertical"
                  placeholder="Tell us about your project or question..."
                />
              </div>
              <GlowButton
                type="submit"
                className="w-full group text-sm md:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className='flex gap-2 font-sansitaf justify-center items-center'>
                    <LoaderIcon className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </div>
                ) : (
                  <div className='flex gap-2 font-sansita justify-center items-center'>
                    <Send className="inline-block mr-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    Send Message
                  </div>
                )}
              </GlowButton>

            </form>
          </GlassCard>
        </div>
      </div>

      {toast && (
        <div
          className={`fixed font-sansita bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl text-sm md:text-base animate-fade-in-up ${toast.type === 'success'
            ? 'bg-green-600/20 text-green-300 border border-green-500'
            : 'bg-red-600/20 text-red-300 border border-red-500'
            }`}
          style={{ backdropFilter: 'blur(10px)', animation: 'fadeInUp 0.3s ease-out' }}
        >
          {toast.message}
        </div>
      )}
    </section>
  );
};

export default Contact;
