export function CardsIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="cards-cardFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8f4ec" />
          <stop offset="100%" stopColor="#d8d0c0" />
        </linearGradient>
        <linearGradient id="cards-cardBack1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a3045" />
          <stop offset="100%" stopColor="#1a1a24" />
        </linearGradient>
        <linearGradient id="cards-cardBack2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a4258" />
          <stop offset="100%" stopColor="#2a3045" />
        </linearGradient>
        <linearGradient id="cards-cardFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4842a" />
          <stop offset="50%" stopColor="#f4d8a8" />
          <stop offset="100%" stopColor="#b85c1a" />
        </linearGradient>
      </defs>
      <g transform="rotate(-8 50 55)">
        <rect x="22" y="15" width="42" height="60" rx="2" fill="url(#cards-cardBack1)" />
        <rect
          x="26"
          y="20"
          width="34"
          height="50"
          rx="1"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
        />
      </g>
      <g transform="rotate(2 50 55)">
        <rect x="30" y="20" width="42" height="60" rx="2" fill="url(#cards-cardBack2)" />
        <rect
          x="34"
          y="25"
          width="34"
          height="50"
          rx="1"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="0.5"
        />
      </g>
      <g transform="rotate(10 55 55)">
        <rect
          x="38"
          y="22"
          width="42"
          height="60"
          rx="2"
          fill="url(#cards-cardFront)"
          stroke="#3a3a48"
          strokeWidth="0.6"
        />
        <rect x="40" y="24" width="38" height="10" rx="0.5" fill="url(#cards-cardFoil)" />
        <circle cx="59" cy="50" r="5" fill="#1a1a24" />
        <path d="M50 64 Q59 56 68 64 L68 68 L50 68 Z" fill="#1a1a24" />
        <rect x="42" y="72" width="32" height="1.2" fill="#1a1a24" opacity="0.6" />
        <rect x="42" y="76" width="22" height="1" fill="#1a1a24" opacity="0.4" />
      </g>
    </svg>
  )
}

export function NbaIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="nba-ballGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e89a55" />
          <stop offset="40%" stopColor="#b85c1a" />
          <stop offset="100%" stopColor="#5a2810" />
        </radialGradient>
        <linearGradient id="nba-trackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a48" />
          <stop offset="100%" stopColor="#1a1a24" />
        </linearGradient>
        <radialGradient id="nba-knobGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f4d8a8" />
          <stop offset="100%" stopColor="#b85c1a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="38" r="26" fill="url(#nba-ballGrad)" />
      <line
        x1="24"
        y1="38"
        x2="76"
        y2="38"
        stroke="#2a1408"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="12"
        x2="50"
        y2="64"
        stroke="#2a1408"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M30 18 Q50 38 70 18"
        fill="none"
        stroke="#2a1408"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M30 58 Q50 38 70 58"
        fill="none"
        stroke="#2a1408"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <ellipse cx="40" cy="26" rx="9" ry="5" fill="rgba(255,235,200,0.35)" />
      <rect x="14" y="74" width="72" height="2" rx="1" fill="url(#nba-trackGrad)" />
      <rect x="14" y="84" width="72" height="2" rx="1" fill="url(#nba-trackGrad)" />
      <rect x="14" y="94" width="72" height="2" rx="1" fill="url(#nba-trackGrad)" />
      <circle cx="32" cy="75" r="3.5" fill="url(#nba-knobGrad)" />
      <circle cx="68" cy="85" r="3.5" fill="url(#nba-knobGrad)" />
      <circle cx="46" cy="95" r="3.5" fill="url(#nba-knobGrad)" />
    </svg>
  )
}

export function ToppsIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="topps-toppsBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f4efe6" />
          <stop offset="100%" stopColor="#d8d0c0" />
        </linearGradient>
        <linearGradient id="topps-toppsTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a24" />
          <stop offset="100%" stopColor="#0a0a14" />
        </linearGradient>
        <linearGradient id="topps-toppsBottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b85c1a" />
          <stop offset="100%" stopColor="#7a3812" />
        </linearGradient>
        <radialGradient id="topps-toppsSky" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#bdb5a4" />
          <stop offset="100%" stopColor="#7a7468" />
        </radialGradient>
      </defs>
      <g transform="rotate(-6 50 50)">
        <rect
          x="20"
          y="10"
          width="60"
          height="80"
          rx="1.5"
          fill="url(#topps-toppsBg)"
          stroke="#1a1a24"
          strokeWidth="0.8"
        />
        <rect x="20" y="10" width="60" height="9" fill="url(#topps-toppsTop)" />
        <text
          x="50"
          y="17"
          textAnchor="middle"
          fontFamily="Instrument Serif"
          fontWeight="400"
          fontSize="5.5"
          fill="#f4efe6"
          fontStyle="italic"
          letterSpacing="0.5"
        >
          TOPPS
        </text>
        <rect x="26" y="22" width="48" height="44" fill="url(#topps-toppsSky)" />
        <circle cx="50" cy="38" r="6" fill="#1a1a24" />
        <path d="M38 64 L38 56 Q50 46 62 56 L62 64 Z" fill="#1a1a24" />
        <line
          x1="56"
          y1="44"
          x2="68"
          y2="32"
          stroke="#5a3a1a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect x="20" y="80" width="60" height="10" fill="url(#topps-toppsBottom)" />
        <text
          x="50"
          y="86.5"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontWeight="500"
          fontSize="3"
          fill="#f4efe6"
          letterSpacing="1"
        >
          2025 — BREAKDOWN
        </text>
      </g>
    </svg>
  )
}

