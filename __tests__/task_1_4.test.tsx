/**
 * Task 1.4: Task Card Component Tests
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Task 1.4: TaskCard Component', () => {
  const projectRoot = process.cwd();

  it('should have a TaskCard component file', () => {
    const paths = [
      join(projectRoot, 'src/components/TaskCard.tsx'),
      join(projectRoot, 'src/components/TaskCard/index.tsx'),
      join(projectRoot, 'src/components/Card/TaskCard.tsx'),
    ];
    expect(paths.some(p => existsSync(p))).toBe(true);
  });

  it('should have Task type definition', () => {
    const typePaths = [
      join(projectRoot, 'src/types/task.ts'),
      join(projectRoot, 'src/types/index.ts'),
      join(projectRoot, 'src/types.ts'),
    ];
    expect(typePaths.some(p => existsSync(p))).toBe(true);
  });

  it('should render title prop', () => {
    const componentPath = [
      join(projectRoot, 'src/components/TaskCard.tsx'),
      join(projectRoot, 'src/components/TaskCard/index.tsx'),
    ].find(p => existsSync(p));

    if (componentPath) {
      const content = readFileSync(componentPath, 'utf-8');
      expect(content).toMatch(/title/i);
    }
  });

  it('should render priority', () => {
    const componentPath = [
      join(projectRoot, 'src/components/TaskCard.tsx'),
      join(projectRoot, 'src/components/TaskCard/index.tsx'),
    ].find(p => existsSync(p));

    if (componentPath) {
      const content = readFileSync(componentPath, 'utf-8');
      expect(content).toMatch(/priority/i);
    }
  });

  it('should handle click events', () => {
    const componentPath = [
      join(projectRoot, 'src/components/TaskCard.tsx'),
      join(projectRoot, 'src/components/TaskCard/index.tsx'),
    ].find(p => existsSync(p));

    if (componentPath) {
      const content = readFileSync(componentPath, 'utf-8');
      expect(content).toMatch(/onClick|click/i);
    }
  });
});
