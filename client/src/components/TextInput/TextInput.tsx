interface Props {
  placeholder: string;
}

export default function TextInput({ placeholder }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-2xl focus-within:outline-none focus-within:border px-4 py-3 border"
    />
  );
}
