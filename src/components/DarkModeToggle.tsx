
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Initialize theme based on user preference or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || 
        (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    
    // Update the DOM and localStorage
    if (newDarkModeState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast({
        title: "Dark mode enabled",
        description: "The application is now in dark mode.",
        duration: 2000,
      });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast({
        title: "Light mode enabled",
        description: "The application is now in light mode.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Sun size={18} className={`${isDarkMode ? 'text-muted-foreground' : 'text-eco-accent'}`} />
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={toggleDarkMode} 
        aria-label="Toggle dark mode"
      />
      <Moon size={18} className={`${isDarkMode ? 'text-eco-accent' : 'text-muted-foreground'}`} />
    </div>
  );
};

export default DarkModeToggle;
