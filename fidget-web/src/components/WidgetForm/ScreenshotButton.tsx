import html2canvas from 'html2canvas';
import { Camera, CircleNotch, Trash } from 'phosphor-react';
import { FormEvent, useState } from 'react';

type ScreenshotButtonProps = {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null;
};

export function ScreenshotButton({
  onScreenshotTook,
  screenshot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function takeScreeenshot() {
    setIsTakingScreenshot(true);
    const screenshot = await html2canvas(document.querySelector('html')!);
    const screenshotBase64 = screenshot.toDataURL('image/png');
    setTimeout(() => {
      onScreenshotTook(screenshotBase64);
      setIsTakingScreenshot(false);
    }, 1000);
  }

  if (screenshot) {
    return (
      <button
        className="p-1 w-10 h-10 flex items-end justify-end border-transparent text-zinc-400 rounded-md hover:text-zinc-100 transition-colors"
        type="button"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: '100px',
        }}
      >
        <Trash weight="fill" className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      className="w-10 h-10 flex items-center justify-center border-transparent bg-zinc-800 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      type="button"
      onClick={() => takeScreeenshot()}
    >
      {isTakingScreenshot ? (
        <CircleNotch className="w-6 h-6 animate-spin" />
      ) : (
        <Camera className="w-6 h-6" />
      )}
    </button>
  );
}
