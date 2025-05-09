
import { useState, useContext, createContext } from "react";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Create a language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const defaultTranslations = {
  'en': {
    'dashboard': 'Dashboard',
    'aiAssistant': 'AI Assistant',
    'businessProfile': 'Business Profile',
    'welcome': 'Welcome to EcoSense Advisor',
    'subtitle': 'Your AI-powered sustainability compliance partner for MSMEs',
    'getStarted': 'Get Started',
    'learnMore': 'Learn More',
    'typeMessage': 'Type your message...',
    'send': 'Send',
    'startVoice': 'Start Voice',
    'stopVoice': 'Stop Voice',
    'complianceScore': 'Compliance Score',
    'sustainabilityMetrics': 'Sustainability Metrics',
    'tasks': 'Tasks',
    'recommendations': 'Recommendations',
  },
  'kn': {
    'dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'aiAssistant': 'ಎಐ ಸಹಾಯಕ',
    'businessProfile': 'ವ್ಯಾಪಾರ ಪ್ರೊಫೈಲ್',
    'welcome': 'ಎಕೋಸೆನ್ಸ್ ಅಡ್ವೈಸರ್‌ಗೆ ಸುಸ್ವಾಗತ',
    'subtitle': 'MSMEs ಗಾಗಿ ನಿಮ್ಮ AI-ಸಾಮರ್ಥ್ಯ ಸುಸ್ಥಿರತೆ ಅನುಸರಣೆ ಪಾಲುದಾರ',
    'getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
    'learnMore': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'typeMessage': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    'send': 'ಕಳುಹಿಸು',
    'startVoice': 'ಧ್ವನಿ ಪ್ರಾರಂಭಿಸಿ',
    'stopVoice': 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    'complianceScore': 'ಅನುಸರಣಾ ಸ್ಕೋರ್',
    'sustainabilityMetrics': 'ಸುಸ್ಥಿರತೆ ಮೆಟ್ರಿಕ್ಸ್',
    'tasks': 'ಕಾರ್ಯಗಳು',
    'recommendations': 'ಶಿಫಾರಸುಗಳು',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('en');
  
  const t = (key: string) => {
    return defaultTranslations[language as keyof typeof defaultTranslations]?.[key as keyof typeof defaultTranslations['en']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

const LanguageSelector = ({ compact = false }: { compact?: boolean }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={compact ? "icon" : "sm"} 
          className="flex items-center gap-1"
          aria-label="Select language"
        >
          <Globe size={18} className="text-eco-primary" />
          {!compact && <span>{language === 'en' ? 'English' : 'ಕನ್ನಡ'}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
          {language === 'en' && <span className="ml-2">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('kn')}>
          ಕನ್ನಡ (Kannada)
          {language === 'kn' && <span className="ml-2">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
