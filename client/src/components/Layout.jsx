import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        // If there's a hash (e.g., #details, #location), scroll smoothly to it
        if (location.hash) {
            const target = document.querySelector(location.hash);
            if (target) {
                // Small delay to ensure the page has rendered
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);
            }
            return;
        }

        // Otherwise scroll to top when navigating to a new page
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location.pathname, location.hash]);

    return (
        <div className="min-h-screen bg-temple-pattern text-teak">
            <Navbar activePath={location.pathname} />

            <main className="pt-20 sm:pt-24">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
