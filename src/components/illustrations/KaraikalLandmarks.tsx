import { type CSSProperties } from 'react';

type IllustrationProps = {
  className?: string;
  style?: CSSProperties;
};

/**
 * Comprehensive Karaikal skyline illustration showing landmarks, students, and educational elements.
 * Flat vector style with: Ammaiyar Temple, Beach, Lighthouse, Coconut Trees,
 * Our Lady of Angels Church, Nagore Dargah, Students studying, Laptop, Books, Graduation Cap, Ocean, Blue Sky.
 */
export function KaraikalSkyline({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 800 600" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="40%" stopColor="#93c5fd" />
          <stop offset="70%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="sand-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="temple-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="church-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="dargah-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="lighthouse-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="laptop-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1e3a8a" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="600" fill="url(#sky-grad)" />

      {/* Sun */}
      <circle cx="680" cy="80" r="32" fill="#fef3c7" opacity="0.9" />
      <circle cx="680" cy="80" r="22" fill="#fde68a" opacity="0.8" />

      {/* Clouds */}
      <g opacity="0.85">
        <ellipse cx="120" cy="70" rx="40" ry="15" fill="#ffffff" />
        <ellipse cx="145" cy="78" rx="28" ry="12" fill="#ffffff" opacity="0.8" />
        <ellipse cx="380" cy="50" rx="35" ry="13" fill="#ffffff" />
        <ellipse cx="405" cy="58" rx="25" ry="10" fill="#ffffff" opacity="0.8" />
        <ellipse cx="560" cy="90" rx="30" ry="11" fill="#ffffff" opacity="0.7" />
      </g>

      {/* Birds */}
      <path d="M200 100 Q205 95 210 100 Q215 95 220 100" fill="none" stroke="#1e3a8a" strokeWidth="2" opacity="0.4" />
      <path d="M280 85 Q285 80 290 85 Q295 80 300 85" fill="none" stroke="#1e3a8a" strokeWidth="2" opacity="0.4" />

      {/* Ocean */}
      <rect y="340" width="800" height="120" fill="url(#ocean-grad)" />

      {/* Waves */}
      <path d="M0 350 Q60 345 120 350 T240 350 T360 350 T480 350 T600 350 T720 350 T800 350" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.6" />
      <path d="M0 370 Q60 365 120 370 T240 370 T360 370 T480 370 T600 370 T720 370 T800 370" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.5" />
      <path d="M0 395 Q60 390 120 395 T240 395 T360 395 T480 395 T600 395 T720 395 T800 395" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.4" />
      <path d="M0 420 Q60 415 120 420 T240 420 T360 420 T480 420 T600 420 T720 420 T800 420" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.3" />

      {/* Beach sand */}
      <path d="M0 440 Q100 430 200 438 T400 435 T600 438 T800 432 L800 460 L0 460 Z" fill="url(#sand-grad)" />

      {/* Ground / grass */}
      <rect y="460" width="800" height="140" fill="url(#ground-grad)" />
      <rect y="460" width="800" height="4" fill="#4ade80" opacity="0.6" />

      {/* === KARAIKAL AMMAIYAR TEMPLE (left) === */}
      <g filter="url(#soft-shadow)">
        {/* Base */}
        <rect x="50" y="380" width="120" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="2" />
        {/* Steps */}
        <rect x="40" y="455" width="140" height="6" fill="#fbbf24" />
        <rect x="30" y="461" width="160" height="6" fill="#f59e0b" />
        {/* Gopuram tiers */}
        <polygon points="50,380 170,380 155,330 65,330" fill="url(#temple-grad)" />
        <polygon points="65,330 155,330 145,290 75,290" fill="#f59e0b" />
        <polygon points="75,290 145,290 135,255 85,255" fill="#fbbf24" />
        <polygon points="85,255 135,255 125,225 95,225" fill="#f59e0b" />
        <polygon points="95,225 125,225 118,205 102,205" fill="#fbbf24" />
        {/* Kalash */}
        <circle cx="110" cy="195" r="5" fill="#fbbf24" />
        <rect x="107" y="185" width="6" height="10" fill="#f59e0b" />
        {/* Doorway */}
        <path d="M95 460 L95 405 Q95 395 110 395 Q125 395 125 405 L125 460 Z" fill="#7c2d12" />
        {/* Windows */}
        <rect x="62" y="410" width="14" height="14" rx="7" fill="#38bdf8" opacity="0.5" />
        <rect x="144" y="410" width="14" height="14" rx="7" fill="#38bdf8" opacity="0.5" />
        {/* Tier lines */}
        <line x1="65" y1="330" x2="155" y2="330" stroke="#dc2626" strokeWidth="2" />
        <line x1="75" y1="290" x2="145" y2="290" stroke="#dc2626" strokeWidth="2" />
        <line x1="85" y1="255" x2="135" y2="255" stroke="#dc2626" strokeWidth="2" />
      </g>

      {/* === OUR LADY OF ANGELS CHURCH (center-left) === */}
      <g filter="url(#soft-shadow)">
        {/* Main building */}
        <rect x="240" y="370" width="100" height="90" fill="url(#church-grad)" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
        {/* Roof */}
        <polygon points="240,370 340,370 330,355 250,355" fill="#64748b" />
        {/* Bell tower / spire */}
        <rect x="275" y="300" width="30" height="70" fill="url(#church-grad)" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="275,300 305,300 290,270" fill="#64748b" />
        {/* Cross on top */}
        <line x1="290" y1="270" x2="290" y2="255" stroke="#475569" strokeWidth="2.5" />
        <line x1="284" y1="262" x2="296" y2="262" stroke="#475569" strokeWidth="2.5" />
        {/* Bell opening */}
        <rect x="283" y="320" width="14" height="18" rx="7" fill="#475569" />
        {/* Door */}
        <path d="M280 460 L280 415 Q280 405 290 405 Q300 405 300 415 L300 460 Z" fill="#475569" />
        {/* Windows */}
        <rect x="252" y="390" width="16" height="22" rx="8" fill="#38bdf8" opacity="0.4" stroke="#94a3b8" strokeWidth="1" />
        <rect x="312" y="390" width="16" height="22" rx="8" fill="#38bdf8" opacity="0.4" stroke="#94a3b8" strokeWidth="1" />
      </g>

      {/* === NAGORE DARGAH (center-right) === */}
      <g filter="url(#soft-shadow)">
        {/* Base */}
        <rect x="380" y="370" width="90" height="90" fill="url(#dargah-grad)" stroke="#15803d" strokeWidth="1.5" rx="2" />
        {/* Main dome */}
        <path d="M385 370 Q425 320 465 370" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
        <path d="M395 370 Q425 335 455 370" fill="#86efac" opacity="0.6" />
        {/* Small dome */}
        <path d="M405 370 Q425 350 445 370" fill="#16a34a" />
        {/* Finial */}
        <line x1="425" y1="320" x2="425" y2="305" stroke="#15803d" strokeWidth="2" />
        <circle cx="425" cy="303" r="4" fill="#fbbf24" />
        {/* Door */}
        <path d="M412 460 L412 415 Q412 405 425 405 Q438 405 438 415 L438 460 Z" fill="#15803d" />
        {/* Minaret-like sides */}
        <rect x="378" y="340" width="10" height="120" fill="#16a34a" rx="2" />
        <rect x="462" y="340" width="10" height="120" fill="#16a34a" rx="2" />
        <circle cx="383" cy="335" r="6" fill="#22c55e" />
        <circle cx="467" cy="335" r="6" fill="#22c55e" />
      </g>

      {/* === LIGHTHOUSE (right) === */}
      <g filter="url(#soft-shadow)">
        {/* Base */}
        <ellipse cx="620" cy="465" rx="35" ry="6" fill="#1e293b" opacity="0.15" />
        <rect x="595" y="430" width="50" height="30" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
        {/* Body */}
        <polygon points="600,430 640,430 635,290 605,290" fill="url(#lighthouse-grad)" stroke="#f59e0b" strokeWidth="2" />
        {/* Red stripes */}
        <polygon points="600,430 640,430 638,400 602,400" fill="#dc2626" />
        <polygon points="603,370 637,370 635,340 605,340" fill="#dc2626" />
        <polygon points="606,310 634,310 632,290 608,290" fill="#dc2626" />
        {/* Light room */}
        <rect x="603" y="270" width="34" height="22" fill="#0c4a6e" stroke="#0369a1" strokeWidth="2" rx="2" />
        <rect x="607" y="274" width="26" height="14" fill="#fde68a" />
        {/* Light beams */}
        <polygon points="637,280 700,255 700,305" fill="#fde68a" opacity="0.3" />
        <polygon points="603,280 540,255 540,305" fill="#fde68a" opacity="0.3" />
        {/* Dome */}
        <path d="M603 270 Q620 250 637 270" fill="#dc2626" stroke="#7c2d12" strokeWidth="1.5" />
        {/* Antenna */}
        <line x1="620" y1="250" x2="620" y2="235" stroke="#1e293b" strokeWidth="2" />
        <circle cx="620" cy="232" r="3" fill="#dc2626" />
      </g>

      {/* === COCONUT TREES === */}
      {/* Tree 1 - left of temple */}
      <g>
        <rect x="18" y="350" width="8" height="110" fill="#7c2d12" rx="3" />
        <path d="M22 350 Q-5 335 -10 345 Q8 340 22 355" fill="#16a34a" />
        <path d="M22 350 Q49 335 54 345 Q36 340 22 355" fill="#16a34a" />
        <path d="M22 350 Q22 325 12 320 Q19 335 22 355" fill="#15803d" />
        <path d="M22 350 Q22 325 32 320 Q25 335 22 355" fill="#15803d" />
        <circle cx="22" cy="348" r="5" fill="#92400e" />
      </g>

      {/* Tree 2 - between church and dargah */}
      <g>
        <rect x="348" y="340" width="7" height="120" fill="#7c2d12" rx="3" />
        <path d="M351 340 Q325 325 320 335 Q338 330 351 345" fill="#16a34a" />
        <path d="M351 340 Q377 325 382 335 Q364 330 351 345" fill="#16a34a" />
        <path d="M351 340 Q351 315 341 310 Q348 325 351 345" fill="#15803d" />
        <path d="M351 340 Q351 315 361 310 Q354 325 351 345" fill="#15803d" />
        <circle cx="351" cy="338" r="4" fill="#92400e" />
      </g>

      {/* Tree 3 - right of lighthouse */}
      <g>
        <rect x="690" y="340" width="8" height="120" fill="#7c2d12" rx="3" />
        <path d="M694 340 Q667 325 662 335 Q680 330 694 345" fill="#16a34a" />
        <path d="M694 340 Q721 325 726 335 Q708 330 694 345" fill="#16a34a" />
        <path d="M694 340 Q694 315 684 310 Q691 325 694 345" fill="#15803d" />
        <path d="M694 340 Q694 315 704 310 Q697 325 694 345" fill="#15803d" />
        <circle cx="694" cy="338" r="5" fill="#92400e" />
      </g>

      {/* Tree 4 - far right */}
      <g>
        <rect x="750" y="360" width="7" height="100" fill="#7c2d12" rx="3" />
        <path d="M753 360 Q730 348 725 358 Q740 353 753 365" fill="#16a34a" />
        <path d="M753 360 Q776 348 781 358 Q766 353 753 365" fill="#16a34a" />
        <path d="M753 360 Q753 338 744 333 Q750 348 753 365" fill="#15803d" />
        <path d="M753 360 Q753 338 762 333 Q756 348 753 365" fill="#15803d" />
      </g>

      {/* === BOAT IN OCEAN === */}
      <g>
        <path d="M460 380 L510 380 L503 392 L467 392 Z" fill="#7c2d12" />
        <line x1="485" y1="380" x2="485" y2="365" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M485 365 L498 380 L485 380" fill="#fef3c7" />
      </g>

      {/* === STUDENTS STUDYING (foreground) === */}
      {/* Student 1 - sitting with laptop */}
      <g filter="url(#soft-shadow)">
        {/* Body */}
        <ellipse cx="160" cy="520" rx="25" ry="15" fill="#2563eb" />
        {/* Head */}
        <circle cx="160" cy="490" r="14" fill="#fbbf24" />
        {/* Hair */}
        <path d="M146 488 Q160 472 174 488 Q174 480 160 475 Q146 480 146 488" fill="#1e293b" />
        {/* Laptop */}
        <rect x="140" y="515" width="40" height="25" rx="3" fill="#1e293b" />
        <rect x="143" y="518" width="34" height="19" rx="1" fill="url(#laptop-grad)" />
        {/* Screen content lines */}
        <line x1="148" y1="522" x2="172" y2="522" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <line x1="148" y1="526" x2="165" y2="526" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <line x1="148" y1="530" x2="170" y2="530" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Student 2 - standing with book */}
      <g filter="url(#soft-shadow)">
        {/* Body */}
        <ellipse cx="260" cy="515" rx="22" ry="14" fill="#0ea5e9" />
        {/* Head */}
        <circle cx="260" cy="488" r="13" fill="#fcd34d" />
        {/* Hair */}
        <path d="M247 486 Q260 473 273 486 Q273 478 260 475 Q247 478 247 486" fill="#92400e" />
        {/* Book in hand */}
        <rect x="245" y="505" width="30" height="20" rx="2" fill="#ffffff" stroke="#0369a1" strokeWidth="1.5" />
        <line x1="260" y1="505" x2="260" y2="525" stroke="#0369a1" strokeWidth="1" />
        <line x1="250" y1="510" x2="258" y2="510" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="250" y1="514" x2="257" y2="514" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="262" y1="510" x2="270" y2="510" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="262" y1="514" x2="269" y2="514" stroke="#94a3b8" strokeWidth="0.5" />
      </g>

      {/* Student 3 - sitting reading */}
      <g filter="url(#soft-shadow)">
        {/* Body */}
        <ellipse cx="540" cy="520" rx="24" ry="14" fill="#7c3aed" opacity="0.9" />
        {/* Head */}
        <circle cx="540" cy="492" r="13" fill="#fbbf24" />
        {/* Hair - long */}
        <path d="M527 490 Q540 474 553 490 Q555 500 553 505 L527 505 Q525 500 527 490" fill="#1e293b" />
        {/* Book held up */}
        <rect x="525" y="505" width="30" height="22" rx="2" fill="#ffffff" stroke="#0369a1" strokeWidth="1.5" transform="rotate(-5 540 516)" />
        <line x1="540" y1="505" x2="540" y2="527" stroke="#0369a1" strokeWidth="1" transform="rotate(-5 540 516)" />
      </g>

      {/* === GRADUATION CAP (floating element) === */}
      <g transform="translate(640, 490)" filter="url(#soft-shadow)">
        <polygon points="0,0 35,-10 70,0 35,10" fill="#1e3a8a" />
        <rect x="28" y="-3" width="14" height="14" fill="#1e3a8a" rx="1" />
        <line x1="70" y1="0" x2="76" y2="18" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="76" cy="20" r="4" fill="#fbbf24" />
        <line x1="35" y1="-10" x2="35" y2="-15" stroke="#fbbf24" strokeWidth="1.5" />
      </g>

      {/* === STACK OF BOOKS (bottom right) === */}
      <g filter="url(#soft-shadow)" transform="translate(440, 530)">
        <rect x="0" y="20" width="60" height="14" rx="2" fill="#2563eb" />
        <rect x="5" y="6" width="55" height="14" rx="2" fill="#dc2626" />
        <rect x="2" y="-8" width="58" height="14" rx="2" fill="#16a34a" />
        <rect x="8" y="-22" width="50" height="14" rx="2" fill="#f59e0b" />
        <line x1="5" y1="27" x2="55" y2="27" stroke="#1e40af" strokeWidth="0.5" opacity="0.3" />
        <line x1="8" y1="13" x2="57" y2="13" stroke="#991b1b" strokeWidth="0.5" opacity="0.3" />
        <line x1="5" y1="-1" x2="57" y2="-1" stroke="#15803d" strokeWidth="0.5" opacity="0.3" />
      </g>

      {/* === EDUCATIONAL BADGE / SPARKLE ELEMENTS === */}
      <g opacity="0.7">
        {/* Floating sparkles */}
        <g transform="translate(420, 180)">
          <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#fbbf24" opacity="0.6" />
        </g>
        <g transform="translate(500, 140)">
          <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="#38bdf8" opacity="0.5" />
        </g>
        <g transform="translate(180, 130)">
          <path d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z" fill="#fbbf24" opacity="0.4" />
        </g>
      </g>

      {/* === KARAIKAL LABEL === */}
      <g transform="translate(400, 250)">
        <rect x="-60" y="-16" width="120" height="28" rx="14" fill="#ffffff" opacity="0.9" filter="url(#soft-shadow)" />
        <text x="0" y="4" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb" fontFamily="Poppins, sans-serif">Karaikal</text>
      </g>
    </svg>
  );
}

