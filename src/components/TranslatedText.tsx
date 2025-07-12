import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  text, 
  className, 
  as: Component = 'span',
  children 
}) => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      if (currentLanguage === 'en') {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translate(text);
        setTranslatedText(translated);
      } catch (error) {
        console.warn('Translation failed:', error);
        setTranslatedText(text);
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, currentLanguage, translate]);

  return (
    <Component className={className}>
      {isLoading ? (
        <span className="opacity-70">{text}</span>
      ) : (
        translatedText
      )}
      {children}
    </Component>
  );
};

export default TranslatedText;