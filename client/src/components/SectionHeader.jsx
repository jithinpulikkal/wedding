export default function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="mb-10 text-center sm:mb-14">
            {/* Eyebrow */}
            {eyebrow && <p className="text-sm uppercase tracking-[0.4em] text-gold">{eyebrow}</p>}

            {/* Title */}
            <h2 className="mt-3 font-serif text-4xl font-bold text-maroon sm:text-5xl md:text-6xl leading-tight">
                {title}
            </h2>

            {/* Description */}
            {description && (
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-teak/80 sm:text-lg">{description}</p>
            )}
        </div>
    );
}
