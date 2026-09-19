import type { SVGAttributes } from "react";

type FloralDecorationProps = SVGAttributes<SVGSVGElement> & {
  variant?: "corner" | "sprig" | "branch";
  className?: string;
  flip?: boolean;
};

/**
 * Hand-authored line-art floral illustrations (leaves + small blossoms)
 * used around section edges and corners. Colors are inherited via
 * `currentColor` / Tailwind text-color utilities so the same markup can be
 * tinted sage or gold depending on context.
 */
export default function FloralDecoration({
  variant = "corner",
  className = "",
  flip = false,
  ...rest
}: FloralDecorationProps) {
  const transform = flip ? "scale(-1,1)" : undefined;

  if (variant === "sprig") {
    return (
      <svg
        viewBox="0 0 80 80"
        className={className}
        style={{ transform }}
        fill="none"
        aria-hidden
        {...rest}
      >
        <path
          d="M40 74 C40 54 40 40 40 20"
          stroke="currentColor"
          strokeWidth={1.2}
          opacity={0.7}
        />
        <path
          d="M40 46 C30 40 24 32 26 22"
          stroke="currentColor"
          strokeWidth={1.1}
          fill="currentColor"
          fillOpacity={0.12}
          opacity={0.75}
        />
        <path
          d="M40 34 C50 28 56 20 54 10"
          stroke="currentColor"
          strokeWidth={1.1}
          fill="currentColor"
          fillOpacity={0.12}
          opacity={0.75}
        />
        <circle cx="40" cy="16" r="6" fill="currentColor" fillOpacity={0.5} />
        <circle cx="40" cy="16" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "branch") {
    return (
      <svg
        viewBox="0 0 200 60"
        className={className}
        style={{ transform }}
        fill="none"
        aria-hidden
        {...rest}
      >
        <path
          d="M2 40 C50 20 120 46 198 12"
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.6}
        />
        {[24, 62, 100, 138, 176].map((x, i) => (
          <g key={x} opacity={0.75}>
            <path
              d={`M${x} ${i % 2 === 0 ? 34 : 26} q -8 -14 -18 -12`}
              stroke="currentColor"
              strokeWidth={1}
              fill="currentColor"
              fillOpacity={0.1}
            />
            <circle
              cx={x}
              cy={i % 2 === 0 ? 30 : 22}
              r={i % 2 === 0 ? 4 : 3}
              fill="currentColor"
              fillOpacity={0.45}
            />
          </g>
        ))}
      </svg>
    );
  }

  // "corner" — a fuller floral cluster for framing screen corners
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      style={{ transform }}
      fill="none"
      aria-hidden
      {...rest}
    >
      <path
        d="M4 4 C40 6 60 26 62 62"
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.55}
      />
      <path
        d="M8 8 C50 10 90 20 120 8"
        stroke="currentColor"
        strokeWidth={0.8}
        opacity={0.35}
      />
      {/* leaves */}
      <path
        d="M20 20 C10 30 8 44 18 54 C28 44 26 30 20 20 Z"
        fill="currentColor"
        fillOpacity={0.14}
        stroke="currentColor"
        strokeWidth={0.8}
      />
      <path
        d="M46 12 C38 24 38 38 50 46 C58 34 56 20 46 12 Z"
        fill="currentColor"
        fillOpacity={0.14}
        stroke="currentColor"
        strokeWidth={0.8}
      />
      {/* small blossoms */}
      <g transform="translate(30,30)">
        <circle r="9" fill="currentColor" fillOpacity={0.5} />
        <circle r="3" fill="currentColor" />
      </g>
      <g transform="translate(58,18)" opacity={0.8}>
        <circle r="5" fill="currentColor" fillOpacity={0.5} />
        <circle r="1.8" fill="currentColor" />
      </g>
      <g transform="translate(14,54)" opacity={0.7}>
        <circle r="4" fill="currentColor" fillOpacity={0.5} />
        <circle r="1.4" fill="currentColor" />
      </g>
    </svg>
  );
}
