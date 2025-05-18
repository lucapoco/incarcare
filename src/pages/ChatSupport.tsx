import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

// Temporary API key for testing
const OPENROUTER_API_KEY = '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';

// Debug environment variables
console.log('Environment variables:', {
  VITE_OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL
});

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      sender: 'bot', 
      text: "Hello! I'm your AI recovery support assistant. I'm here to help you on your recovery journey. How can I assist you today?", 
      timestamp: new Date().toISOString() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userContext, setUserContext] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const makeApiRequest = async (retryCount = 0): Promise<any> => {
    try {
      // Create a more personalized system message
      const systemMessage = `You are Dr. Sarah, a licensed psychologist specializing in addiction recovery at Recovery Road. Your approach is:
        - Professional yet warm and empathetic
        - Evidence-based, using proven therapeutic techniques
        - Focused on harm reduction and sustainable recovery
        - Trauma-informed and culturally sensitive
        - Based on cognitive-behavioral therapy (CBT) and motivational interviewing principles
        
        In your responses:
        - Use professional psychological terminology appropriately
        - Validate emotions and experiences
        - Ask thoughtful follow-up questions
        - Provide psychoeducation about addiction and recovery
        - Suggest practical coping strategies and exercises
        - Help identify triggers and develop prevention plans
        - Encourage self-reflection and personal growth
        - Maintain appropriate professional boundaries
        - Recommend professional help when needed
        - Share relevant recovery resources and support groups
        
        Remember:
        - You're part of the Recovery Road team
        - You have extensive experience in addiction treatment
        - You're familiar with various recovery approaches (12-step, SMART Recovery, etc.)
        - You can provide basic psychological support but not therapy
        - You should refer to emergency services if someone is in crisis
        
        Your goal is to provide professional, supportive guidance while helping users develop their own recovery toolkit.`;

      // Create message history for context
      const messageHistory = messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('/api/openrouter/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Recovery Road'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-8b-instruct:free',
          messages: [
            {
              role: "system",
              content: systemMessage
            },
            ...messageHistory,
            {
              role: "user",
              content: inputMessage
            }
          ],
          temperature: 0.8, // Slightly increased for more personalized responses
          max_tokens: 200, // Increased for more detailed responses
          presence_penalty: 0.6, // Encourage more diverse responses
          frequency_penalty: 0.3 // Reduce repetition
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`API error: ${response.status} - ${data.error?.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      if (retryCount < 2) {
        console.log(`Retrying request (attempt ${retryCount + 1})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return makeApiRequest(retryCount + 1);
      }
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      console.log('Sending request to OpenRouter...');
      const data = await makeApiRequest();
      console.log('Response data:', data);

      // More robust response parsing
      let botResponseText = '';
      if (data.choices?.[0]?.message?.content) {
        botResponseText = data.choices[0].message.content;
      } else if (data.choices?.[0]?.text) {
        botResponseText = data.choices[0].text;
      } else if (typeof data.response === 'string') {
        botResponseText = data.response;
      } else {
        console.error('Unexpected response format:', data);
        throw new Error('Unexpected response format from OpenRouter');
      }

      const botResponse: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Detailed error:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: `I apologize, but I'm having trouble connecting right now. Please try sending your message again in a moment.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-t-xl shadow-md">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl">
            <h1 className="text-xl font-bold">AI Support Assistant</h1>
            <p className="text-sm opacity-90">Available 24/7 to provide guidance and support</p>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'user' ? 
                      <User className="w-4 h-4 mr-2" /> : 
                      <Bot className="w-4 h-4 mr-2" />
                    }
                    <span className="text-xs opacity-70">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs mt-1 opacity-50 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-3 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <textarea
                className="flex-grow border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your message..."
                rows={2}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
              />
              <button 
                className={`ml-2 bg-blue-600 text-white p-3 rounded-full transition-colors ${
                  isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                onClick={handleSendMessage}
                disabled={isTyping}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              This AI assistant is for support only. If you're experiencing an emergency, please contact emergency services or call the National Helpline at 1-800-662-HELP (4357).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;