import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';

type FeedbackTypeStepProps = {
  onFeedbackTypeSelected: (feedbackType: FeedbackType) => void;
};

export function FeedbackTypeStep({
  onFeedbackTypeSelected,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex gap-2 py-8 w-full">
        {Object.entries(feedbackTypes).map(([feedbackKey, feedbackValue]) => (
          <button
            key={feedbackKey}
            className="flex flex-col items-center justify-center gap-2 bg-zinc-800 rounded-lg py-5 px-2 w-24 h-28 flex-1 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            type="button"
            onClick={() => onFeedbackTypeSelected(feedbackKey as FeedbackType)}
          >
            <img
              src={feedbackValue.image.source}
              alt={feedbackValue.image.alt}
              className="w-10 h-10"
            />
            <span className="text-sm leading-6">{feedbackValue.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
