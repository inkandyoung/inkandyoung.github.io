import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lang = z.enum(['tr', 'bs', 'en']);
const localized = z.object({ tr: z.string(), bs: z.string(), en: z.string() });

/** One Markdown file per piece, grouped in folders by the language it is written in. */
const posts = defineCollection({
  loader: glob({ base: './src/content/yazilar', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    lang,
    category: z.enum(['siir', 'oyku', 'deneme', 'sanat', 'kultur']),
    author: reference('authors'),
    translator: z.string().optional(),
    issue: z.number().int().positive(),
    date: z.coerce.date(),
    excerpt: z.string(),
    featured: z.boolean().default(false),
    /** Page number in the printed issue, shown in the table of contents. */
    page: z.number().int().positive().optional(),
  }),
});

const issues = defineCollection({
  loader: file('./src/data/issues.json'),
  schema: z.object({
    number: z.number().int().positive(),
    date: z.coerce.date(),
    title: localized,
    intro: localized,
    /** Five colours for the marbled cover: ground, then four paint colours. */
    palette: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).length(5),
    seed: z.number().int(),
  }),
});

/** One JSON file per author; the file name is the id posts refer to. Edited from /admin/. */
const authors = defineCollection({
  loader: glob({ base: './src/content/yazarlar', pattern: '*.json' }),
  schema: z.object({
    name: z.string(),
    city: z.string(),
    writes: z.array(lang).min(1),
    /** Turkish is required; a missing translation falls back to the Turkish text, never a made-up one. */
    bio: z.object({ tr: z.string(), bs: z.string().optional(), en: z.string().optional() }),
  }),
});

export const collections = { posts, issues, authors };
