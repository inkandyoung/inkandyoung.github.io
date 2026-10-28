/**
 * Skills live in .agents/skills (read by Codex). Claude Code reads .claude/skills,
 * which is a copy kept in step by this script. Copies rather than symlinks, because
 * symlinks need developer mode on Windows and do not survive every git setup.
 *
 *   node scripts/sync-skills.mjs          copy .agents/skills → .claude/skills
 *   node scripts/sync-skills.mjs --check  exit 1 if the two differ
 */
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = '.agents/skills';
const DEST = '.claude/skills';

function files(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [relative(dir, path)];
  });
}

const skills = readdirSync(SRC).filter((name) => statSync(join(SRC, name)).isDirectory());

if (process.argv.includes('--check')) {
  const diffs = [];
  for (const skill of skills) {
    const a = files(join(SRC, skill));
    const b = new Set(files(join(DEST, skill)));
    for (const f of a) {
      if (!b.has(f)) diffs.push(`missing ${join(DEST, skill, f)}`);
      else if (!readFileSync(join(SRC, skill, f)).equals(readFileSync(join(DEST, skill, f)))) diffs.push(`differs ${join(DEST, skill, f)}`);
      b.delete(f);
    }
    for (const f of b) diffs.push(`extra ${join(DEST, skill, f)}`);
  }
  if (diffs.length) {
    console.error(diffs.join('\n') + '\nRun: npm run skills:sync');
    process.exit(1);
  }
  console.log(`skills in sync (${skills.length})`);
} else {
  for (const skill of skills) {
    rmSync(join(DEST, skill), { recursive: true, force: true });
    cpSync(join(SRC, skill), join(DEST, skill), { recursive: true });
  }
  console.log(`copied ${skills.length} skills to ${DEST}`);
}
