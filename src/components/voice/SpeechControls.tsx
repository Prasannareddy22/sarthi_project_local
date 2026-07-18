// components/voice/SpeechControls.tsx
//
// Text-to-speech controls for reading displayed content aloud in the selected
// language, with Play / Pause / Resume / Stop. Wraps `useSpeechSynthesis`,
// which cancels any in-progress speech before starting new. All controls are
// keyboard-focusable buttons with aria labels; renders nothing when the
// browser has no speech synthesis support.
import { Pause, Play, Square, Volume2 } from "lucide-react";

import type { Language } from "@/i18n/config";
import { useTranslation } from "@/i18n/useTranslation";
import { speechLocaleFor } from "@/voice/speechLang";
import { useSpeechSynthesis } from "@/voice/useSpeechSynthesis";

interface SpeechControlsProps {
  /** The content to read aloud. */
  text: string;
  language: Language;
  className?: string;
}

const btn =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#1E3A8A]/20";

export default function SpeechControls({ text, language, className = "" }: SpeechControlsProps) {
  const { t } = useTranslation();
  const { supported, speaking, paused, speak, pause, resume, stop } = useSpeechSynthesis();

  if (!supported) return null;

  const locale = speechLocaleFor(language);
  const idle = !speaking;

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      role="group"
      aria-label={t("voice.readAloud")}
    >
      {idle ? (
        <button
          type="button"
          onClick={() => speak(text, locale)}
          className={`${btn} bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/15`}
          aria-label={t("voice.listen")}
        >
          <Volume2 className="w-4 h-4" />
          {t("voice.listen")}
        </button>
      ) : (
        <>
          {paused ? (
            <button
              type="button"
              onClick={resume}
              className={`${btn} bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/15`}
              aria-label={t("voice.resume")}
            >
              <Play className="w-4 h-4" />
              {t("voice.resume")}
            </button>
          ) : (
            <button
              type="button"
              onClick={pause}
              className={`${btn} bg-[#F1F5F9] text-[#0B2240] hover:bg-[#E2E8F0]`}
              aria-label={t("voice.pause")}
            >
              <Pause className="w-4 h-4" />
              {t("voice.pause")}
            </button>
          )}
          <button
            type="button"
            onClick={stop}
            className={`${btn} bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/15`}
            aria-label={t("voice.stop")}
          >
            <Square className="w-4 h-4 fill-current" />
            {t("voice.stop")}
          </button>
        </>
      )}
    </div>
  );
}
