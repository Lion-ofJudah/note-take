import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import Google from "../components/Google";
import Github from "../components/Github";
import Popup from "../components/Popup";

export default function LogIn() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setPopupMessage("");
    setPopupType("success");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();

      if (!data.success) {
        setPopupMessage(data.message);
        setPopupType("error");
      } else {
        setPopupMessage(data.message);
        setPopupType("success");
        navigate("/");
      }
    } catch (error) {
      setPopupMessage("An error occurred. Please try again.");
      setPopupType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#282e2b] flex items-center justify-center">
      <div className="bg-white w-2/3 h-4/5 flex rounded-3xl">
        <div className="flex flex-1 items-center justify-end w-full">
          <div className="flex justify-center items-center bg-[#e9f9ee] w-5/6 rounded-[50px] h-5/6">
            <img src="/images/login1.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#8fe4a8] rounded-full cursor-pointer">
              <img src="/images/logo.png" alt="logo" className="size-12" />
            </div>
            <p className="text-2xl font-bold cursor-pointer">Note-take</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl font-bold">Welcome Back</p>
            <p className="text-lg text-gray-500 font-semibold">
              Please login to your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center justify-center my-2"
          >
            <div className="flex flex-col gap-3 items-center justify-center w-2/3 my-8">
              <TextInput
                id="email"
                value={inputData.email}
                onChange={handleChange}
                placeholder="Email address"
              />
              <PasswordInput
                id="password"
                value={inputData.password}
                onChange={handleChange}
              />
              <span className="w-full text-right cursor-pointer text-gray-500">
                Forgot password?
              </span>
            </div>
            <button
              disabled={loading}
              className="w-2/3 text-center py-4 rounded-2xl bg-[#8fe4a8] text-white font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex w-2/3 items-center justify-center my-4">
            <span className="border-b w-1/4"></span>
            <p className="w-2/4 text-center">Or Login with</p>
            <span className="border-b w-1/4"></span>
          </div>
          <div className="flex w-2/3 gap-6">
            <div className="w-1/2">
              <Google />
            </div>
            <div className="w-1/2">
              <Github />
            </div>
          </div>
          <div className="flex w-2/3 items-center justify-center gap-2 mt-4">
            <p>Don't have an account?</p>
            <Link to={"/signup"} className="text-[#8fe4a8] underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
      {popupMessage && <Popup message={popupMessage} type={popupType} />}
    </div>
  );
}
