"use client";

import { useState } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import type { ToolGroup } from "@/lib/tools";
import styles from "./CategoryFlipCard.module.css";

interface Props {
  group: ToolGroup;
  icon: ReactNode;
}

const CATEGORY_COLORS: Record<string, string> = {
  PDF: "#087C9B",
  Imágenes: "#CE424F",
  Audio: "#2858A5",
  Video: "#6945A5",
  Calculadoras: "#197B59",
  Crypto: "#A56709",
  Plantillas: "#93428B",
  Traductores: "#087E87",
  Utilidades: "#304E79",
};

export default function CategoryFlipCard({
  group,
  icon,
}: Props) {
  const [flipped, setFlipped] = useState(false);

  const accent =
    CATEGORY_COLORS[group.name] ?? "#087C9B";

  const cardStyle = {
    "--flip-accent": accent,
  } as CSSProperties;

  const examples = group.tools.slice(0, 4);

  return (
    <article
      className={`${styles.card} ${
        flipped ? styles.flipped : ""
      }`}
      style={cardStyle}
      aria-label={`Categoría ${group.name}`}
    >
      <div className={styles.inner}>
        {/* FRENTE BLANCO */}

        <div className={`${styles.face} ${styles.front}`}>
          <button
            type="button"
            className={styles.frontButton}
            onClick={() => setFlipped(true)}
            aria-label={`Ver detalles de ${group.name}`}
            aria-expanded={flipped}
          >
            <span className={styles.iconContainer}>
              {icon}
            </span>

            <span className={styles.categoryName}>
              {group.name}
            </span>

            <span className={styles.count}>
              {group.isAvailable
                ? `${group.tools.length} ${
                    group.tools.length === 1
                      ? "herramienta"
                      : "herramientas"
                  }`
                : "Próximamente"}
            </span>

            <span className={styles.frontHint}>
              Ver detalles
              <span aria-hidden="true"> ↻</span>
            </span>
          </button>
        </div>

        {/* REVERSO CON COLOR */}

        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.backTop}>
            <span className={styles.miniIcon}>
              {icon}
            </span>

            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setFlipped(false)}
              aria-label={`Volver al frente de ${group.name}`}
            >
              ↶
            </button>
          </div>

          <h2 className={styles.backTitle}>
            {group.name}
          </h2>

          <p className={styles.description}>
            {group.description}
          </p>

          {group.isAvailable ? (
            <>
              <div className={styles.toolList}>
                {examples.map((tool) => (
                  <span key={tool.href} className={styles.toolTag}>
                    {tool.name}
                  </span>
                ))}
              </div>

              {group.href && (
                <Link
                  href={group.href}
                  className={styles.exploreButton}
                >
                  Explorar categoría
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <p className={styles.comingSoon}>
                Estamos preparando nuevas herramientas
                para esta categoría.
              </p>

              <span className={styles.disabledLabel}>
                Disponible próximamente
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}