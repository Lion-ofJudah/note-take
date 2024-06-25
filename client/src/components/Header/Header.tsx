import DropDown from "../DropDown";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import User from "../User";

export default function Header() {
  return (
    <div className="flex justify-between items-center py-2 px-4 gap-6 shadow-sm">
      <Logo />
      <form className="w-2/3">
        <SearchBar />
      </form>
      <div className="flex items-center">
        <User />
        <DropDown />
      </div>
    </div>
  );
}
