import { useState } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, Sparkles, Trash2 } from "lucide-react";

type NotificationType = "success" | "info" | "warning" | "match";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Mock data — replace with a real feed once the notifications API is wired up.
const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "match",
    title: "New scheme match found",
    message:
      "You're 100% eligible for the Kalyana Lakshmi Scheme based on your latest profile update.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    type: "success",
    title: "Application approved",
    message:
      "Your Gruha Jyothi application has been approved and free electricity billing starts next cycle.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "n3",
    type: "warning",
    title: "Document verification pending",
    message:
      "Please upload your income certificate to continue processing your Cheyutha pension application.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "n4",
    type: "info",
    title: "Portal maintenance notice",
    message: "SARTHI will undergo scheduled maintenance this Sunday from 2:00 AM to 4:00 AM IST.",
    time: "5 days ago",
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
          <h2 className="text-xl font-bold text-[#0B2240]">Notifications</h2>
          <p className="text-[13px] text-[#64748B] mt-1">
            Updates on your applications, matches, and portal announcements.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[12.5px] font-semibold text-[#1E3A8A] hover:text-[#0B2240] transition-colors"
          >
            Mark all as read
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
            {f === "all" ? "All" : `Unread (${unreadCount})`}
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
              You're all caught up
            </div>
            <div className="text-[13px] text-[#64748B] mt-1">No notifications to show here.</div>
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
                    <div className="text-[13.5px] font-bold text-[#0B2240]">{n.title}</div>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />}
                  </div>
                  <p className="text-[12.5px] text-[#64748B] mt-1 leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-[#94A3B8] font-medium">{n.time}</span>
                    {!n.read && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="text-[11px] font-semibold text-[#1E3A8A] hover:text-[#0B2240]"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  aria-label="Dismiss notification"
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