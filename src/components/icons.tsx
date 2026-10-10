const svgProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export function FileIcon() {
  return (
    <svg {...svgProps}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}

export function ImageIcon() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m21 16-5-5-9 9" />
    </svg>
  )
}

// Flags are drawn as SVG because Windows has no flag emoji glyphs.
const flagProps = { className: 'flag', width: 22, height: 16, 'aria-hidden': true } as const

export function IsraelFlag() {
  return (
    <svg {...flagProps} viewBox="0 0 22 16">
      <rect width="22" height="16" fill="#fff" />
      <rect y="2" width="22" height="2" fill="#0038b8" />
      <rect y="12" width="22" height="2" fill="#0038b8" />
      <g fill="none" stroke="#0038b8" strokeWidth="0.7">
        <path d="M11 5.4 13.25 9.3h-4.5z" />
        <path d="M11 10.6 8.75 6.7h4.5z" />
      </g>
    </svg>
  )
}

export function UsFlag() {
  return (
    <svg {...flagProps} viewBox="0 0 22 16">
      <rect width="22" height="16" fill="#fff" />
      <path
        d="M0 1.14h22M0 3.43h22M0 5.71h22M0 8h22M0 10.29h22M0 12.57h22M0 14.86h22"
        stroke="#b22234"
        strokeWidth="1.23"
      />
      <rect width="9.5" height="8.6" fill="#3c3b6e" />
    </svg>
  )
}

export function AlertIcon() {
  return (
    <svg {...svgProps} width={40} height={40}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </svg>
  )
}
