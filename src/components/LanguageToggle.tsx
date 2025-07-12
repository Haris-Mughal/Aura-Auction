import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, setLanguage, languages, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang?.nativeName}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className={`absolute top-full mt-1 z-50 bg-background border border-border rounded-lg shadow-lg min-w-[200px] ${
            isRTL ? 'left-0' : 'right-0'
          }`}>
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setLanguage(language.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between ${
                    currentLanguage === language.code ? 'bg-muted font-medium' : ''
                  } ${isRTL ? 'text-right flex-row-reverse' : ''}`}
                >
                  <span>{language.nativeName}</span>
                  <span className="text-sm text-muted-foreground">
                    {language.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;