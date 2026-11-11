import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareCheck,
  Star,
  Layers,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
    },
    {
      to: '/admin/reviews',
      label: 'Manage Customer Reviews',
      icon: MessageSquareCheck,
    },
    {
      to: '/admin/ratings',
      label: 'Customer Ratings',
      icon: Star,
    },
    {
      to: '/admin/services',
      label: 'Manage Services',
      icon: Layers,
    },
  ];

  return (
    <div className="min-h-screen flex bg-warm-cream/30 dark:bg-dark-bg text-plum-950 dark:text-warm-white transition-colors duration-300">
      {/* Desktop Sidebar (Left) */}
      <aside className="hidden lg:flex flex-col w-72 bg-plum-900 text-warm-white border-r border-gold/30 shrink-0">
        {/* Brand identity */}
        <div className="p-6 border-b border-gold/20 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gold shadow-sm bg-white shrink-0">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-warm-white tracking-wide">
              Project<span className="text-gold">Mate</span>
            </h1>
            <p className="text-[10px] font-semibold text-gold uppercase tracking-wider">
              Administration Portal
            </p>
          </div>
        </div>

        {/* Navigation Modules (Strictly 4 Modules) */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-plum-800 text-gold border border-gold/40 shadow-sm font-semibold'
                      : 'text-plum-100/80 hover:bg-plum-800/50 hover:text-warm-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* View Public Website Link & Logout */}
        <div className="p-4 border-t border-gold/20 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-plum-100/80 hover:bg-plum-800/60 hover:text-gold transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Public Website
            </span>
            <span>&rarr;</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border-b border-gold/30 dark:border-dark-border px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-plum-900 dark:text-warm-white hover:bg-plum-50 dark:hover:bg-dark-hover"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-plum-900 dark:text-gold">
              <Shield className="w-4 h-4 text-gold" />
              <span>Secure Administration Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle in Admin Topbar */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/30 dark:border-dark-border text-plum-800 dark:text-gold hover:bg-gold/20 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-gold/30">
              <div className="w-8 h-8 rounded-full bg-plum-800 text-gold font-bold text-xs flex items-center justify-center">
                A
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-plum-900 dark:text-warm-white truncate max-w-[150px]">
                  {user?.email || 'Administrator'}
                </div>
                <div className="text-[10px] text-mauve dark:text-gold font-medium uppercase tracking-wider">
                  Admin Access
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-full bg-plum-900 text-warm-white flex flex-col z-10 shadow-2xl">
              <div className="p-5 border-b border-gold/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold bg-white">
                    <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-serif font-bold text-base text-warm-white">
                    Project<span className="text-gold">Mate</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-gold hover:bg-plum-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-plum-800 text-gold border border-gold/40 font-semibold'
                            : 'text-plum-100/80 hover:bg-plum-800/50 hover:text-warm-white'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gold/20 space-y-2">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-plum-100/80 hover:bg-plum-800"
                >
                  <span>View Public Website</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
