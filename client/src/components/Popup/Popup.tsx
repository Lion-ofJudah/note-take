import { useEffect, useRef, useState } from "react";

interface Props {
  message: string;
  type: "success" | "error";
  duration?: number;
}

export default function Popup({ message, type, duration = 3000 }: Props) {
  const [isVisible, setIsVisible] = useState(!!message);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setProgress(100);
    }
  }, [message]);

  useEffect(() => {
    if (!isPaused && isVisible) {
      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            setIsVisible(false);
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 100 / (duration / 100);
        });
      }, 100);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isVisible, duration]);

  const closePopup = () => {
    setIsVisible(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full flex justify-center items-center py-4 z-50">
        <div
          className={`fixed top-2 flex flex-col items-center justify-center bg-white w-full max-w-md px-4 py-4 rounded-3xl ${
            type === "success"
              ? "border-2 border-green-500"
              : "border-2 border-red-500"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={closePopup}
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p
            className={`${
              type === "success" ? "text-green-900" : "text-red-900"
            } font-bold`}
          >
            {type === "success" ? "✔️ " : "❌ "}
            {message}
          </p>
          <div className="w-full flex justify-end items-end h-1 mt-4 bg-[#8fe4a8]">
            <div
              className="h-full bg-gray-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    )
  );
}
