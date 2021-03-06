import { ArrowLeft, Camera, CircleNotch } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../services/api';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: (value: boolean) => void;
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleFeedbackSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot,
      });
      onFeedbackSent(true);
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }

    onFeedbackSent(true);
  }

  return (
    <>
      <header>
        <button
          className="absolute top-4 left-4 text-zinc-400 hover:text-zinc-100"
          onClick={() => onFeedbackRestartRequested()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form
        className="flex gap-2 pt-4 w-full flex-col"
        onSubmit={handleFeedbackSubmit}
      >
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm bg-transparent rounded-md placeholder-zinc-400 text-zinc-100 border-zinc-600 focus:border-brand-500 focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Algo n??o est?? funcionando bem? Queremos corrigir. Conte com detalhes o que est?? acontecendo..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <div className="flex gap-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
            disabled={isSendingFeedback}
          />
          <button
            className="w-full h-10 flex items-center justify-center border-transparent bg-brand-500 rounded-md text-white text-sm hover:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500 disabled:cursor-not-allowed"
            type="submit"
            disabled={!comment || isSendingFeedback}
          >
            {isSendingFeedback ? (
              <CircleNotch className="w-6 h-6 animate-spin" />
            ) : (
              'Enviar Feedback'
            )}
          </button>
        </div>
      </form>
    </>
  );
}
