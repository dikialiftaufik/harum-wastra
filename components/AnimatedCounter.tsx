"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  onComplete?: () => void;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
  separator = ",",
  className = "",
  onComplete,
}: CounterProps) {
  const [count, setCount] = useState<string>("0");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo for smooth deceleration
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValue = startValue + (end - startValue) * easedProgress;
      const formattedValue = currentValue.toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

      setCount(formattedValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, decimals, onComplete]);

  return (
    <div ref={elementRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
}

export function StatCard({
  icon,
  value,
  label,
  description,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2000,
  delay = 0,
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const cardStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
  };

  return (
    <div
      ref={elementRef}
      className="angka-card flex flex-col items-center rounded-2xl bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={cardStyle}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 text-maroon">
        {icon}
      </div>
      <AnimatedCounter
        end={value}
        duration={duration}
        suffix={suffix}
        prefix={prefix}
        decimals={decimals}
        className="font-display text-4xl font-bold text-maroon sm:text-5xl"
      />
      <p className="mt-2 font-display text-base font-bold text-ink">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
      <span className="mt-4 h-[3px] w-8 rounded-full bg-maroon" />
    </div>
  );
}