import type { SVGAttributes } from "react";

type IslamicPatternProps = SVGAttributes<SVGSVGElement> & {
  variant?: "star" | "arch" | "dome" | "divider";
  className?: string;
  color?: string;
};

/**
 * Lightweight inline SVG library of Islamic geometric motifs. Kept as
 * hand-authored vector paths (no external assets) so the invitation stays
 * fully self-contained and fast on mobile.
 */
export default function IslamicPattern({
  variant = "star",
  className = "",
  color = "currentColor",
  ...rest
}: IslamicPatternProps) {
  if (variant === "star") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke={color}
        strokeWidth={0.9}
        aria-hidden
        {...rest}
      >
        <polygon points="50,4 61,32 91,32 66,50 76,80 50,62 24,80 34,50 9,32 39,32" />
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="24" />
      </svg>
    );
  }

  if (variant === "dome") {
    return (
      <svg
        viewBox="0 0 200 120"
        className={className}
        fill="none"
        stroke={color}
        strokeWidth={1}
        aria-hidden
        {...rest}
      >
        <path d="M0 118 H200" />
        <path d="M20 118 V70 C20 40 35 25 50 25 C65 25 80 40 80 70 V118" />
        <path d="M120 118 V60 C120 20 140 4 150 4 C160 4 180 20 180 60 V118" />
        <path d="M150 4 L150 -6" />
        <circle cx="150" cy="-8" r="3" />
        <path d="M95 118 V95 C95 85 100 80 105 80 C110 80 115 85 115 95 V118" />
      </svg>
    );
  }

  if (variant === "divider") {
    return (
      <svg
        viewBox="0 0 240 24"
        className={className}
        fill="none"
        stroke={color}
        strokeWidth={1}
        aria-hidden
        {...rest}
      >
        <line x1="0" y1="12" x2="90" y2="12" />
        <line x1="150" y1="12" x2="240" y2="12" />
        <polygon points="120,2 128,12 120,22 112,12" />
        <circle cx="105" cy="12" r="2" />
        <circle cx="135" cy="12" r="2" />
      </svg>
    );
  }

  // "arch" — a mihrab-style arch outline, used to frame photos or cards
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={1}
      aria-hidden
      {...rest}
    >
      <path d="M6 158 V70 C6 30 30 8 60 8 C90 8 114 30 114 70 V158" />
      <path d="M18 158 V72 C18 38 36 20 60 20 C84 20 102 38 102 72 V158" />
      <path d="M60 8 L60 -2" />
    </svg>
  );
}
