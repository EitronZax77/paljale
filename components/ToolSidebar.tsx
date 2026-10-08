"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toolGroups } from "@/lib/tools";

export default function ToolSidebar() {
  const pathname = usePathname();

  const [gruposAbiertos, setGruposAbiertos] = useState<Set<string>>(
    () => new Set(["PDF"])
  );

  const alternarGrupo = (nombre: string, abierto: boolean) => {
    setGruposAbiertos((actuales) => {
      const nuevos = new Set(actuales);

      if (abierto) {
        nuevos.add(nombre);
      } else {
        nuevos.delete(nombre);
      }

      return nuevos;
    });
  };

  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_10px_32px_rgba(15,23,42,0.06)]">
      <div className="px-3 pb-4 pt-2">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#0d8fa6]">
          Biblioteca
        </p>

        <h2 className="mt-2 text-[18px] font-extrabold text-[#0f172a]">
          Herramientas
        </h2>
      </div>

      <nav className="space-y-2" aria-label="Categorías de herramientas">
        {toolGroups.map((group) => {
          const groupActive =
            pathname === group.href ||
            group.tools.some((tool) => tool.href === pathname);

          const estaAbierto = groupActive || gruposAbiertos.has(group.name);

          return (
            <details
              key={group.name}
              open={estaAbierto}
              onToggle={(event) => {
                alternarGrupo(group.name, event.currentTarget.open);
              }}
              className="group"
            >
              <summary
                className={`list-none rounded-[20px] border px-4 py-3 shadow-sm transition cursor-pointer ${group.color.border} ${group.color.button}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${group.color.icon} ${group.color.text}`}
                    >
                      {group.name.slice(0, 1)}
                    </span>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-[#0f172a]">
                        {group.name}
                      </div>

                      <div className="truncate text-[11px] text-slate-500">
                        {group.shortDescription}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!group.isAvailable && (
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                        Próximamente
                      </span>
                    )}

                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-90"
                    >
                      <path
                        d="m8 6 4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </summary>

              <div className="mt-2 space-y-2 px-2 pb-1">
                {group.isAvailable && group.tools.length > 0 ? (
                  group.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`block rounded-2xl border px-4 py-3 text-sm transition ${
                        pathname === tool.href
                          ? "border-[#0f172a] bg-[#0f172a] font-bold text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-[#0f172a]"
                      }`}
                    >
                      {tool.name}
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                    Esta categoría aparecerá en una fase posterior.
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </nav>
    </aside>
  );
}