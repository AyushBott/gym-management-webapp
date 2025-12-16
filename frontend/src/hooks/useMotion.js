import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-based reveal animations
 * Implements luxury motion principles: subtle, slow, consistent
 */
export const useScrollReveal = (options = {}) => {
    const {
        threshold = 0.15,
        triggerOnce = true,
        rootMargin = '0px 0px -50px 0px'
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const element = ref.current;
            if (!element) return;

            // Respect reduced motion preferences
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                setIsVisible(true);
                return;
            }

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!triggerOnce) {
                        setIsVisible(false);
                    }
                },
                { threshold, rootMargin }
            );

            observer.observe(element);
            return () => observer.disconnect();
        } catch (error) {
            console.error('useScrollReveal error:', error);
            setIsVisible(true); // Show content on error
        }
    }, [threshold, triggerOnce, rootMargin]);

    return [ref, isVisible];
};

/**
 * Hook for counting up numbers when visible
 */
export const useCountUp = (target, duration = 1200) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useScrollReveal({ triggerOnce: true });

    useEffect(() => {
        if (!isVisible) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setCount(target);
            return;
        }

        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, target, duration]);

    return [ref, count];
};

/**
 * Hook for staggering children animations
 */
export const useStagger = (itemCount, baseDelay = 0, staggerDelay = 100) => {
    const [ref, isVisible] = useScrollReveal({ triggerOnce: true });

    const getDelay = (index) => {
        return baseDelay + (index * staggerDelay);
    };

    return [ref, isVisible, getDelay];
};
