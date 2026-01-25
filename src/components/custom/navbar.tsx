'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/events', label: 'Eventos en tu ciudad' },
    { href: '/create', label: 'Crear evento' },
  ]

  const logout = () => {
    sessionStorage.removeItem("access_token");
    document.cookie = "access_token=; path=/; max-age=0";
    window.location.href = "http://localhost:8081/logout";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            J
          </div>
          <span className="hidden sm:inline">Joinify</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button size="sm">
            Crear evento
          </Button>

          <Button size="sm" onClick={logout}>
            Cerrar sesión
            </Button>
        </div>
      </div>
    </nav>
  )
}
