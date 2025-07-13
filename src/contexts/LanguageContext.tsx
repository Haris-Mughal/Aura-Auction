import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TranslationPipeline, TranslationSingle } from '@huggingface/transformers';

export type Language = 'en' | 'ur' | 'es' | 'ar';

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string, targetLang?: Language) => Promise<string>;
  isRTL: boolean;
  languages: { code: Language; name: string; nativeName: string }[];
}

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'ur' as Language, name: 'Urdu', nativeName: 'اردو' },
  { code: 'es' as Language, name: 'Spanish', nativeName: 'Español' },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation cache to avoid re-translating the same text
const translationCache = new Map<string, string>();

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translator, setTranslator] = useState<TranslationPipeline | null>(null);

  const isRTL = currentLanguage === 'ar' || currentLanguage === 'ur';

  // Initialize the translation model
  useEffect(() => {
    const initTranslator = async () => {
      try {
        // Import the pipeline dynamically to avoid blocking the initial load
        const { pipeline } = await import('@huggingface/transformers');
        
        // Initialize a lightweight translation model
        const translationPipeline = await pipeline(
          'translation',
          'Xenova/nllb-200-distilled-600M',
          { device: 'webgpu' }
        );
        
        setTranslator(translationPipeline);
      } catch (error) {
        console.warn('Translation model failed to load, using fallback:', error);
        setTranslator(null);
      }
    };

    initTranslator();
  }, []);

  // Update document direction and language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);

  const getLanguageCode = (lang: Language): string => {
    const codes = {
      'en': 'eng_Latn',
      'ur': 'urd_Arab',
      'es': 'spa_Latn',
      'ar': 'arb_Arab'
    };
    return codes[lang];
  };

  const translate = async (text: string, targetLang?: Language): Promise<string> => {
    const target = targetLang || currentLanguage;
    
    // If target is English or same as source, return original
    if (target === 'en' || !text.trim()) {
      return text;
    }

    // Check cache first
    const cacheKey = `${text}_${target}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    try {
      if (translator) {
        // @ts-ignore - The library's types for translation options are not precise.
        const result = await translator(text, {
          src_lang: 'eng_Latn',
          tgt_lang: getLanguageCode(target),
        });
        
        const translatedText = (result as TranslationSingle[])[0]?.translation_text || text;
        translationCache.set(cacheKey, translatedText);
        return translatedText;
      }
    } catch (error) {
      console.warn('Translation failed, using original text:', error);
    }

    // Fallback translations for common UI terms
    const fallbackTranslations: Record<string, Record<Language, string>> = {
      'Home': { en: 'Home', ur: 'ہوم', es: 'Inicio', ar: 'الرئيسية' },
      'Live Auctions': { en: 'Live Auctions', ur: 'لائیو نیلامی', es: 'Subastas en Vivo', ar: 'المزادات المباشرة' },
      'Sell': { en: 'Sell', ur: 'بیچیں', es: 'Vender', ar: 'بيع' },
      'Buy': { en: 'Buy', ur: 'خریدیں', es: 'Comprar', ar: 'شراء' },
      'AI Negotiate': { en: 'AI Negotiate', ur: 'AI مذاکرات', es: 'Negociar con IA', ar: 'التفاوض بالذكاء الاصطناعي' },
      'About': { en: 'About', ur: 'کے بارے میں', es: 'Acerca de', ar: 'حول' },
      'Search with AI...': { en: 'Search with AI...', ur: 'AI کے ساتھ تلاش کریں...', es: 'Buscar con IA...', ar: 'البحث بالذكاء الاصطناعي...' },
      'Start Selling': { en: 'Start Selling', ur: 'فروخت شروع کریں', es: 'Comenzar a Vender', ar: 'بدء البيع' },
      'Current Bid': { en: 'Current Bid', ur: 'موجودہ بولی', es: 'Oferta Actual', ar: 'العرض الحالي' },
      'Time Remaining': { en: 'Time Remaining', ur: 'باقی وقت', es: 'Tiempo Restante', ar: 'الوقت المتبقي' },
      'Trust Score': { en: 'Trust Score', ur: 'اعتماد کا سکور', es: 'Puntuación de Confianza', ar: 'نقاط الثقة' },
    };

    if (fallbackTranslations[text] && fallbackTranslations[text][target]) {
      const translated = fallbackTranslations[text][target];
      translationCache.set(cacheKey, translated);
      return translated;
    }

    return text;
  };

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && languages.some(l => l.code === saved)) {
      setCurrentLanguage(saved);
    }
  }, []);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    translate,
    isRTL,
    languages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};