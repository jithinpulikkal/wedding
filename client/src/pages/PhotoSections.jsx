import { Link, useParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import weddingData from "../data/weddingData.js";
import usePhotoData from "../hooks/usePhotoData.js";
import { findGroup } from "../utils/photos.js";

const fallbackSections = ["Wedding", "Reception", "Highlights"];

export default function PhotoSections() {
    const { side } = useParams();
    const photoState = usePhotoData();
    const group = findGroup(photoState.groups, side);

    return (
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
            <SectionHeader
                eyebrow="Photos"
                title={side ? `${side} Side Sections` : "Photo Sections"}
                description={weddingData.photos.notice}
            />

            <div className="mb-10">
                <Link
                    to="/photos"
                    className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                >
                    Back to Photos Overview
                </Link>
            </div>

            {photoState.status === "loading" && (
                <div className="rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-gold shadow-royal">
                    Loading sections...
                </div>
            )}

            {photoState.status === "error" && (
                <div className="rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    {photoState.message}
                </div>
            )}

            {photoState.status !== "loading" && !group && (
                <div className="rounded-2xl border border-gold/20 bg-white/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    No matching photo group found for “{side}”.
                </div>
            )}

            {photoState.status !== "loading" && group && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(group.categories?.length ? group.categories : fallbackSections).map(
                        (section) => {
                            const sectionName = typeof section === "string" ? section : section.name;
                            return (
                                <Link
                                    key={sectionName}
                                    to={`/photos/${side}/${encodeURIComponent(sectionName.toLowerCase())}`}
                                    className="group rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal transition hover:border-gold/50 hover:shadow-xl"
                                >
                                    <p className="text-xs uppercase tracking-[0.35em] text-gold">
                                        {sectionName}
                                    </p>
                                    <p className="mt-4 text-sm text-teak/80">
                                        View {sectionName.toLowerCase()} moments from the {side} side.
                                    </p>
                                </Link>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}
