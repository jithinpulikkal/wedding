import SectionHeader from "../components/SectionHeader.jsx";
import { Link } from "react-router-dom";
import weddingData from "../data/weddingData.js";
import usePhotoData from "../hooks/usePhotoData.js";

const placeholderPhotos = Array.from({ length: weddingData.photos.placeholderCount }, (_, index) => index + 1);

export default function Photos() {
    const photoState = usePhotoData();

    return (
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
            <SectionHeader eyebrow="Photos" title="Wedding Memories" description={weddingData.photos.notice} />

            {photoState.status === "loading" && (
                <div className="rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-gold shadow-royal">
                    Loading photos...
                </div>
            )}

            {photoState.status === "error" && (
                <div className="rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    {photoState.message}
                </div>
            )}

            {photoState.status === "ready" && (
                <div className="grid gap-6 sm:grid-cols-2">
                    {["bride", "groom"].map((label) => (
                        <Link
                            key={label}
                            to={`/photos/${label}`}
                            className="group rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal transition hover:border-gold/50 hover:shadow-xl"
                        >
                            <p className="text-xs uppercase tracking-[0.35em] text-gold">
                                {label === "bride" ? "Bride Side" : "Groom Side"}
                            </p>
                            <h3 className="mt-3 text-2xl font-serif text-maroon">
                                {label === "bride" ? "Raveena's Family" : "Jithin's Family"}
                            </h3>
                            <p className="mt-4 text-sm text-teak/80">
                                View albums from the {label} side celebrations and rituals.
                            </p>
                        </Link>
                    ))}
                </div>
            )}

            {photoState.status === "empty" && (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {placeholderPhotos.map((item) => (
                            <div
                                key={item}
                                className="flex h-40 items-center justify-center rounded-2xl border border-gold/20 bg-white/70 text-sm uppercase tracking-widest text-gold shadow-royal transition hover:shadow-xl hover:border-gold/40"
                            >
                                Photo {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal sm:p-10">
                        <p className=" leading-relaxed text-teak/80">{weddingData.photos.phaseTwo}</p>
                    </div>
                </>
            )}

            {photoState.status === "ready" && (
                <div className="mt-12 rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal sm:p-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-gold">Choose a side to view albums</p>
                    <p className="mt-4 leading-relaxed text-teak/80">
                        Photos are now live. Select Bride or Groom to view each collection.
                    </p>
                </div>
            )}

            {/* <div className="mt-12 rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal sm:p-10">
                <p className=" leading-relaxed text-teak/80">{weddingData.photos.phaseTwo}</p>
            </div> */}
        </div>
    );
}
