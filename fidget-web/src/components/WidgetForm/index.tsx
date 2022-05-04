import { CloseButton } from '../CloseButton';

import bugImage from '../../assets/bug.svg';
import ideaImage from '../../assets/idea.svg';
import thoughtImage from '../../assets/thought.svg';
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImage,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImage,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImage,
      alt: 'Imagem de uma nuvem de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  function restartFeedbackType() {
    setFeedbackType(null);
    setIsFeedbackSent(false);
  }

  return (
    <div className="bg-zinc-900 p-4 mb-4 rounded-2xl relative flex flex-col items-center justify-center shadow-lg w-[calc(100vw-2rem)] md:w-auto min-h-[264px] min-w-[336px]">
      {isFeedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={restartFeedbackType} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeSelected={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={restartFeedbackType}
              onFeedbackSent={setIsFeedbackSent}
            />
          )}
        </>
      )}

      <footer className="mt-auto">
        <span className="text-xs text-zinc-400">
          Feito com ♥ pela{' '}
          <a
            href="https://rocketseat.com.br"
            className="underline underline-offset-2"
          >
            Rocketseat
          </a>
        </span>
      </footer>
    </div>
  );
}
