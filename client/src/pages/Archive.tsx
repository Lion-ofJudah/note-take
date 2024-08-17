import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

interface Note {
  title: string;
  body: string;
  _id: string;
}

export default function Archive() {
  const [archiveNotes, setArchiveNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getArchiveNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/get-archive-notes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!data.success) {
          console.log(data.message);
          return;
        } else {
          console.log(data);
          setArchiveNotes(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getArchiveNotes();
  }, []);

  return (
    <div className="mt-4 px-5 flex flex-col items-center relative">
      <div className="w-11/12 md:px-[10px] lg:px-[127.42px] xl:px-0 xl:w-[1402px] flex flex-wrap items-center justify-center md:items-start md:justify-start gap-10">
        {archiveNotes.map((note) => {
          return (
            <NoteCard
              key={note._id}
              title={note.title}
              body={note.body}
              onDelete={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
