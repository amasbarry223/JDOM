'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/lib/stores/authStore';
import {
  LayoutDashboard,
  Database,
  Plus,
  BarChart3,
  Building2,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';

interface ProducerLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    group: 'Gestion',
    items: [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/producer/dashboard',
      },
      {
        title: 'Mes Datasets',
        icon: Database,
        href: '/producer/datasets',
      },
      {
        title: 'Publier',
        icon: Plus,
        href: '/producer/publish',
      },
      {
        title: 'Statistiques',
        icon: BarChart3,
        href: '/producer/stats',
      },
    ],
  },
  {
    group: 'Mon Organisation',
    items: [
      {
        title: 'Mon organisation',
        icon: Building2,
        href: '/producer/organization',
      },
      {
        title: 'Paramètres',
        icon: Settings,
        href: '/producer/settings',
      },
      {
        title: 'Aide',
        icon: HelpCircle,
        href: '/producer/help',
      },
    ],
  },
];

export default function ProducerLayout({ children }: ProducerLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:flex flex-col w-64 border-r bg-background
        transition-all duration-300
        ${sidebarOpen ? 'w-64' : 'w-20'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b">
          <div className="h-8 w-8 rounded-lg gradient-mali flex items-center justify-center flex-shrink-0">
            <Database className="h-4 w-4 text-white" />
          </div>
          {sidebarOpen && (
            <span className="font-heading font-bold">JDOM</span>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-4">
          {navigation.map((group) => (
            <div key={group.group} className="mb-6">
              {sidebarOpen && (
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
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
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <item.icon className={`h-4 w-4 ${!sidebarOpen && 'mx-auto'}`} />
                      {sidebarOpen && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* User Menu */}
        <div className="border-t p-4">
          <Link
            href="/producer/profile"
            className="flex items-center gap-3 hover:bg-muted rounded-lg p-2 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-xs">
                {user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  Producteur
                </p>
              </div>
            )}
          </Link>
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
              <span>Producteur</span>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">
                {pathname.split('/').pop()?.replace('-', ' ').replace(/^\w/, c => c.toUpperCase()) || 'Dashboard'}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Déconnexion"
            >
              <LogOut className="h-5 w-5" />
            </Button>
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
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r z-50 lg:hidden overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg gradient-mali flex items-center justify-center">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-heading font-bold">JDOM</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {navigation.map((group) => (
                <div key={group.group} className="mb-6">
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
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
                            flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                            ${isActive 
                              ? 'bg-primary text-primary-foreground' 
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }
                          `}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Producteur
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
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
