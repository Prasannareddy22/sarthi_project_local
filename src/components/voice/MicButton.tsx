// components/voice/MicButton.tsx
//
// Accessible microphone button for voice input. Wraps `useSpeechRecognition`,
// shows a listening indicator while recording, lets the user stop manually,
// and surfaces permission/network/no-speech/language errors via `onError` and
// an aria-live status region. Recognition language follows the selected app
// language. The button captures speech only — callers decide what to do with
// the transcript (fill one field, or send for natural-language extraction).
import { useEffect } from "react";
import { Loader2, Mic, Square } from "lucide-react";

import type { Language } from "@/i18n/config";
import { useTranslation } from "@/i18n/useTranslation";
import { isScriptMismatch, speechLocaleFor } from "@/voice/speechLang";
import { useSpeechRecognition, type SpeechErrorCode } from "@/voice/useSpeechRecognition";
import type { TranslationKey } from "@/i18n/translations/types";

const ERROR_KEY: Record<SpeechErrorCode, TranslationKey> = {
  "not-supported": "voice.errorNotSupported",
  "not-allowed": "voice.errorNotAllowed",
  "no-speech": "voice.errorNoSpeech",
  network: "voice.errorNetwork",
  "audio-capture": "voice.errorAudioCapture",
  "language-not-supported": "voice.errorLanguageNotSupported",
  aborted: "voice.errorGeneric",
  unknown: "voice.errorGeneric",
};

const SIZE_CLASSES = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-11 h-11",
} as const;

const ICON_SIZE = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
} as const;

interface MicButtonProps {
  language: Language;
  /** Called with each final transcript chunk. */
  onTranscript: (text: string) => void;
  /** Optional live (interim) transcript, e.g. to preview while speaking. */
  onInterim?: (text: string) => void;
  /** User-facing error message (already translated) for the caller to show. */
  onError?: (message: string) => void;
  /** Accessible label describing what this mic fills. */
  label: string;
  size?: keyof typeof SIZE_CLASSES;
  /** External processing state (e.g. backend extraction in flight). */
  busy?: boolean;
  /** Keep listening across pauses (used for natural-language dictation). */
  continuous?: boolean;
  className?: string;
}

export default function MicButton({
  language,
  onTranscript,
  onInterim,
  onError,
  label,
  size = "md",
  busy = false,
  continuous = false,
  className = "",
}: MicButtonProps) {
  const { t } = useTranslation();
  const { supported, listening, interim, error, start, stop, clearError } = useSpeechRecognition();

  // Surface recognition errors to the caller (translated).
  useEffect(() => {
    if (error) onError?.(t(ERROR_KEY[error]));
  }, [error, onError, t]);

  // Preview interim text to the caller as it is recognised.
  useEffect(() => {
    if (interim) onInterim?.(interim);
  }, [interim, onInterim]);

  const disabled = !supported || busy;

  const handleClick = () => {
    if (!supported) {
      onError?.(t("voice.errorNotSupported"));
      return;
    }
    if (listening) {
      stop();
      return;
    }
    clearError();
    start({
      lang: speechLocaleFor(language),
      continuous,
      onResult: (text, isFinal) => {
        if (!isFinal) return;
        if (isScriptMismatch(text, language)) {
          onError?.(t("voice.languageMismatch"));
        }
        onTranscript(text);
      },
    });
  };

  const title = !supported
    ? t("voice.errorNotSupported")
    : listening
      ? t("voice.stopListening")
      : t("voice.tapToSpeak");

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={listening}
      title={title}
      className={`inline-flex items-center justify-center rounded-full transition shrink-0 focus:outline-none focus:ring-4 focus:ring-[#1E3A8A]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
        SIZE_CLASSES[size]
      } ${
        listening
          ? "bg-[#EF4444] text-white shadow-md animate-pulse"
          : "bg-[#F1F5F9] text-[#1E3A8A] hover:bg-[#E2E8F0]"
      } ${className}`}
    >
      {busy ? (
        <Loader2 className={`${ICON_SIZE[size]} animate-spin`} />
      ) : listening ? (
        <Square className={`${ICON_SIZE[size]} fill-current`} />
      ) : (
        <Mic className={ICON_SIZE[size]} />
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {listening ? t("voice.listening") : busy ? t("voice.processing") : ""}
      </span>
    </button>
  );
}
