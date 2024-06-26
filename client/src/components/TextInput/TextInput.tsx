import React from "react";

interface Props {
  placeholder: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ placeholder, id, value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl focus-within:outline-none focus-within:border px-4 py-3 border"
    />
  );
}
