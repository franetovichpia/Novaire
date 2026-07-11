type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </span>

      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}