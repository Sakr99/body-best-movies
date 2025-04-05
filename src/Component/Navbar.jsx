import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Context/GlobalContext";
import logo from "../assets/4d3d246bcbf144faa10a2806021391bc-free.png";
import { Switch } from "@headlessui/react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="w-full bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto flex items-center justify-between flex-wrap lg:flex-nowrap p-4">
        {/* Logo */}
        <Link
          className="text-2xl font-bold flex items-center gap-4 hover:text-gray-400"
          to="home"
        >
          <img className="w-16" src={logo} alt="BodyBestLogo" />
          BodyBest
        </Link>

        {/* Mobile Theme Toggle + Hamburger Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex items-center gap-2">
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
          {/* Hamburger Button (Mobile) */}
          <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex space-x-4">
          <Link
            className="hover:text-gray-400 dark:hover:text-gray-300"
            to="home"
          >
            Home
          </Link>
          <Link
            className="hover:text-gray-400 dark:hover:text-gray-300"
            to="movies"
          >
            Movies
          </Link>
          <Link
            className="hover:text-gray-400 dark:hover:text-gray-300"
            to="favourites"
          >
            My Favourites
          </Link>
        </div>

        {/* Desktop Theme Toggle & Account */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
          <Icon />
          <Link
            className="hover:text-gray-400 dark:hover:text-gray-300"
            to="login"
          >
            Login
          </Link>
          <Link
            className="hover:text-gray-400 dark:hover:text-gray-300"
            to="signIn"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar (when menuOpen is true) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end lg:hidden">
          <div className="w-64 bg-white dark:bg-gray-800 p-4">
            <button
              className="text-2xl text-white"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            <div className="flex flex-col space-y-4 mt-4">
              <Link
                className="text-lg text-black dark:text-white hover:text-gray-400"
                to="home"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="text-lg text-black dark:text-white hover:text-gray-400"
                to="movies"
                onClick={() => setMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                className="text-lg text-black dark:text-white hover:text-gray-400"
                to="favourites"
                onClick={() => setMenuOpen(false)}
              >
                Favourites
              </Link>
              <Icon />
              <Link
                className="text-lg text-black dark:text-white hover:text-gray-400"
                to="login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="text-lg text-black dark:text-white hover:text-gray-400"
                to="signIn"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
