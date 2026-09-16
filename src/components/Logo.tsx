export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div className={`relative w-8 h-8 ${white ? 'text-white' : 'text-primary-dark'}`}>
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
          <path
            d="M16 4L6 10V22L16 28L26 22V10L16 4Z"
            className={white ? 'fill-white/15' : 'fill-primary/10'}
          />
          <path
            d="M16 8L10 12V20L16 24L22 20V12L16 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M16 14V18M14 16H18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className={`font-bold ${white ? 'text-white' : 'text-text-dark'}`}>
        <div className="text-xs leading-none">Inmobiliaria</div>
        <div className={`text-base leading-none ${white ? 'text-primary-light' : 'text-primary'}`}>
          Chicureo
        </div>
      </div>
    </div>
  );
}
