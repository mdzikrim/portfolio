import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  /** Small monospace kicker above the title, e.g. "02 — About". */
  index: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, index, title, lead, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{index}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lead}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
