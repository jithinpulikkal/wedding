import Reveal from "./Reveal.jsx";

export default function IllustrationCard({
    title,
    subtitle,
    imageSrc,
    imageAlt,
    onImageLoad,
    onImageError,
    imageLoading,
}) {
    return (
        <Reveal animation="scaleIn">
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-ivory via-white to-ivory shadow-royal">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.25),_transparent_60%)]" />
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center sm:p-10 lg:p-12">
                    {imageSrc ? (
                        <div className="w-full">
                            <img
                                src={imageSrc}
                                alt={imageAlt || title}
                                className="w-full max-h-full rounded-2xl border border-gold/30 object-cover shadow-glow motion-safe:animate-slowZoom"
                                loading={imageLoading || "lazy"}
                                onLoad={onImageLoad}
                                onError={onImageError}
                            />
                        </div>
                    ) : (
                        <div className="mb-7 h-36 w-36 rounded-full border border-gold/30 bg-gradient-to-br from-gold/30 via-ivory to-white shadow-glow motion-safe:animate-floatSoft" />
                    )}
                    {/* <p className="text-sm uppercase tracking-[0.3em] text-gold">3D Illustration</p>
                        <h3 className="mt-4 text-2xl font-serif text-maroon sm:text-3xl">{title}</h3>
                        <p className="mt-3 text-base text-teak/70">{subtitle}</p> */}
                </div>
            </div>
        </Reveal>
    );
}
