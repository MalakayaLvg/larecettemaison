// Numbered steps (01, 02…) with a top border, as in the wireframe's "Étapes" blocks.
export function Steps({
  items,
  columns = "lg:grid-cols-4",
}: {
  items: { title?: string; text?: string }[];
  columns?: string;
}) {
  return (
    <ol className={`grid gap-6 sm:grid-cols-2 ${columns}`}>
      {items.map((item, index) => (
        <li key={index} className="space-y-3 border-t border-black/15 pt-6">
          <p className="text-lg font-medium opacity-70">{String(index + 1).padStart(2, "0")}</p>
          {item.title && <p className="text-2xl font-black">{item.title}</p>}
          {item.text && <p className="opacity-80">{item.text}</p>}
        </li>
      ))}
    </ol>
  );
}
