import DropDown from "../DropDown";
import Hamburger from "../Hamburger";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import User from "../User";

interface Props {
  onHamburgerClick: () => void;
}

export default function Header({ onHamburgerClick }: Props) {
  return (
    <div className="flex justify-between items-center py-2 px-4 gap-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Hamburger onHamburgerClick={onHamburgerClick} />
        <Logo />
      </div>
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
