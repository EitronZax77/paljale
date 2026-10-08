export default function SeasonalDecor() {
  return (
    <div
      className="pal-seasonal-layer"
      aria-hidden="true"
    >
      {/* TECNOLOGÍA */}
      <div className="pal-decor pal-decor-tecnologia">
        <svg
          viewBox="0 0 500 240"
          className="pal-tech-circuit pal-tech-circuit-left"
        >
          <path d="M15 180H100V125H180V70H255" />
          <path d="M65 220V170H150V115H225" />
          <circle cx="100" cy="125" r="5" />
          <circle cx="180" cy="70" r="5" />
          <circle cx="150" cy="115" r="5" />
        </svg>

        <svg
          viewBox="0 0 500 240"
          className="pal-tech-circuit pal-tech-circuit-right"
        >
          <path d="M485 60H390V110H310V165H245" />
          <path d="M435 20V70H350V125H275" />
          <circle cx="390" cy="110" r="5" />
          <circle cx="310" cy="165" r="5" />
          <circle cx="350" cy="125" r="5" />
        </svg>
      </div>

      {/* ESPACIAL */}
      <div className="pal-decor pal-decor-espacial">
        <span className="pal-star pal-star-1" />
        <span className="pal-star pal-star-2" />
        <span className="pal-star pal-star-3" />
        <span className="pal-star pal-star-4" />
        <span className="pal-star pal-star-5" />

        <div className="pal-orbit">
          <span className="pal-orbit-planet" />
        </div>
      </div>

      {/* CIENCIA */}
      <div className="pal-decor pal-decor-ciencia">
        <svg
          viewBox="0 0 240 240"
          className="pal-molecule pal-molecule-left"
        >
          <line x1="55" y1="150" x2="115" y2="95" />
          <line x1="115" y1="95" x2="178" y2="130" />
          <line x1="115" y1="95" x2="95" y2="35" />

          <circle cx="55" cy="150" r="15" />
          <circle cx="115" cy="95" r="20" />
          <circle cx="178" cy="130" r="13" />
          <circle cx="95" cy="35" r="11" />
        </svg>

        <svg
          viewBox="0 0 240 240"
          className="pal-molecule pal-molecule-right"
        >
          <line x1="50" y1="80" x2="110" y2="130" />
          <line x1="110" y1="130" x2="185" y2="80" />
          <line x1="110" y1="130" x2="145" y2="195" />

          <circle cx="50" cy="80" r="12" />
          <circle cx="110" cy="130" r="18" />
          <circle cx="185" cy="80" r="15" />
          <circle cx="145" cy="195" r="11" />
        </svg>
      </div>

      {/* ARTE */}
      <div className="pal-decor pal-decor-arte">
        <span className="pal-art-stroke pal-art-stroke-1" />
        <span className="pal-art-stroke pal-art-stroke-2" />
        <span className="pal-art-stroke pal-art-stroke-3" />
      </div>

      {/* NATURALEZA */}
      <div className="pal-decor pal-decor-naturaleza">
        <svg
          viewBox="0 0 240 240"
          className="pal-leaves pal-leaves-left"
        >
          <path d="M30 215C100 145 90 70 145 20" />

          <ellipse
            cx="72"
            cy="157"
            rx="20"
            ry="38"
            transform="rotate(-35 72 157)"
          />

          <ellipse
            cx="110"
            cy="105"
            rx="18"
            ry="34"
            transform="rotate(35 110 105)"
          />

          <ellipse
            cx="137"
            cy="55"
            rx="15"
            ry="30"
            transform="rotate(-30 137 55)"
          />
        </svg>

        <svg
          viewBox="0 0 240 240"
          className="pal-leaves pal-leaves-right"
        >
          <path d="M210 215C140 145 150 70 95 20" />

          <ellipse
            cx="168"
            cy="157"
            rx="20"
            ry="38"
            transform="rotate(35 168 157)"
          />

          <ellipse
            cx="130"
            cy="105"
            rx="18"
            ry="34"
            transform="rotate(-35 130 105)"
          />
        </svg>
      </div>

      {/* OCÉANO */}
      <div className="pal-decor pal-decor-oceano">
        <div className="pal-wave pal-wave-1" />
        <div className="pal-wave pal-wave-2" />
      </div>

      {/* PRIMAVERA */}
      <div className="pal-decor pal-decor-primavera">
        <span className="pal-petal pal-petal-1" />
        <span className="pal-petal pal-petal-2" />
        <span className="pal-petal pal-petal-3" />
        <span className="pal-petal pal-petal-4" />
        <span className="pal-petal pal-petal-5" />
      </div>

      {/* VERANO */}
      <div className="pal-decor pal-decor-verano">
        <div className="pal-sun-glow" />

        <svg
          viewBox="0 0 300 160"
          className="pal-summer-lines"
        >
          <path d="M20 115C75 70 125 145 185 95C220 65 250 75 285 45" />
          <path d="M15 140C75 105 130 160 195 120C235 95 260 100 295 80" />
        </svg>
      </div>

      {/* SEPTIEMBRE */}
      <div className="pal-decor pal-decor-septiembre">
        <div className="pal-papel-picado">
          <span className="pal-papel pal-papel-green" />
          <span className="pal-papel pal-papel-white" />
          <span className="pal-papel pal-papel-red" />
          <span className="pal-papel pal-papel-green" />
          <span className="pal-papel pal-papel-white" />
          <span className="pal-papel pal-papel-red" />
        </div>

        <div className="pal-tricolor-glow pal-tricolor-left" />
        <div className="pal-tricolor-glow pal-tricolor-right" />
      </div>

      {/* DÍA DE MUERTOS */}
      <div className="pal-decor pal-decor-muertos">
        <div className="pal-marigold pal-marigold-1">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="pal-marigold pal-marigold-2">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="pal-marigold pal-marigold-3">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <svg
          viewBox="0 0 200 130"
          className="pal-muertos-pattern"
        >
          <path d="M20 80C40 35 75 25 100 55C125 25 160 35 180 80" />
          <circle cx="70" cy="65" r="8" />
          <circle cx="130" cy="65" r="8" />
          <path d="M85 90Q100 105 115 90" />
        </svg>
      </div>

      {/* INVIERNO */}
      <div className="pal-decor pal-decor-invierno">
        <span className="pal-snow pal-snow-1">✦</span>
        <span className="pal-snow pal-snow-2">✧</span>
        <span className="pal-snow pal-snow-3">✦</span>
        <span className="pal-snow pal-snow-4">✧</span>
        <span className="pal-snow pal-snow-5">✦</span>
        <span className="pal-snow pal-snow-6">✧</span>
      </div>
    </div>
  );
}