export default function AnimatedSpriteParade() {
  return (
    <section
      className="pal-parade"
      aria-label="Decoración animada de temporada"
    >
      <div className="pal-parade-floor" aria-hidden="true" />

      {/* MÉXICO: personaje festivo caminando */}
      <div className="pal-parade-scene pal-parade-septiembre">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="50" cy="95" rx="27" ry="3" fill="#14532d" opacity=".16" />
            <path d="M22 30Q50 4 78 30Z" fill="#176b42" />
            <path d="M16 30Q50 39 84 30" stroke="#c44346" strokeWidth="7" strokeLinecap="round" />
            <rect x="35" y="32" width="30" height="26" rx="13" fill="#eeb98a" />
            <circle cx="44" cy="44" r="2" fill="#293241" />
            <circle cx="56" cy="44" r="2" fill="#293241" />
            <path d="M43 51Q50 56 57 51" stroke="#543a33" strokeWidth="2" fill="none" />
            <path d="M34 60Q50 55 66 60L69 78H31Z" fill="#ffffff" stroke="#176b42" strokeWidth="2" />
            <path d="M44 60L50 69L56 60" stroke="#c44346" strokeWidth="3" fill="none" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M33 62L22 73" stroke="#eeb98a" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M67 62L78 72" stroke="#eeb98a" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-left">
              <path d="M43 77L39 91" stroke="#244c42" strokeWidth="7" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-right">
              <path d="M57 77L61 91" stroke="#244c42" strokeWidth="7" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* DÍA DE MUERTOS: calaverita caminando */}
      <div className="pal-parade-scene pal-parade-muertos">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="50" cy="95" rx="26" ry="3" fill="#813b94" opacity=".15" />
            <path d="M25 39Q25 12 50 12Q75 12 75 39L69 60H31Z" fill="#fff5de" stroke="#86519b" strokeWidth="2" />
            <circle cx="39" cy="39" r="9" fill="#86519b" />
            <circle cx="61" cy="39" r="9" fill="#86519b" />
            <circle cx="39" cy="39" r="3" fill="#f2ac35" />
            <circle cx="61" cy="39" r="3" fill="#f2ac35" />
            <path d="M50 43L45 51H55Z" fill="#d778a7" />
            <path d="M37 57H63M42 57V62M50 57V63M58 57V62" stroke="#86519b" strokeWidth="2" />
            <circle cx="28" cy="24" r="7" fill="#e98a25" />
            <circle cx="36" cy="17" r="6" fill="#e98a25" />
            <circle cx="42" cy="27" r="6" fill="#e98a25" />
            <path d="M35 65Q50 61 65 65L67 80H33Z" fill="#763e93" />
            <path d="M41 68H59" stroke="#f5ad39" strokeWidth="3" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M34 68L22 78" stroke="#fff5de" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M66 68L77 77" stroke="#fff5de" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-left">
              <path d="M43 79L39 92" stroke="#763e93" strokeWidth="7" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-right">
              <path d="M57 79L61 92" stroke="#763e93" strokeWidth="7" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <span className="pal-parade-trail pal-trail-flower">✿</span>
      </div>

      {/* ESPACIO: astronauta caminando */}
      <div className="pal-parade-scene pal-parade-espacial">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="50" cy="95" rx="27" ry="3" fill="#6355a4" opacity=".15" />
            <rect x="30" y="58" width="40" height="26" rx="12" fill="#f3f6ff" stroke="#6772b7" strokeWidth="3" />
            <rect x="22" y="16" width="56" height="50" rx="24" fill="#f4f7ff" stroke="#6772b7" strokeWidth="3" />
            <rect x="31" y="27" width="38" height="27" rx="12" fill="#729bc6" />
            <path d="M34 37Q50 23 65 35" stroke="#dceaff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <rect x="42" y="67" width="16" height="10" rx="3" fill="#f4a5a9" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M30 65L19 75" stroke="#f3f6ff" strokeWidth="10" strokeLinecap="round" />
              <path d="M30 65L19 75" stroke="#6772b7" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M70 65L82 74" stroke="#f3f6ff" strokeWidth="10" strokeLinecap="round" />
              <path d="M70 65L82 74" stroke="#6772b7" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-left">
              <path d="M41 81L39 93" stroke="#dfe7f8" strokeWidth="10" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-right">
              <path d="M59 81L62 93" stroke="#dfe7f8" strokeWidth="10" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <span className="pal-parade-trail pal-trail-star">✦</span>
      </div>

      {/* TECNOLOGÍA Y CIENCIA: robot con ruedas */}
      <div className="pal-parade-scene pal-parade-tecnologia pal-parade-ciencia">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite pal-sprite-robot" aria-hidden="true">
            <ellipse cx="50" cy="95" rx="28" ry="3" fill="#008d9a" opacity=".16" />
            <path d="M50 20V11" stroke="#297b9a" strokeWidth="4" />
            <circle cx="50" cy="9" r="5" fill="#ef7e7f" />
            <rect x="21" y="23" width="58" height="45" rx="14" fill="#dceff5" stroke="#26819a" strokeWidth="3" />
            <rect x="30" y="32" width="40" height="27" rx="8" fill="#165978" />
            <circle cx="41" cy="45" r="5" fill="#8cf1e2" />
            <circle cx="59" cy="45" r="5" fill="#8cf1e2" />
            <path d="M43 54H57" stroke="#8cf1e2" strokeWidth="2" strokeLinecap="round" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M22 48L10 57" stroke="#29899d" strokeWidth="8" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M78 48L90 57" stroke="#29899d" strokeWidth="8" strokeLinecap="round" />
            </g>
            <rect x="31" y="68" width="38" height="15" rx="6" fill="#3d91ad" />
            <circle cx="36" cy="86" r="9" fill="#253b60" />
            <circle cx="64" cy="86" r="9" fill="#253b60" />
            <circle cx="36" cy="86" r="4" fill="#aacddd" />
            <circle cx="64" cy="86" r="4" fill="#aacddd" />
          </svg>
        </div>
      </div>

      {/* NATURALEZA: zorrito caminando */}
      <div className="pal-parade-scene pal-parade-naturaleza">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 110 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="54" cy="94" rx="37" ry="3" fill="#2d7955" opacity=".15" />
            <path d="M67 64Q99 35 105 61Q97 86 69 80" fill="#c7763e" />
            <path d="M90 55Q108 64 100 72L86 71Z" fill="#f6ecd8" />
            <ellipse cx="50" cy="71" rx="31" ry="17" fill="#ce844c" />
            <path d="M19 42L23 14L43 29L61 15L66 43" fill="#c7763e" />
            <path d="M25 22L27 35L39 34ZM51 33L59 23L60 36Z" fill="#f5bea3" />
            <path d="M17 42Q42 22 67 43L60 63Q42 75 24 61Z" fill="#d78b4f" />
            <path d="M26 53Q41 66 57 53L49 65H34Z" fill="#fff0dc" />
            <circle cx="32" cy="44" r="3" fill="#273b32" />
            <circle cx="53" cy="44" r="3" fill="#273b32" />
            <circle cx="42" cy="58" r="3" fill="#273b32" />
            <g className="pal-sprite-leg pal-sprite-leg-left">
              <path d="M35 78L31 92" stroke="#915335" strokeWidth="8" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-right">
              <path d="M66 78L70 92" stroke="#915335" strokeWidth="8" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* INVIERNO: muñeco de nieve deslizándose */}
      <div className="pal-parade-scene pal-parade-invierno">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="50" cy="96" rx="31" ry="3" fill="#498ec3" opacity=".17" />
            <circle cx="50" cy="70" r="25" fill="#f8fdff" stroke="#9ad1e2" strokeWidth="2" />
            <circle cx="50" cy="35" r="20" fill="#f8fdff" stroke="#9ad1e2" strokeWidth="2" />
            <path d="M31 20H69V26H31Z" fill="#315786" />
            <path d="M39 4H61V20H39Z" fill="#315786" />
            <circle cx="43" cy="33" r="2.8" fill="#263b5d" />
            <circle cx="57" cy="33" r="2.8" fill="#263b5d" />
            <path d="M50 38L69 43L50 44Z" fill="#e98935" />
            <path d="M39 47Q50 53 61 47" fill="none" stroke="#263b5d" strokeWidth="2" />
            <path d="M35 52Q50 60 65 52" stroke="#d9576d" strokeWidth="7" fill="none" />
            <circle cx="50" cy="68" r="3" fill="#315786" />
            <circle cx="50" cy="79" r="3" fill="#315786" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M29 63L13 53" stroke="#92765d" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M71 63L87 53" stroke="#92765d" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* ARTE: pequeño pintor */}
      <div className="pal-parade-scene pal-parade-arte">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="50" cy="95" rx="26" ry="3" fill="#a1548b" opacity=".15" />
            <path d="M27 32Q50 8 73 32Z" fill="#7855a7" />
            <rect x="35" y="34" width="30" height="27" rx="13" fill="#eec5a2" />
            <circle cx="43" cy="45" r="2.5" fill="#273344" />
            <circle cx="57" cy="45" r="2.5" fill="#273344" />
            <path d="M44 53Q50 58 56 53" fill="none" stroke="#805b4c" strokeWidth="2" />
            <path d="M32 64Q50 59 68 64L69 81H31Z" fill="#e7ddf6" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M32 67L19 75" stroke="#eec5a2" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M68 67L82 59" stroke="#eec5a2" strokeWidth="6" strokeLinecap="round" />
              <path d="M82 59L87 32" stroke="#7d5b42" strokeWidth="3" />
              <path d="M84 31L90 23" stroke="#d8568c" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-left">
              <path d="M42 80L39 92" stroke="#455b91" strokeWidth="7" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-leg pal-sprite-leg-right">
              <path d="M58 80L61 92" stroke="#455b91" strokeWidth="7" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* PRIMAVERA: mariposa volando */}
      <div className="pal-parade-scene pal-parade-primavera">
        <div className="pal-parade-traveler pal-parade-flying">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <g className="pal-butterfly-wing pal-wing-left">
              <path d="M48 49Q6 2 10 44Q12 73 48 61Z" fill="#e985a6" stroke="#bb648e" strokeWidth="2" />
              <circle cx="29" cy="45" r="9" fill="#ffd8a8" />
            </g>
            <g className="pal-butterfly-wing pal-wing-right">
              <path d="M52 49Q94 2 90 44Q88 73 52 61Z" fill="#91c9ae" stroke="#4e9476" strokeWidth="2" />
              <circle cx="71" cy="45" r="9" fill="#f9e5ad" />
            </g>
            <ellipse cx="50" cy="55" rx="6" ry="23" fill="#5c6384" />
            <path d="M47 35L39 24M53 35L61 24" stroke="#5c6384" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* VERANO: personaje patinando */}
      <div className="pal-parade-scene pal-parade-verano">
        <div className="pal-parade-traveler">
          <svg viewBox="0 0 100 100" className="pal-sprite" aria-hidden="true">
            <ellipse cx="50" cy="97" rx="34" ry="3" fill="#b57c26" opacity=".13" />
            <circle cx="50" cy="33" r="18" fill="#eab78c" />
            <path d="M30 27Q50 6 70 27" fill="#f1a735" />
            <path d="M30 27H75" stroke="#d07d28" strokeWidth="5" strokeLinecap="round" />
            <circle cx="43" cy="35" r="2.5" fill="#333a44" />
            <circle cx="57" cy="35" r="2.5" fill="#333a44" />
            <path d="M43 43Q50 49 57 43" fill="none" stroke="#895641" strokeWidth="2" />
            <path d="M34 54Q50 48 66 54L68 74H32Z" fill="#3eacc0" />
            <path d="M40 74H60L64 87H36Z" fill="#e18a60" />
            <path d="M31 91H69" stroke="#3d5e83" strokeWidth="6" strokeLinecap="round" />
            <circle cx="35" cy="95" r="4" fill="#364c6b" />
            <circle cx="65" cy="95" r="4" fill="#364c6b" />
            <g className="pal-sprite-arm pal-sprite-arm-left">
              <path d="M34 57L17 65" stroke="#eab78c" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="pal-sprite-arm pal-sprite-arm-right">
              <path d="M66 57L82 66" stroke="#eab78c" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* OCÉANO: pez nadando */}
      <div className="pal-parade-scene pal-parade-oceano">
        <div className="pal-parade-traveler pal-parade-flying">
          <svg viewBox="0 0 120 100" className="pal-sprite" aria-hidden="true">
            <path d="M33 47L7 25V75L33 54" fill="#3a93b3" />
            <ellipse cx="67" cy="50" rx="40" ry="25" fill="#67c2d2" stroke="#3194ad" strokeWidth="3" />
            <path d="M48 28L65 10L77 28" fill="#379bb6" />
            <path d="M54 72L67 90L78 72" fill="#379bb6" />
            <circle cx="86" cy="43" r="5" fill="#ffffff" />
            <circle cx="87" cy="43" r="2.5" fill="#24445b" />
            <path d="M96 57Q101 61 106 56" fill="none" stroke="#246f91" strokeWidth="2" />
            <path d="M57 38Q64 50 57 62" fill="none" stroke="#e4f8f6" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* CONMEMORACIONES SOLEMNES: vela tranquila */}
      <div className="pal-parade-solemn">
        <svg viewBox="0 0 80 100" className="pal-solemn-candle" aria-hidden="true">
          <ellipse cx="40" cy="94" rx="24" ry="3" fill="#887d7a" opacity=".15" />
          <rect x="27" y="44" width="26" height="44" rx="4" fill="#fff2d9" stroke="#baaa8f" strokeWidth="2" />
          <path d="M40 44V33" stroke="#544a43" strokeWidth="2" />
          <path
            className="pal-candle-flame"
            d="M40 12Q54 27 40 35Q27 29 40 12Z"
            fill="#e3a94c"
          />
        </svg>
      </div>
    </section>
  );
}