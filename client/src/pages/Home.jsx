import SectionHeader from "../components/SectionHeader.jsx";
import IllustrationCard from "../components/IllustrationCard.jsx";
import FloralDivider from "../components/FloralDivider.jsx";
import DetailCard, {
    buildDetailCards,
    buildWelcomeCards,
    buildScheduleCard,
    buildVenueCards,
} from "../components/DetailCard.jsx";
import weddingData from "../data/weddingData.js";
import brideGroomImage from "../assets/bridegroom.jpg";
import templeImage from "../assets/temple.png";

export default function Home() {
    const { brand, couple, events, invitation, ceremony } = weddingData;
    const detailCards = buildDetailCards(weddingData);
    const welcomeCards = buildWelcomeCards(weddingData);
    const scheduleCard = buildScheduleCard(weddingData);
    const venueCards = buildVenueCards(weddingData);

    return (
        <div id="top" className="space-y-16 pb-20 sm:space-y-16 sm:pb-24">
            <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:gap-12 sm:pt-10 md:grid-cols-2">
                <div className="space-y-6 sm:space-y-7 animate-fadeUp">
                    <p className="text-4xl font-bold uppercase tracking-[0.35em] text-gold">{invitation.title}</p>
                    <h1 className="text-4xl font-serif text-maroon font-bold sm:text-5xl md:text-6xl">
                        {couple.bride.name} & {couple.groom.name}
                    </h1>
                    <div className="md:hidden">
                        <IllustrationCard
                            title="Bride & Groom"
                            subtitle="Traditional Kerala wedding portrait"
                            imageSrc={brideGroomImage}
                            imageAlt="Bride and groom illustration"
                        />
                    </div>
                    <p className="text-base uppercase tracking-[0.3em] text-teak/70 sm:text-base">{brand.subtitle}</p>
                    <p className="text-lg text-teak/80 sm:text-xl">{invitation.message}</p>
                    <p className="text-base text-teak/70 sm:text-2xl">{brand.tagline}</p>
                    <div className="rounded-2xl border border-gold/20 bg-parchment/70 p-5 shadow-royal sm:p-6">
                        <p className="text-lg uppercase tracking-[0.3em] text-gold">{events.wedding.title}</p>
                        <p className="mt-3 text-2xl font-serif text-maroon sm:text-3xl">{events.wedding.dateText}</p>
                        <p className="mt-3 text-2xl font-serif text-maroon sm:text-3xl">{events.wedding.timeText}</p>
                        <p className="mt-2 text-xl font-extrabold text-teak/70">{events.wedding.muhurthamText}</p>
                        <p className="mt-2 text-x text-teak/80">{events.wedding.description}</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <IllustrationCard
                        title="Bride & Groom"
                        subtitle="Traditional Kerala wedding portrait"
                        imageSrc={brideGroomImage}
                        imageAlt="Bride and groom illustration"
                    />
                </div>
            </section>

            <section id="details" className="mx-auto max-w-6xl px-5">
                <SectionHeader eyebrow="Wedding Details" title="A Royal Kerala Celebration" description={ceremony.intro} />

                <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <IllustrationCard
                            title="Temple Visual"
                            subtitle="Kerala temple ambience"
                            imageSrc={templeImage}
                            imageAlt="Kerala temple illustration"
                        />
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {detailCards.map((card) => (
                            <DetailCard key={card.key} {...card} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-5">
                <SectionHeader
                    eyebrow="Schedule"
                    title="Wedding Day Timeline"
                    description="A gentle flow of ceremonies, rituals, and celebration across the day."
                />
                <DetailCard {...scheduleCard} />
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
                    description="Temple-inspired venue with traditional lamps, gold accents, and floral arrangements."
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
