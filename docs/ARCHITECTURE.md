# Component Architecture

This document explains how the UI is structured and how data moves through the main Kanban board components.

## 1) Component Hierarchy

```text
app/
├── layout.tsx
├── page.tsx
└── team/page.tsx

components/
├── Board.tsx
├── Column.tsx
├── TaskCard.tsx
├── Button.tsx
├── PriorityBadge.tsx
└── DeveloperProfile.tsx
```

Relationship overview:

```text
app/page.tsx (route)
└── Board
    ├── Column (To Do)
    │   └── TaskCard
    │       └── PriorityBadge
    ├── Column (In Progress)
    │   └── TaskCard
    │       └── PriorityBadge
    └── Column (Done)
        └── TaskCard
            └── PriorityBadge

app/team/page.tsx
└── DeveloperProfile
```

## 2) Data Flow Diagram (Board → Column → TaskCard)

```text
Board
  ├─ owns columns: Column[]
  ├─ owns task data (Task)
  └─ maps each column -> <Column column={...} taskCount={...}>
                      children: <TaskCard task={...} />

Column
  ├─ receives display metadata (title/color/count)
  ├─ renders structure (header, task area, footer)
  └─ renders children unchanged (TaskCard list)

TaskCard
  ├─ receives a Task
  ├─ renders task title/description/assignee
  └─ passes task.priority -> PriorityBadge
```

In short: `Board` is the composition layer, `Column` is the container/presentation layer, and `TaskCard` is the task-detail display layer.

## 3) Props Documentation

### `Board`
- Required props: none
- Optional props: none
- Renders: horizontally scrollable set of `Column` components; each `Column` contains one or more `TaskCard` children.

### `Column`
- Required props:
  - `column: Column`
  - `taskCount: number`
  - `children: React.ReactNode`
- Optional props:
  - `onAddTask?: () => void`
- Renders: column shell with header (color dot, title, count), task area (`children`), and Add Task footer button.

### `TaskCard`
- Required props:
  - `task: Task`
- Optional props:
  - `onClick?: () => void`
- Renders: card UI for one task (priority, title, optional description, optional assignee info).

### `Button`
- Required props: none (inherits native button props)
- Optional props:
  - `variant?: "primary" | "secondary" | "danger"`
  - `size?: "sm" | "md" | "lg"`
  - `isLoading?: boolean`
  - plus native `button` attributes (`onClick`, `disabled`, `type`, etc.)
- Renders: styled reusable button with variants, sizes, disabled state, focus styles, and optional loading spinner.

### `PriorityBadge`
- Required props:
  - `priority: Priority`
- Optional props: none
- Renders: small badge with priority text and color mapping (`low`, `medium`, `high`).

### `DeveloperProfile`
- Required props:
  - `name: string`
  - `role: string`
  - `image: string | StaticImageData`
  - `github: string`
  - `linkedin: string`
- Optional props: none
- Renders: profile card with avatar, role, and external GitHub/LinkedIn links.

## 4) Design Decisions

### Why use `children` in `Column`?
- Keeps `Column` generic and reusable.
- `Column` only controls layout/chrome; parent decides what task content appears.
- Supports future extensions (empty state, grouped cards, drag-and-drop wrappers) without changing `Column` API.

### Why separate `PriorityBadge`?
- Single-responsibility: priority styling and label logic stay isolated.
- Reusability: same badge can appear in cards, lists, filters, or detail views.
- Consistency: one source of truth for priority color/text behavior.

### Server vs Client components
- `Column` is explicitly a **Client Component** (`"use client"`) because it accepts interactive handlers like `onAddTask` and renders a clickable button.
- Route files (`app/layout.tsx`, `app/page.tsx`, `app/team/page.tsx`) are **Server Components by default** in App Router.
- `Board`, `TaskCard`, `PriorityBadge`, and `DeveloperProfile` are currently written as presentational modules and can render in server context, but they can also be included inside a client subtree when needed.

## 5) Type Definitions

From `src/types/task.ts`:

```ts
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  columnId: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}
```

These types enforce the contract used by `Board`, `Column`, `TaskCard`, and `PriorityBadge`.