/* Keep backward-compatible exports of original landmark illustrations */
export function KaraikalTemple({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="temple-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="temple-gopuram" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#temple-sky)" />
      <ellipse cx="80" cy="50" rx="35" ry="14" fill="#ffffff" opacity="0.8" />
      <ellipse cx="100" cy="55" rx="25" ry="10" fill="#ffffff" opacity="0.7" />
      <ellipse cx="320" cy="40" rx="30" ry="12" fill="#ffffff" opacity="0.8" />
      <circle cx="340" cy="60" r="18" fill="#fde68a" opacity="0.9" />
      <rect y="250" width="400" height="50" fill="#86efac" />
      <rect y="250" width="400" height="6" fill="#4ade80" />
      <rect x="130" y="200" width="140" height="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <rect x="120" y="245" width="160" height="8" fill="#fbbf24" />
      <rect x="110" y="253" width="180" height="8" fill="#f59e0b" />
      <polygon points="130,200 270,200 250,150 150,150" fill="url(#temple-gopuram)" />
      <polygon points="150,150 250,150 240,110 160,110" fill="#f59e0b" />
      <polygon points="160,110 240,110 230,75 170,75" fill="#fbbf24" />
      <polygon points="170,75 230,75 220,45 180,45" fill="#f59e0b" />
      <polygon points="180,45 220,45 210,25 190,25" fill="#fbbf24" />
      <circle cx="200" cy="18" r="6" fill="#fbbf24" />
      <rect x="197" y="8" width="6" height="10" fill="#f59e0b" />
      <path d="M185 255 L185 215 Q185 205 200 205 Q215 205 215 215 L215 255 Z" fill="#7c2d12" />
      <circle cx="195" cy="230" r="2" fill="#fbbf24" />
      <circle cx="205" cy="230" r="2" fill="#fbbf24" />
      <rect x="145" y="220" width="14" height="14" rx="7" fill="#0ea5e9" opacity="0.6" />
      <rect x="241" y="220" width="14" height="14" rx="7" fill="#0ea5e9" opacity="0.6" />
      <line x1="150" y1="150" x2="250" y2="150" stroke="#dc2626" strokeWidth="2" />
      <line x1="160" y1="110" x2="240" y2="110" stroke="#dc2626" strokeWidth="2" />
      <line x1="170" y1="75" x2="230" y2="75" stroke="#dc2626" strokeWidth="2" />
      <line x1="150" y1="200" x2="150" y2="170" stroke="#7c2d12" strokeWidth="2" />
      <polygon points="150,170 160,175 150,180" fill="#dc2626" />
      <line x1="250" y1="200" x2="250" y2="170" stroke="#7c2d12" strokeWidth="2" />
      <polygon points="250,170 260,175 250,180" fill="#dc2626" />
      <rect x="55" y="180" width="6" height="70" fill="#7c2d12" />
      <path d="M58 180 Q30 165 25 175 Q40 170 58 185" fill="#16a34a" />
      <path d="M58 180 Q86 165 91 175 Q76 170 58 185" fill="#16a34a" />
      <path d="M58 180 Q58 155 48 150 Q55 165 58 185" fill="#15803d" />
      <path d="M58 180 Q58 155 68 150 Q61 165 58 185" fill="#15803d" />
      <rect x="340" y="180" width="6" height="70" fill="#7c2d12" />
      <path d="M343 180 Q315 165 310 175 Q325 170 343 185" fill="#16a34a" />
      <path d="M343 180 Q371 165 376 175 Q361 170 343 185" fill="#16a34a" />
      <path d="M343 180 Q343 155 333 150 Q340 165 343 185" fill="#15803d" />
      <path d="M343 180 Q343 155 353 150 Q346 165 343 185" fill="#15803d" />
    </svg>
  );
}

