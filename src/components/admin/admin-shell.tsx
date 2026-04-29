"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  FileText,
  Quote,
  Settings,
  Activity,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  Zap,
} from "lucide-react";
import type { AdminProfile } from "@/lib/types";
import { IconButton } from "./ui/button";

interface AdminShellProps {
  profile: AdminProfile;
  children: React.ReactNode;
  signOutAction: () => Promise<void>;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blogs", label: "Blog", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/activity", label: "Activity", icon: Activity },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface SidebarContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isMobileOpen: false,
  setIsMobileOpen: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

function Sidebar({
  profile,
  signOutAction,
  isMobile = false,
  onClose,
}: {
  profile: AdminProfile;
  signOutAction: () => Promise<void>;
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOutAction();
    router.push("/admin");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-slate-900/95 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">AdminHub</h1>
          <p className="text-xs text-white/50">Portfolio Panel</p>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Profile Section */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-medium text-white">
            {profile.full_name?.[0] || profile.email?.[0] || "A"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">
              {profile.full_name || "Admin"}
            </p>
            <p className="truncate text-xs text-white/50">
              {profile.title || profile.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white"}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-rose-500/10 hover:text-rose-400"
        >
          <LogOut className="h-5 w-5" />
          <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="h-full border-r border-white/10 bg-slate-900/95 shadow-2xl">
        {sidebarContent}
      </div>
    );
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-900/95 backdrop-blur-xl hidden lg:block">
      {sidebarContent}
    </aside>
  );
}

function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return localStorage.getItem("theme") !== "light";
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    const item = navItems.find((n) => pathname.startsWith(n.href));
    return item?.label || "Admin";
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((current) => !current);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <IconButton
            icon={isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            onClick={toggleTheme}
            variant="ghost"
            className="hidden sm:flex"
          />
          
          {/* Notifications */}
          <div className="relative">
            <IconButton
              icon={<Bell className="h-5 w-5" />}
              onClick={() => setShowNotifications(!showNotifications)}
              variant="ghost"
            />
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl backdrop-blur-xl"
                >
                  <h3 className="mb-3 text-sm font-semibold text-white">Notifications</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-white/60">No new notifications</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-medium text-white">
                A
              </div>
              <ChevronDown className="h-4 w-4 text-white/40" />
            </button>
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur-xl"
                >
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    <User className="h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    <Zap className="h-4 w-4" />
                    View Site
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AdminShell({ profile, children, signOutAction }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
      <div className="min-h-screen bg-slate-950">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 z-50 h-screen w-72 lg:hidden"
              >
                <Sidebar
                  profile={profile}
                  signOutAction={signOutAction}
                  isMobile
                  onClose={() => setIsMobileOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <Sidebar profile={profile} signOutAction={signOutAction} />

        {/* Main Content */}
        <div className="lg:pl-64">
          <Navbar onMenuClick={() => setIsMobileOpen(true)} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
