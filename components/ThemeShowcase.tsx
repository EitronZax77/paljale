export default function ThemeShowcase() {
  return (
    <div className="pal-header-atmosphere" aria-hidden="true">
      <div className="pal-header-glow pal-header-glow-left" />
      <div className="pal-header-glow pal-header-glow-right" />

      <div className="pal-header-scene pal-header-mexico">
        <div className="pal-header-flags">
          {["green", "white", "red", "green", "white", "red"].map(
            (color, index) => (
              <span
                key={index}
                className={`pal-header-flag pal-header-flag-${color}`}
                style={{ animationDelay: `${index * -0.3}s` }}
              />
            )
          )}
        </div>
      </div>

      <div className="pal-header-scene pal-header-muertos">
        <svg viewBox="0 0 160 120" className="pal-header-art pal-art-left">
          <g className="pal-header-flower">
            {Array.from({ length: 10 }, (_, index) => (
              <ellipse
                key={index}
                cx="80"
                cy="31"
                rx="11"
                ry="25"
                transform={`rotate(${index * 36} 80 62)`}
              />
            ))}
            <circle cx="80" cy="62" r="16" />
          </g>
        </svg>
        <svg viewBox="0 0 160 120" className="pal-header-art pal-art-right">
          <g className="pal-header-flower">
            {Array.from({ length: 8 }, (_, index) => (
              <ellipse
                key={index}
                cx="80"
                cy="35"
                rx="10"
                ry="23"
                transform={`rotate(${index * 45} 80 62)`}
              />
            ))}
            <circle cx="80" cy="62" r="15" />
          </g>
        </svg>
      </div>

      <div className="pal-header-scene pal-header-espacial">
        <svg viewBox="0 0 190 120" className="pal-header-art pal-art-left">
          <ellipse cx="95" cy="60" rx="80" ry="25" />
          <circle cx="95" cy="60" r="27" />
          <circle cx="18" cy="60" r="7" className="pal-header-planet" />
        </svg>
        <span className="pal-header-star pal-star-a">✦</span>
        <span className="pal-header-star pal-star-b">✧</span>
        <span className="pal-header-star pal-star-c">✦</span>
      </div>

      <div className="pal-header-scene pal-header-ciencia">
        <svg viewBox="0 0 190 110" className="pal-header-art pal-art-left">
          <path d="m20 70 48-36 52 37 45-40" />
          <circle cx="20" cy="70" r="12" />
          <circle cx="68" cy="34" r="14" />
          <circle cx="120" cy="71" r="18" />
          <circle cx="165" cy="31" r="12" />
        </svg>
        <svg viewBox="0 0 190 110" className="pal-header-art pal-art-right">
          <path d="m20 35 50 40 53-42 48 36" />
          <circle cx="20" cy="35" r="11" />
          <circle cx="70" cy="75" r="16" />
          <circle cx="123" cy="33" r="13" />
          <circle cx="171" cy="69" r="11" />
        </svg>
      </div>

      <div className="pal-header-scene pal-header-tecnologia">
        <svg viewBox="0 0 220 110" className="pal-header-art pal-art-left">
          <path d="M0 80h60V45h70V12h90M20 105V70h90V38h90" />
          <circle cx="60" cy="45" r="5" />
          <circle cx="130" cy="12" r="5" />
          <circle cx="110" cy="70" r="5" />
        </svg>
        <svg viewBox="0 0 220 110" className="pal-header-art pal-art-right">
          <path d="M220 80h-60V45H90V12H0M200 105V70H110V38H20" />
          <circle cx="160" cy="45" r="5" />
          <circle cx="90" cy="12" r="5" />
          <circle cx="110" cy="70" r="5" />
        </svg>
      </div>

      <div className="pal-header-scene pal-header-naturaleza">
        <svg viewBox="0 0 190 110" className="pal-header-art pal-art-left">
          <path d="M10 105Q95 72 155 5" />
          <ellipse cx="65" cy="65" rx="17" ry="34" transform="rotate(-40 65 65)" />
          <ellipse cx="114" cy="45" rx="14" ry="30" transform="rotate(38 114 45)" />
        </svg>
        <svg viewBox="0 0 190 110" className="pal-header-art pal-art-right">
          <path d="M180 105Q95 72 35 5" />
          <ellipse cx="125" cy="65" rx="17" ry="34" transform="rotate(40 125 65)" />
          <ellipse cx="76" cy="45" rx="14" ry="30" transform="rotate(-38 76 45)" />
        </svg>
      </div>

      <div className="pal-header-scene pal-header-invierno">
        {["✳", "✻", "✳", "✻", "✳", "✻"].map((symbol, index) => (
          <span
            key={index}
            className={`pal-header-snow pal-header-snow-${index + 1}`}
          >
            {symbol}
          </span>
        ))}
      </div>

      <div className="pal-header-scene pal-header-arte">
        <span className="pal-header-brush pal-brush-a" />
        <span className="pal-header-brush pal-brush-b" />
        <span className="pal-header-brush pal-brush-c" />
      </div>

      <div className="pal-header-scene pal-header-primavera">
        <span className="pal-header-petal pal-petal-a" />
        <span className="pal-header-petal pal-petal-b" />
        <span className="pal-header-petal pal-petal-c" />
      </div>

      <div className="pal-header-scene pal-header-verano">
        <div className="pal-header-sun" />
      </div>

      <div className="pal-header-scene pal-header-oceano">
        <div className="pal-header-wave pal-wave-a" />
        <div className="pal-header-wave pal-wave-b" />
      </div>
    </div>
  );
}