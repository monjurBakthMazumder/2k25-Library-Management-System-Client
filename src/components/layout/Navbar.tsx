import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggle";

export default function PremiumNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const links = [
    { path: "/books", label: "All Books" },
    { path: "/create-book", label: "Add Book" },
    { path: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg transition-colors duration-500"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 transition-colors relative"
          >
            Library
          </Link>

          <ul className="hidden md:flex space-x-12 font-semibold text-gray-700 dark:text-gray-300 select-none">
            {links.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`relative group px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                      isActive
                        ? "text-blue-700 dark:text-blue-400 font-bold"
                        : "hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full ${
                        isActive ? "w-full" : ""
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed inset-x-0 top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        role="menu"
      >
        <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 font-semibold text-gray-700 dark:text-gray-300 select-none">
          {links.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  role="menuitem"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
