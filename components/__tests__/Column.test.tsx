
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Column } from '../Column';

describe('Column', () => {
  const mockColumn = {
    id: 'todo',
    title: 'To Do',
    color: '#6366f1',
    taskIds: ['1', '2'],
  };

  it('renders column title', () => {
    render(<Column column={mockColumn} taskCount={2}><div /></Column>);
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders task count', () => {
    render(<Column column={mockColumn} taskCount={5}><div /></Column>);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders color indicator', () => {
    render(<Column column={mockColumn} taskCount={2}><div /></Column>);
    const colorDot = document.querySelector('[style*="background-color"]');
    expect(colorDot).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Column column={mockColumn} taskCount={2}>
        <div data-testid="child">Task Card</div>
      </Column>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders Add Task button when onAddTask is provided', () => {
    const handleAddTask = vi.fn();
    render(
      <Column column={mockColumn} taskCount={2} onAddTask={handleAddTask}>
        <div />
      </Column>
    );
    expect(screen.getByText(/add task/i)).toBeInTheDocument();
  });

  it('calls onAddTask when Add Task button is clicked', () => {
    const handleAddTask = vi.fn();
    render(
      <Column column={mockColumn} taskCount={2} onAddTask={handleAddTask}>
        <div />
      </Column>
    );
    fireEvent.click(screen.getByText(/add task/i));
    expect(handleAddTask).toHaveBeenCalledTimes(1);
  });

  it('does not render Add Task button when onAddTask is not provided', () => {
    render(<Column column={mockColumn} taskCount={2}><div /></Column>);
    expect(screen.queryByText(/add task/i)).not.toBeInTheDocument();
  });
});
