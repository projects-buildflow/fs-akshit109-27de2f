/**
 * Task 1.5: Column Component Tests
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Task 1.5: Column Component', () => {
  const projectRoot = process.cwd();

  it('should have a Column component file', () => {
    const paths = [
      join(projectRoot, 'src/components/Column.tsx'),
      join(projectRoot, 'src/components/Column/index.tsx'),
      join(projectRoot, 'src/components/Board/Column.tsx'),
    ];
    expect(paths.some(p => existsSync(p))).toBe(true);
  });

  it('should render column title', () => {
    const componentPath = [
      join(projectRoot, 'src/components/Column.tsx'),
      join(projectRoot, 'src/components/Column/index.tsx'),
    ].find(p => existsSync(p));

    if (componentPath) {
      const content = readFileSync(componentPath, 'utf-8');
      expect(content).toMatch(/title/i);
    }
  });

  it('should display task count', () => {
    const componentPath = [
      join(projectRoot, 'src/components/Column.tsx'),
      join(projectRoot, 'src/components/Column/index.tsx'),
    ].find(p => existsSync(p));

    if (componentPath) {
      const content = readFileSync(componentPath, 'utf-8');
      expect(content).toMatch(/count|length|taskIds/i);
    }
  });

  it('should render children (TaskCards)', () => {
    const componentPath = [
      join(projectRoot, 'src/components/Column.tsx'),
      join(projectRoot, 'src/components/Column/index.tsx'),
    ].find(p => existsSync(p));

    if (componentPath) {
      const content = readFileSync(componentPath, 'utf-8');
      expect(content).toMatch(/children/i);
    }
  });
});
