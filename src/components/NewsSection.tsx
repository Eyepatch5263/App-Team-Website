import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface Announcement {
  _id: string;
  type: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  icon?: JSX.Element;
  color?: string;
  bgGradient?: string;
  link?: string;
  details?: Record<string, string>;
  isActive?: boolean;
}

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<Announcement[]>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const axiosInstance = (axios as any).default || axios; 
    const backendUri = import.meta.env.VITE_BACKEND_URI;
    axiosInstance.get(`${backendUri}/api/announcements?isActive=all`)
      .then((res: { data: { data: { announcements: never[]; }; }; }) => {
        const apiAnnouncements: Announcement[] = res.data.data.announcements || [];
        const active = apiAnnouncements.filter((a: Announcement) => a.isActive);
        const formatted = active.map((item: Announcement) => ({ 
          ...item,
          _id: item._id, 
          color: 'accent-success',
          bgGradient: 'from-accent-success/10 to-accent-success/5',
          icon: <Sparkles className="w-6 h-6" />
        }));
        setNewsItems([ ...formatted]);
      })
      .catch((err: any) => {
        console.error('Error fetching announcements in NewsSection:', err);
      });
  }, []);

  useEffect(() => {
    if (newsItems && newsItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [newsItems]);

  const current = newsItems && newsItems.length > 0 ? newsItems[currentIndex] : {
    color: 'accent-success',
    bgGradient: 'from-accent-success/10 to-accent-success/5',
    icon: <Sparkles className="w-6 h-6" />,
    type: 'Announcement',
    title: 'No announcements available',
    description: 'Please check back later.',
    link: "https://test.com",
    date: undefined,
    time: undefined
  };

  return (
    <section className="py-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <GlassCard
          className={`p-6 md:p-8 border-l-4 border-${current.color} bg-gradient-to-r ${current.bgGradient} overflow-hidden relative`}
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      current.type === 'Urgent'
                        ? 'bg-red-500 text-red-500'
                        : current.type === 'Achievement'
                        ? 'bg-teal-500 text-teal-500'
                        : current.type === 'Workshop'
                        ? 'bg-purple-500 text-purple-500'
                        : current.type === 'General'
                        ? 'bg-green-500 text-green-500'
                        : current.type === 'Event'
                        ? 'bg-blue-500 text-blue-500'
                        : `bg-${current.color} text-${current.color}`
                      }/20`}
                    >
                      {current.icon}
                    </div>
                    </div>
                    <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                      className={`px-3 py-1 rounded-full text-sm font-sansita font-medium border ${
                        current.type === 'Urgent'
                        ? 'bg-red-500/20 text-red-500 border-red-500/30'
                        : current.type === 'Achievement'
                        ? 'bg-teal-500/20 text-teal-500 border-teal-500/30'
                        : current.type === 'Workshop'
                        ? 'bg-purple-500/20 text-purple-500 border-purple-500/30'
                        : current.type === 'General'
                        ? 'bg-green-500/20 text-green-500 border-green-500/30'
                        : current.type === 'Event'
                        ? 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                        : `bg-${current.color}/20 text-${current.color} border-${current.color}/30`
                      }`}
                      >
                      {current.type}
                      </span>
                      <div className="flex items-center text-primary-text text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="font-sansita">
                          {current.date && current.time
                            ? `${new Date(current.date).toLocaleDateString()} at ${current.time}`
                            : current.date ? new Date(current.date).toLocaleDateString() : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-sansita font-semibold text-primary-text mb-3">
                      {current.title}
                    </h3>
                    <p className="text-primary-text/80 font-sansita leading-relaxed mb-4">
                      {current.description} 
                    </p>
                  </div>
                </div>

                {current.link && (
                  <a
                    href={current.link}
                    className={`inline-flex items-center ${
                      current.type === 'Urgent'
                        ? 'text-red-500'
                        : current.type === 'Achievement'
                        ? 'text-teal-500'
                        : current.type === 'Workshop'
                        ? 'text-purple-500'
                        : current.type === 'General'
                        ? 'text-green-500'
                        : current.type === 'Event'
                        ? 'text-blue-500'
                        : `text-${current.color}`
                    } hover:opacity-80 transition-colors duration-300 font-sansita font-medium group`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
              </div>

            </div>

            <div className="mt-6 w-full bg-glass-border rounded-full h-1 overflow-hidden">
              <div
              className={`h-full ${
                current.type === 'Urgent'
                ? 'bg-red-500'
                : current.type === 'Achievement'
                ? 'bg-teal-500'
                : current.type === 'Workshop'
                ? 'bg-purple-500'
                : current.type === 'General'
                ? 'bg-green-500'
                : current.type === 'Event'
                ? 'bg-blue-500'
                : `bg-${current.color}`
              }`}
              style={{
                width: `${((currentIndex + 1) / ((newsItems?.length ?? 1))) * 100}%`,
                transition: 'width 500ms ease'
              }}
              />
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default NewsSection;