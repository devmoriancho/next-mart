interface SectionHeaderProps {
  title: string;
  subTitle?: string;
}

export default function SectionHeader({ title, subTitle }: SectionHeaderProps) {
  return (
    <div className="mx-auto text-center max-w-2xl py-8 sm:py-14">
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subTitle && (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {subTitle}
        </p>
      )}
    </div>
  );
}
