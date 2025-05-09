
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatInterface from "../components/ChatInterface";
import { useLanguage } from "../components/LanguageSelector";

const ChatPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">{t('aiAssistant')}</h1>
        <p className="text-muted-foreground dark:text-white/80 mb-6">
          Ask questions about sustainability regulations, get eco-friendly tips, or request compliance recommendations for your business. You can toggle between light and dark mode using the switch in the header.
        </p>
        
        <ChatInterface />
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
