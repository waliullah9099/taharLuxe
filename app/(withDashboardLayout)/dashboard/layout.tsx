"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openCart } from "@/lib/redux/features/cart/cartSlice";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Navigation */}
      <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Package className="h-6 w-6" />
                  <span>E-Commerce</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="grid gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight">
                TaharLuxe
              </span>
            </Link>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-col border-r md:flex">
          {/* <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              
            </Link>
          </div> */}
          <nav className="grid gap-2 p-4">
            <Link href="/" className="flex items-center mb-5">
                <span className="text-xl font-bold tracking-tight">
                  TaharLuxe
                </span>
              </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
