import React, { useEffect, useRef, useState } from "react";
import NoteInput from "../components/NoteInput";
import NoteCard from "../components/NoteCard";

interface Note {
  _id: string;
  title: string;
  body: string;
}

export default function Home() {
  const [userNotes, setUserNotes] = useState<Note[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const note = {
    title: "",
    body: "",
    _id: "0",
  };

  const archiveImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 opacity-0 text-gray-700 group-hover:opacity-100"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
      />
    </svg>
  );
  const binImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 opacity-0 text-gray-700 group-hover:opacity-100"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/get-notes",
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
          setUserNotes(data.data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getNotes();
  }, []);

  const handleArchive = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/note/archive/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setUserNotes(userNotes.filter((note) => note._id !== id));
      const data = await response.json();

      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/note/delete/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setUserNotes(userNotes.filter((note) => note._id !== id));
      const data = await response.json();

      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = async (event: React.FocusEvent<HTMLFormElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    event.preventDefault();

    try {
      if (titleRef.current !== null) {
        if (titleRef.current?.value !== "") {
          note.title = titleRef.current.value;
        }
      }

      if (bodyRef.current !== null) {
        if (bodyRef.current?.value !== "") {
          note.body = bodyRef.current?.value;
        }
      }

      if (note.title !== "" || note.body !== "") {
        note._id = userNotes.length.toString();
        setUserNotes([...userNotes, note]);

        const response = await fetch("http://localhost:3000/api/note/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
          credentials: "include",
        });

        const data = await response.json();

        if (!data.success) {
          console.log(data.message);
          setUserNotes([...userNotes, data.data]);
          return;
        } else {
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (titleRef.current !== null && bodyRef.current !== null) {
        titleRef.current.value = "";
        bodyRef.current.value = "";
      }
      note.title = "";
      note.body = "";
    }
  };

  return (
    <div className="mt-4 px-5 flex flex-col items-center relative">
      <div className="w-full flex justify-center items-center">
        <form className="w-2/3" onBlur={handleBlur}>
          <NoteInput titleRef={titleRef} bodyRef={bodyRef} />
        </form>
      </div>
      <div className="flex items-center justify-center top-36 absolute w-full">
        <div className="w-11/12 md:px-[10px] lg:px-[127.42px] xl:px-0 xl:w-[1402px] flex flex-wrap items-center justify-center md:items-start md:justify-start gap-10">
          {userNotes.map((note) => {
            return (
              <NoteCard
                key={note._id}
                title={note.title}
                body={note.body}
                firstIcon={archiveImg}
                secondIcon={binImg}
                onFirstIconClick={() => {
                  handleArchive(note._id);
                }}
                onSecondIconClick={() => {
                  handleDelete(note._id);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
