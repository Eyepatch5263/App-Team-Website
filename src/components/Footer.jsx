"use client";
import React from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-[#050505] text-[#f4f4f5] py-32 px-6 md:px-16 border-t border-white/5 relative overflow-hidden ${spaceGrotesk.className}`}>

            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[#00e1ff]/2 blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">

                {/* --- MAIN GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">

                    {/* 1. BRAND */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2.5 h-2.5 bg-[#00e1ff] rounded-full shadow-[0_0_15px_#00e1ff]" />
                            <span className="text-xl font-bold tracking-tight uppercase">AppTeam</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                            Bridging Design<br />and Engineering.
                        </h2>
                        <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
                            The core technical club of NIT Hamirpur. We design and build high-performance digital solutions for the next generation.
                        </p>
                    </div>

                    {/* 2. LINKS */}
                    <div>
                        <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-10">Directory</h3>
                        <ul className="space-y-4">
                            {['Team', 'About', 'Events', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`/${item === 'Team' ? 'member' : item.toLowerCase() === 'contact' ? 'contactUs' : item.toLowerCase()}`}
                                        className="text-gray-500 text-lg hover:text-[#00e1ff] transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. CONNECT */}
                    <div>
                        <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-10">Uplink</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Instagram', url: 'https://www.instagram.com/appteam_nith/' },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/appteam-nith/' },
                                { name: 'GitHub', url: 'https://github.com/ayush00git/AppTeam-official-website' }
                            ].map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 text-lg hover:text-[#00e1ff] transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        {social.name}
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px]">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- BOTTOM SECTION --- */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
                    <div>
                        &copy; {currentYear} APP TEAM NITH
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-white/20">Developer:</span><a href="https://github.com/ayush00git" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Ayush</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
