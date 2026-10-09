"use client";

import { useState } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { localizedGroup } from "@/lib/localize-tools";
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
  const { language } = useLanguage();
  const en = language === "en";
  const displayed = localizedGroup(group,en);
  const categoryDescription = group.name === "PDF" ? (en ? "Edit, convert and optimize PDF documents easily and securely, directly in your browser." : "Edita, convierte y optimiza documentos PDF de manera sencilla y segura, directamente desde tu navegador.") : displayed.description;
  const [flipped, setFlipped] = useState(false);

  const accent =
    CATEGORY_COLORS[group.name] ?? "#087C9B";

  const cardStyle = {
    "--flip-accent": accent,
  } as CSSProperties;



  return (
    <article
      className={`${styles.card} ${
        flipped ? styles.flipped : ""
      }`}
      style={cardStyle}
      aria-label={`${en ? "Category" : "Categoría"} ${displayed.nameDisplay}`}
    >
      <div className={styles.inner}>
        {/* FRENTE BLANCO */}

        <div className={`${styles.face} ${styles.front}`}>
          <button
            type="button"
            className={styles.frontButton}
            onClick={() => setFlipped(true)}
            aria-label={`${en ? "View details for" : "Ver detalles de"} ${displayed.nameDisplay}`}
            aria-expanded={flipped}
          >
            <span className={styles.iconContainer}>
              {icon}
            </span>

            <span className={styles.categoryName}>
              {displayed.nameDisplay}
            </span>

            <span className={styles.count}>
              {group.isAvailable
                ? `${group.tools.length} ${
                    group.tools.length === 1
                      ? en ? "tool" : "herramienta"
                      : en ? "tools" : "herramientas"
                  }`
                : (en ? "Coming soon" : "Próximamente")}
            </span>

            <span className={styles.frontHint}>
              {en ? "View details" : "Ver detalles"}
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
              aria-label={`${en ? "Back to front of" : "Volver al frente de"} ${displayed.nameDisplay}`}
            >
              ↶
            </button>
          </div>

          <h2 className={styles.backTitle}>
            {displayed.nameDisplay}
          </h2>

          <p className={styles.description}>
            {categoryDescription}
          </p>

          {group.isAvailable ? (
            <>

              {group.href && (
                <Link
                  href={group.href}
                  className={styles.exploreButton}
                >
                  {en ? "Explore category" : "Explorar categoría"}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <p className={styles.comingSoon}>
                {en ? "We are preparing new tools for this category." : "Estamos preparando nuevas herramientas para esta categoría."}
              </p>

              <span className={styles.disabledLabel}>
                {en ? "Coming soon" : "Disponible próximamente"}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
