// src/components/PersonalAssistant.tsx
//
// Floating personal assistant widget for SARTHI. Renders as a chat-bubble
// button in the bottom-right corner. When open it shows a conversation panel
// with text + voice input and auto-TTS for assistant replies.
//
// Responds in whichever language is currently active in the app (en/te/hi),
// using the rule-based knowledge base in src/data/assistantKnowledge.ts.
import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Volume2, VolumeX, Mic } from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";
import { speechLocaleFor } from "@/voice/speechLang";
import { useSpeechSynthesis } from "@/voice/useSpeechSynthesis";
import MicButton from "@/components/voice/MicButton";
import { matchIntent } from "@/data/assistantKnowledge";
import type { Language } from "@/i18n/config";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  text: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2);
}

function greetingFor(language: Language): string {
  const greetings: Record<Language, string> = {
    en: "Hello! I'm SARTHI Assistant 🙏 I'm here to help you discover welfare schemes you're entitled to. You can ask me about eligibility, schemes, voice input, language settings, or anything else about this portal. How can I help you today?",
    te: "నమస్కారం! నేను SARTHI సహాయకుడిని 🙏 మీకు మీ హక్కుగా రావలసిన సంక్షేమ పథకాలు కనుగొనడంలో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. అర్హత, పథకాలు, వాయిస్ ఇన్‌పుట్, భాష సెట్టింగ్‌లు లేదా ఈ పోర్టల్ గురించి ఏదైనా అడగవచ్చు. నేను మీకు ఎలా సహాయం చేయగలను?",
    hi: "नमस्ते! मैं SARTHI सहायक हूँ 🙏 मैं आपको उन कल्याण योजनाओं की खोज में मदद करने के लिए यहाँ हूँ जिनके आप हकदार हैं। आप मुझसे पात्रता, योजनाओं, आवाज़ इनपुट, भाषा सेटिंग्स, या इस पोर्टल के बारे में कुछ भी पूछ सकते हैं। मैं आज आपकी कैसे मदद कर सकता हूँ?",
  };
  return greetings[language];
}

function placeholderFor(language: Language): string {
  const map: Record<Language, string> = {
    en: "Type or speak your question…",
    te: "మీ ప్రశ్న టైప్ చేయండి లేదా చెప్పండి…",
    hi: "अपना प्रश्न टाइप करें या बोलें…",
  };
  return map[language];
}

