import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/icon.png" alt="IELTS Tree Logo" className="h-9 w-9 object-contain" />
              <span className="text-xl font-bold text-white tracking-tight">IELTS Tree</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Your comprehensive self-study library for IELTS preparation. Master vocabulary and grammar with our curated, AI-enhanced lessons.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Library</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vocabulary" className="hover:text-indigo-400 transition-colors">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="hover:text-indigo-400 transition-colors">
                  Grammar
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} IELTS Tree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
