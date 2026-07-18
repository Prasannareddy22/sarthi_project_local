// Thin, SSR-safe React wrapper around the browser's Web Speech API
// (SpeechRecognition). Speech-to-text runs entirely on the client for speed;
// the recognition language is supplied by the caller so it always follows the
// currently selected app language.
import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechErrorCode =
  | "not-supported"
  | "not-allowed"
  | "service-not-allowed"
  | "no-speech"
  | "network"
  | "audio-capture"
  | "language-not-supported"
  | "aborted"
  | "unknown";

interface StartOptions {
  /** BCP-47 locale, e.g. "en-IN" / "te-IN" / "hi-IN". */
  lang: string;
  /** Called with the (possibly interim) transcript as it is recognised. */
  onResult: (transcript: string, isFinal: boolean) => void;
  /** Keep listening across pauses until stopped manually. Defaults to false. */
  continuous?: boolean;
}

function getRecognitionCtor(): SpeechRecognitionStatic | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition() {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<SpeechErrorCode | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onResultRef = useRef<StartOptions["onResult"] | null>(null);

  // Feature-detect on the client only (avoids SSR/hydration issues).
  useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const start = useCallback(({ lang, onResult, continuous = false }: StartOptions) => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setError("not-supported");
      return;
    }
    // Tear down any previous session before starting a new one.
    recognitionRef.current?.abort();

    setError(null);
    setInterim("");
    onResultRef.current = onResult;

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimText = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) finalText += transcript;
        else interimText += transcript;
      }
      if (interimText) setInterim(interimText);
      if (finalText) {
        setInterim("");
        onResultRef.current?.(finalText.trim(), true);
      } else if (interimText) {
        onResultRef.current?.(interimText.trim(), false);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const map: Record<string, SpeechErrorCode> = {
        "not-allowed": "not-allowed",
        "service-not-allowed": "service-not-allowed",
        "no-speech": "no-speech",
        network: "network",
        "audio-capture": "audio-capture",
        "language-not-supported": "language-not-supported",
        aborted: "aborted",
      };
      const code = map[event.error] ?? "unknown";
      // "aborted" is expected when we restart/stop deliberately — not an error.
      if (code !== "aborted") setError(code);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      setInterim("");
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      // start() throws if called while already running; ignore.
    }
  }, []);

  // Clean up on unmount.
  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { supported, listening, interim, error, start, stop, clearError };
}
