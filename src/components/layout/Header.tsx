'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/lib/stores/authStore';
import { useNotificationStore } from '@/lib/stores/notificationStore';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Heart,
  Menu,
  Home,
  Database,
  Building2,
  Info
} from 'lucide-react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { notifications, unreadCount, markAsRead } = useNotificationStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Nav */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                <MobileNavLinks />
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg gradient-mali flex items-center justify-center">
              <Database className="h-6 w-6 text-white" />
            </div>
            <span className="hidden font-heading font-bold text-xl sm:inline-block">
              JDOM
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Accueil
              </div>
            </Link>
            <Link 
              href="/catalog" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Catalogue
              </div>
            </Link>
            <Link 
              href="/organizations" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Organisations
              </div>
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                À propos
              </div>
            </Link>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des données..."
                className="w-64 pl-10 bg-muted/50 border-muted focus:border-primary"
              />
            </div>
          </form>

          {/* Notifications */}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">
                    Aucune notification
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.slice(0, 5).map((notif) => (
                      <DropdownMenuItem 
                        key={notif.id}
                        className={`cursor-pointer ${!notif.read ? 'bg-accent' : ''}`}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm">{notif.title}</span>
                          <span className="text-xs text-muted-foreground line-clamp-2">
                            {notif.message}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge variant="secondary" className="w-fit mt-1">
                      {user.role === 'admin' ? 'Administrateur' : 
                       user.role === 'producer' ? 'Producteur' : 'Citoyen'}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites" className="cursor-pointer flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Mes favoris
                  </Link>
                </DropdownMenuItem>
                {user.role === 'producer' && (
                  <DropdownMenuItem asChild>
                    <Link href="/producer/dashboard" className="cursor-pointer flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Espace producteur
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Administration
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/register">S'inscrire</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileNavLinks() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <Home className="h-4 w-4" />
        Accueil
      </Link>
      <Link href="/catalog" className="flex items-center gap-2 text-sm font-medium">
        <Database className="h-4 w-4" />
        Catalogue
      </Link>
      <Link href="/organizations" className="flex items-center gap-2 text-sm font-medium">
        <Building2 className="h-4 w-4" />
        Organisations
      </Link>
      <Link href="/about" className="flex items-center gap-2 text-sm font-medium">
        <Info className="h-4 w-4" />
        À propos
      </Link>
    </>
  );
}
