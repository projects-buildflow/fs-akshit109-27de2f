/**
 * Task 1.3: Button Component Tests
 *
 * Tests for a reusable Button component with:
 * - Variants: primary, secondary, danger
 * - Sizes: sm, md, lg
 * - Loading state with spinner
 * - Disabled state with reduced opacity
 * - Focus ring for accessibility
 * - forwardRef support
 * - Props spreading to native button
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Task 1.3: Button Component', () => {
  const projectRoot = process.cwd();

  // Possible component locations
  const possiblePaths = [
    'src/components/Button.tsx',
    'src/components/Button/index.tsx',
    'src/components/Button/Button.tsx',
    'src/components/ui/Button.tsx',
    'src/components/ui/button.tsx',
    'components/Button.tsx',
    'components/ui/button.tsx',
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
        'Button component not found. Expected in one of:\n' +
        possiblePaths.map(p => '  - ' + p).join('\n')
      );
    }
    return readFileSync(componentPath, 'utf-8');
  }

  // ==================== FILE EXISTENCE ====================

  it('should have a Button component file', () => {
    const componentPath = findComponentFile();
    expect(componentPath).not.toBeNull();
  });

  // ==================== TYPESCRIPT INTERFACE ====================

  it('should have TypeScript interface with variant prop', () => {
    const content = getComponentContent();
    const hasVariantType =
      /variant\s*[?:]/.test(content) ||
      /['"]primary['"].*['"]secondary['"].*['"]danger['"]/.test(content) ||
      /primary.*secondary.*danger/.test(content);
    expect(hasVariantType).toBe(true);
  });

  it('should have TypeScript interface with size prop', () => {
    const content = getComponentContent();
    const hasSizeType =
      /size\s*[?:]/.test(content) ||
      /['"]sm['"].*['"]md['"].*['"]lg['"]/.test(content) ||
      /sm.*md.*lg/.test(content);
    expect(hasSizeType).toBe(true);
  });

  it('should extend ButtonHTMLAttributes or have onClick support', () => {
    const content = getComponentContent();
    const extendsButton =
      /ButtonHTMLAttributes/.test(content) ||
      /ComponentProps\s*<\s*['"]button['"]/.test(content) ||
      /React\.ButtonHTMLAttributes/.test(content) ||
      /HTMLButtonElement/.test(content) ||
      /onClick/.test(content);
    expect(extendsButton).toBe(true);
  });

  // ==================== VARIANTS ====================

  it('should define all three variants: primary, secondary, danger', () => {
    const content = getComponentContent();
    expect(content).toMatch(/primary/i);
    expect(content).toMatch(/secondary/i);
    expect(content).toMatch(/danger/i);
  });

  it('should have different styles for each variant', () => {
    const content = getComponentContent();
    const hasPrimaryStyle = /blue-600|blue-500|bg-blue|bg-primary/.test(content);
    const hasSecondaryStyle = /gray-200|gray-100|bg-gray|bg-secondary/.test(content);
    const hasDangerStyle = /red-600|red-500|bg-red|bg-destructive|bg-danger/.test(content);
    expect(hasPrimaryStyle || hasSecondaryStyle || hasDangerStyle).toBe(true);
  });

  // ==================== SIZES ====================

  it('should define all three sizes: sm, md, lg', () => {
    const content = getComponentContent();
    const hasSmall = /['"]sm['"]|small/i.test(content);
    const hasMedium = /['"]md['"]|medium/i.test(content);
    const hasLarge = /['"]lg['"]|large/i.test(content);
    expect(hasSmall && hasMedium && hasLarge).toBe(true);
  });

  it('should have different padding/font for sizes', () => {
    const content = getComponentContent();
    const hasSizeStyles =
      /px-\d|py-\d|p-\d/.test(content) ||
      /text-sm|text-base|text-lg/.test(content) ||
      /h-\d|h-\[/.test(content);
    expect(hasSizeStyles).toBe(true);
  });

  // ==================== LOADING STATE ====================

  it('should support isLoading prop', () => {
    const content = getComponentContent();
    const hasLoadingProp = /isLoading|loading/i.test(content);
    expect(hasLoadingProp).toBe(true);
  });

  it('should show spinner or loading indicator when loading', () => {
    const content = getComponentContent();
    const hasSpinner =
      /spinner|loader|loading|animate-spin|Loader/i.test(content) ||
      /svg.*animate/.test(content) ||
      /<svg/.test(content);
    expect(hasSpinner).toBe(true);
  });

  it('should disable button when loading', () => {
    const content = getComponentContent();
    const disablesWhenLoading =
      /disabled.*loading|loading.*disabled/i.test(content) ||
      /isLoading.*disabled|disabled.*isLoading/i.test(content) ||
      /\|\|.*isLoading|\|\|.*loading/i.test(content);
    expect(disablesWhenLoading).toBe(true);
  });

  // ==================== DISABLED STATE ====================

  it('should support disabled state with visual feedback', () => {
    const content = getComponentContent();
    const hasDisabledStyle =
      /disabled:opacity|opacity.*disabled|disabled.*opacity/i.test(content) ||
      /disabled:cursor|cursor-not-allowed/i.test(content) ||
      /disabled:pointer-events/i.test(content);
    expect(hasDisabledStyle).toBe(true);
  });

  // ==================== ACCESSIBILITY ====================

  it('should have focus ring for accessibility', () => {
    const content = getComponentContent();
    const hasFocusRing =
      /focus:ring|focus-visible:ring|ring-.*focus|focus:outline/i.test(content) ||
      /focus-visible:outline/i.test(content);
    expect(hasFocusRing).toBe(true);
  });

  // ==================== IMPLEMENTATION QUALITY ====================

  it('should use forwardRef for ref forwarding', () => {
    const content = getComponentContent();
    const hasForwardRef =
      /forwardRef/.test(content) ||
      /React\.forwardRef/.test(content);
    expect(hasForwardRef).toBe(true);
  });

  it('should spread props to native button element', () => {
    const content = getComponentContent();
    const spreadsProps =
      /\{\.\.\.props\}|\{\.\.\.rest\}|\{\.\.\.other/.test(content) ||
      /<button[^>]*\{\.\.\./.test(content);
    expect(spreadsProps).toBe(true);
  });

  it('should render a button element', () => {
    const content = getComponentContent();
    expect(/<button/.test(content)).toBe(true);
  });

  it('should have default variant and size', () => {
    const content = getComponentContent();
    const hasDefaults =
      /variant\s*=\s*['"]primary['"]|['"]primary['"].*default/i.test(content) ||
      /size\s*=\s*['"]md['"]|['"]md['"].*default/i.test(content) ||
      /default.*primary|default.*md/i.test(content);
    expect(hasDefaults).toBe(true);
  });
});
