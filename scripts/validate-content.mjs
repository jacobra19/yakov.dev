import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const blogDir = path.join(rootDir, 'blog');

const REQUIRED_FIELDS = ['slug', 'title', 'description', 'authors', 'tags'];

function loadAuthors() {
  const authorsPath = path.join(blogDir, 'authors.yml');
  const authors = parseYaml(fs.readFileSync(authorsPath, 'utf8'));
  return new Set(Object.keys(authors));
}

function listBlogPosts(dir) {
  const posts = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'authors.yml') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      posts.push(...listBlogPosts(fullPath));
      continue;
    }
    if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      posts.push(fullPath);
    }
  }
  return posts;
}

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---')) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const closingIndex = content.indexOf('\n---', 4);
  if (closingIndex === -1) {
    throw new Error(`Unclosed frontmatter in ${filePath}`);
  }

  return parseYaml(content.slice(4, closingIndex));
}

function normalizeAuthors(authors) {
  if (typeof authors === 'string') {
    return [authors];
  }
  if (Array.isArray(authors)) {
    return authors.map((author) => String(author));
  }
  return [];
}

function validatePost(filePath, frontmatter, knownAuthors) {
  const errors = [];
  const relativePath = path.relative(rootDir, filePath);

  for (const field of REQUIRED_FIELDS) {
    const value = frontmatter[field];
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      errors.push(`${relativePath}: missing required frontmatter field "${field}"`);
    }
  }

  if (frontmatter.slug && typeof frontmatter.slug !== 'string') {
    errors.push(`${relativePath}: "slug" must be a string`);
  }

  if (frontmatter.title && typeof frontmatter.title !== 'string') {
    errors.push(`${relativePath}: "title" must be a string`);
  }

  if (frontmatter.description && typeof frontmatter.description !== 'string') {
    errors.push(`${relativePath}: "description" must be a string`);
  }

  const authors = normalizeAuthors(frontmatter.authors);
  if (authors.length === 0 && frontmatter.authors !== undefined) {
    errors.push(`${relativePath}: "authors" must be a string or non-empty array`);
  }

  for (const author of authors) {
    if (!knownAuthors.has(author)) {
      errors.push(
        `${relativePath}: unknown author "${author}" (expected one of: ${[...knownAuthors].join(', ')})`,
      );
    }
  }

  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push(`${relativePath}: "tags" must be an array`);
  }

  return errors;
}

function main() {
  const knownAuthors = loadAuthors();
  const posts = listBlogPosts(blogDir);
  const errors = [];

  if (posts.length === 0) {
    console.error('No blog posts found to validate.');
    process.exit(1);
  }

  for (const postPath of posts) {
    let frontmatter;
    try {
      frontmatter = parseFrontmatter(postPath);
    } catch (error) {
      errors.push(`${path.relative(rootDir, postPath)}: ${error.message}`);
      continue;
    }

    if (frontmatter?.draft === true) {
      continue;
    }

    errors.push(...validatePost(postPath, frontmatter, knownAuthors));
  }

  if (errors.length > 0) {
    console.error('Content validation failed:\n');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${posts.length} blog post(s).`);
}

main();
