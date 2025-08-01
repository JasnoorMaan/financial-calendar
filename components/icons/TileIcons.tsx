export const PriceUp = () => (
  <svg
    className="h-6 w-6 text-green-600 drop-shadow-lg"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M7 14l5-5 5 5" />
    <path d="M12 19V9" />
  </svg>
);

export const PriceDown = () => (
  <svg
    className="h-6 w-6 text-red-600 drop-shadow-lg"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M17 10l-5 5-5-5" />
    <path d="M12 5v10" />
  </svg>
);

export const PriceFlat = () => (
  <svg
    className="h-6 w-6 text-blue-500 drop-shadow-lg"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14" />
  </svg>
);

export const VolatilityHigh = () => (
  <svg
    className="h-5 w-5 text-blue-600 drop-shadow-lg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <rect x="2" y="4" width="3" height="12" rx="1.5" />
    <rect x="7" y="2" width="3" height="16" rx="1.5" />
    <rect x="12" y="6" width="3" height="10" rx="1.5" />
  </svg>
);

export const VolatilityLow = () => (
  <svg
    className="h-5 w-5 text-blue-500 drop-shadow-lg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <rect x="2" y="10" width="3" height="6" rx="1.5" />
    <rect x="7" y="8" width="3" height="8" rx="1.5" />
    <rect x="12" y="12" width="3" height="4" rx="1.5" />
  </svg>
);

export const VolatilityWave = () => (
  <svg
    className="h-5 w-5 text-orange-500 drop-shadow-lg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M2 12c1.5-3 3-6 6-6s4.5 3 6 6 3 6 6 6" />
    <path d="M2 18c1.5-2 3-4 6-4s4.5 2 6 4 3 4 6 4" />
  </svg>
);
