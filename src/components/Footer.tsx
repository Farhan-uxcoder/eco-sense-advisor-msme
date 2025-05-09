
import { Leaf } from "lucide-react";
import { useLanguage } from "./LanguageSelector";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-eco-sand/20 border-t border-eco-sand dark:bg-eco-primary/20 dark:border-eco-primary/40">
      <div className="container py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-eco-primary rounded-full p-1.5">
              <Leaf size={18} className="text-white" />
            </div>
            <span className="font-semibold text-lg">EcoSense Advisor</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EcoSense Advisor. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
