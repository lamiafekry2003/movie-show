
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [iconClick, setIconClick] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [query, setQuery] = useState(""); // State to store search query
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIconClick(false); // Close the navbar when a link is clicked
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="bg-gradient-to-l from-red-700 to-orange-500 bg-clip-text text-transparent self-center text-3xl font-bold whitespace-nowrap">
            Movie-Show
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={() => setSearchClick(!searchClick)}
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-neutral-400  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div
            className={`${
              searchClick
                ? "block absolute inset-x-0 top-16 md:static md:block md:w-auto md:mt-0 mx-1 md:bg-transparent"
                : "hidden relative md:block"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm focus:outline-none text-neutral-400 rounded-lg bg-gray-50 md:bg-transparent"
                placeholder="Search..."
                value={query}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <button
            onClick={() => setIconClick(!iconClick)}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 dark:text-neutral-400 rounded-lg md:hidden"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            iconClick ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="movie"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-white md:text-white md:p-0"
                    : "block py-2 px-3 text-neutral-400 rounded md:border-0 md:hover:text-white md:p-0"
                }
              >
                Movie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="tv"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-white md:text-white md:p-0"
                    : "block py-2 px-3 text-neutral-400 rounded md:border-0 md:hover:text-white md:p-0"
                }
              >
                TV-Show
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}