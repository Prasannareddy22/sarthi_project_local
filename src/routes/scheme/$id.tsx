import { createFileRoute, Link } from "@tanstack/react-router";
import { getSchemeById } from "../../services/schemeService";
import { parseSchemeDetailSearch, type SchemeDetailSearch } from "@/lib/engineState";
import { useTranslation } from "@/i18n/useTranslation";

export const Route = createFileRoute("/scheme/$id")({
  validateSearch: (search: Record<string, unknown>): SchemeDetailSearch =>
    parseSchemeDetailSearch(search),
  component: SchemeDetail,
});

function SchemeDetail() {
  const { t } = useTranslation();
  const { id } = Route.useParams();
  const { from, input, results } = Route.useSearch();
  const scheme = getSchemeById(id);
  const backTab = from ?? "schemes";
  const backLabel =
    backTab === "engine" ? t("schemeDetail.backToEngine") : t("schemeDetail.backToSchemes");
  const backSearch = backTab === "engine" ? { tab: backTab, input, results } : { tab: backTab };

  if (!scheme) {
    return (
      <div className="p-10 text-center text-slate-600">
        <h2 className="text-2xl font-bold mb-2">{t("schemeDetail.notFoundTitle")}</h2>
        <Link to="/" search={backSearch} className="text-blue-600 hover:underline">
          {t("schemeDetail.returnToDashboard")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-white shadow-sm border border-slate-200 rounded-2xl mt-8">
      {/* Back Navigation */}
      <Link
        to="/"
        search={backSearch}
        className="group flex items-center text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors mb-8"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> {backLabel}
      </Link>

      {/* Main Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{scheme.name}</h1>
        <p className="text-lg text-slate-600 leading-relaxed">{scheme.description}</p>
      </div>

      {/* Two-Column Grid for Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-3">{t("schemeDetail.keyBenefits")}</h3>
          <ul className="space-y-2 list-none">
            {scheme.benefits.map((b: string, i: number) => (
              <li key={i} className="text-blue-800 text-sm flex items-start">
                <span className="mr-2">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            {t("schemeDetail.requiredDocuments")}
          </h3>
          <ul className="space-y-2 list-disc ml-4">
            {scheme.documents.map((doc: string, i: number) => (
              <li key={i} className="text-slate-700 text-sm">
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Official CTA Section */}
      <div className="p-6 bg-slate-900 rounded-xl text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-bold text-lg">{t("schemeDetail.readyToApply")}</h3>
          <p className="text-slate-300 text-sm">{t("schemeDetail.readyToApplyDesc")}</p>
        </div>
        <a
          href={scheme.onlineLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
        >
          {t("schemeDetail.visitPortal")}
        </a>
      </div>
    </div>
  );
}
