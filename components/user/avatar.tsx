export type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  src?: string;
};

const sizeClassMap: Record<Required<AvatarProps>["size"], string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-lg",
};

export function Avatar({ name, size = "md", className = "", src }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-sky-500/10 font-semibold text-sky-400 ${sizeClassMap[size]} ${className}`.trim()}
      aria-hidden
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        initials || "?"
      )}
    </div>
  );
}
