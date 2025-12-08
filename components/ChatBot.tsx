import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome', 
      text: '¡Hola! Soy tu asistente virtual. ¿Tienes dudas sobre tu problema de fontanería o necesitas ayuda con la solicitud?', 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (!chatSessionRef.current) {
      try {
        // Use process.env.API_KEY strictly as per @google/genai guidelines
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: "Eres un asistente útil y amable para una app de 'Solicitud de Servicios' de mantenimiento del hogar (fontanería, electricidad, etc.). Tu objetivo es ayudar al usuario a describir su problema, sugerir posibles causas simples o guiarlos para llenar el formulario. Sé conciso, profesional y usa un tono amigable.",
          },
        });
      } catch (error) {
        console.error("Failed to initialize AI", error);
      }
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    const newUserMsg: ChatMessage = { 
      id: Date.now().toString(), 
      text: userText, 
      sender: 'user' 
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
        const response = await chatSessionRef.current.sendMessage({ message: userText });
        const botText = response.text;

        setMessages((prev) => [
          ...prev, 
          { 
            id: (Date.now() + 1).toString(), 
            text: botText || "No se pudo obtener respuesta.", 
            sender: 'bot' 
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { 
            id: (Date.now() + 1).toString(), 
            text: "El chat no está inicializado.", 
            sender: 'bot' 
          }
        ]);
      }
    } catch (error) {
      console.error("Error sending message", error);
      setMessages((prev) => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          text: "Lo siento, tuve un problema al conectar. Por favor intenta de nuevo.", 
          sender: 'bot' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-24 right-4 z-[100] flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95
          ${isOpen ? 'bg-text-secondary-light rotate-90' : 'bg-primary'}
          text-white
        `}
        aria-label="Toggle Chat"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'chat_bubble'}
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`
          fixed bottom-40 right-4 z-[90] w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-2xl dark:border-border-dark dark:bg-card-dark transition-all duration-300 origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}
        style={{ height: '500px', maxHeight: '60vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary p-4 text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">smart_toy</span>
            <h3 className="font-bold">Asistente Virtual</h3>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-light dark:bg-background-dark/95">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm
                  ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark rounded-bl-none'
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-white px-4 py-3 dark:bg-card-dark border border-border-light dark:border-border-dark">
                <div className="h-2 w-2 animate-bounce rounded-full bg-text-secondary-light [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-text-secondary-light [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-text-secondary-light"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border-light bg-card-light p-3 dark:border-border-dark dark:bg-card-dark">
          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              rows={1}
              className="max-h-24 flex-1 resize-none rounded-xl border border-border-light bg-background-light px-3 py-2 text-sm text-text-primary-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-text-primary-dark"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;