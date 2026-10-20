import { branches, type Branch } from "@/lib/data";

export default function BranchMapSingle({ branch }: { branch: Branch }) {
  return (
    <svg viewBox="0 0 800 520" aria-hidden="true" focusable="false">
      <rect width="800" height="520" fill="#17181b" rx="16" />

      <g stroke="rgba(245,243,239,0.1)" strokeWidth="30">
        <path d="M-40 118H840" />
        <path d="M-40 300H840" />
        <path d="M-40 442H840" />
        <path d="M182 -40V560" />
        <path d="M520 -40V560" />
        <path d="M700 -40V560" />
      </g>

      <g stroke="rgba(245,243,239,0.2)" strokeWidth="2" strokeDasharray="12 12">
        <path d="M-40 210H840" />
        <path d="M640 -40V560" />
      </g>

      <path
        d="M-30 386C150 340 250 470 420 438S660 316 830 344"
        stroke="rgba(255,212,0,0.3)"
        strokeWidth="3"
        strokeDasharray="12 14"
        fill="none"
      />

      {branches.map((b) => {
        const isActive = b.slug === branch.slug;
        return (
          <g
            key={b.slug}
            transform={`translate(${b.pin.x}, ${b.pin.y})`}
            opacity={isActive ? 1 : 0.32}
          >
            {isActive && <circle r="34" fill="rgba(255,212,0,0.12)" />}
            <circle
              r={isActive ? 19 : 12}
              fill={isActive ? "#FFD400" : "#111214"}
              stroke={isActive ? "#FFD400" : "rgba(245,243,239,0.55)"}
              strokeWidth="2"
            />
            {isActive && (
              <text
                textAnchor="middle"
                dy="5"
                fontSize="14"
                fontWeight="700"
                fill="#111214"
                fontFamily="Onest, sans-serif"
              >
                S1
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
