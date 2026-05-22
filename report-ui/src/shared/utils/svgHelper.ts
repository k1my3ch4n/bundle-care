export function createSVGElement<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {}
): SVGElementTagNameMap[K] {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

export function truncateLabel(name: string, maxChars = 20, displayChars = 18): string {
  return name.length > maxChars ? name.slice(0, displayChars) + "…" : name;
}
