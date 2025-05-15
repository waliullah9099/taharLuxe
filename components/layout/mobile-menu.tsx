"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  isAuthenticated,
  isAdmin,
}: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="flex h-full flex-col overflow-y-auto p-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" onClick={onClose}>
            <span className="text-xl font-bold tracking-tight">TaharLuxe</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <div className="mt-6 flex-1">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 border-t pt-4">
              {isAuthenticated ? (
                <Link href={isAdmin ? "/admin" : "/account"} onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start">
                    {isAdmin ? "Admin Dashboard" : "My Account"}
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login" onClick={onClose}>
                    <Button variant="default" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={onClose}>
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}