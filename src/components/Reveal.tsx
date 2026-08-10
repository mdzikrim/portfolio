"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds, handy for lists of cards. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades content in as it scrolls into view.
 *
 * The visible state is written straight to the DOM node instead of React state:
 * this is a purely visual effect, it should not trigger a re-render, and it
 * degrades to "just show everything" when IntersectionObserver is missing.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
