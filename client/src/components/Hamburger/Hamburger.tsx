interface Props {
  onHamburgerClick: () => void;
}

export default function Hamburger({ onHamburgerClick }: Props) {
  return (
    <div
      onClick={onHamburgerClick}
      className="cursor-pointer rounded-full p-3 hover:bg-gray-100 w-fit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}
