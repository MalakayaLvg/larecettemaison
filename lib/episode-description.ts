// The Ausha descriptions are HTML written in the Ausha editor. They end with the same
// boilerplate on every episode (credits, social links, "Hébergé par Ausha"), which starts
// at the "Production, réalisation…" credit line.
const BOILERPLATE = /Production, r[ée]alisation|H[ée]berg[ée] par Ausha/i;

const ALLOWED_TAGS = new Set(["p", "br", "ul", "ol", "li", "a", "b", "strong", "em", "i", "u"]);

// Returns HTML that is safe to inject: allowed tags are rebuilt without attributes (except a
// checked href on links), every other tag is dropped and any stray "<" is escaped.
export function cleanRssDescription(html: string): string {
  return sanitize(withoutBoilerplate(html))
    .replace(/<p>(\s|<br>)*<\/p>/g, "")
    .trim();
}

function withoutBoilerplate(html: string): string {
  const marker = BOILERPLATE.exec(html);
  if (!marker) return html;
  const paragraphStart = html.lastIndexOf("<p", marker.index);
  return html.slice(0, paragraphStart === -1 ? marker.index : paragraphStart);
}

function sanitize(html: string): string {
  return html.replace(
    /<(\/?)([a-z0-9]+)\b([^>]*)>|</gi,
    (match, closing: string | undefined, name: string | undefined, attributes: string) => {
      if (!name) return "&lt;";
      const tag = name.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (tag !== "a" || closing) return `<${closing}${tag}>`;

      const href = /\bhref\s*=\s*"([^"]*)"/i.exec(attributes)?.[1];
      return href && /^(https?:|mailto:)/i.test(href)
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">`
        : "<a>";
    },
  );
}

// For <meta name="description">: no tags, decoded entities, cut on a word boundary.
export function toExcerpt(html: string, maxLength = 160): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(" ", maxLength - 1))}…`;
}