function sendLabelFor(language: Language): string {
  const map: Record<Language, string> = {
    en: "Send",
    te: "పంపు",
    hi: "भेजें",
  };
  return map[language];
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AssistantMessage({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-start">
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold select-none">
        S
      </div>
      <div className="bg-[#F0F4FF] text-[#0B2240] rounded-2xl rounded-tl-sm px-3 py-2 text-sm leading-relaxed max-w-[85%] whitespace-pre-line shadow-sm">
        {text}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-[#1E3A8A] text-white rounded-2xl rounded-tr-sm px-3 py-2 text-sm leading-relaxed max-w-[85%] whitespace-pre-line shadow-sm">
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold">
        S
      </div>
      <div className="bg-[#F0F4FF] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface PersonalAssistantProps {
  forceOpen?: boolean;
  onForceOpenHandled?: () => void;
}

export default function PersonalAssistant({ forceOpen, onForceOpenHandled }: PersonalAssistantProps = {}) {
  const { language } = useTranslation();
  const { speak, stop, supported: ttsSupported } = useSpeechSynthesis();

  const [open, setOpen] = useState(false);

  // Open the widget when the parent requests it (e.g. Help tab "Start Chat")
  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      onForceOpenHandled?.();
    }
  }, [forceOpen, onForceOpenHandled]);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [input, setInput] = useState("");
  const [voiceInterim, setVoiceInterim] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Seed the conversation with a greeting in the current language.
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: uid(), role: "assistant", text: greetingFor(language) },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // When the panel opens, focus the input.
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // Scroll to bottom on new messages.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // If language changes while the chat is empty (only greeting), refresh greeting.
  const prevLangRef = useRef(language);
  useEffect(() => {
    if (prevLangRef.current === language) return;
    prevLangRef.current = language;
    stop();
    setMessages([{ id: uid(), role: "assistant", text: greetingFor(language) }]);
    setInput("");
    setVoiceInterim("");
    setVoiceError("");
  }, [language, stop]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: Message = { id: uid(), role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setVoiceInterim("");
      setIsTyping(true);

      // Simulate brief processing delay for a more natural feel.
      setTimeout(() => {
        const intent = matchIntent(trimmed, language);
        const response = intent.responses[language];
        const assistantMsg: Message = { id: uid(), role: "assistant", text: response };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);

        if (ttsEnabled && ttsSupported) {
          speak(response, speechLocaleFor(language));
        }
      }, 600);
    },
    [language, ttsEnabled, ttsSupported, speak],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceInterim("");
    sendMessage(transcript);
  };

  const handleVoiceInterim = (interim: string) => {
    setVoiceInterim(interim);
  };

  const handleVoiceError = (msg: string) => {
    setVoiceError(msg);
    setTimeout(() => setVoiceError(""), 4000);
  };

  const toggleTts = () => {
    if (ttsEnabled) stop();
    setTtsEnabled((v) => !v);
  };

  return (
    <>
      {/* ── Floating trigger button ─────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full shadow-lg
          flex items-center justify-center
          bg-[#1E3A8A] text-white
          hover:bg-[#163074] active:scale-95
          transition-all duration-200
          ${open ? "rotate-90" : ""}
        `}
        aria-label={open ? "Close assistant" : "Open SARTHI Assistant"}
        title={open ? "Close assistant" : "Open SARTHI Assistant"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {/* Pulse ring to draw attention when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#1E3A8A] animate-ping opacity-30 pointer-events-none" />
        )}
      </button>

      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[min(380px,calc(100vw-3rem))]
          flex flex-col
          bg-white rounded-2xl shadow-2xl border border-slate-200
          transition-all duration-300 origin-bottom-right
          ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}
        `}
        style={{ maxHeight: "min(520px, calc(100dvh - 120px))" }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1E3A8A] rounded-t-2xl">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm select-none">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-none">SARTHI Assistant</p>
            <p className="text-white/70 text-xs mt-0.5">
              {language === "en"
                ? "EN · TE · HI"
                : language === "te"
                  ? "తెలుగు · EN · HI"
                  : "हिन्दी · EN · TE"}
            </p>
          </div>
          {/* TTS toggle */}
          {ttsSupported && (
            <button
              onClick={toggleTts}
              className="text-white/80 hover:text-white transition-colors p-1 rounded"
              aria-label={ttsEnabled ? "Mute responses" : "Read responses aloud"}
              title={ttsEnabled ? "Mute responses" : "Read responses aloud"}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white transition-colors p-1 rounded"
            aria-label="Close assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0 scroll-smooth">
          {messages.map((msg) =>
            msg.role === "assistant" ? (
              <AssistantMessage key={msg.id} text={msg.text} />
            ) : (
              <UserMessage key={msg.id} text={msg.text} />
            ),
          )}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Voice interim preview */}
        {voiceInterim && (
          <div className="mx-4 mb-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-1.5">
            <Mic className="w-3 h-3 flex-shrink-0 animate-pulse" />
            <span className="italic truncate">{voiceInterim}</span>
          </div>
        )}

        {/* Voice error */}
        {voiceError && (
          <div className="mx-4 mb-1 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            {voiceError}
          </div>
        )}

        {/* Input bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-3 border-t border-slate-100"
        >
          <MicButton
            language={language}
            onTranscript={handleVoiceTranscript}
            onInterim={handleVoiceInterim}
            onError={handleVoiceError}
            label="Voice input for assistant"
            size="sm"
            continuous={false}
            className="flex-shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholderFor(language)}
            className="flex-1 min-w-0 text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-[#0B2240] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A]"
            aria-label={placeholderFor(language)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#163074] active:scale-95 transition-all"
            aria-label={sendLabelFor(language)}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </>
  );
}
