/**
 * A deliberately tiny TypeScript highlighter for the one code sample on the site.
 * Runs at build time in a Server Component, so it ships zero JS (instead of Shiki/Prism).
 */
export type Token = { kind: "comment" | "string" | "keyword" | "number" | "fn" | "plain"; text: string };

const KEYWORDS = new Set([
  "const",
  "let",
  "await",
  "async",
  "if",
  "return",
  "new",
  "import",
  "from",
  "export",
  "function",
  "throw",
  "true",
  "false",
]);

const PATTERN =
  /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|\b(\d+)\b|\b([A-Za-z_$][\w$]*)(?=\s*\()|\b([A-Za-z_$][\w$]*)\b/g;

export function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(PATTERN)) {
    const index = m.index ?? 0;
    if (index > last) tokens.push({ kind: "plain", text: code.slice(last, index) });
    const [text, comment, str, num, fn, word] = m;
    if (comment) tokens.push({ kind: "comment", text });
    else if (str) tokens.push({ kind: "string", text });
    else if (num) tokens.push({ kind: "number", text });
    else if (fn) tokens.push({ kind: KEYWORDS.has(fn) ? "keyword" : "fn", text });
    else if (word) tokens.push({ kind: KEYWORDS.has(word) ? "keyword" : "plain", text });
    last = index + text.length;
  }
  if (last < code.length) tokens.push({ kind: "plain", text: code.slice(last) });
  return tokens;
}
