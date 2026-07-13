import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, ChatState, ChatStep } from '../types';
import { findCity, calcSystem, saveLead, BILL_CHIPS } from '../utils/chatbot';
import { getDepartments, getCitiesByDepartment, CITIES } from '../data/cities';

export const STEP_ORDER: ChatStep[] = [
  'welcome', 'bill', 'department', 'city',
  'quote', 'email', 'phone', 'interest', 'restart',
];

export const DEPARTMENT_CHIPS: string[] = getDepartments();

const initialState: ChatState = {
  step: 'welcome',
  email: null,
  phone: null,
  department: null,
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

  const processInput = useCallback(async (val: string) => {
    const s = stateRef.current;

    switch (s.step) {
      case 'welcome': {
        // welcome step: user submits bill amount directly (RF-09)
        const num = parseFloat(val.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) {
          updateState({ bill: num, step: 'department' });
          setChips(DEPARTMENT_CHIPS);
          botReply('Perfecto ✅\n\n¿En qué departamento de Colombia estás? Selecciona o escribe tu departamento.');
        } else {
          botReply('Por favor ingresa un valor válido en pesos colombianos.\nEjemplo: 150000');
          setChips(BILL_CHIPS);
        }
        break;
      }
      case 'bill': {
        const num = parseFloat(val.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) {
          updateState({ bill: num, step: 'department' });
          setChips(DEPARTMENT_CHIPS);
          botReply('Perfecto ✅\n\n¿En qué departamento de Colombia estás? Selecciona o escribe tu departamento.');
        } else {
          botReply('Por favor ingresa un valor válido en pesos colombianos.\nEjemplo: 150000');
        }
        break;
      }
      case 'department': {
        const depts = getDepartments();
        const normalize = (t: string) =>
          t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        const ni = normalize(val);
        const found = depts.find((d) => {
          const nd = normalize(d);
          return nd.includes(ni) || ni.includes(nd);
        }) ?? null;
        if (found) {
          updateState({ department: found, step: 'city' });
          const cities = getCitiesByDepartment(found);
          setChips(cities);
          botReply(`Departamento: ${found} 📍\n\n¿En qué municipio estás? Selecciona o escribe tu ciudad.`);
        } else {
          setChips(DEPARTMENT_CHIPS);
          botReply('No encontré ese departamento. 😕\n\nPor favor selecciona uno de la lista o escríbelo correctamente.');
        }
        break;
      }
      case 'city': {
        const city = findCity(val, s.department);
        if (city) {
          updateState({ city, step: 'quote' });
          setChips([]);
          botReply('📊 Calculando tu cotización personalizada...\n\nUn momento por favor ⏳');
          setTimeout(() => {
            const current = stateRef.current;
            if (!current.city || current.bill === null) return;
            const quote = calcSystem(current.bill, current.city);
            updateState({ lastQuote: quote });
            addBotQuote({ quote, cityName: current.city, clientEmail: current.email });
            setTimeout(() => {
              setChips(['Sí, quiero la cotización formal 🌟', 'No por ahora']);
              addBot(`✅ ¡Cotización lista!\n\n¿Te gustaría que un asesor te contacte con la cotización formal y más detalles? 😊`);
            }, 600);
          }, 1400);
        } else {
          const dept = s.department;
          const availableCities = dept ? getCitiesByDepartment(dept) : [];
          const list = availableCities.length > 0
            ? availableCities.join(' · ')
            : Object.keys(CITIES).slice(0, 8).join(' · ');
          setChips(dept ? availableCities : []);
          botReply(`No encontré esa ciudad. 😕\n\nCiudades disponibles en ${dept ?? 'Colombia'}:\n${list}\n\n¿Podrías seleccionar una?`);
        }
        break;
      }
      case 'quote': {
        // user confirms they want formal quote → ask for email
        updateState({ step: 'email' });
        setChips([]);
        botReply('¡Genial! 😊\n\nPara enviarte la cotización completa, ¿cuál es tu correo electrónico?');
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
          updateState({ phone: clean, step: 'interest' });
          // Save lead immediately after phone is collected (before interest answer)
          // so contact info is not lost if the user abandons the flow
          const current = stateRef.current;
          if (current.lastQuote) {
            await saveLead({
              email: current.email,
              phone: clean,
              department: current.department,
              city: current.city!,
              bill: current.bill!,
              panels: current.lastQuote.panels,
              system_cost: current.lastQuote.systemCost,
              payback: current.lastQuote.payback,
              saving_25y: current.lastQuote.saving25y,
              interested: false, // will be updated below if user confirms
            });
          }
          setChips(['Sí, me interesa 🌟', 'No por ahora']);
          botReply('¡Excelente! 📱 Teléfono registrado.\n\n¿Estás interesado en instalar este sistema? Un asesor te contactará para los detalles. 😊');
        } else {
          botReply('⚠️ Por favor ingresa un teléfono válido. Ejemplo: 3001234567');
        }
        break;
      }
      case 'interest': {
        const yes = /^(si|sí|yes|claro|ok|me interesa|quiero|adelante|perfecto|genial|bueno)/i.test(val);
        updateState({ step: 'restart' });
        setChips(['Nueva cotización', 'No, gracias']);
        if (yes) {
          botReply(`🎉 ¡Excelente! Tu interés fue registrado. Un asesor te contactará al ${s.phone} y a ${s.email}.\n\n¿Otra cotización?`);
        } else {
          botReply(`Entendemos. 💚 Si decides avanzar, aquí estaremos.\n\n¿Otra cotización?`);
        }
        break;
      }
      case 'restart': {
        const yes = /^(si|sí|yes|nueva|otra|claro|ok|quiero|por favor)/i.test(val);
        if (yes) {
          stateRef.current = { ...initialState };
          setChips(BILL_CHIPS);
          botReply('¡Claro! 🌟 Iniciamos una nueva cotización.\n\n¿Cuánto pagas de luz al mes? (Ejemplo: 150000)');
        } else {
          setChips(['Nueva cotización']);
          botReply('¡Gracias por usar nuestro cotizador! 💚');
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
      setChips(BILL_CHIPS);
      botReply(
        '¡Hola! 👋 ¿Cuánto pagas de luz al mes?\n\nDime el valor de tu factura y en 30 segundos te digo cuánto puedes ahorrar con paneles solares. ⚡',
        600
      );
    }, 600);
  }, [botReply]);

  return { messages, chips, isTyping, handleInput, initWelcome };
};
