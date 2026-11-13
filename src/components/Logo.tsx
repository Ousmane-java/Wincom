/**
 * Logo Wincom.
 * Le « W » est une trajectoire : deux creux (les obstacles) puis un dernier trait
 * qui monte plus haut que le point de départ. Il se termine par un losange champagne :
 * la victoire. Win = gagner.
 */
type MarkProps = {
  className?: string;
  strokeWidth?: number;
  pathClassName?: string;
  diamondClassName?: string;
};

export const MARK_PATH = "M2 9 L10.5 28 L19 13.5 L27.5 28 L37 4";

export function LogoMark({
  className,
  strokeWidth = 2.4,
  pathClassName,
  diamondClassName,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 42 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d={MARK_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
        pathLength={1}
        className={pathClassName}
      />
      <rect
        x="34.6"
        y="-0.4"
        width="4.8"
        height="4.8"
        transform="rotate(45 37 2)"
        fill="var(--champagne)"
        className={diamondClassName}
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[1.1em] w-auto" />
      <span className="font-display text-[1.25em] leading-none tracking-[-0.01em]">
        Win<span className="text-stone">com</span>
      </span>
    </span>
  );
}
