import styles from "./InicioPremium.module.css";

export default function InicioPremium() {
  return (
    <section className={styles.hero} aria-labelledby="paljale-welcome-title">
      <div className={styles.content}>
        <div className={styles.brand} aria-label="PALJALE, herramientas digitales">
          <span className={styles.brandMark} aria-hidden="true"><span /><span /><span /></span>
          <span className={styles.brandText}>PALJALE <small>HERRAMIENTAS DIGITALES</small></span>
        </div>
        <h1 id="paljale-welcome-title" className={styles.title}>
          Todo lo que necesitas.<br /><span>En un solo lugar.</span>
        </h1>
        <p className={styles.description}>
          PALJALE reúne herramientas digitales prácticas para calcular, analizar,
          crear y resolver tareas cotidianas de forma rápida y sencilla.
        </p>
        <p className={styles.help}>Explora las categorías del menú y encuentra la herramienta que necesitas.</p>
      </div>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.orbit} />
        <div className={styles.panel}>
          <div className={styles.panelTop}><i /><i /><i /></div>
          <div className={styles.panelBody}>
            <div className={styles.lineWide} /><div className={styles.lineShort} />
            <div className={styles.fakeCards}><b /><b /><b /></div>
            <div className={styles.fakeChart}><span /><span /><span /><span /><span /></div>
          </div>
        </div>
        <div className={`${styles.tile} ${styles.tileOne}`}>＋</div>
        <div className={`${styles.tile} ${styles.tileTwo}`}>▤</div>
        <div className={`${styles.tile} ${styles.tileThree}`}>▥</div>
        <div className={`${styles.tile} ${styles.tileFour}`}>⌘</div>
      </div>
    </section>
  );
}
