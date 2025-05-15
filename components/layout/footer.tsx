import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight">TaharLuxe</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium shopping experience for the modern consumer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="text-muted-foreground hover:text-primary text-sm">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="text-muted-foreground hover:text-primary text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=home" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products?category=fitness" className="text-muted-foreground hover:text-primary text-sm">
                  Fitness
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-primary text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-primary text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-muted-foreground hover:text-primary text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Help</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary text-sm">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TaharLuxe. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-xs text-muted-foreground hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}