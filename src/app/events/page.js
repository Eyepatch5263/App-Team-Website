"use client";
import React, { useEffect, useRef } from 'react';
import { Ubuntu } from "next/font/google";
import Image from 'next/image';

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const Events = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    elements.forEach((element) => {
      observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const events = [
    {
      title: "HACK ON HILLS 7.0",
      year: "2025",
      description: "HackonHills 7.0, organized by the App Team at NIT Hamirpur, continued the HackonHills legacy by bringing together students and developers for 36 hours of focused coding and collaboration. Participants worked on real-world problem statements, sharing ideas and building practical solutions in a supportive and engaging environment.",
      images: [
        '/events/hoh7/HOH1.webp',
        '/events/hoh7/HOH2.webp',
        '/events/hoh7/HOH3.webp',
        '/events/hoh7/HOH4.webp',
        '/events/hoh7/HOH5.webp',
        '/events/hoh7/HOH6.webp',
      ],
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "HACK ON HILLS 6.0",
      year: "2025",
      description: "HackonHills 6.0, organized by our App Team at NIT Hamirpur, was a landmark event that brought together innovators, developers, and tech enthusiasts from across the region. As North India's largest hackathon, it featured 36 hours of nonstop coding, problem-solving, and collaboration.",
      images: [
        '/events/hoh6/HOH1.webp',
        '/events/hoh6/HOH2.webp',
        '/events/hoh6/HOH3.webp',
        '/events/hoh6/HOH4.webp',
        '/events/hoh6/HOH5.webp',
        '/events/hoh6/HOH6.webp',
      ],
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "NIMBUS 2K25",
      year: "2025",
      description: "At Nimbus 2K25, our App Team proudly played a key role—not just as participants, but as contributors to the event's digital success. We developed the official Nimbus app, designed to enhance the user experience and streamline event interactions for thousands of attendees.",
      images: [
        '/events/nimbus/NBS1.webp',
        '/events/nimbus/NBS2.webp',
        '/events/nimbus/NBS3.webp',
        '/events/nimbus/NBS4.webp',
        '/events/nimbus/NBS5.webp',
        '/events/nimbus/NBS6.webp',
      ],
      color: "from-cyan-600 to-blue-600"
    }
  ];

  return (
    <div className={`${ubuntu.className} min-h-screen bg-[#140b29] text-white`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <h1 className="fade-in text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            OUR EVENTS
          </h1>
          <p className="fade-in text-lg md:text-xl text-center text-gray-400 max-w-3xl mx-auto">
            Discover the moments that defined our journey. From hackathons to tech fests, we create experiences that inspire innovation.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {events.map((event, eventIndex) => (
          <div key={eventIndex} className="mb-32 last:mb-20">
            {/* Event Header */}
            <div className="fade-in mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${event.color} bg-clip-text text-transparent opacity-20`}>
                  {event.year}
                </span>
              </div>
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}>
                {event.title}
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-4xl leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Image Grid - Creative Bento Layout */}
            <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[200px]">
              {/* Image 1 - Large hero */}
              <div
                className="fade-in col-span-12 md:col-span-7 row-span-2 relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: '0ms' }}
              >
                <Image
                  src={event.images[0]}
                  alt={`${event.title} - Image 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* Image 2 - Tall right */}
              <div
                className="fade-in col-span-6 md:col-span-5 row-span-2 relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: '100ms' }}
              >
                <Image
                  src={event.images[1]}
                  alt={`${event.title} - Image 2`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </div>

              {/* Image 3 - Wide bottom left */}
              <div
                className="fade-in col-span-6 md:col-span-4 row-span-1 relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: '200ms' }}
              >
                <Image
                  src={event.images[2]}
                  alt={`${event.title} - Image 3`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Image 4 - Square */}
              <div
                className="fade-in col-span-6 md:col-span-3 row-span-1 relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: '300ms' }}
              >
                <Image
                  src={event.images[3]}
                  alt={`${event.title} - Image 4`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Image 5 - Wide */}
              <div
                className="fade-in col-span-6 md:col-span-5 row-span-1 relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: '400ms' }}
              >
                <Image
                  src={event.images[4]}
                  alt={`${event.title} - Image 5`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </div>

              {/* Image 6 - Medium */}
              <div
                className="fade-in col-span-6 md:col-span-4 row-span-1 relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: '500ms' }}
              >
                <Image
                  src={event.images[5]}
                  alt={`${event.title} - Image 6`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Events;