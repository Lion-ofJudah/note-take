import { useState, useRef } from "react";

interface Props {
  inputData: { title: string; body: string };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function NoteInput({ inputData, onChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full border rounded-2xl"
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <input
        type="text"
        placeholder="Title"
        value={inputData.title}
        id="title"
        onChange={onChange}
        className={`w-full px-2 py-3 focus:outline-none focus:border-none rounded-2xl ${
          isFocused ? "block" : "hidden"
        }`}
      />
      <textarea
        placeholder="Take a note..."
        id="body"
        value={inputData.body}
        onChange={onChange}
        className={`w-full px-2 py-3 focus-within:outline-none focus:border-none rounded-2xl ${
          isFocused && "text-sm"
        }`}
        rows={isFocused ? 2 : 1}
        style={{ whiteSpace: "pre-wrap", resize: "none" }}
      />
    </div>
  );
}
