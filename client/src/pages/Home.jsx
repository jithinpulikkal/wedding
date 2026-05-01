import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import IllustrationCard from "../components/IllustrationCard.jsx";
import DetailCard, { buildDetailCards, buildWelcomeCards, buildVenueCards } from "../components/DetailCard.jsx";
import weddingData from "../data/weddingData.js";
import brideGroomImage from "../assets/bridegroom.jpg";
import templeImage from "../assets/temple.png";
import Reveal from "../components/Reveal.jsx";

const WEDDING_TARGET = new Date("2026-09-12T10:45:00+05:30").getTime();
const WEDDING_END = new Date("2026-09-12T12:30:00+05:30").getTime();

function getCountdownParts(targetTime) {
    const difference = targetTime - Date.now();

    if (difference <= 0) {
        return {
            isComplete: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const totalSeconds = Math.floor(difference / 1000);

    return {
        isComplete: false,
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

function formatGoogleCalendarDate(timestamp) {
    return new Date(timestamp)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
    return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export default function Home() {
    const { brand, couple, events, invitation, ceremony, venues } = weddingData;
    const detailCards = buildDetailCards(weddingData);
    const welcomeCards = buildWelcomeCards(weddingData);
    const venueCards = buildVenueCards(weddingData);

    const [heroReady, setHeroReady] = useState(false);
    const [countdown, setCountdown] = useState(() => getCountdownParts(WEDDING_TARGET));
    const handleHeroReady = () => setHeroReady(true);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCountdown(getCountdownParts(WEDDING_TARGET));
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    const weddingVenue = venues[0];
    const eventTitle = `${couple.bride.name} & ${couple.groom.name} Wedding Ceremony`;
    const eventDescription = `${events.wedding.description} ${invitation.closingLine}`;
    const eventLocation = [weddingVenue.name, ...weddingVenue.addressLines].join(", ");
    const googleCalendarLink =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        `&text=${encodeURIComponent(eventTitle)}` +
        `&dates=${formatGoogleCalendarDate(WEDDING_TARGET)}/${formatGoogleCalendarDate(WEDDING_END)}` +
        `&details=${encodeURIComponent(eventDescription)}` +
        `&location=${encodeURIComponent(eventLocation)}`;

    const handleCalendarDownload = () => {
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Raveena and Jithin Wedding//EN",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",
            `UID:wedding-${WEDDING_TARGET}@raveena-jithin`,
            `DTSTAMP:${formatGoogleCalendarDate(Date.now())}`,
            `DTSTART:${formatGoogleCalendarDate(WEDDING_TARGET)}`,
            `DTEND:${formatGoogleCalendarDate(WEDDING_END)}`,
            `SUMMARY:${escapeIcsText(eventTitle)}`,
            `DESCRIPTION:${escapeIcsText(eventDescription)}`,
            `LOCATION:${escapeIcsText(eventLocation)}`,
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");

        const file = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = url;
        link.download = "raveena-jithin-wedding.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div id="top" className="space-y-16  sm:space-y-16 pb-12">
            <section className="mx-auto max-w-6xl px-4 sm:px-5 sm:pt-10">
                <div className="mx-auto max-w-4xl min-w-0 space-y-6 text-center sm:space-y-4">
                    <Reveal animation="fadeInSlow" delay={0}>
                        <p className="break-words md:mt-10 mt-36  text-2xl font-bold uppercase tracking-[0.18em] text-gold sm:text-4xl sm:tracking-[0.35em]">
                            {invitation.title}
                        </p>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={900}>
                        <p className="break-words text-sm uppercase tracking-[0.18em] text-teak/70 sm:text-base sm:tracking-[0.3em]">
                            {brand.subtitle}
                        </p>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={1800}>
                        <p className="text-base text-teak/80 sm:text-xl">{invitation.message1}</p>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={2700}>
                        <h1 className="min-w-0 font-serif text-maroon text-center text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            <span className="block break-words">{couple.bride.name}</span>
                        </h1>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={3600}>
                        <h1 className="min-w-0 font-serif text-maroon text-center text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            <span className="my-2 block text-2xl font-medium text-gold sm:text-3xl lg:text-4xl">&</span>
                        </h1>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={4500}>
                        <h1 className="min-w-0 font-serif text-maroon text-center text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            <span className="block break-words">{couple.groom.name}</span>
                        </h1>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={5400}>
                        <p className="text-base text-teak/80 sm:text-xl">{invitation.message2}</p>
                    </Reveal>
                    <Reveal animation="fadeInSlow" delay={6300}>
                        <p className="text-base text-teak/70 sm:text-xl pt-4">{brand.tagline}</p>
                    </Reveal>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-4 sm:px-5 sm:pt-10">
                <div className="mx-auto max-w-4xl min-w-0 space-y-6 text-center sm:space-y-4">
                    <Reveal animation="fadeInSlow" delay={0}>
                        <div className="rounded-2xl border border-gold/20 bg-parchment/70 p-5 shadow-royal sm:p-6">
                            <p className="text-lg uppercase tracking-[0.3em] text-gold">{events.wedding.title}</p>
                            <p className="mt-3 text-2xl font-serif text-maroon sm:text-3xl">{events.wedding.dateText}</p>
                            <p className="mt-3 text-2xl font-serif text-maroon sm:text-3xl">{events.wedding.timeText}</p>
                            <p className="mt-2 text-xl text-maroon font-semibold">{events.wedding.muhurthamText}</p>
                            <p className="mt-2 text-x text-teak/80">{events.wedding.description}</p>
                        </div>
                    </Reveal>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-5">
                <Reveal animation="scaleIn">
                    <div className="rounded-[2rem] border border-gold/20 bg-gradient-to-br from-parchment via-surface/80 to-parchment/90 p-5 shadow-royal sm:p-7">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-[0.32em] text-gold sm:text-sm">Countdown</p>
                            <p className="mt-2 font-serif text-xl text-maroon sm:text-2xl">{events.wedding.dateText}</p>
                        </div>

                        {countdown.isComplete ? (
                            <div className="mt-6 rounded-2xl bg-maroon px-5 py-6 text-center text-parchment">
                                <p className="text-lg font-semibold sm:text-xl">The wedding celebration has begun.</p>
                            </div>
                        ) : (
                            <div className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-4 sm:gap-4">
                                {[
                                    { label: "Days", value: countdown.days },
                                    { label: "Hours", value: countdown.hours },
                                    { label: "Minutes", value: countdown.minutes },
                                    { label: "Seconds", value: countdown.seconds },
                                ].map((item) => (
                                    <Reveal key={item.label} animation="scaleIn">
                                        <div className="rounded-2xl border border-gold/10 bg-surface/70 px-3 py-4 shadow-sm backdrop-blur sm:px-4 sm:py-5">
                                            <p className="font-serif text-3xl font-bold text-maroon sm:text-4xl">
                                                {String(item.value).padStart(2, "0")}
                                            </p>
                                            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-teak/60 sm:text-xs">
                                                {item.label}
                                            </p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        )}

                        {/* <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <a
                                href={googleCalendarLink}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-maroon px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-parchment transition hover:bg-maroon/90"
                            >
                                Add to Google Calendar
                            </a>
                            <button
                                type="button"
                                onClick={handleCalendarDownload}
                                className="rounded-full border border-gold/30 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-parchment"
                            >
                                Download Calendar File
                            </button>
                        </div> */}
                    </div>
                </Reveal>
            </section>

            <section id="details" className="mx-auto max-w-6xl px-5">
                <SectionHeader
                    eyebrow="Wedding Details"
                    title="A Traditional Kerala Celebration"
                    description={ceremony.intro}
                />

                <div className="mt-10 grid gap-6 md:grid-cols-2 md:auto-rows-fr">
                    {detailCards.map((card) => (
                        <DetailCard key={card.key} {...card} className="h-full" />
                    ))}
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:gap-12">
                <div className="space-y-6">
                    <SectionHeader eyebrow="Welcome" title="A Warm Invitation" description={invitation.welcomeMessage} />
                    <div className="grid gap-4">
                        {welcomeCards.map((card) => (
                            <DetailCard key={card.key} {...card} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="location" className="mx-auto max-w-6xl px-5">
                <SectionHeader
                    eyebrow="Location"
                    title="Venue & Directions"
                    description="Elegant auditorium venue with spacious seating, ample parking, and a well-designed stage for the celebration."
                />
                <div className="grid gap-6 md:grid-cols-2">
                    {venueCards.map((card) => (
                        <DetailCard key={card.key} {...card} />
                    ))}
                </div>
            </section>
        </div>
    );
}
