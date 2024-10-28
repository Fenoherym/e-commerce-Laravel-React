import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-4 sm:px-16 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300">
          Mon Site
        </Link>
        <button
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <ul className="hidden sm:flex gap-6">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/accessoires">Accessoires</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </ul>
      </div>
      {isOpen && (
        <ul className="mt-4 sm:hidden">
          <NavLink href="/" mobile>Accueil</NavLink>
          <NavLink href="/accessoires" mobile>Accessoires</NavLink>
          <NavLink href="/contact" mobile>Contact</NavLink>
        </ul>
      )}
    </nav>
  )
}

function NavLink({ href, children, mobile }) {
  const baseClasses = "relative py-2 hover:text-green-500 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-green-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";
  const mobileClasses = "block py-2";

  return (
    <li className={mobile ? "mb-2" : ""}>
      <Link
        href={href}
        className={mobile ? mobileClasses : baseClasses}
      >
        {children}
      </Link>
    </li>
  );
}
