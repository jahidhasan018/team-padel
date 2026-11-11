// Minimal hand-picked line icon set (24px grid, 1.75 stroke) — no external icon dependency.
const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  phone: <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11M12 13v4M8.5 20.5h7M9.5 17h5v3.5h-5z" /></>,
  users: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5" /><circle cx="17" cy="9.5" r="2.5" /><path d="M16.5 14.6c2.4.2 4 1.7 4.5 4.4" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6" /></>,
  whistle: <><circle cx="9" cy="14" r="5.5" /><path d="M13 10 20 7v4l-5 1.5M9 14h.01" /></>,
  racket: <><ellipse cx="10" cy="9" rx="6" ry="6.5" transform="rotate(-35 10 9)" /><path d="m14.2 13.8 5.3 5.8M8 7h.01M11 7h.01M9.5 10h.01M12.5 10h.01" /></>,
  ball: <><circle cx="12" cy="12" r="8.5" /><path d="M6 6.5c3 2.5 3 8.5 0 11M18 6.5c-3 2.5-3 8.5 0 11" /></>,
  graduation: <><path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5Z" /><path d="M6.5 11.7V16c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4v-4.3M21.5 9.5v5" /></>,
  sprout: <><path d="M12 20v-8M12 12c0-4-3-6-7-6 0 4 3 6 7 6ZM12 14c0-3.5 2.6-5.5 6.5-5.5 0 3.5-2.6 5.5-6.5 5.5Z" /></>,
  smile: <><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01" /></>,
  bag: <><path d="M5 8h14l-1 12.5H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  book: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></>,
  dumbbell: <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />,
  gift: <><rect x="3.5" y="8" width="17" height="4" rx="1" /><path d="M5 12v8.5h14V12M12 8v12.5M12 8c-1-2.5-4.5-3.5-5-1.5S9.5 8 12 8Zm0 0c1-2.5 4.5-3.5 5-1.5S14.5 8 12 8Z" /></>,
  building: <><path d="M3.5 20.5h17M5 20.5V9l7-4.5L19 9v11.5" /><path d="M9.5 20.5V15h5v5.5" /></>,
  handshake: <path d="m3 11 4-4 3 1 2-1.5L15 6l6 5-3 3M3 11l5 5c.8.8 2 .8 2.8 0M3 11l-.5.5M13 13l2 2M11 15l1.5 1.5M18 14l-4.2 4.2a1.6 1.6 0 0 1-2.3 0L11 17.7" />,
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>,
  whatsapp: <><path d="M4 20l1.2-3.8A8.5 8.5 0 1 1 8 19l-4 1Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.3-2.3l.8-1-1-2L9 8.5Z" /></>,
  google: <path d="M20 12.2c0-.6-.1-1.2-.2-1.7H12v3.3h4.5a4 4 0 0 1-1.7 2.6v2.1h2.7c1.6-1.5 2.5-3.7 2.5-6.3ZM12 20.5c2.3 0 4.2-.8 5.5-2l-2.7-2.1c-.7.5-1.7.8-2.8.8-2.2 0-4-1.5-4.7-3.4H4.5v2.2A8.5 8.5 0 0 0 12 20.5ZM7.3 13.8a5 5 0 0 1 0-3.4V8.2H4.5a8.5 8.5 0 0 0 0 7.8l2.8-2.2ZM12 6.8c1.3 0 2.4.4 3.3 1.3l2.4-2.4A8.5 8.5 0 0 0 4.5 8.2l2.8 2.2C8 8.3 9.8 6.8 12 6.8Z" />,
  upload: <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 15v3.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V15" />,
  car: <><path d="M4 16.5V12l2-5h12l2 5v4.5M4 16.5h16M4 16.5V19h3v-2.5M17 16.5V19h3v-2.5M4 12h16" /><path d="M7.5 14h.01M16.5 14h.01" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>,
  roof: <path d="M3 11 12 4l9 7M5.5 9v11.5h13V9" />,
  wifi: <path d="M3 9a13 13 0 0 1 18 0M6 12.5a8.5 8.5 0 0 1 12 0M9 16a4 4 0 0 1 6 0M12 19.5h.01" />,
  alert: <><path d="M12 3.5 21.5 20h-19L12 3.5Z" /><path d="M12 10v4M12 17h.01" /></>,
  refresh: <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4" />,
  filter: <path d="M4 5.5h16l-6 7.5v6l-4-2v-4L4 5.5Z" />,
  euro: <path d="M17.5 6.5A6.5 6.5 0 0 0 7 11.5v1a6.5 6.5 0 0 0 10.5 5M4.5 10.5h9M4.5 13.5h8" />,
  layers: <path d="m12 3.5 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5" />,
  shirt: <path d="M8.5 3.5 3.5 6l1.8 4.5 2.2-1v11h9v-11l2.2 1L20.5 6l-5-2.5a3.5 3.5 0 0 1-7 0Z" />,
  camera: <><path d="M4 8h3l1.8-2.5h6.4L17 8h3v11H4V8Z" /><circle cx="12" cy="13.2" r="3.3" /></>,
  file: <><path d="M6 3.5h8l4 4v13H6v-17Z" /><path d="M14 3.5v4h4" /></>,
}

export default function Icon({ name, className = 'size-5', strokeWidth = 1.75, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      {paths[name] || paths.ball}
    </svg>
  )
}

