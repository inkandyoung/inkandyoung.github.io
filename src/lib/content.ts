import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Issue = CollectionEntry<'issues'>;
export type Author = CollectionEntry<'authors'>;

/** "tr/vapur-dudugu" → "vapur-dudugu". Slugs are unique across languages. */
export function postSlug(post: Post) {
  return post.id.split('/').pop()!;
}

export async function getPosts() {
  const posts = await getCollection('posts');
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || (a.data.page ?? 0) - (b.data.page ?? 0),
  );
}

export async function getIssues() {
  const issues = await getCollection('issues');
  return issues.sort((a, b) => b.data.number - a.data.number);
}

export async function getCurrentIssue() {
  return (await getIssues())[0];
}

export async function getAuthors() {
  const authors = await getCollection('authors');
  return authors.sort((a, b) => a.data.name.localeCompare(b.data.name, 'tr'));
}

export async function getAuthorMap() {
  return new Map((await getAuthors()).map((a) => [a.id, a]));
}

export function postsInIssue(posts: Post[], issue: number) {
  return posts
    .filter((p) => p.data.issue === issue)
    .sort((a, b) => (a.data.page ?? 999) - (b.data.page ?? 999));
}

/** Rough reading time at 200 words a minute. */
export function readingMinutes(post: Post) {
  const words = (post.body ?? '').trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
