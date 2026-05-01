import { Link } from "react-router-dom";
import { FaImage, FaMoon, FaSun } from "react-icons/fa6";
import weddingData from "../data/weddingData.js";

function ThemeToggle({ isDarkMode, onToggleTheme }) {
    return (
        <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full  text-maroon backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 hover:bg-gold/20  dark:text-gold"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDarkMode}
        >
            {isDarkMode ? (
                <FaSun className="text-sm text-yellow-400" />
            ) : (
                <FaMoon className="text-sm text-slate-700" />
            )}
        </button>
    );
}

export default function Navbar({ activePath, isDarkMode, onToggleTheme }) {
    const { brand, nav } = weddingData;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ivory/90 border-b border-gold/20">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5 sm:py-5">
                <Link to="/" onClick={scrollToTop} className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <span className="text-2xl font-serif tracking-[0.12em] text-maroon sm:text-3xl lg:text-4xl">
                        {brand.monogram}
                    </span>
                    <div className="leading-none">
                        {brand.title && (
                            <p className="text-lg uppercase tracking-[0.22em] text-gold sm:text-xl lg:text-2xl lg:tracking-[0.35em]">
                                {brand.title}
                            </p>
                        )}
                    </div>
                </Link>

                <nav className="hidden items-center gap-5 text-sm uppercase tracking-[0.2em] text-teak lg:flex xl:gap-8 xl:tracking-widest">
                    {nav.items.map((item) => (
                        <Link key={item.label} to={`/${item.hash}`} className="transition hover:text-gold">
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        to="/photos"
                        className={`transition hover:text-gold ${activePath === "/photos" ? "text-gold font-medium" : ""}`}
                    >
                        {nav.photosLabel}
                    </Link>
                    <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
                </nav>

                <div className="flex items-center gap-2 lg:hidden">
                    <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
                    <Link
                        to="/photos"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full  text-maroon shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold/20 hover:shadow-lg dark:text-gold"
                        aria-label={nav.photosLabel}
                    >
                        <FaImage className="text-sm" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
