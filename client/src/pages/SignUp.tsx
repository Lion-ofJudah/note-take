import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import Google from "../components/Google";
import Github from "../components/Github";

export default function SignUp() {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-[#282e2b]">
      <div className="flex w-2/3 h-4/5 rounded-3xl bg-white">
        <div className="flex flex-1 items-center justify-end w-full">
          <div className="flex justify-center items-center bg-[#e9f9ee] w-5/6 rounded-[50px] h-5/6">
            <img src="/images/signup.png" alt="Sign up" />
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
            <p className="text-5xl font-bold">Hello!</p>
            <p className="text-lg text-gray-500 font-semibold">
              Please create a new account
            </p>
          </div>
          <form className="w-full flex flex-col items-center justify-center my-2">
            <div className="flex flex-col gap-3 items-center justify-center w-2/3 my-8">
              <TextInput placeholder="User name" />
              <TextInput placeholder="Email address" />
              <PasswordInput />
              <span className="w-full text-right cursor-pointer text-gray-500">
                Forgot password?
              </span>
            </div>
            <button className="w-2/3 text-center py-4 rounded-2xl bg-[#8fe4a8] text-white font-semibold">
              Sign up
            </button>
          </form>
          <div className="flex w-2/3 items-center justify-center my-4">
            <span className="border-b w-1/3"></span>
            <p className="mx-4">Or Sign up with</p>
            <span className="border-b w-1/3"></span>
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
            <Link to={"/login"} className="text-[#8fe4a8] underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
