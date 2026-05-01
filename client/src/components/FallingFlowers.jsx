const FLOWERS = Array.from({ length: 18 }, (_, index) => {
    const size = 22 + (index % 5) * 8;
    const left = (index * 97) % 100;
    const delay = (index % 6) * -2.1;
    const duration = 14 + (index % 5) * 2.4;
    const drift = ((index % 7) - 3) * 18;
    const rotate = (index % 2 === 0 ? 1 : -1) * (18 + (index % 4) * 9);
    const opacity = 0.3 + (index % 4) * 0.12;

    return {
        id: `flower-${index}`,
        size,
        left,
        delay,
        duration,
        drift,
        rotate,
        opacity,
        className: index % 3 === 0 ? "flower flower-blossom" : "flower flower-petal",
    };
});

export default function FallingFlowers() {
    return (
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
            {FLOWERS.map((flower) => (
                <span
                    key={flower.id}
                    className={flower.className}
                    style={{
                        left: `${flower.left}%`,
                        width: `${flower.size}px`,
                        height: `${flower.size}px`,
                        opacity: flower.opacity,
                        animationDelay: `${flower.delay}s`,
                        animationDuration: `${flower.duration}s`,
                        "--flower-drift": `${flower.drift}px`,
                        "--flower-rotate": `${flower.rotate}deg`,
                    }}
                />
            ))}
        </div>
    );
}
