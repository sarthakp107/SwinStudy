import { useSignOut } from '@/Hooks/Authentication/useSignOut';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '@/utils/scrollToSection';
import { HiMenu, HiX } from 'react-icons/hi';
import Spinner from './Loading/Spinner';

interface NavbarProps {
  /** When true, navbar scrolls with content (inside hero). When false, navbar is fixed. */
  inline?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ inline = false }) => {
  const { user } = useAuthContext();
  const { signOut, isPending } = useSignOut();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';
  const useBlendedNav = isLanding || isAuthPage;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  const capsuleGlass = 'backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg';
  const linkBase = useBlendedNav
    ? 'text-slate-800 hover:text-red-600 transition-colors duration-200 font-medium'
    : 'text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium';

  const btnSecondary = useBlendedNav
    ? 'rounded-full px-3 py-1.5 font-medium transition-all duration-200 bg-white/30 hover:bg-white/40 hover:text-red-600 border border-white/40'
    : 'rounded-full px-3 py-1.5 font-medium transition-all duration-200 bg-slate-100/80 hover:bg-slate-200/80 hover:text-red-600 border border-slate-200/80';
  const btnPrimary = isLanding
    ? 'text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1.5 font-semibold transition-all duration-200 shadow-md'
    : 'text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1.5 font-semibold transition-all duration-200';

  const scrollToTop = () => {
    setMobileOpen(false);
    const start = window.scrollY;
    const startTime = performance.now();
    const duration = 1000;
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const navLinks = (
    <>
      {isLanding ? (
        <button onClick={scrollToTop} className={`${linkBase} bg-transparent border-none cursor-pointer`}>
          Home
        </button>
      ) : (
        <Link to="/" className={linkBase} onClick={() => setMobileOpen(false)}>
          Home
        </Link>
      )}
      <Link to="/about" className={linkBase} onClick={() => setMobileOpen(false)}>
        About
      </Link>
      {isLanding && (
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            scrollToSection("features", 1200);
          }}
          className={`${linkBase} bg-transparent border-none cursor-pointer`}
        >
          Features
        </button>
      )}
      <Link to="/buddies" className={linkBase} onClick={() => setMobileOpen(false)}>
        Unit Buddy
      </Link>
      <Link to="/flashcardupload" className={linkBase} onClick={() => setMobileOpen(false)}>
        Flashcard
      </Link>
    </>
  );

  const navClass = inline
    ? "relative z-10"
    : `fixed top-0 left-0 right-0 z-50 ${useBlendedNav ? "bg-transparent" : "bg-white shadow-sm"}`;

  return (
    <nav className={`px-6 py-4 flex items-center justify-center ${navClass}`}>
      <div className="w-full max-w-4xl flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-red-600 hover:text-red-700 transition-colors duration-200 shrink-0"
        >
          SwinStudy
        </Link>

        <div
          className={`hidden md:flex items-center justify-center gap-6 absolute left-1/2 -translate-x-1/2 rounded-full h-11 px-6 ${useBlendedNav ? capsuleGlass : 'bg-slate-100/90 backdrop-blur-md border border-slate-200/50 shadow-md'}`}
        >
          {navLinks}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div
            className={`hidden md:flex items-center justify-center gap-2 rounded-full h-11 px-3 ${useBlendedNav ? capsuleGlass : 'bg-slate-100/90 backdrop-blur-md border border-slate-200/50 shadow-md'}`}
          >
            {!user ? (
              <>
                <Link to="/login" className={`${linkBase} ${btnSecondary}`}>
                  Login
                </Link>
                <Link to="/signup" className={btnPrimary}>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`${linkBase} ${btnSecondary}`}>
                  Dashboard
                </Link>
                {!isPending ? (
                  <button className={btnPrimary} onClick={handleSignOut}>
                    Logout
                  </button>
                ) : (
                  <Spinner />
                )}
              </>
            )}
          </div>

          <button
            className={`md:hidden p-2 rounded-lg ${useBlendedNav ? 'text-slate-800' : 'text-gray-700'}`}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`absolute top-full left-0 right-0 mt-1 mx-4 py-4 rounded-xl flex flex-col gap-3 md:hidden backdrop-blur-xl ${useBlendedNav ? 'bg-white/90 shadow-lg border border-white/30' : 'bg-white shadow-lg'
            }`}
        >
          {navLinks}
          {!user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <Link
                to="/login"
                className={`px-4 py-2 ${linkBase}`}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 ${btnPrimary}`}
                onClick={() => setMobileOpen(false)}
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <Link
                to="/dashboard"
                className={`px-4 py-2 ${linkBase}`}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              {!isPending && (
                <button
                  className={`px-4 py-2 text-left ${btnPrimary}`}
                  onClick={(e) => {
                    handleSignOut(e);
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
