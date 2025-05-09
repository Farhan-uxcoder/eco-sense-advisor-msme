
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

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const responseIndex = useRef(0);
  
  // Simulate initial AI message
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          text: mockResponses[language as keyof typeof mockResponses][0],
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
    
    // Simulate AI response
    setTimeout(() => {
      responseIndex.current = (responseIndex.current + 1) % mockResponses[language as keyof typeof mockResponses].length;
      const aiResponse: Message = {
        id: Date.now(),
        text: mockResponses[language as keyof typeof mockResponses][responseIndex.current],
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
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
          "en": "What sustainability practices should my small manufacturing business implement?",
          "kn": "ನನ್ನ ಸಣ್ಣ ತಯಾರಿಕಾ ವ್ಯಾಪಾರವು ಯಾವ ಸುಸ್ಥಿರತೆ ಅಭ್ಯಾಸಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಬೇಕು?"
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
        text: mockResponses[language as keyof typeof mockResponses][0],
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    responseIndex.current = 0;
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
                    ? "chat-bubble-user"
                    : "chat-bubble-ai"
                } max-w-[80%]`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div className="text-xs opacity-70 mt-1">
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
              <div className="chat-bubble chat-bubble-ai">
                <Loader2 className="h-5 w-5 animate-spin" />
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
              placeholder={t("typeMessage")}
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-eco-primary pr-28"
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
