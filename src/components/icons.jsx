// Общие иконки платформы — линейные, в одном стиле с колокольчиком в Sidebar:
// viewBox 24, обводка currentColor толщиной 2, скруглённые концы. Цвет берётся из CSS.
// Используются вместо эмодзи, чтобы интерфейс выглядел одинаково на всех устройствах.

function Svg({ size = 18, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  )
}

export const LockIcon = p => <Svg {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Svg>
export const PlayIcon = p => <Svg {...p}><path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none" /></Svg>
export const CheckIcon = p => <Svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>
export const CrossIcon = p => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>
export const PencilIcon = p => <Svg {...p}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></Svg>
export const TicketIcon = p => <Svg {...p}><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" /><path d="M14 6v12" strokeDasharray="2 2.5" /></Svg>
export const SparkIcon = p => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></Svg>
export const BulbIcon = p => <Svg {...p}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" /></Svg>
export const InfoIcon = p => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.5v.5" /></Svg>
export const AlertIcon = p => <Svg {...p}><path d="M12 3L2 20h20z" /><path d="M12 10v4M12 17v.5" /></Svg>
export const EyeIcon = p => <Svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>
export const ResetIcon = p => <Svg {...p}><path d="M4 4v6h6" /><path d="M5.5 15a7.5 7.5 0 1 0 1.3-8.3L4 10" /></Svg>
export const ClockIcon = p => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
export const LinkIcon = p => <Svg {...p}><path d="M14 5h5v5" /><path d="M19 5l-8 8" /><path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" /></Svg>
