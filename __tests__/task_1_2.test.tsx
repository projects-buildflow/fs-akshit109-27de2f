/**
 * Task 1.2: Developer Profile Component Tests
 *
 * This test verifies that the developer profile component exists and is properly structured.
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Task 1.2: Developer Profile', () => {
  const projectRoot = process.cwd();

  // Common paths where students might put the component
  const possiblePaths = [
    'src/components/DeveloperProfile.tsx',
    'src/components/DeveloperProfile/index.tsx',
    'src/components/developer-profile.tsx',
    'src/components/DeveloperProfile/DeveloperProfile.tsx',
    'components/DeveloperProfile.tsx',
    'components/DeveloperProfile/index.tsx',
    'app/components/DeveloperProfile.tsx',
    'src/app/components/DeveloperProfile.tsx',
  ];

  function findComponentFile(): string | null {
    for (const path of possiblePaths) {
      const fullPath = join(projectRoot, path);
      if (existsSync(fullPath)) {
        return fullPath;
      }
    }
    return null;
  }

  function getComponentContent(): string {
    const componentPath = findComponentFile();
    if (!componentPath) {
      throw new Error(
        'DeveloperProfile component not found. Expected in one of:\n' +
        possiblePaths.map(p => '  - ' + p).join('\n')
      );
    }
    return readFileSync(componentPath, 'utf-8');
  }

  it('should have DeveloperProfile component file', () => {
    const componentPath = findComponentFile();
    expect(componentPath).not.toBeNull();
  });

  it('should export DeveloperProfile component', () => {
    const content = getComponentContent();
    const hasExport =
      content.includes('export function DeveloperProfile') ||
      content.includes('export const DeveloperProfile') ||
      content.includes('export default function DeveloperProfile') ||
      content.includes('export default');

    expect(hasExport).toBe(true);
  });

  it('should have required props interface', () => {
    const content = getComponentContent();
    const lowerContent = content.toLowerCase();

    // Must have name prop
    expect(lowerContent).toContain('name');

    // Must have at least one of: role, bio, or github-related prop
    const hasSecondaryProp =
      lowerContent.includes('role') ||
      lowerContent.includes('bio') ||
      lowerContent.includes('githubusername') ||
      lowerContent.includes('github_username');

    expect(hasSecondaryProp).toBe(true);
  });

  it('should render an image element for avatar', () => {
    const content = getComponentContent();

    // Must actually use an image element - either:
    // 1. Next.js Image component: <Image or Image from 'next/image'
    // 2. HTML img tag: <img
    // 3. Avatar component from UI library that renders an image
    const hasImageElement =
      /<Image\s/.test(content) ||                           // Next.js Image component
      /from\s+['"]next\/image['"]/.test(content) ||         // Import from next/image
      /<img\s/.test(content) ||                             // HTML img tag
      /Avatar/.test(content);                               // UI library Avatar component

    expect(hasImageElement).toBe(true);
  });
});
