import React from 'react';

interface SidebarProps {
  activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'products' }) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '📑' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-full md:w-64 bg-brandBg-sidebar text-brandText-light flex-shrink-0 transition-all duration-200">
      <div className="p-4 md:p-6 flex flex-col h-full justify-between">
        <div>
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 pb-4 md:pb-6 border-b border-slate-700/60 mb-4 md:mb-6">
            <div className="w-10 h-10 rounded-tokenBtn bg-brandPrimary flex items-center justify-center text-white font-bold text-xl shadow-md">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">TechStock</h1>
              <p className="text-xs text-brandText-muted">Inventory Console</p>
            </div>
          </div>

          {/* Navigation Links - Horizontal scroll on mobile, vertical list on md+ screens */}
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
            {navItems.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-tokenBtn text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brandPrimary-light ${
                    isActive
                      ? 'bg-brandPrimary text-white shadow-sm'
                      : 'text-slate-300 hover:bg-brandBg-sidebarHover hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* User profile / System info - Hidden on very small screens, visible on md+ */}
        <div className="hidden md:block pt-6 border-t border-slate-700/60 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-white">
              TK
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Tejas Katkade</p>
              <p className="text-[11px] text-brandText-muted truncate">Store Manager</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
