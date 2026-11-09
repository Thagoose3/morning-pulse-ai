import React, { useEffect, useRef, useState } from 'react';

/** Fades/blurs children in the first time they scroll into view. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ ['--reveal-delay' as string]: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
};

/** Animates a number from its previous value to the new one. */
export const CountUp: React.FC<{
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ value, decimals = 0, duration = 900, prefix = '', suffix = '', className = '' }) => {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    if (reduce || !Number.isFinite(value)) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = value;
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
};

/** Section heading: small mono kicker + large serif title. */
export const SectionHeading: React.FC<{
  kicker: string;
  index?: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}> = ({ kicker, index, title, aside }) => (
  <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
    <div>
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-[#8c7764] mb-3">
        {index && <span className="text-[#b07a2a]">{index}</span>}
        <span className="w-8 h-px bg-[#d9cdbd]" aria-hidden="true" />
        {kicker}
      </p>
      <h3 className="font-serif text-3xl sm:text-[40px] font-bold leading-[1.15] text-[#2a1d14]">{title}</h3>
    </div>
    {aside}
  </div>
);

/** One global pointer listener that feeds --mx/--my to any `.spotlight` element under the cursor. */
export const useSpotlight = () => {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${e.clientX - r.left}px`);
      target.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
};
