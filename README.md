# AppTeam Frontend 🚀

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)

A modern, responsive frontend application for AppTeam NIT Hamirpur - the premier technology innovation team. Built with cutting-edge technologies and optimized for performance across all devices.

## 🌟 Features

### 🏠 **Core Sections**
- **Hero Section** - Dynamic introduction with animated backgrounds and team statistics
- **About Us** - Mission, values, and team culture showcase
- **Projects Portfolio** - Interactive gallery of team projects and applications
- **Workshops** - Educational content and upcoming training sessions
- **Achievements** - Awards, competitions, and team milestones
- **Team Members** - Dynamic member profiles with social links
- **Join Team** - Team application system with multi-step forms
- **Contact** - Contact form with real-time validation and toast notifications

### 🎨 **Design & UI/UX**
- **Glassmorphism Design** - Modern frosted glass aesthetic
- **Animated Backgrounds** - Code rain and particle effects
- **Responsive Layout** - Mobile-first design approach
- **Dark Theme** - Professional dark mode interface
- **Interactive Animations** - Smooth transitions and hover effects
- **Custom Glassmorphism Cards** - Reusable glass-effect components
- **Gradient Overlays** - Beautiful color gradients and effects

### 📱 **Responsive Features**
- **Mobile Optimized** - Touch-friendly navigation and interactions
- **Performance Focused** - Lazy loading and code splitting
- **Hardware Acceleration** - GPU-optimized animations
- **Progressive Loading** - Suspense boundaries for smooth UX
- **Responsive Typography** - Adaptive text sizing
- **Touch Gestures** - Mobile-specific interactions

### 🔧 **Admin Panel**
- **Member Management** - Add, edit, delete, and manage team member profiles
- **Announcement System** - Create and manage announcements with different priorities
- **Team Applications** - Review and manage team membership applications
- **Content Management** - Easy content updates through admin interface
- **Status Management** - Toggle visibility and status of various elements
- **Export Functionality** - Export team applications to Excel format

### 🚀 **Team Application System**
- **Multi-Step Form** - Progressive form with validation
- **Technical Skills Selection** - Comprehensive skill and framework options
- **File Upload Support** - Portfolio and resume attachments
- **Real-time Validation** - Instant feedback and error handling
- **Application Tracking** - Status monitoring for applicants
- **Automated Email Notifications** - Status updates via email

### 📞 **Contact & Communication**
- **Contact Form** - Multi-field contact form with validation
- **Real-time Notifications** - Toast messages for user feedback
- **Social Media Integration** - Links to official team social profiles
- **Location Integration** - Interactive location information
- **Email Integration** - Direct email functionality

### 🎯 **Interactive Elements**
- **Smooth Scrolling** - Seamless section navigation
- **Interactive Stats** - Dynamic counters and statistics
- **Hover Effects** - Rich micro-interactions
- **Loading States** - Professional loading animations
- **Error Boundaries** - Graceful error handling
- **404 Page** - Custom not-found page

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **React Router DOM 7.6.2** - Client-side routing

### **Styling & Design**
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and animation styles
- **Lucide React** - Beautiful icon library
- **Responsive Design** - Mobile-first approach

### **Build Tools**
- **Vite 5.4.10** - Fast build tool and dev server
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - Automatic vendor prefixing

### **HTTP & Communication**
- **Axios 1.10.0** - HTTP client for API calls
- **REST API Integration** - Backend communication
- **Real-time Updates** - Dynamic content fetching

### **Development Tools**
- **TypeScript** - Static type checking
- **React DevTools** - Development debugging
- **Hot Module Replacement** - Fast development iteration

## 📁 **Project Structure**

```
frontend/
├── public/                    # Static assets
│   ├── AppTeam.png           # Team logo and branding
│   ├── img1.png - img12.jpeg # Project screenshots
│   └── ...                   # Other static files
├── src/
│   ├── components/           # Reusable components
│   │   ├── About.tsx        # About section
│   │   ├── Achievements.tsx # Team achievements
│   │   ├── AnimatedBackground.tsx # Background animations
│   │   ├── CodeRain.tsx     # Matrix-style animation
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Footer.tsx       # Site footer
│   │   ├── GlassCard.tsx    # Glassmorphism card component
│   │   ├── GlowButton.tsx   # Animated button component
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Landing section
│   │   ├── JoinTeam.tsx     # Team recruitment section
│   │   ├── MemberForm.tsx   # Member profile form
│   │   ├── NewsSection.tsx  # News and updates
│   │   ├── Projects.tsx     # Project showcase
│   │   ├── Services.tsx     # Team services
│   │   ├── Team.tsx         # Team member profiles
│   │   ├── TeamApplication.tsx # Application form
│   │   └── Workshops.tsx    # Workshop information
│   ├── pages/               # Page components
│   │   ├── AdminPage.tsx    # Admin dashboard
│   │   ├── AnnouncementsPage.tsx # Announcements
│   │   ├── AddMembersPage.tsx # Member management
│   │   └── NoMatch.tsx      # 404 error page
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles and Tailwind
│   └── vite-env.d.ts        # Vite type definitions
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd App-Team/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URI=your-backend-api-url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 🌐 **API Integration**

The frontend communicates with a backend API for:
- **Member Management** - CRUD operations for team members
- **Team Applications** - Application submission and management
- **Contact Forms** - Message handling and notifications
- **Announcements** - News and updates management
- **Authentication** - Admin access control

## 📱 **Responsive Design**

The application is optimized for:
- **Mobile Devices** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px+)
- **4K Displays** (1920px+)

## 🎨 **Design System**

### **Color Palette**
- **Primary Dark**: `#0A0F1C` - Main background
- **Secondary Dark**: `#1A1F2E` - Card backgrounds
- **Accent Blue**: `#3B82F6` - Primary actions
- **Accent Purple**: `#8B5CF6` - Secondary accents
- **Success Green**: `#10B981` - Success states
- **Warning Orange**: `#F59E0B` - Warning states

### **Typography**
- **Sansita**: Primary font for headings and UI
- **System Fonts**: Fallback for performance

### **Components**
- **GlassCard**: Reusable glassmorphism container
- **GlowButton**: Animated call-to-action buttons
- **Loading Spinners**: Consistent loading states
- **Toast Notifications**: User feedback system

## 🔒 **Admin Features**

The admin panel (`/xjfhe839`) includes:
- **Member Management**: Add, edit, delete team members
- **Application Review**: Review and manage team applications
- **Announcement System**: Create and manage announcements
- **Content Management**: Update team information
- **Analytics**: View application statistics


## 📄 **Available Scripts**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 **License**

This project is proprietary to AppTeam NIT Hamirpur.

## 👥 **Team**

Built with ❤️ by the AppTeam NIT Hamirpur development team.

---

**AppTeam NIT Hamirpur** - *Building the future through innovation and code*