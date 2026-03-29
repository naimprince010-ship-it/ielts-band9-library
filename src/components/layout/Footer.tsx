import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

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
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img 
                src="/icon.png" 
                alt="IELTS Tree Logo" 
                className="h-8 w-8 object-contain brightness-0 invert" 
              />
              <span className="text-lg font-semibold tracking-tight">IELTS Tree</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              Your comprehensive self-study library for IELTS preparation. Master vocabulary and grammar with our curated, AI-enhanced lessons.
            </p>
          </div>

          {/* Library */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Library</h3>
            <ul className="space-y-3">
              {footerLinks.library.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group"
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

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} IELTS Tree. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/terms" 
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
