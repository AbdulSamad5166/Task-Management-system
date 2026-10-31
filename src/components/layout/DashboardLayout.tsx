import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileDrawer } from './MobileDrawer';
import { ToastContainer } from '../ui/Toast';

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop fixed/collapsible sidebar */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:text-slate-900">Skip to content</a>
      <div className="hidden lg:flex shrink-0 sticky top-0 h-screen">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />
      </div>

      {/* Mobile responsive drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content column */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Navbar onOpenMobileSidebar={() => setMobileOpen(true)} />
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 focus:outline-none">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global toast notification system with undo */}
      <ToastContainer />
    </div>
  );
};
