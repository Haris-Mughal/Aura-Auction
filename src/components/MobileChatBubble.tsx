import React from 'react';
import { cn } from '@/lib/utils';

interface MobileChatBubbleProps {
  message: string;
  sender: 'user' | 'ai' | 'system';
  timestamp?: string;
  avatar?: string;
  className?: string;
}

const MobileChatBubble: React.FC<MobileChatBubbleProps> = ({
  message,
  sender,
  timestamp,
  avatar,
  className
}) => {
  const isUser = sender === 'user';
  const isAI = sender === 'ai';

  return (
    <div className={cn(
      'flex w-full mb-4 px-4',
      isUser ? 'justify-end' : 'justify-start',
      className
    )}>
      <div className={cn(
        'flex max-w-[85%] items-end gap-2',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}>
        {/* Avatar */}
        {!isUser && (
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
            isAI ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          )}>
            {avatar || (isAI ? 'AI' : 'S')}
          </div>
        )}

        {/* Message Bubble */}
        <div className={cn(
          'rounded-2xl px-4 py-3 max-w-full break-words',
          isUser 
            ? 'bg-primary text-primary-foreground rounded-br-lg' 
            : isAI
            ? 'bg-blue-50 text-blue-900 border border-blue-200 rounded-bl-lg'
            : 'bg-muted text-muted-foreground rounded-bl-lg'
        )}>
          <p className="text-sm leading-relaxed">{message}</p>
          {timestamp && (
            <p className={cn(
              'text-xs mt-1 opacity-70',
              isUser ? 'text-right' : 'text-left'
            )}>
              {timestamp}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileChatBubble;