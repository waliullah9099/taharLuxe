"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { openCart } from "@/lib/redux/features/cart/cartSlice";
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";
import CartSheet from "../cart/cart-sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold tracking-tight">TaharLuxe</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/search" className="text-muted-foreground hover:text-primary">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => dispatch(openCart())}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <Link href={isAdmin ? "/admin" : "/account"}>
                    <Button variant="outline" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      {isAdmin ? "Admin" : "Account"}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer element */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
      <CartSheet />
    </>
  );
}