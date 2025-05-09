
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Leaf, MessageCircle, BarChart2, Shield } from "lucide-react";
import { useLanguage } from "../components/LanguageSelector";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-eco-primary to-eco-secondary py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS45Mi0yLjUgMi4wNHYxOS45MmMwIDEuMTIgMS4xNCAyLjA0IDIuNSAyLjA0czIuNS0uOTIgMi41LTIuMDRWMjAuMDRjMC0xLjEyLTEuMTQtMi4wNC0yLjUtMi4wNHptLTEyIDBjLTEuMzYgMC0yLjUuOTItMi41IDIuMDR2MTkuOTJjMCAxLjEyIDEuMTQgMi4wNCAyLjUgMi4wNHMyLjUtLjkyIDIuNS0yLjA0VjIwLjA0YzAtMS4xMi0xLjE0LTIuMDQtMi41LTIuMDR6IiBmaWxsPSIjMzMzIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t('welcome')}
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-md">
                  {t('subtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-eco-primary hover:bg-eco-sand">
                    <Link to="/chat">
                      {t('getStarted')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                    <a href="#features">
                      {t('learnMore')}
                    </a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1623119619192-27c1a2476f7c?q=80&w=1000&auto=format&fit=crop"
                  alt="Sustainable business"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white dark:bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How EcoSense Advisor Can Help Your Business</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-eco-sand/20 p-6 rounded-lg border border-eco-sand dark:border-eco-primary/40">
                <div className="bg-eco-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Compliance Checkups</h3>
                <p className="text-muted-foreground dark:text-white/80">Stay on top of environmental regulations specific to your business type and location with personalized compliance checks.</p>
              </div>
              
              <div className="bg-eco-sand/20 p-6 rounded-lg border border-eco-sand dark:border-eco-primary/40">
                <div className="bg-eco-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">AI Assistant</h3>
                <p className="text-muted-foreground dark:text-white/80">Get instant answers and guidance on sustainability practices from our intelligent AI assistant in English or Kannada.</p>
              </div>
              
              <div className="bg-eco-sand/20 p-6 rounded-lg border border-eco-sand dark:border-eco-primary/40">
                <div className="bg-eco-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Progress Tracking</h3>
                <p className="text-muted-foreground dark:text-white/80">Monitor your sustainability journey with intuitive analytics and track your business's eco-friendly improvements over time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-eco-sand/20 dark:bg-eco-primary/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Benefits for MSMEs</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-eco-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Cost Savings</h3>
                  <p className="text-muted-foreground dark:text-white/80">Implementing sustainable practices can significantly reduce operational costs through energy efficiency and waste reduction.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-eco-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Regulatory Compliance</h3>
                  <p className="text-muted-foreground dark:text-white/80">Avoid penalties and legal issues by staying compliant with the latest environmental regulations applicable to your industry.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-eco-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Enhanced Reputation</h3>
                  <p className="text-muted-foreground dark:text-white/80">Build customer trust and loyalty by demonstrating your commitment to environmental sustainability and responsible business practices.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-eco-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Access to Incentives</h3>
                  <p className="text-muted-foreground dark:text-white/80">Learn about and access government incentives, subsidies, and programs available for eco-friendly businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-eco-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to make your business more sustainable?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join hundreds of MSMEs that are using EcoSense Advisor to become more environmentally responsible and economically efficient.</p>
            <Button asChild size="lg" className="bg-white text-eco-primary hover:bg-eco-sand">
              <Link to="/chat">
                Get Started with AI Assistant
                <MessageCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
