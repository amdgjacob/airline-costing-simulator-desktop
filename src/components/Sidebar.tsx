import React from 'react';

interface SidebarProps {
    activeItem?: string;
}

const navItems = [
    {
        id: 'dashboard', icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        )
    },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard' }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
                    >
                        {item.icon}
                    </div>
                ))}
            </nav>
        </aside>
    );
};
