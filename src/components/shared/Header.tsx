import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/upscalemedia-transformed.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-xl">MyResume</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link to="/help" className="text-gray-600 hover:text-gray-900">Help</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
