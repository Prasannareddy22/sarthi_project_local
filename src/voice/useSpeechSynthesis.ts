// SSR-safe React wrapper around the browser's speechSynthesis API for
// text-to-speech, exposing Play / Pause / Resume / Stop. Any in-progress
// utterance is cancelled before a new one starts, so only one plays at a time.
import { useCallback, useEffect, useRef, useState } from "react";

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

export function useSpeechSynthesis() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = getSynth();
    setSupported(synth !== null);
    if (!synth) return;

    const loadVoices = () => setVoices(synth.getVoices());
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => synth.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const stop = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.cancel();
    setSpeaking(false);
    setPaused(false);
  }, []);

  const pickVoice = useCallback(
    (lang: string): SpeechSynthesisVoice | undefined => {
      if (!voices.length) return undefined;
      const primary = lang.split("-")[0];
      return (
        voices.find((v) => v.lang === lang) ??
        voices.find((v) => v.lang.startsWith(primary)) ??
        undefined
      );
    },
    [voices],
  );

  const speak = useCallback(
    (text: string, lang: string) => {
      const synth = getSynth();
      if (!synth || !text.trim()) return;
      // Stop anything already playing before starting the new utterance.
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      const voice = pickVoice(lang);
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);
      };
      utterance.onerror = () => {
        setSpeaking(false);
        setPaused(false);
      };
      utteranceRef.current = utterance;
      setSpeaking(true);
      setPaused(false);
      synth.speak(utterance);
    },
    [pickVoice],
  );

  const pause = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.pause();
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.resume();
    setPaused(false);
  }, []);

  // Cancel speech if the component using this hook unmounts.
  useEffect(() => {
    return () => {
      getSynth()?.cancel();
    };
  }, []);

  return { supported, speaking, paused, speak, pause, resume, stop };
}