export function BernieIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="bernie-caseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="60%" stopColor="#1f1408" />
          <stop offset="100%" stopColor="#0e0a04" />
        </linearGradient>
        <linearGradient id="bernie-caseHi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(244,216,168,0.4)" />
          <stop offset="100%" stopColor="rgba(244,216,168,0)" />
        </linearGradient>
        <linearGradient id="bernie-trendLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4842a" />
          <stop offset="100%" stopColor="#f4d8a8" />
        </linearGradient>
      </defs>
      <rect x="14" y="32" width="72" height="50" rx="2.5" fill="url(#bernie-caseGrad)" />
      <rect x="38" y="22" width="24" height="14" rx="3" fill="none" stroke="#1f1408" strokeWidth="3" />
      <rect x="38" y="22" width="24" height="14" rx="3" fill="none" stroke="#3a2a1a" strokeWidth="1" />
      <rect x="14" y="32" width="72" height="5" fill="url(#bernie-caseHi)" rx="2.5" />
      <rect x="22" y="38" width="6" height="3" rx="0.8" fill="#d4842a" />
      <rect x="72" y="38" width="6" height="3" rx="0.8" fill="#d4842a" />
      <line x1="14" y1="48" x2="86" y2="48" stroke="#0e0a04" strokeWidth="0.4" />
      <g transform="rotate(-8 52 60)">
        <rect x="32" y="42" width="40" height="32" rx="1" fill="#f4efe6" stroke="#1a1a24" strokeWidth="0.5" />
        <rect x="32" y="42" width="40" height="5" fill="#1a1a24" />
        <circle cx="52" cy="58" r="3" fill="#1a1a24" />
        <path d="M44 68 L44 64 Q52 60 60 64 L60 68 Z" fill="#1a1a24" />
        <rect x="34" y="70" width="36" height="1" fill="#1a1a24" opacity="0.4" />
      </g>
      <polyline
        points="20,84 30,80 40,82 50,76 60,78 70,72 80,68"
        fill="none"
        stroke="url(#bernie-trendLine)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="68" r="1.6" fill="#f4d8a8" />
    </svg>
  )
}

export function ResumeIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="resume-paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbf7ee" />
          <stop offset="100%" stopColor="#dad2c2" />
        </linearGradient>
        <linearGradient id="resume-paperBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dad2c2" />
          <stop offset="100%" stopColor="#a59c8a" />
        </linearGradient>
      </defs>
      <g transform="rotate(8 50 50)">
        <rect x="24" y="14" width="52" height="72" rx="1.5" fill="url(#resume-paperBack)" stroke="#1a1a24" strokeWidth="0.6" />
      </g>
      <g transform="rotate(-3 50 50)">
        <rect x="22" y="12" width="52" height="74" rx="1.5" fill="url(#resume-paperGrad)" stroke="#1a1a24" strokeWidth="0.6" />
        <polygon points="62,12 74,12 74,24" fill="#c0b8a4" />
        <line x1="62" y1="12" x2="74" y2="24" stroke="#1a1a24" strokeWidth="0.4" />
        <rect x="28" y="20" width="22" height="2" fill="#1a1a24" />
        <rect x="28" y="24" width="14" height="1.2" fill="#1a1a24" opacity="0.5" />
        <rect x="28" y="32" width="9" height="9" fill="#b85c1a" />
        <rect x="40" y="33" width="22" height="1" fill="#1a1a24" />
        <rect x="40" y="35.5" width="18" height="1" fill="#1a1a24" opacity="0.6" />
        <rect x="40" y="38" width="20" height="1" fill="#1a1a24" opacity="0.6" />
        <rect x="28" y="48" width="14" height="1.2" fill="#1a1a24" />
        <rect x="28" y="52" width="40" height="0.9" fill="#1a1a24" opacity="0.55" />
        <rect x="28" y="54.5" width="36" height="0.9" fill="#1a1a24" opacity="0.55" />
        <rect x="28" y="57" width="38" height="0.9" fill="#1a1a24" opacity="0.55" />
        <rect x="28" y="64" width="18" height="1.2" fill="#1a1a24" />
        <rect x="28" y="68" width="40" height="0.9" fill="#1a1a24" opacity="0.55" />
        <rect x="28" y="70.5" width="32" height="0.9" fill="#1a1a24" opacity="0.55" />
        <rect x="28" y="73" width="36" height="0.9" fill="#1a1a24" opacity="0.55" />
      </g>
    </svg>
  )
}

export function EmptySlotIcon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="2"
        fill="none"
        stroke="#9a9a9a"
        strokeWidth="1"
        strokeDasharray="3,3"
      />
    </svg>
  )
}

export function CmdOpenIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11 11 L21 21 M21 11 L11 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CmdBackIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function CmdOptionsIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <polygon
        points="16,9 23,22 9,22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

