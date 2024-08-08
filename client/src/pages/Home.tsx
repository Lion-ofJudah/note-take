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

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/getnotes",
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/note/delete/${id}`,
        {
          method: "DELETE",
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
                onDelete={() => {
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
