export const PriceUp = () => {
  <svg
    className="h-4 w-4 text-green-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
        fill="#000000"
      ></path>{" "}
    </g>
  </svg>;
};

export const PriceDown = () => {
  <svg
    className="h-4 w-4 text-red-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    transform="matrix(1, 0, 0, 1, 0, 0)rotate(180)"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
        fill="#000000"
      ></path>{" "}
    </g>
  </svg>;
};

export const VolumeHigh = () => (
  <svg
    className="h-3 w-3 text-blue-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <rect x="2" y="4" width="3" height="12" />
    <rect x="7" y="2" width="3" height="16" />
    <rect x="12" y="6" width="3" height="10" />
  </svg>
);

export const VolumeLow = () => (
  <svg
    className="h-3 w-3 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <rect x="2" y="10" width="3" height="6" />
    <rect x="7" y="8" width="3" height="8" />
    <rect x="12" y="12" width="3" height="4" />
  </svg>
);
