import React, { useRef } from "react";
import NoteInput from "../components/NoteInput";

export default function Home() {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const note = {
    title: "",
    body: "",
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
        return;
      } else {
        console.log(data);
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
    <div className="mt-4">
      <div className="w-full flex justify-center items-center">
        <form className="w-2/3" onBlur={handleBlur}>
          <NoteInput titleRef={titleRef} bodyRef={bodyRef} />
        </form>
      </div>
    </div>
  );
}
