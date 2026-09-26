// Shared timing for headline reveals (CharacterReveal), so a section can chain its lines and blocks after the words.

/** The step between two words of a headline, in ms (the --stagger-words token on wide screens). */
export const WORD_STEP = 32;

/**
 * Words and the Volt italic: `*phrase*` marks italic words; punctuation right after it (`*Blueprint*.`) stays upright
 * on the same word, so no stray space opens before it.
 */
export function tokenize(text) {
  const tokens = [];
  for (const [, italic, tail, plain] of text.matchAll(/\*([^*]+)\*(\S*)|(\S+)/g)) {
    if (plain) {
      tokens.push({ word: plain, italic: false, tail: '' });
      continue;
    }
    const words = italic.split(/\s+/).filter(Boolean);
    words.forEach((word, index) => tokens.push({ word, italic: true, tail: index === words.length - 1 ? tail : '' }));
  }
  return tokens;
}

/** Seconds until the words of `text` have all started: the delay for the line that continues it. */
export function wordsIn(text) {
  return typeof text === 'string' ? (tokenize(text).length * WORD_STEP) / 1000 : 0;
}
