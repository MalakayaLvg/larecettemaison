// Lo-fi image slot from the wireframe (Figma "WF/Image"): the label describes the expected
// visual until real photos are provided.
export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded bg-foreground/10 p-6 text-center text-sm font-medium opacity-70 ${className}`}
    >
      {label}
    </div>
  );
}
