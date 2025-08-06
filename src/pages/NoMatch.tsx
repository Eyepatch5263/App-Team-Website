import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard'; // Assuming GlassCard is in components
import GlowButton from '../components/GlowButton'; // Assuming GlowButton is in components
import { ArrowLeft } from 'lucide-react';

const NoMatch: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <GlassCard className="p-8 md:p-12 max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-space font-bold text-accent-error mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-space font-semibold text-primary-text mb-6">
            Page Not Found
          </h2>
          <p className="text-base md:text-lg font-inter text-secondary-text mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <GlowButton onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back Home
          </GlowButton>
        </GlassCard>
      </div>
    </section>
  );
};

export default NoMatch;
