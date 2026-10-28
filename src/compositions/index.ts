/**
 * Pieces with their own art direction. A composition receives the piece's
 * rendered text as its default slot (never retyped, so the author's words stay
 * exactly as written) and the shared end matter (bio, pager, contents) in the
 * "end" slot. Pieces without an entry use the standard reading page in
 * src/views/Post.astro.
 *
 * Props every composition gets: lang (interface language), post, author, issue.
 */
import VapurDudugu from './VapurDudugu.astro';

const compositions: Record<string, typeof VapurDudugu> = {
  'vapur-dudugu': VapurDudugu,
};

export function compositionFor(slug: string) {
  return compositions[slug];
}