export function KaraikalLighthouse({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="lh-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#lh-sky)" />
      <circle cx="320" cy="50" r="22" fill="#fde68a" />
      <circle cx="320" cy="50" r="14" fill="#fef3c7" />
      <ellipse cx="70" cy="40" rx="30" ry="12" fill="#fff" opacity="0.85" />
      <ellipse cx="90" cy="45" rx="20" ry="8" fill="#fff" opacity="0.7" />
      <rect y="200" width="400" height="100" fill="url(#lh-sea)" />
      <path d="M0 210 Q50 205 100 210 T200 210 T300 210 T400 210" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.6" />
      <path d="M0 225 Q50 220 100 225 T200 225 T300 225 T400 225" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.5" />
      <path d="M0 245 Q50 240 100 245 T200 245 T300 245 T400 245" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.4" />
      <path d="M0 270 Q100 260 200 268 T400 265 L400 300 L0 300 Z" fill="#fef3c7" />
      <ellipse cx="200" cy="265" rx="40" ry="8" fill="#1e293b" opacity="0.2" />
      <rect x="175" y="240" width="50" height="25" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
      <polygon points="180,240 220,240 215,100 185,100" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="180,240 220,240 218,210 182,210" fill="#dc2626" />
      <polygon points="183,180 217,180 215,150 185,150" fill="#dc2626" />
      <polygon points="186,120 214,120 212,100 188,100" fill="#dc2626" />
      <rect x="183" y="80" width="34" height="22" fill="#0c4a6e" stroke="#0369a1" strokeWidth="2" />
      <rect x="187" y="84" width="26" height="14" fill="#fde68a" />
      <line x1="200" y1="84" x2="200" y2="98" stroke="#f59e0b" strokeWidth="1.5" />
      <polygon points="217,90 280,70 280,110" fill="#fde68a" opacity="0.4" />
      <polygon points="183,90 120,70 120,110" fill="#fde68a" opacity="0.4" />
      <path d="M183 80 Q200 60 217 80" fill="#dc2626" stroke="#7c2d12" strokeWidth="1.5" />
      <line x1="200" y1="60" x2="200" y2="45" stroke="#1e293b" strokeWidth="2" />
      <circle cx="200" cy="42" r="3" fill="#dc2626" />
      <ellipse cx="160" cy="265" rx="12" ry="6" fill="#94a3b8" />
      <ellipse cx="245" cy="268" rx="10" ry="5" fill="#94a3b8" />
      <path d="M120 70 Q125 65 130 70 Q135 65 140 70" fill="none" stroke="#1e293b" strokeWidth="2" />
      <path d="M250 60 Q255 55 260 60 Q265 55 270 60" fill="none" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

export function KaraikalBeach({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="beach-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="60%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="beach-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#beach-sky)" />
      <circle cx="200" cy="140" r="28" fill="#fbbf24" opacity="0.9" />
      <circle cx="200" cy="140" r="20" fill="#fde68a" />
      <ellipse cx="70" cy="45" rx="28" ry="11" fill="#fff" opacity="0.8" />
      <ellipse cx="330" cy="55" rx="32" ry="12" fill="#fff" opacity="0.75" />
      <rect y="150" width="400" height="70" fill="url(#beach-sea)" />
      <ellipse cx="200" cy="170" rx="20" ry="4" fill="#fde68a" opacity="0.6" />
      <ellipse cx="200" cy="185" rx="14" ry="3" fill="#fde68a" opacity="0.4" />
      <path d="M0 160 Q50 155 100 160 T200 160 T300 160 T400 160" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.7" />
      <path d="M0 180 Q50 175 100 180 T200 180 T300 180 T400 180" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.5" />
      <path d="M0 200 Q50 195 100 200 T200 200 T300 200 T400 200" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.4" />
      <path d="M0 220 Q100 210 200 218 T400 215 L400 300 L0 300 Z" fill="#fef3c7" />
      <path d="M0 225 Q100 218 200 225 T400 222 L400 300 L0 300 Z" fill="#fde68a" opacity="0.5" />
      <rect x="20" y="200" width="4" height="25" fill="#7c2d12" />
      <rect x="50" y="200" width="4" height="25" fill="#7c2d12" />
      <rect x="80" y="200" width="4" height="25" fill="#7c2d12" />
      <rect x="110" y="200" width="4" height="25" fill="#7c2d12" />
      <rect x="15" y="205" width="100" height="4" fill="#7c2d12" />
      <rect x="15" y="215" width="100" height="4" fill="#7c2d12" />
      <rect x="340" y="170" width="8" height="60" fill="#7c2d12" rx="2" />
      <path d="M344 170 Q310 150 300 165 Q320 160 344 175" fill="#16a34a" />
      <path d="M344 170 Q378 150 388 165 Q368 160 344 175" fill="#16a34a" />
      <path d="M344 170 Q344 140 330 135 Q340 155 344 175" fill="#15803d" />
      <path d="M344 170 Q344 140 358 135 Q348 155 344 175" fill="#15803d" />
      <line x1="150" y1="255" x2="150" y2="240" stroke="#1e293b" strokeWidth="2" />
      <path d="M130 240 L150 225 L170 240 Z" fill="#0ea5e9" />
      <path d="M135 238 L150 228 L165 238" fill="#0369a1" opacity="0.5" />
      <path d="M250 155 L270 155 L265 162 L255 162 Z" fill="#7c2d12" />
      <line x1="260" y1="155" x2="260" y2="145" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M260 145 L268 155 L260 155" fill="#fef3c7" />
      <path d="M100 50 Q105 45 110 50 Q115 45 120 50" fill="none" stroke="#1e293b" strokeWidth="2" />
      <path d="M280 40 Q285 35 290 40 Q295 35 300 40" fill="none" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

export function KaraikalFrenchBuilding({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#fb-sky)" />
      <ellipse cx="60" cy="40" rx="28" ry="11" fill="#fff" opacity="0.8" />
      <ellipse cx="340" cy="35" rx="30" ry="12" fill="#fff" opacity="0.75" />
      <rect y="240" width="400" height="60" fill="#86efac" />
      <rect y="240" width="400" height="5" fill="#4ade80" />
      <rect x="100" y="100" width="200" height="145" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="100,100 300,100 280,70 120,70" fill="#7c2d12" />
      <polygon points="120,70 280,70 270,55 130,55" fill="#92400e" />
      <rect x="95" y="98" width="210" height="6" fill="#7c2d12" />
      {[130, 200, 270].map((x) => (
        <g key={x}>
          <rect x={x - 12} y={130} width="24" height="35" fill="#0c4a6e" stroke="#0369a1" strokeWidth="1.5" />
          <line x1={x} y1={130} x2={x} y2={165} stroke="#bae6fd" strokeWidth="1.5" />
          <line x1={x - 12} y1={147} x2={x + 12} y2={147} stroke="#bae6fd" strokeWidth="1.5" />
          <rect x={x - 18} y={130} width="6" height="35" fill="#dc2626" rx="2" />
          <rect x={x + 12} y={130} width="6" height="35" fill="#dc2626" rx="2" />
        </g>
      ))}
      {[130, 200, 270].map((x) => (
        <g key={`l${x}`}>
          <rect x={x - 12} y={185} width="24" height="35" fill="#0c4a6e" stroke="#0369a1" strokeWidth="1.5" />
          <line x1={x} y1={185} x2={x} y2={220} stroke="#bae6fd" strokeWidth="1.5" />
          <line x1={x - 12} y1={202} x2={x + 12} y2={202} stroke="#bae6fd" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="185" y="195" width="30" height="50" fill="#7c2d12" stroke="#92400e" strokeWidth="1.5" rx="2" />
      <circle cx="207" cy="220" r="2" fill="#fbbf24" />
      <rect x="120" y="170" width="160" height="4" fill="#7c2d12" />
      {[125, 145, 165, 185, 205, 225, 245, 265].map((x) => (
        <rect key={`b${x}`} x={x} y={170} width="2" height="12" fill="#7c2d12" />
      ))}
      <rect x="220" y="55" width="14" height="20" fill="#7c2d12" />
      <rect x="218" y="53" width="18" height="4" fill="#92400e" />
      <line x1="200" y1="55" x2="200" y2="30" stroke="#1e293b" strokeWidth="2" />
      <path d="M200 32 L215 38 L200 44" fill="#0ea5e9" />
      <rect x="50" y="190" width="6" height="50" fill="#7c2d12" />
      <circle cx="53" cy="185" r="20" fill="#16a34a" />
      <circle cx="43" cy="190" r="14" fill="#15803d" />
      <circle cx="63" cy="190" r="14" fill="#15803d" />
      <rect x="345" y="190" width="6" height="50" fill="#7c2d12" />
      <circle cx="348" cy="185" r="20" fill="#16a34a" />
      <circle cx="338" cy="190" r="14" fill="#15803d" />
      <circle cx="358" cy="190" r="14" fill="#15803d" />
      <line x1="80" y1="240" x2="80" y2="200" stroke="#1e293b" strokeWidth="2" />
      <circle cx="80" cy="195" r="6" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
    </svg>
  );
}

export function KaraikalPromenade({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prom-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="prom-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#prom-sky)" />
      <circle cx="100" cy="50" r="20" fill="#fde68a" opacity="0.9" />
      <ellipse cx="280" cy="40" rx="35" ry="13" fill="#fff" opacity="0.8" />
      <ellipse cx="310" cy="48" rx="22" ry="9" fill="#fff" opacity="0.7" />
      <rect y="160" width="400" height="80" fill="url(#prom-sea)" />
      <path d="M0 170 Q50 165 100 170 T200 170 T300 170 T400 170" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.6" />
      <path d="M0 190 Q50 185 100 190 T200 190 T300 190 T400 190" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.5" />
      <path d="M0 210 Q50 205 100 210 T200 210 T300 210 T400 210" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.4" />
      <rect y="240" width="400" height="60" fill="#cbd5e1" />
      <rect y="240" width="400" height="4" fill="#94a3b8" />
      {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
        <line key={x} x1={x} y1="244" x2={x} y2="300" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />
      ))}
      {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x) => (
        <rect key={`r${x}`} x={x} y={225} width="3" height="18" fill="#475569" />
      ))}
      <rect x="10" y="223" width="380" height="4" fill="#475569" rx="2" />
      <rect x="60" y="255" width="40" height="4" fill="#7c2d12" rx="1" />
      <rect x="62" y="259" width="4" height="12" fill="#7c2d12" />
      <rect x="94" y="259" width="4" height="12" fill="#7c2d12" />
      <rect x="300" y="255" width="40" height="4" fill="#7c2d12" rx="1" />
      <rect x="302" y="259" width="4" height="12" fill="#7c2d12" />
      <rect x="334" y="259" width="4" height="12" fill="#7c2d12" />
      <line x1="150" y1="240" x2="150" y2="200" stroke="#1e293b" strokeWidth="2" />
      <circle cx="150" cy="195" r="5" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="250" y1="240" x2="250" y2="200" stroke="#1e293b" strokeWidth="2" />
      <circle cx="250" cy="195" r="5" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="15" y="200" width="6" height="42" fill="#7c2d12" />
      <path d="M18 200 Q-5 185 -10 195 Q8 190 18 205" fill="#16a34a" />
      <path d="M18 200 Q41 185 46 195 Q28 190 18 205" fill="#16a34a" />
      <path d="M18 200 Q18 175 8 170 Q15 185 18 205" fill="#15803d" />
      <path d="M18 200 Q18 175 28 170 Q21 185 18 205" fill="#15803d" />
      <rect x="380" y="200" width="6" height="42" fill="#7c2d12" />
      <path d="M383 200 Q360 185 355 195 Q373 190 383 205" fill="#16a34a" />
      <path d="M383 200 Q406 185 411 195 Q393 190 383 205" fill="#16a34a" />
      <path d="M200 175 L220 175 L215 182 L205 182 Z" fill="#7c2d12" />
      <line x1="210" y1="175" x2="210" y2="163" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M210 163 L218 175 L210 175" fill="#fef3c7" />
      <path d="M80 30 Q85 25 90 30 Q95 25 100 30" fill="none" stroke="#1e293b" strokeWidth="2" />
      <path d="M320 25 Q325 20 330 25 Q335 20 340 25" fill="none" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

export function KaraikalMap({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="map-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#map-bg)" />
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.4" />
      ))}
      {[40, 80, 120, 160, 200, 240, 260].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#7dd3fc" strokeWidth="0.5" opacity="0.4" />
      ))}
      <path d="M0 230 Q100 225 200 232 T400 228 L400 300 L0 300 Z" fill="#0ea5e9" opacity="0.6" />
      <path d="M0 240 Q100 235 200 242 T400 238 L400 300 L0 300 Z" fill="#0369a1" opacity="0.5" />
      <path d="M120 80 Q140 60 180 65 Q220 55 260 70 Q290 85 280 120 Q285 160 270 190 Q240 220 200 215 Q160 220 130 195 Q110 160 115 120 Z"
        fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9" />
      <path d="M150 65 Q170 100 160 140 Q155 180 175 215" fill="none" stroke="#0ea5e9" strokeWidth="3" opacity="0.7" />
      <path d="M250 70 Q230 110 240 150 Q245 185 230 210" fill="none" stroke="#0ea5e9" strokeWidth="3" opacity="0.7" />
      <g>
        <circle cx="200" cy="140" r="8" fill="#dc2626" />
        <circle cx="200" cy="140" r="14" fill="#dc2626" opacity="0.3" />
        <text x="200" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c2d12">Karaikal</text>
      </g>
      <circle cx="150" cy="100" r="5" fill="#f59e0b" />
      <circle cx="250" cy="110" r="5" fill="#f59e0b" />
      <circle cx="170" cy="190" r="5" fill="#f59e0b" />
      <circle cx="240" cy="180" r="5" fill="#f59e0b" />
      <g transform="translate(350, 50)">
        <circle r="20" fill="#fff" stroke="#0369a1" strokeWidth="1.5" opacity="0.9" />
        <polygon points="0,-14 4,0 0,14 -4,0" fill="#dc2626" />
        <polygon points="0,-14 4,0 0,0 -4,0" fill="#7c2d12" />
        <text x="0" y="-22" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">N</text>
      </g>
      <g transform="translate(30, 270)">
        <rect width="60" height="6" fill="#1e293b" />
        <rect width="30" height="6" fill="#fff" />
        <text x="0" y="20" fontSize="8" fill="#475569">5 km</text>
      </g>
      <rect x="140" y="20" width="120" height="24" rx="12" fill="#0c4a6e" />
      <text x="200" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f0f9ff">Karaikal Region</text>
    </svg>
  );
}

