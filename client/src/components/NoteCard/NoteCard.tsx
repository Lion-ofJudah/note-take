interface Props {
  title?: string;
  body?: string;
}

export default function NoteCard({ title, body }: Props) {
  return (
    <div className="flex flex-col w-80 shadow-md border-t border-[#282e2b19] h-fit p-5 rounded-2xl cursor-pointer">
      {title && (
        <p
          className="self-center font-bold text-xl text-center cursor-text w-fit"
          style={{ letterSpacing: "2px" }}
        >
          {title}
        </p>
      )}
      {title && body && <span className="border-b border-b-[#282e2b1f] mt-4" />}
      {body && (
        <p className="self-center w-fit font-medium text-justify text-gray-700 pt-4 cursor-text">
          {body}
        </p>
      )}
    </div>
  );
}
