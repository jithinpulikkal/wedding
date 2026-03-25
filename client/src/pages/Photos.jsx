import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import weddingData from "../data/weddingData.js";

const placeholderPhotos = Array.from({ length: weddingData.photos.placeholderCount }, (_, index) => index + 1);

function hasAnyImages(groups) {
    return groups.some((group) => group.categories?.some((category) => category.items?.length));
}

export default function Photos() {
    const { side } = useParams();
    const [photoState, setPhotoState] = useState({
        status: "loading",
        groups: [],
        message: "",
    });

    useEffect(() => {
        let isActive = true;

        async function loadPhotos() {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE || "";
                const response = await fetch(`${baseUrl}/api/photos`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load photos.");
                }

                if (isActive) {
                    const groups = data.groups || [];
                    setPhotoState({
                        status: hasAnyImages(groups) ? "ready" : "empty",
                        groups,
                        message: "",
                    });
                }
            } catch (error) {
                if (isActive) {
                    setPhotoState({
                        status: "error",
                        groups: [],
                        message: error.message,
                    });
                }
            }
        }

        loadPhotos();

        return () => {
            isActive = false;
        };
    }, []);

    const selectedGroup = useMemo(() => {
        if (!side) {
            return null;
        }
        const normalizedSide = side.toLowerCase();
        const directMatch = photoState.groups.find((group) => group.name?.toLowerCase() === normalizedSide);
        if (directMatch) {
            return directMatch;
        }
        return photoState.groups.find((group) => group.name?.toLowerCase().includes(normalizedSide));
    }, [photoState.groups, side]);

    const sideHasPhotos = selectedGroup?.categories?.some((category) => category.items?.length);

    return (
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
            <SectionHeader
                eyebrow="Photos"
                title={side ? `${side} Side Memories` : "Wedding Memories"}
                description={weddingData.photos.notice}
            />

            {photoState.status === "ready" && !side && (
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

            {side && (
                <div className="mb-10">
                    <Link to="/photos" className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon">
                        Back to Photos Overview
                    </Link>
                </div>
            )}

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

            {photoState.status === "ready" && side && !selectedGroup && (
                <div className="rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    No matching photo group found for �{side}�.
                </div>
            )}

            {photoState.status === "ready" && side && selectedGroup && (
                <div className="space-y-12">
                    {selectedGroup.categories.map((category) => (
                        <div key={`${selectedGroup.name}-${category.name}`}>
                            <p className="text-xs uppercase tracking-[0.35em] text-gold">{category.name}</p>
                            {category.items.length ? (
                                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {category.items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.viewUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group overflow-hidden rounded-2xl border border-gold/20 bg-white/70 shadow-royal transition hover:border-gold/50 hover:shadow-xl"
                                        >
                                            <div className="aspect-[4/3] w-full overflow-hidden bg-ivory">
                                                <img
                                                    src={item.thumbUrl || item.viewUrl}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            {/* <div className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-teak/80">
                                                {item.name}
                                            </div> */}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 text-sm text-teak/70">Photos for this section will appear soon.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {photoState.status === "empty" && !side && (
                <div>
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
                </div>
            )}

            {photoState.status === "empty" && side && (
                <div className="mt-6 rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-gold shadow-royal">
                    Photos are uploading for this side.
                </div>
            )}

            {photoState.status === "ready" && !side && (
                <div className="mt-12 rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal sm:p-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-gold">Choose a side to view albums</p>
                    <p className="mt-4 leading-relaxed text-teak/80">
                        Photos are now live. Select Bride or Groom to view each collection.
                    </p>
                </div>
            )}

            {photoState.status === "ready" && side && !sideHasPhotos && (
                <div className="mt-12 rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal sm:p-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-gold">Photos Uploading</p>
                    <p className="mt-4 leading-relaxed text-teak/80">Photos for this side will appear soon.</p>
                </div>
            )}
        </div>
    );
}
