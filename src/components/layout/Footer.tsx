import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  library: [
    { label: 'Vocabulary', href: '/vocabulary' },
    { label: 'Grammar', href: '/grammar' },
    { label: 'Writing', href: '/writing' },
    { label: 'Speaking', href: '/speaking' },
  ],
  resources: [
    { label: 'Courses', href: '/courses' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Flashcards', href: '/flashcards' },
    { label: 'Pricing', href: '/pricing' },
  ],
  practice: [
    { label: 'Daily Plan', href: '/daily-plan' },
    { label: 'Grammar Exercises', href: '/grammar-exercises' },
    { label: 'Essay Bank', href: '/essay-bank' },
    { label: 'Mock Test', href: '/mock-test' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Stay updated with IELTS tips
              </h3>
              <p className="text-background/60 text-sm lg:text-base">
                Get weekly study tips, vocabulary lessons, and exclusive resources delivered to your inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[400px]">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-background/40"
                />
              </div>
              <Button 
                type="submit"
                className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-medium shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img 
                src="/icon.png" 
                alt="IELTS Tree Logo" 
                className="h-8 w-8 object-contain brightness-0 invert" 
              />
              <span className="text-lg font-semibold tracking-tight">IELTS Tree</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs mb-6">
              Your comprehensive self-study library for IELTS preparation. Master vocabulary and grammar with our curated, AI-enhanced lessons.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Library */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Library</h4>
            <ul className="space-y-3">
              {footerLinks.library.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div className="hidden sm:block">
            <h4 className="font-semibold text-sm mb-4">Practice</h4>
            <ul className="space-y-3">
              {footerLinks.practice.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    {link.href === '/contact' && (
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50 text-center sm:text-left">
              &copy; {new Date().getFullYear()} IELTS Tree. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/terms" 
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Terms
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Privacy
              </Link>
              <Link 
                to="/cookies" 
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
