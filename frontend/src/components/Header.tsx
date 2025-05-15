import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useContext } from "react";
import { ThemeContext } from "../hooks/useThemeContext";
import Sun from "./../../assets/sun.svg";
import Moon from "./../../assets/moon.svg";

export default function Header() {
  const { darkEnabled, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="w-full flex justify-center align-middle sticky dark:bg-gray-800/90 bg-gray-800/50 text-white/90 top-0">
      <nav>
        <ul className="">
          <li>
            <Link to="/">
              <Logo />
            </Link>
          </li>
        </ul>
      </nav>
      <div
        onClick={toggleTheme}
        className="absolute right-8 p-4 hover:cursor-pointer hover:opacity-75"
      >
        <img className="w-8" src={darkEnabled ? Moon : Sun} />
      </div>
    </header>
  );
}
