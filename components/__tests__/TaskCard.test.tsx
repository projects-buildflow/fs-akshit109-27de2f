
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '../TaskCard';
import { Task } from '@/types/task';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task description that might be quite long and need truncation.',
    priority: 'high',
    columnId: 'todo',
    createdAt: new Date().toISOString(),
  };

  it('renders task title', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders task description', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText(/this is a test task/i)).toBeInTheDocument();
  });

  it('renders priority badge', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Test Task'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders without description', () => {
    const taskWithoutDesc = { ...mockTask, description: undefined };
    render(<TaskCard task={taskWithoutDesc} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders assignee when provided', () => {
    const taskWithAssignee = {
      ...mockTask,
      assignee: { id: '1', name: 'John Doe' },
    };
    render(<TaskCard task={taskWithAssignee} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('does not render assignee section when no assignee', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.queryByText(/assigned/i)).not.toBeInTheDocument();
  });
});

describe('PriorityBadge', () => {
  it('renders low priority with green color', () => {
    const lowTask = { ...mockTask, priority: 'low' as const };
    render(<TaskCard task={lowTask} />);
    const badge = screen.getByText(/low/i);
    expect(badge).toHaveClass('bg-green-100');
  });

  it('renders medium priority with yellow color', () => {
    const mediumTask = { ...mockTask, priority: 'medium' as const };
    render(<TaskCard task={mediumTask} />);
    const badge = screen.getByText(/medium/i);
    expect(badge).toHaveClass('bg-yellow-100');
  });

  it('renders high priority with red color', () => {
    render(<TaskCard task={mockTask} />);
    const badge = screen.getByText(/high/i);
    expect(badge).toHaveClass('bg-red-100');
  });
});
