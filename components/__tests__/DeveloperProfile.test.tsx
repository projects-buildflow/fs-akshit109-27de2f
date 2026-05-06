
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeveloperProfile } from '../DeveloperProfile';

describe('DeveloperProfile', () => {
  const defaultProps = {
    name: 'Jane Doe',
    role: 'Software Engineer',
    bio: 'Passionate about building great products.',
  };

  it('renders the name as a heading', () => {
    render(<DeveloperProfile {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /jane doe/i })).toBeInTheDocument();
  });

  it('renders the role', () => {
    render(<DeveloperProfile {...defaultProps} />);
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument();
  });

  it('renders the bio', () => {
    render(<DeveloperProfile {...defaultProps} />);
    expect(screen.getByText(/passionate about building/i)).toBeInTheDocument();
  });

  it('renders skills when provided', () => {
    render(<DeveloperProfile {...defaultProps} skills={['React', 'TypeScript', 'Node.js']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    render(<DeveloperProfile {...defaultProps} />);
    // Should not throw when avatar and skills are not provided
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    render(<DeveloperProfile {...defaultProps} avatar="/avatar.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
