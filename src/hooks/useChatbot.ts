import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, ChatState } from '../types';
import { findCity, calcSystem, saveLead, TOP_CITIES, BILL_CHIPS } from '../utils/chatbot';
import { CITIES, BASE_CITY } from '../data/cities';

const initialState: ChatState = {
  step: 'welcome',
  name: null,
  email: null,
  phone: null,
  city: null,
  bill: null,
  lastQuote: null,
};

const genId = () => Math.random().toString(36).slice(2);

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const stateRef = useRef<ChatState>(initialState);

  const addBot = useCallback((content: string) => {
    setMessages((prev) => [...prev, { id: genId(), type: 'bot', content }]);
  }, []);

  const addBotQuote = useCallback((quoteData: NonNullable<ChatMessage['quoteData']>) => {
    setMessages((prev) => [...prev, { id: genId(), type: 'bot', content: '', quoteData }]);
  }, []);

  const addUser = useCallback((content: string) => {
    setMessages((prev) => [...prev, { id: genId(), type: 'user', content }]);
  }, []);

  const botReply = useCallback((text: string, delay = 900) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBot(text);
    }, delay);
  }, [addBot]);

  const updateState = useCallback((patch: Partial<ChatState>) => {
    stateRef.current = { ...stateRef.current, ...patch };
  }, []);

  const processInput = useCallback((val: string) => {
    const s = stateRef.current;

    switch (s.step) {
      case 'welcome': {
        updateState({ name: val, step: 'email' });
        setChips([]);
        botReply(`¡Mucho gusto, ${val}! 😊\n\nPara enviarte la cotización completa, ¿cuál es tu correo electrónico?`);
        break;
      }
      case 'email': {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (emailRe.test(val)) {
          updateState({ email: val, step: 'phone' });
          setChips([]);
          botReply('Perfecto ✅\n\nPara contactarte, ¿cuál es tu número de teléfono?\nEjemplo: 3001234567');
        } else {
          botReply('⚠️ Por favor ingresa un correo electrónico válido.\nEjemplo: nombre@correo.com');
        }
        break;
      }
      case 'phone': {
        const clean = val.replace(/[^0-9+\-\s]/g, '').trim();
        if (clean.length >= 7) {
          updateState({ phone: clean, step: 'city' });
          setChips(TOP_CITIES);
          botReply('¡Excelente! 📱 Teléfono registrado.\n\n¿En qué ciudad de Colombia estás?');
        } else {
          botReply('⚠️ Por favor ingresa un teléfono válido. Ejemplo: 3001234567');
        }
        break;
      }
      case 'city': {
        const city = findCity(val);
        if (city) {
          updateState({ city, step: 'bill' });
          setChips(BILL_CHIPS);
          const extra =
            city !== BASE_CITY
              ? '\n💡 Los costos de transporte y hospedaje desde Pereira se incluirán automáticamente.'
              : '\n💡 ¡Instalación local en Pereira! Sin costos adicionales de desplazamiento.';
          botReply(`¡Perfecto! Ciudad registrada: ${city} 📍${extra}\n\n¿Cuál es el valor promedio de tu factura mensual de electricidad? (Solo el número: ej 150000)`);
        } else {
          const list = Object.keys(CITIES).slice(0, 8).join(' · ');
          botReply(`Lo siento, no encontré esa ciudad. 😕\n\nAlgunas ciudades disponibles:\n${list}\n\n¿Podrías escribir una de estas?`);
          setChips(TOP_CITIES);
        }
        break;
      }
      case 'bill': {
        const num = parseFloat(val.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) {
          updateState({ bill: num, step: 'quote' });
          setChips([]);
          botReply('📊 Calculando tu cotización personalizada...\n\nUn momento por favor ⏳');
          setTimeout(() => {
            const current = stateRef.current;
            if (!current.city) return;
            const quote = calcSystem(num, current.city);
            updateState({ lastQuote: quote });
            addBotQuote({ quote, cityName: current.city, clientName: current.name!, clientEmail: current.email! });
            setTimeout(() => {
              updateState({ step: 'interest' });
              setChips(['Sí, me interesa 🌟', 'No por ahora']);
              addBot(`✅ ¡Cotización lista, ${current.name}!\n\n¿Estás interesado en instalar este sistema? Un asesor te contactará para los detalles. 😊`);
            }, 600);
          }, 1400);
        } else {
          botReply('Por favor ingresa un valor válido en pesos colombianos.\nEjemplo: 150000');
        }
        break;
      }
      case 'interest': {
        const yes = /^(si|sí|yes|claro|ok|me interesa|quiero|adelante|perfecto|genial|bueno)/i.test(val);
        if (s.lastQuote) {
          saveLead({
            name: s.name!,
            email: s.email!,
            phone: s.phone!,
            city: s.city!,
            billAmount: s.bill!,
            interested: yes,
            quoteData: { panels: s.lastQuote.panels, systemCost: s.lastQuote.systemCost, payback: s.lastQuote.payback },
          });
        }
        updateState({ step: 'restart' });
        setChips(['Nueva cotización', 'No, gracias']);
        if (yes) {
          botReply(`🎉 ¡Excelente, ${s.name}! Tu interés fue registrado. Un asesor te contactará al ${s.phone} y a ${s.email}.\n\n¿Otra cotización?`);
        } else {
          botReply(`Entendemos, ${s.name}. 💚 Si decides avanzar, aquí estaremos.\n\n¿Otra cotización?`);
        }
        break;
      }
      case 'restart': {
        const yes = /^(si|sí|yes|nueva|otra|claro|ok|quiero|por favor)/i.test(val);
        if (yes) {
          stateRef.current = { ...initialState };
          setChips([]);
          botReply('¡Claro! 🌟 Iniciamos una nueva cotización.\n\n¿Cuál es tu nombre?');
        } else {
          setChips(['Nueva cotización']);
          botReply(`¡Gracias por usar nuestro cotizador, ${s.name}! 💚`);
        }
        break;
      }
      default:
        botReply('¿En qué más puedo ayudarte? 😊');
    }
  }, [addBot, addBotQuote, botReply, updateState]);

  const handleInput = useCallback((text: string) => {
    const val = text.trim();
    if (!val) return;
    addUser(val);
    setTimeout(() => processInput(val), 200);
  }, [addUser, processInput]);

  const initWelcome = useCallback(() => {
    setTimeout(() => {
      botReply(
        '¡Hola! 👋 Soy tu asistente solar inteligente.\n\n⚡ Te ayudaré a calcular cuánto puedes ahorrar con paneles solares, incluyendo TODOS los costos reales de instalación desde Pereira hacia cualquier ciudad de Colombia.\n\n🌟 Para comenzar, ¿cuál es tu nombre?',
        600
      );
    }, 600);
  }, [botReply]);

  return { messages, chips, isTyping, handleInput, initWelcome };
};
