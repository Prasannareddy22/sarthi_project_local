import { useState } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, Sparkles, Trash2 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKey } from "@/i18n/translations";

type NotificationType = "success" | "info" | "warning" | "match";

interface Notification {
  id: string;
  type: NotificationType;
  titleKey: TranslationKey;
  messageKey: TranslationKey;
  timeKey: TranslationKey;
  read: boolean;
}

// Mock data — replace with a real feed once the notifications API is wired up.
const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "match",
    titleKey: "notifications.items.n1Title",
    messageKey: "notifications.items.n1Message",
    timeKey: "notifications.time.hoursAgo",
    read: false,
  },
  {
    id: "n2",
    type: "success",
    titleKey: "notifications.items.n2Title",
    messageKey: "notifications.items.n2Message",
    timeKey: "notifications.time.dayAgo",
    read: false,
  },
  {
    id: "n3",
    type: "warning",
    titleKey: "notifications.items.n3Title",
    messageKey: "notifications.items.n3Message",
    timeKey: "notifications.time.daysAgo3",
    read: true,
  },
  {
    id: "n4",
    type: "info",
    titleKey: "notifications.items.n4Title",
    messageKey: "notifications.items.n4Message",
    timeKey: "notifications.time.daysAgo5",
    read: true,
  },
];

const typeStyles: Record<NotificationType, { icon: React.ElementType; bg: string; text: string }> =
  {
    success: { icon: CheckCircle2, bg: "bg-[#10B981]/10", text: "text-[#10B981]" },
    match: { icon: Sparkles, bg: "bg-[#1E3A8A]/10", text: "text-[#1E3A8A]" },
    warning: { icon: AlertTriangle, bg: "bg-[#F59E0B]/15", text: "text-[#B45309]" },
    info: { icon: Info, bg: "bg-[#F1F5F9]", text: "text-[#64748B]" },
  };

export default function NotificationsTab() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visible = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const dismiss = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#0B2240]">{t("notifications.title")}</h2>
          <p className="text-[13px] text-[#64748B] mt-1">{t("notifications.subtitle")}</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[12.5px] font-semibold text-[#1E3A8A] hover:text-[#0B2240] transition-colors"
          >
            {t("notifications.markAllRead")}
          </button>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors ${
              filter === f
                ? "bg-[#0B2240] text-white"
                : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            {f === "all"
              ? t("notifications.all")
              : t("notifications.unread", { count: unreadCount })}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E2E8F0] p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F1F5F9] grid place-items-center mx-auto">
              <Bell className="w-6 h-6 text-[#64748B]" />
            </div>
            <div className="mt-4 text-[15px] font-semibold text-[#0F172A]">
              {t("notifications.caughtUpTitle")}
            </div>
            <div className="text-[13px] text-[#64748B] mt-1">{t("notifications.caughtUpDesc")}</div>
          </div>
        ) : (
          visible.map((n) => {
            const style = typeStyles[n.type];
            const Icon = style.icon;
            return (
              <div
                key={n.id}
                className={`relative rounded-2xl border p-4 flex items-start gap-3 transition-colors ${
                  n.read ? "border-[#E2E8F0] bg-white" : "border-[#1E3A8A]/20 bg-[#1E3A8A]/[0.03]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${style.bg} ${style.text}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-[13.5px] font-bold text-[#0B2240]">{t(n.titleKey)}</div>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />}
                  </div>
                  <p className="text-[12.5px] text-[#64748B] mt-1 leading-relaxed">
                    {t(n.messageKey)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-[#94A3B8] font-medium">{t(n.timeKey)}</span>
                    {!n.read && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="text-[11px] font-semibold text-[#1E3A8A] hover:text-[#0B2240]"
                      >
                        {t("notifications.markAsRead")}
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  aria-label={t("notifications.dismiss")}
                  className="shrink-0 p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0B2240] hover:bg-[#F1F5F9] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
