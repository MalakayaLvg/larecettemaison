export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {children && <div className="mt-4 max-w-2xl opacity-80">{children}</div>}
    </div>
  );
}
