"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LuSend, LuLayoutTemplate  } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IoHomeOutline, IoSettingsOutline  } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

import { useState } from 'react';

const navItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: IoHomeOutline 
  },
  { 
    name: 'Templates', 
    href: '/templates', 
    icon: LuLayoutTemplate  
  },
  { 
    name: 'Send Email', 
    href: '/send', 
    icon: LuSend 
  },
  { 
    name: 'Sent Emails', 
    href: '/sent', 
    icon: MdOutlineEmail 
  },
  { 
    name: 'Schedule', 
    href: '/calendar', 
    icon: FiCalendar 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: IoSettingsOutline  
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen flex flex-col border-r border-gray-200 bg-card transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="flex items-center p-4 h-16 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt='logo'/>
          </div>
        )}
        {collapsed && <img src="/favicon.png" alt='logo' className='w-10 h-10'/>}
      </div>

      <nav className="flex-1 flex flex-col px-2 py-4 gap-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.includes(item.href + '/');
          return (
            <Link 
              key={item.href} 
              href={item.href}
            >
              <button

                className={cn(
                  "w-full flex items-center justify-start mb-1 cursor-pointer rounded-sm py-2",
                  isActive ? "bg-gray-100 text-accent-foreground" : "hover:bg-gray-300/50",
                  collapsed ? "px-2" : "px-4"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-auto flex"
        >
          {collapsed ? <FaAngleRight className="h-5 w-5" /> : <FaAngleLeft className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}