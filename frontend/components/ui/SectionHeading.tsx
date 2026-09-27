type SectionHeadingAlignment = "left" | "center" | "right";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: SectionHeadingAlignment;
  className?: string;
  titleId?: string;
};

const alignmentClasses: Record<SectionHeadingAlignment, string> = {
  left: "text-left items-start",
  center: "text-center items-center mx-auto",
  right: "text-right items-end ml-auto",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  alignment = "left",
  className = "",
  titleId,
}: SectionHeadingProps) {
  const align = alignmentClasses[alignment];

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${align} ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
