import { cloneElement, isValidElement } from "react";
import useInView from "../hooks/useInView.js";

const hiddenClasses = {
    fadeUp: "opacity-0 translate-y-8",
    fadeIn: "opacity-0",
    fadeInSlow: "opacity-0",
    scaleIn: "opacity-0 scale-95",
};

const visibleClasses = {
    fadeUp: "opacity-100 translate-y-0",
    fadeIn: "opacity-100",
    fadeInSlow: "opacity-100",
    scaleIn: "opacity-100 scale-100",
};

export default function Reveal({
    children,
    className = "",
    animation = "fadeUp",
    asChild = false,
    threshold = 0.12,
    rootMargin = "-12% 0px -12% 0px",
    duration = 8000,
}) {
    const [ref, isVisible] = useInView({ threshold, rootMargin, once: false });
    const hiddenClass = hiddenClasses[animation] || hiddenClasses.fadeUp;
    const visibleClass = visibleClasses[animation] || visibleClasses.fadeUp;
    const stateClass = isVisible ? visibleClass : hiddenClass;
    const classes = `transform-gpu transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none ${stateClass} ${className}`.trim();
    const style = {
        transitionDuration: `${duration}ms`,
        willChange: "opacity, transform",
    };

    if (asChild && isValidElement(children)) {
        const childClassName = children.props.className || "";

        return cloneElement(children, {
            ref,
            className: `${childClassName} ${classes}`.trim(),
            style: {
                ...style,
                ...children.props.style,
            },
        });
    }

    return (
        <div ref={ref} className={classes} style={style}>
            {children}
        </div>
    );
}
