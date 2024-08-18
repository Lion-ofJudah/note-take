interface Props {
  title?: string;
  body?: string;
  expireDate?: string;
  firstIcon: React.ReactNode;
  secondIcon: React.ReactNode;
  onFirstIconClick: () => void;
  onSecondIconClick: () => void;
}

export default function NoteCard({
  title,
  body,
  firstIcon,
  secondIcon,
  onFirstIconClick,
  onSecondIconClick,
}: Props) {
  return (
    <div className="flex flex-col w-80 shadow-md border-t border-[#282e2b19] h-fit p-5 rounded-2xl cursor-pointer group transition-all">
      {title ? (
        <p className="font-medium text-lg text-center text-gray-700 cursor-text w-fit">
          {title}
        </p>
      ) : (
        <div className="p-3.5" />
      )}

      {body && (
        <p className="self-start text-lg w-fit font-medium text-justify text-gray-700 pt-4 cursor-text">
          {body}
        </p>
      )}
      <div className="flex items-center justify-end gap-14 pt-5">
        <div
          className="p-2 rounded-full w-fit hover:bg-gray-200"
          onClick={onFirstIconClick}
        >
          {firstIcon}
        </div>
        <div
          className="p-2 rounded-full w-fit hover:bg-gray-200"
          onClick={onSecondIconClick}
        >
          {secondIcon}
        </div>
      </div>
    </div>
  );
}
