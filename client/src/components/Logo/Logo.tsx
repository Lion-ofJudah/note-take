import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="cursor-pointer rounded-full p-3 hover:bg-gray-100 w-fit">
      <Link to={"/"}>
        <div className="border w-fit rounded-full bg-[#8fe4a8]">
          <img src="/images/logo.png" alt="logo" className="size-6" />
        </div>
      </Link>
    </div>
  );
}
