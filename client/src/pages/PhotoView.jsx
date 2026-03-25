import { Link, useSearchParams } from "react-router-dom";

export default function PhotoView() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const srcParam = searchParams.get("src");
    const name = searchParams.get("name") || "Wedding Photo";

    const viewUrl = id
        ? `https://drive.google.com/uc?export=view&id=${id}`
        : srcParam;
    const downloadUrl = id
        ? `https://drive.google.com/uc?export=download&id=${id}`
        : searchParams.get("download") || srcParam;
    const thumbUrl = id ? `https://drive.google.com/thumbnail?id=${id}&sz=w2000` : null;

    if (!viewUrl) {
        return (
            <div className="mx-auto max-w-4xl px-5 pb-20 sm:pb-28">
                <h1 className="text-2xl font-serif text-maroon">Photo not found</h1>
                <p className="mt-4 text-teak/80">This photo link is missing or invalid.</p>
                <Link
                    to="/photos"
                    className="mt-6 inline-flex text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                >
                    Back to Photos
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-20 sm:pb-28">
            <Link
                to="/photos"
                className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
            >
                Back to Photos
            </Link>

            <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-gold/20 bg-white/80 p-4 shadow-royal">
                <img
                    src={viewUrl}
                    alt={name}
                    onError={(event) => {
                        if (thumbUrl && event.currentTarget.src !== thumbUrl) {
                            event.currentTarget.src = thumbUrl;
                        }
                    }}
                    className="max-h-[80vh] w-full object-contain"
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-gold">Full Resolution</p>
                    <p className="mt-2 text-lg font-serif text-maroon">{name}</p>
                </div>
                {downloadUrl && (
                    <a
                        href={downloadUrl}
                        download
                        className="inline-flex items-center justify-center rounded-full border border-gold/60 px-6 py-2 text-xs uppercase tracking-[0.35em] text-maroon transition hover:bg-gold/10"
                    >
                        Download
                    </a>
                )}
            </div>
        </div>
    );
}
