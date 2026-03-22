'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AvatarProfile from './avatar-profile';

export function Navbar() {

  const navItems = [
    { href: '/explore/events', label: 'Explorar Eventos' },
    { href: '/categories', label: 'Categorías' },
    { href: '/how-it-works', label: 'Cómo funciona' }
  ]

  const logout = () => {
    sessionStorage.removeItem("access_token");
    document.cookie = "access_token=; path=/; max-age=0";
    window.location.href = "http://localhost:8081/logout";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              J
            </div>
            <span className="hidden sm:inline">Joinify</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center gap-1 flex-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end gap-6 flex-1">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              ✨ Crear evento
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <AvatarProfile />
            <Button size="sm" variant="outline">
              Iniciar Sesión / Registrate
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
