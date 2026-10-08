"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { localizedGroup, localizedTool } from "@/lib/localize-tools";
import CategoryFlipCard from "@/components/CategoryFlipCard";

import {
  getToolGroup,
  toolGroups,
  type ToolCategory,
  type ToolIcon,
} from "@/lib/tools";

interface ToolExplorerProps {
  category?: ToolCategory;
}

function ToolSymbol({
  icon,
  size = 32,
}: {
  icon: ToolIcon;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "pdf":
    case "merge":
    case "extract":
      return (
        <svg {...common}>
          <path d="M7 3.5h7l4 4v13H7z" />
          <path d="M14 3.5v4h4M10 12h5M10 16h5" />
        </svg>
      );

    case "compress":
      return (
        <svg {...common}>
          <path d="M3 8h5V3M16 3v5h5M3 16h5v5M16 21v-5h5" />
          <path d="m8 8 4 4 4-4M8 16l4-4 4 4" />
        </svg>
      );

    case "rotate":
      return (
        <svg {...common}>
          <path d="M20 8V4h-4" />
          <path d="M20 4a9 9 0 1 0 1 11" />
        </svg>
      );

    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="8" cy="9" r="1.5" />
          <path d="m5 17 5-5 3 3 3-3 3 3" />
        </svg>
      );

    case "audio":
      return (
        <svg {...common}>
          <path d="M9 17V6l9-2v11" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="15" cy="16" r="3" />
        </svg>
      );

    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="13" height="14" rx="3" />
          <path d="m16 10 5-3v10l-5-3" />
        </svg>
      );

    case "calculator":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="3" />
          <path d="M8 8h8M9 12h1M14 12h1M9 16h1M14 16h1" />
        </svg>
      );

    case "crypto":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 7v10M13 7v10M10 8h4a2 2 0 0 1 0 4h-4m0 0h4.5a2 2 0 0 1 0 4H10" />
        </svg>
      );

    case "template":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );

    case "translate":
      return (
        <svg {...common}>
          <path d="M3 7h12M9 4v3M6 10c2 4 5 6 9 7M13 10c-1 3-4 6-8 8" />
          <path d="M16 9h3l3 11M15 17h6" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" />
        </svg>
      );
  }
}

export default function ToolExplorer({
  category,
}: ToolExplorerProps) {
  const { language } = useLanguage();
  const en = language === "en";
  const [query, setQuery] = useState("");

  const group = category
    ? getToolGroup(category)
    : undefined;

  const categories = useMemo(() => {
    const search = query
      .trim()
      .toLocaleLowerCase("es");

    if (!search) {
      return toolGroups;
    }

    return toolGroups.filter((item) =>
      [
        item.name,
        localizedGroup(item,true).nameDisplay,
        item.description,
        localizedGroup(item,true).description,
        ...item.keywords,
        ...item.tools.map((tool) => tool.name),
        ...item.tools.map((tool) => localizedTool(tool,true).name),
      ]
        .join(" ")
        .toLocaleLowerCase("es")
        .includes(search)
    );
  }, [query]);

  const tools = useMemo(() => {
    if (!group) {
      return [];
    }

    const search = query
      .trim()
      .toLocaleLowerCase("es");

    if (!search) {
      return group.tools;
    }

    return group.tools.filter((tool) =>
      [tool.name,tool.description,localizedTool(tool,true).name,localizedTool(tool,true).description,...tool.keywords]
        .join(" ")
        .toLocaleLowerCase("es")
        .includes(search)
    );
  }, [group, query]);

  return (
    <section className="overflow-hidden rounded-[34px] border border-[var(--pal-border)] bg-[#f8fafb] shadow-[var(--pal-shadow)]">
      <div className="border-b border-[var(--pal-border)] bg-white px-6 py-7 sm:px-9">
        {category && (
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[var(--pal-border)] bg-[var(--pal-tint)] px-4 py-2.5 text-sm font-semibold text-[var(--pal-accent)] transition hover:brightness-95"
          >
            <span aria-hidden="true">←</span>
            {en ? "Back to categories" : "Volver a categorías"}
          </Link>
        )}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--pal-accent)]">
              {category
                ? `${en ? "Library" : "Biblioteca"} / ${en && group ? localizedGroup(group,true).nameDisplay : category}`
                : "PALJALE"}
            </p>

            <h1 className="mt-2 text-[34px] font-black tracking-[-0.055em] text-[#172033] sm:text-[44px]">
              {category
                ? `${en ? "Tools" : "Herramientas"} ${en && group ? localizedGroup(group,true).nameDisplay : category}`
                : (en ? "Digital library" : "Biblioteca digital")}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {category
                ? (group ? localizedGroup(group,en).description : "")
                : (en ? "Choose a category to explore its tools." : "Selecciona una categoría para descubrir sus herramientas.")}
            </p>
          </div>

          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">
              {category
                ? (en ? "Search tools" : "Buscar herramienta")
                : (en ? "Search categories" : "Buscar categoría")}
            </span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder={
                category
                  ? (en ? "Search tools..." : "Buscar herramienta...")
                  : (en ? "Search categories..." : "Buscar categoría...")
              }
              className="h-13 w-full rounded-2xl border border-[var(--pal-border)] bg-[#f5f8fa] pl-12 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-slate-400 focus:border-[var(--pal-accent)]"
            />
          </label>
        </div>
      </div>

      {category && group && (
        <div
          className={`flex items-center gap-4 border-b px-6 py-5 sm:px-9 ${group.color.soft} ${group.color.border}`}
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${group.color.icon} ${group.color.text}`}
          >
            <ToolSymbol icon={group.icon} />
          </div>

          <div>
            <p
              className={`text-sm font-extrabold ${group.color.text}`}
            >
              {en ? "Module" : "Módulo"} {localizedGroup(group,en).nameDisplay}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              {localizedGroup(group,en).shortDescription}
            </p>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-7">
        {!category ? (
          categories.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((item) => (
                <CategoryFlipCard
                  key={item.name}
                  group={item}
                  icon={
                    <ToolSymbol
                      icon={item.icon}
                      size={45}
                    />
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-600">
              {en ? "No matching categories found." : "No encontramos esa categoría."}
            </div>
          )
        ) : group && tools.length > 0 ? (
          <div className="mx-auto flex max-w-5xl flex-col gap-3">
            {tools.map((tool, index) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-4 rounded-[22px] border border-[var(--pal-border)] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:p-5"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${group.color.icon} ${group.color.text}`}
                >
                  <ToolSymbol icon={tool.icon} size={28} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--pal-accent)]">
                    {en ? "Tool" : "Herramienta"}{" "}
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="text-[17px] font-bold text-[#172033] sm:text-lg">
                    {localizedTool(tool,en).name}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {localizedTool(tool,en).description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${group.color.icon} ${group.color.text} transition-transform group-hover:translate-x-1`}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-600">
            {en ? "No matching tools found." : "No encontramos herramientas."}
          </div>
        )}
      </div>
    </section>
  );
}
