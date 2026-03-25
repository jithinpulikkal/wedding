import { Link } from "react-router-dom";
import weddingData from "../data/weddingData.js";

export default function Navbar({ activePath }) {
    const { brand, nav } = weddingData;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ivory/90 border-b border-gold/20">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
                {/* Logo / Brand */}
                <Link to="/" className="flex items-center gap-3">
                    <span className="text-3xl md:text-4xl font-serif tracking-[0.15em] text-maroon">{brand.monogram}</span>
                    <div className="leading-none">
                        {brand.title && (
                            <p className="text-xl md:text-2xl uppercase tracking-[0.35em] text-gold">{brand.title}</p>
                        )}
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 text-sm uppercase tracking-widest text-teak md:flex">
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
                    className="rounded-full border border-gold/60 px-4 py-1.5 text-xs uppercase tracking-[0.35em] text-maroon transition hover:bg-gold/10 md:hidden"
                >
                    {nav.photosLabel}
                </Link>
            </div>
        </header>
    );
}
