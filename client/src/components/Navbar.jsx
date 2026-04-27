import { Link } from "react-router-dom";
import weddingData from "../data/weddingData.js";

export default function Navbar({ activePath }) {
    const { brand, nav } = weddingData;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ivory/90 border-b border-gold/20">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5 sm:py-5">
                {/* Logo / Brand */}
                <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <span className="text-2xl font-serif tracking-[0.12em] text-maroon sm:text-3xl lg:text-4xl">{brand.monogram}</span>
                    <div className="leading-none">
                        {brand.title && (
                            <p className="text-lg uppercase tracking-[0.22em] text-gold sm:text-xl lg:text-2xl lg:tracking-[0.35em]">
                                {brand.title}
                            </p>
                        )}
                    </div>
                </Link>

                {/* Desktop Navigation */}
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
                </nav>

                {/* Mobile Photos Button */}
                <Link
                    to="/photos"
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em] text-maroon transition-all duration-300 hover:bg-gold/10 shadow-md hover:scale-105 hover:shadow-lg sm:px-5 sm:text-sm sm:tracking-[0.3em] lg:hidden"
                >
                    {nav.photosLabel}
                </Link>
            </div>
        </header>
    );
}
