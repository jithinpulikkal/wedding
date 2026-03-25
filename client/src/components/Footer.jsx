import weddingData from "../data/weddingData.js";

export default function Footer() {
    const { footer } = weddingData;

    return (
        <footer className=" bg-ivory/90">
            <div className="mx-auto max-w-6xl px-5 text-center">
                {/* Main Message */}
                <p className="font-serif text-lg sm:text-xl text-maroon leading-relaxed max-w-2xl mx-auto">
                    {footer.message}
                </p>

                {/* Signature */}
                <p className="mt-6 text-xl sm:text-2xl font-medium text-teak">{footer.signature}</p>

                {/* Copyright */}
                <div className="mt-3 p-3  text-sm text-teak/70">
                    <p>{footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
