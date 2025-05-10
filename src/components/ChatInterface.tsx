
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageSelector";
import { useToast } from "./ui/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Assessment questions to be asked in sequence
const assessmentQuestions = {
  "en": [
    "What are the primary activities of your business? (e.g., manufacturing, service, agriculture)",
    "Do you generate any waste materials? (Yes/No)",
    "Do you use any hazardous substances in your operations? (Yes/No/Unsure)",
    "What are the raw materials used?",
    "Do your raw materials used are locally available or imported?",
    "What's the fuel consumption?",
    "Do you track your energy consumption? (Yes/No)",
    "Enter your monthly electricity usage in kilowatt-hours (kWh):",
    "Enter your monthly fuel consumption in liters:",
    "How much waste are you generating?",
    "What way of discharging waste you have adopted?"
  ],
  "kn": [
    "ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಪ್ರಾಥಮಿಕ ಚಟುವಟಿಕೆಗಳು ಯಾವುವು? (ಉದಾ., ತಯಾರಿಕೆ, ಸೇವೆ, ಕೃಷಿ)",
    "ನೀವು ಯಾವುದೇ ತ್ಯಾಜ್ಯ ವಸ್ತುಗಳನ್ನು ಉತ್ಪಾದಿಸುತ್ತೀರಾ? (ಹೌದು/ಇಲ್ಲ)",
    "ನಿಮ್ಮ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ ನೀವು ಯಾವುದೇ ಅಪಾಯಕಾರಿ ವಸ್ತುಗಳನ್ನು ಬಳಸುತ್ತೀರಾ? (ಹೌದು/ಇಲ್ಲ/ಖಚಿತವಿಲ್ಲ)",
    "ಬಳಸಲಾಗುವ ಕಚ್ಚಾ ವಸ್ತುಗಳು ಯಾವುವು?",
    "ನಿಮ್ಮ ಬಳಸಿದ ಕಚ್ಚಾ ವಸ್ತುಗಳು ಸ್ಥಳೀಯವಾಗಿ ಲಭ್ಯವಿವೆಯೇ ಅಥವಾ ಆಮದು ಮಾಡಿಕೊಳ್ಳಲಾಗಿದೆಯೇ?",
    "ಇಂಧನ ಬಳಕೆ ಎಷ್ಟು?",
    "ನೀವು ನಿಮ್ಮ ಇಂಧನ ಬಳಕೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತೀರಾ? (ಹೌದು/ಇಲ್ಲ)",
    "ನಿಮ್ಮ ಮಾಸಿಕ ವಿದ್ಯುತ್ ಬಳಕೆಯನ್ನು ಕಿಲೋವ್ಯಾಟ್-ಗಂಟೆಗಳಲ್ಲಿ (kWh) ನಮೂದಿಸಿ:",
    "ನಿಮ್ಮ ಮಾಸಿಕ ಇಂಧನ ಬಳಕೆಯನ್ನು ಲೀಟರ್‌ಗಳಲ್ಲಿ ನಮೂದಿಸಿ:",
    "ನೀವು ಎಷ್ಟು ತ್ಯಾಜ್ಯವನ್ನು ಉತ್ಪಾದಿಸುತ್ತಿದ್ದೀರಿ?",
    "ನೀವು ತ್ಯಾಜ್ಯ ವಿಸರ್ಜನೆಗೆ ಯಾವ ವಿಧಾನವನ್ನು ಅಳವಡಿಸಿಕೊಂಡಿದ್ದೀರಿ?"
  ]
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start with introduction
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<string[]>([]);
  
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // Simulate initial AI message
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          text: "Hello! I'm your EcoSense AI assistant. I can help you with a sustainability assessment for your business. Would you like to start the assessment now?",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  }, [language]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Ask next assessment question when current question is answered
  useEffect(() => {
    if (assessmentStarted && currentQuestionIndex >= 0 && currentQuestionIndex < assessmentQuestions[language as keyof typeof assessmentQuestions].length) {
      const timer = setTimeout(() => {
        const nextQuestion = assessmentQuestions[language as keyof typeof assessmentQuestions][currentQuestionIndex];
        
        const aiMessage: Message = {
          id: Date.now(),
          text: nextQuestion,
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (assessmentStarted && currentQuestionIndex >= assessmentQuestions[language as keyof typeof assessmentQuestions].length) {
      // Assessment completed
      const timer = setTimeout(() => {
        const completionMessage: Message = {
          id: Date.now(),
          text: "Thank you for completing the sustainability assessment. I'll analyze your responses and provide recommendations on your dashboard.",
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, completionMessage]);
        setIsLoading(false);
        setAssessmentStarted(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, assessmentStarted, language]);

  // Handle send message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // If assessment hasn't started, check if user wants to start
    if (!assessmentStarted) {
      const lowerCaseInput = inputMessage.toLowerCase();
      if (lowerCaseInput.includes("yes") || lowerCaseInput.includes("start") || lowerCaseInput.includes("begin") || lowerCaseInput.includes("sure")) {
        setAssessmentStarted(true);
        // Move to first question
        setCurrentQuestionIndex(0);
      } else {
        // Regular chat mode - simulated response
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * (mockResponses[language as keyof typeof mockResponses].length - 1)) + 1;
          const aiResponse: Message = {
            id: Date.now(),
            text: mockResponses[language as keyof typeof mockResponses][randomIndex],
            sender: "ai",
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, aiResponse]);
          setIsLoading(false);
        }, 1500);
      }
    } else {
      // Assessment is ongoing, store answer and move to next question
      setAssessmentAnswers(prev => [...prev, inputMessage]);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  // Handle voice input
  const toggleVoiceInput = () => {
    if (!isRecording) {
      // Check for browser support
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        toast({
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support voice input. Try using Chrome or Edge.",
          variant: "destructive",
        });
        return;
      }
      
      // Simulating voice recording for demo
      setIsRecording(true);
      toast({
        title: "Voice Input Active",
        description: "Speak now. Voice input will automatically end after 5 seconds.",
      });
      
      // Simulate recording for 5 seconds
      setTimeout(() => {
        setIsRecording(false);
        // Simulate detected text
        const demoVoiceTexts = {
          "en": assessmentStarted ? "Yes, about 500 kilograms per month" : "What sustainability practices should my small manufacturing business implement?",
          "kn": assessmentStarted ? "ಹೌದು, ತಿಂಗಳಿಗೆ ಸುಮಾರು 500 ಕಿಲೋಗ್ರಾಂ" : "ನನ್ನ ಸಣ್ಣ ತಯಾರಿಕಾ ವ್ಯಾಪಾರವು ಯಾವ ಸುಸ್ಥಿರತೆ ಅಭ್ಯಾಸಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಬೇಕು?"
        };
        setInputMessage(demoVoiceTexts[language as keyof typeof demoVoiceTexts]);
      }, 5000);
    } else {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Voice Input Stopped",
        description: "Voice recording has been stopped.",
      });
    }
  };

  // Handle clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm your EcoSense AI assistant. I can help you with a sustainability assessment for your business. Would you like to start the assessment now?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    setAssessmentStarted(false);
    setCurrentQuestionIndex(-1);
    setAssessmentAnswers([]);
  };

  // Mock AI responses for demo purposes
  const mockResponses = {
    "en": [
      "Hello! I'm your EcoSense AI assistant. How can I help with your sustainability compliance needs today?",
      "Based on your business type, there are several environmental regulations you should be aware of. Would you like me to provide a summary?",
      "I recommend starting with an energy audit. This can help identify areas where you can reduce your carbon footprint and save costs.",
      "For a small manufacturing business in Karnataka, you'll need to comply with the Karnataka State Pollution Control Board regulations regarding waste disposal and air emissions.",
      "I've created a personalized sustainability report for your business. You can view it on your dashboard."
    ],
    "kn": [
      "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಕೋಸೆನ್ಸ್ ಎಐ ಸಹಾಯಕ. ಇಂದು ನಿಮ್ಮ ಸುಸ್ಥಿರತೆ ಅನುಸರಣೆ ಅಗತ್ಯಗಳಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      "ನಿಮ್ಮ ವ್ಯಾಪಾರ ಪ್ರಕಾರದ ಆಧಾರದ ಮೇಲೆ, ನೀವು ತಿಳಿದಿರಬೇಕಾದ ಹಲವಾರು ಪರಿಸರ ನಿಯಮಗಳಿವೆ. ನಾನು ಸಾರಾಂಶವನ್ನು ಒದಗಿಸಲು ಬಯಸುತ್ತೀರಾ?",
      "ಶಕ್ತಿ ಆಡಿಟ್‌ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ. ಇದು ನಿಮ್ಮ ಕಾರ್ಬನ್ ಹೆಜ್ಜೆ ಕುರಿತು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ವೆಚ್ಚ ಉಳಿಸಲು ಸಹಾಯ ಮಾಡಬಹುದು.",
      "ಕರ್ನಾಟಕದಲ್ಲಿ ಸಣ್ಣ ಉತ್ಪಾದನಾ ವ್ಯಾಪಾರಕ್ಕೆ, ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ ಮತ್ತು ವಾಯು ಹೊರಸೂಸುವಿಕೆಯ ಕುರಿತು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮಾಲಿನ್ಯ ನಿಯಂತ್ರಣ ಮಂಡಳಿ ನಿಯಮಗಳನ್ನು ಅನುಸರಿಸಬೇಕಾಗುತ್ತದೆ.",
      "ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ವೈಯಕ್ತಿಕ ಸುಸ್ಥಿರತೆ ವರದಿಯನ್ನು ರಚಿಸಿದ್ದೇನೆ. ನೀವು ಅದನ್ನು ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಬಹುದು."
    ]
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)] bg-background rounded-lg border">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  message.sender === "user"
                    ? "chat-bubble-user bg-primary text-primary-foreground rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]"
                    : "chat-bubble-ai bg-muted rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]"
                }`}
              >
                <div className="whitespace-pre-wrap dark:text-white">{message.text}</div>
                <div className="text-xs opacity-70 mt-1 dark:text-white/70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai bg-muted rounded-2xl rounded-bl-none px-4 py-2">
                <Loader2 className="h-5 w-5 animate-spin dark:text-white" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleClearChat}
            className="shrink-0"
            aria-label="Clear chat"
          >
            <RotateCcw size={18} />
          </Button>
          
          <div className="relative flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={assessmentStarted ? "Type your answer..." : t("typeMessage")}
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-eco-primary pr-28 dark:bg-eco-primary/20 dark:border-eco-primary/40 dark:text-white dark:placeholder:text-white/60"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleVoiceInput}
                className={`rounded-full ${
                  isRecording ? "bg-red-500 text-white" : ""
                }`}
                disabled={isLoading}
                aria-label={isRecording ? t("stopVoice") : t("startVoice")}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="rounded-full"
                disabled={inputMessage.trim() === "" || isLoading}
                aria-label={t("send")}
              >
                {t("send")}
                <Send size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
