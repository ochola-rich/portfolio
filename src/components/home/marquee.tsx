import { techIcon } from './tech-icons'

function TechItem({ name }: { name: string }) {
  const icon = techIcon(name)
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-medium whitespace-nowrap text-foreground/70">
      {icon && (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
          <path d={icon.path} />
        </svg>
      )}
      {name}
    </span>
  )
}

export function Marquee({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <div className="marquee-mask overflow-hidden py-7" aria-label="Technologies I work with">
      <ul className="flex w-max animate-marquee gap-12 pr-12 motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <li key={i} aria-hidden={i >= items.length}>
            <TechItem name={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
