"use client";
import React, { useState } from "react";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSmoothScroll = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeMenu();
    }
  };

  return (
    <>
      <style jsx>{`
        .navbar-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 50%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hamburger span {
          transition: 0.3s;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
          background: #6366f1;
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
          background: #6366f1;
        }
      `}</style>

      <nav
        className={`${ubuntu.className} fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl z-50 md:top-7`}
      >
        <div className="bg-[#140b29] navbar-blur border border-indigo-500/30 rounded-2xl px-6 py-4 shadow-lg shadow-indigo-500/20 transition-all duration-300 ease-in-out md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="/"
              className="text-2xl font-extrabold text-indigo-400 no-underline shadow-indigo-400/50"
              style={{ textShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
            >
              AppTeam
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex list-none gap-12">
              {[
                { href: "/member", text: "Our Team" },
                { href: "/aboutUs", text: "About Us" },
                { href: "/events", text: "Events" },
                { href: "/projects", text: "Projects" },
                { href: "/contactUs", text: "Contact Us" },
                { href: "/announcements", text: "Announcements" },
                // { href: "/registration", text: "Registrations" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="nav-link no-underline text-gray-200 font-medium transition-all duration-300 ease-in-out hover:text-indigo-400"
                    onClick={handleSmoothScroll}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger */}
            <div
              className={`hamburger flex flex-col cursor-pointer gap-1 md:hidden ${
                isMenuOpen ? "active" : ""
              }`}
              onClick={toggleMenu}
            >
              <span className="w-6 h-0.5 bg-gray-200 rounded-sm"></span>
              <span className="w-6 h-0.5 bg-gray-200 rounded-sm"></span>
              <span className="w-6 h-0.5 bg-gray-200 rounded-sm"></span>
            </div>
          </div>

          {/* Mobile Menu */}
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:hidden list-none flex-col gap-5 mt-6 p-5 bg-[#140b29] navbar-blur`}
          >
            {[
              { href: "/member", text: "Our Team" },
              { href: "/aboutUs", text: "About Us" },
              { href: "/events", text: "Events" },
              { href: "/projects", text: "Projects" },
              { href: "/contactUs", text: "Contact Us" },
              { href: "/announcements", text: "Announcements" },
              // { href: "/registration", text: "Registrations" },
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="no-underline text-gray-200 font-medium transition-all duration-300 ease-in-out hover:text-indigo-400"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    closeMenu();
                  }}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="bg-[#140b29] pt-24 md:pt-32"></div>
    </>
  );
};

export default Navbar;
