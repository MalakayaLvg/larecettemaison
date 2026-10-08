// Numbered steps (01, 02…) under a thick navy rule (Figma "Pilier", V4).
export function Steps({
  items,
  columns = "lg:grid-cols-4",
}: {
  items: { title?: string; text?: string }[];
  columns?: string;
}) {
  return (
    <ol className={`grid gap-8 sm:grid-cols-2 ${columns}`}>
      {items.map((item, index) => (
        <li key={index} className="flex flex-col gap-3 border-t-4 border-ink pt-6">
          <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.02em] text-brand-dark">
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.title && <p className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{item.title}</p>}
          {item.text && <p className="text-lg leading-[1.55] text-ink-soft">{item.text}</p>}
        </li>
      ))}
    </ol>
  );
}
