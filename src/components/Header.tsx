
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, User, BarChart2, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-eco-sand">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-eco-primary rounded-full p-1.5">
              <div className="text-white text-lg font-bold">ES</div>
            </div>
            <span className="font-semibold text-lg hidden md:block">EcoSense Advisor</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-foreground hover:text-eco-primary flex items-center gap-1.5">
            <BarChart2 size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/chat" className="text-foreground hover:text-eco-primary flex items-center gap-1.5">
            <MessageCircle size={18} />
            <span>AI Assistant</span>
          </Link>
          <Link to="/profile" className="text-foreground hover:text-eco-primary flex items-center gap-1.5">
            <User size={18} />
            <span>Business Profile</span>
          </Link>
          <LanguageSelector />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector compact />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
          <nav className="container flex flex-col gap-4 py-6">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 p-3 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/chat" 
              className="flex items-center gap-2 p-3 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle size={20} />
              <span>AI Assistant</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 p-3 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} />
              <span>Business Profile</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
