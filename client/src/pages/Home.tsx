import { useState } from "react";
import NoteInput from "../components/NoteInput";

export default function Home() {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
  });
  console.log(inputData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputData({ ...inputData, [event.target.id]: event.target.value });
  };

  return (
    <div className="mt-4">
      <div className="w-full flex justify-center items-center">
        <form className="w-2/3">
          <NoteInput inputData={inputData} onChange={handleChange} />
        </form>
      </div>
    </div>
  );
}
