'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/stores/authStore';
import { useNotificationStore } from '@/lib/stores/notificationStore';
import { 
  LayoutDashboard,
  Database,
  Users,
  Building2,
  Shield,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    group: 'VUE D\'ENSEMBLE',
    items: [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin/dashboard',
        badge: null,
      },
      {
        title: 'Analytics',
        icon: BarChart3,
        href: '/admin/analytics',
        badge: null,
      },
      {
        title: 'Rapports',
        icon: FileText,
        href: '/admin/reports',
        badge: null,
      },
    ],
  },
  {
    group: 'GESTION DONNÉES',
    items: [
      {
        title: 'Tous les Datasets',
        icon: Database,
        href: '/admin/datasets',
        badge: null,
      },
      {
        title: 'En attente de validation',
        icon: Shield,
        href: '/admin/validation',
        badge: '8',
        badgeColor: 'bg-red-500',
      },
      {
        title: 'Brouillons',
        icon: FileText,
        href: '/admin/drafts',
        badge: '3',
        badgeColor: 'bg-yellow-500',
      },
      {
        title: 'Archivés',
        icon: Database,
        href: '/admin/archived',
        badge: null,
      },
    ],
  },
  {
    group: 'UTILISATEURS',
    items: [
      {
        title: 'Utilisateurs',
        icon: Users,
        href: '/admin/users',
        badge: null,
      },
      {
        title: 'Organisations',
        icon: Building2,
        href: '/admin/organizations',
        badge: '15',
        badgeColor: 'bg-blue-500',
      },
      {
        title: 'Rôles & Permissions',
        icon: Shield,
        href: '/admin/roles',
        badge: null,
      },
    ],
  },
  {
    group: 'CONFIGURATION',
    items: [
      {
        title: 'Paramètres généraux',
        icon: Settings,
        href: '/admin/settings',
        badge: null,
      },
      {
        title: 'API & Intégrations',
        icon: Shield,
        href: '/admin/api',
        badge: null,
      },
      {
        title: 'Sécurité',
        icon: Shield,
        href: '/admin/security',
        badge: null,
      },
    ],
  },
  {
    group: 'COMMUNICATION',
    items: [
      {
        title: 'Notifications',
        icon: Bell,
        href: '/admin/notifications',
        badge: '12',
        badgeColor: 'bg-red-500',
      },
      {
        title: 'Emails',
        icon: Shield,
        href: '/admin/emails',
        badge: null,
      },
      {
        title: 'Logs d\'activité',
        icon: FileText,
        href: '/admin/logs',
        badge: null,
      },
    ],
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { notifications, unreadCount } = useNotificationStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className={`
        hidden lg:flex flex-col w-64 border-r bg-background
        transition-all duration-300
        ${sidebarOpen ? 'w-64' : 'w-20'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b bg-[#1A1A2E]">
          <div className="h-8 w-8 rounded-lg gradient-mali flex items-center justify-center flex-shrink-0">
            <Shield className="h-4 w-4 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <span className="font-heading font-bold text-white">JDOM</span>
              <span className="text-xs text-gray-400 ml-2">Admin</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-4 bg-[#1A1A2E]">
          {navigation.map((group) => (
            <div key={group.group} className="mb-6">
              {sidebarOpen && (
                <p className="text-xs font-medium text-gray-400 mb-2 px-2">
                  {group.group}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-[#14B14B] text-white shadow-lg shadow-[#14B14B]/20' 
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      <item.icon className={`h-4 w-4 ${!sidebarOpen && 'mx-auto'}`} />
                      {sidebarOpen && (
                        <span className="font-medium flex-1">{item.title}</span>
                      )}
                      {item.badge && (
                        <Badge 
                          variant="secondary"
                          className={`ml-auto text-xs font-bold ${item.badgeColor || 'bg-white text-[#14B14B]'}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* User Menu */}
        <div className="border-t p-4 bg-[#12122F]">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-xs bg-[#14B14B] text-white">
                {user?.name?.substring(0, 2).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-gray-400 hover:text-white"
              title="Déconnexion"
            >
              <LogOut className={`h-4 w-4 ${!sidebarOpen && 'mx-auto'}`} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center text-sm text-muted-foreground">
              <span>Administration</span>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">
                {pathname.split('/').pop()?.replace('-', ' ').replace(/^w/, c => c.toUpperCase()) || 'Dashboard'}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 bg-background border rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
                  <div className="p-3 border-b bg-muted/30">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.slice(0, 5).map((notif) => (
                      <div 
                        key={notif.id}
                        className="p-3 border-b hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <div className={`h-2 w-2 rounded-full flex-shrink-0 mt-1.5 ${
                            notif.type === 'success' ? 'bg-green-500' :
                            notif.type === 'error' ? 'bg-red-500' :
                            notif.type === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{notif.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t text-center">
                    <Button variant="outline" size="sm" className="w-full">
                      Voir toutes les notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xs bg-[#14B14B] text-white">
                    {user?.name?.substring(0, 2).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-[#1A1A2E] border-r z-50 lg:hidden overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg gradient-mali flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-heading font-bold text-white">JDOM Admin</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5 text-white" />
                </Button>
              </div>

              {navigation.map((group) => (
                <div key={group.group} className="mb-6">
                  <p className="text-xs font-medium text-gray-400 mb-2 px-2">
                    {group.group}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                            ${isActive 
                              ? 'bg-[#14B14B] text-white' 
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }
                          `}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary"
                              className={`ml-auto text-xs ${item.badgeColor || 'bg-white text-[#14B14B]'}`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-700">
                <Button
                  variant="outline"
                  className="w-full text-white border-gray-600 hover:bg-white/10"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
