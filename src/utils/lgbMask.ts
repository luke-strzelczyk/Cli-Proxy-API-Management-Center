/**
 * letsgobold: e-mail addresses are never shown in full on the quota view — the screen gets
 * shared and recorded. `claude-jan.kowalski@firma.example.pl.json` → `claude-j•••@f•••.pl.json`:
 * first letter of the local part, first letter of the domain, the last label(s) kept so the
 * file is still recognisable. Display only; search, cache keys and API calls use real names.
 */
const PREFIX =
  /^((?:claude|codex|gemini-cli|gemini|antigravity|aistudio|vertex|kimi|xai|grok|devin|muse|meta|qwen|iflow)-(?:[0-9a-f]{8}-)?)/i;
const EMAIL = /([A-Za-z0-9._%+-]+)@([A-Za-z0-9-]+)((?:\.[A-Za-z0-9-]+)+)/g;

const maskAddress = (_all: string, local: string, domain: string, rest: string): string => {
  const labels = rest.split('.').filter(Boolean);
  const keep = labels[labels.length - 1]?.toLowerCase() === 'json' ? 2 : 1;
  return `${local[0]}•••@${domain[0]}•••.${labels.slice(-keep).join('.')}`;
};

export function maskEmails(text: string): string {
  if (!text || !text.includes('@')) return text;
  const prefix = text.match(PREFIX)?.[1] ?? '';
  return prefix + text.slice(prefix.length).replace(EMAIL, maskAddress);
}
