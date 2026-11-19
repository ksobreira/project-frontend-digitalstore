const base = { 
    width: 24, 
    height: 24, 
    viewBox: '0 0 24 24', 
    fill: 'none', 
    stroke: 'currentColor', 
    strokeWidth: 2, 
    strokeLinecap: 'round', 
    strokeLinejoin: 'round', 
    'aria-hidden': true }

export const MenuIcon = () => (<svg {...base}><path d="M3 6h18M3 12h18M3 18h18" /></svg>)
export const CloseIcon = () => (<svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const SearchIcon = () => (<svg {...base}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>)
export const FilterIcon = () => (<svg {...base}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" /></svg>)
