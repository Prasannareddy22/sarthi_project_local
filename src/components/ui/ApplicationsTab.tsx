import { useTranslation } from "@/i18n/useTranslation";

export default function ApplicationsTab() {
  const { t } = useTranslation();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">{t("applications.heading")}</h2>
      <p className="text-gray-600">{t("applications.empty")}</p>
    </div>
  );
}
