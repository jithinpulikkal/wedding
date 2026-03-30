import useInView from "../hooks/useInView.js";

const animationClasses = {
    fadeUp: "motion-safe:animate-fadeUp",
    fadeIn: "motion-safe:animate-fadeIn",
    scaleIn: "motion-safe:animate-scaleIn"
};

const hiddenClasses = {
    fadeUp: "motion-safe:opacity-0 motion-safe:translate-y-4",
    fadeIn: "motion-safe:opacity-0",
    scaleIn: "motion-safe:opacity-0 motion-safe:scale-95"
};

export default function Reveal({ children, className = "", animation = "fadeUp" }) {
    const [ref, isVisible] = useInView();
    const showClass = animationClasses[animation] || animationClasses.fadeUp;
    const hideClass = hiddenClasses[animation] || hiddenClasses.fadeUp;

    return (
        <div ref={ref} className={`${className} ${isVisible ? showClass : hideClass}`}>
            {children}
        </div>
    );
}
