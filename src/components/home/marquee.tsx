export function Marquee({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <div className="marquee-mask overflow-hidden py-7" aria-label="Technologies I work with">
      <ul className="flex w-max animate-marquee gap-14 pr-14 motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="font-display text-xl font-medium tracking-wide whitespace-nowrap text-foreground/70"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