export function StudyScene({ className = '', style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="study-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#study-bg)" />
      <rect y="220" width="400" height="80" fill="#fef3c7" />
      <line x1="0" y1="220" x2="400" y2="220" stroke="#f59e0b" strokeWidth="2" />
      <rect x="30" y="40" width="80" height="100" fill="#7dd3fc" stroke="#0369a1" strokeWidth="3" rx="4" />
      <line x1="70" y1="40" x2="70" y2="140" stroke="#0369a1" strokeWidth="2" />
      <line x1="30" y1="90" x2="110" y2="90" stroke="#0369a1" strokeWidth="2" />
      <circle cx="90" cy="70" r="12" fill="#fde68a" />
      <ellipse cx="50" cy="65" rx="14" ry="6" fill="#fff" opacity="0.8" />
      <rect x="320" y="50" width="60" height="170" fill="#7c2d12" stroke="#92400e" strokeWidth="2" rx="2" />
      {[70, 105, 140, 175, 210].map((y) => (
        <rect key={y} x="325" y={y} width="50" height="3" fill="#92400e" />
      ))}
      <rect x="328" y="55" width="8" height="14" fill="#dc2626" />
      <rect x="338" y="55" width="8" height="14" fill="#0ea5e9" />
      <rect x="348" y="55" width="8" height="14" fill="#16a34a" />
      <rect x="358" y="55" width="8" height="14" fill="#f59e0b" />
      <rect x="328" y="90" width="8" height="14" fill="#7c2d12" />
      <rect x="338" y="90" width="8" height="14" fill="#0369a1" />
      <rect x="348" y="90" width="8" height="14" fill="#dc2626" />
      <rect x="358" y="90" width="8" height="14" fill="#16a34a" />
      <rect x="328" y="125" width="8" height="14" fill="#f59e0b" />
      <rect x="338" y="125" width="8" height="14" fill="#0ea5e9" />
      <rect x="358" y="125" width="8" height="14" fill="#7c2d12" />
      <rect x="328" y="160" width="8" height="14" fill="#16a34a" />
      <rect x="338" y="160" width="8" height="14" fill="#dc2626" />
      <rect x="348" y="160" width="8" height="14" fill="#0369a1" />
      <rect x="130" y="180" width="160" height="12" fill="#7c2d12" rx="2" />
      <rect x="140" y="192" width="6" height="40" fill="#7c2d12" />
      <rect x="274" y="192" width="6" height="40" fill="#7c2d12" />
      <rect x="160" y="165" width="50" height="15" fill="#0ea5e9" rx="1" />
      <rect x="165" y="150" width="45" height="15" fill="#dc2626" rx="1" />
      <rect x="158" y="135" width="52" height="15" fill="#16a34a" rx="1" />
      <path d="M230 165 L230 178 L260 178 L260 165 Q250 160 245 165 Q240 160 230 165 Z" fill="#fff" stroke="#0369a1" strokeWidth="1.5" />
      <line x1="245" y1="165" x2="245" y2="178" stroke="#0369a1" strokeWidth="1" />
      <line x1="234" y1="170" x2="242" y2="170" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="248" y1="170" x2="256" y2="170" stroke="#94a3b8" strokeWidth="0.5" />
      <rect x="195" y="155" width="30" height="4" fill="#fbbf24" transform="rotate(-20 210 157)" />
      <polygon points="225,155 230,157 225,159" fill="#1e293b" transform="rotate(-20 210 157)" />
      <g transform="translate(260, 140)">
        <polygon points="0,0 30,-8 60,0 30,8" fill="#0c4a6e" />
        <rect x="25" y="-2" width="10" height="12" fill="#0c4a6e" rx="1" />
        <line x1="60" y1="0" x2="65" y2="15" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="65" cy="16" r="3" fill="#fbbf24" />
      </g>
      <rect x="120" y="160" width="14" height="20" fill="#92400e" rx="2" />
      <path d="M127 160 Q115 145 112 155 Q120 152 127 162" fill="#16a34a" />
      <path d="M127 160 Q139 145 142 155 Q134 152 127 162" fill="#16a34a" />
      <path d="M127 160 Q127 140 120 135 Q125 150 127 162" fill="#15803d" />
      <circle cx="220" cy="60" r="18" fill="#fff" stroke="#0369a1" strokeWidth="2.5" />
      <line x1="220" y1="60" x2="220" y2="48" stroke="#0c4a6e" strokeWidth="2" />
      <line x1="220" y1="60" x2="230" y2="60" stroke="#0c4a6e" strokeWidth="2" />
      <circle cx="220" cy="60" r="2" fill="#0c4a6e" />
      <text x="220" y="50" textAnchor="middle" fontSize="6" fill="#0369a1">12</text>
    </svg>
  );
}
