# Component Hierarchy

```txt
app/
├── layout.tsx
├── page.tsx
└── team/
    └── page.tsx

src/
├── components/
│   ├── Board.tsx
│   ├── Column.tsx
│   ├── TaskCard.tsx
│   ├── Button.tsx
│   ├── PriorityBadge.tsx
│   └── DeveloperProfile.tsx
│
├── types/
│   └── task.ts
│
└── lib/
    └── utils.ts
```

This structure follows a modular architecture where reusable UI components are separated from type definitions and utility functions.

---

# Data Flow Diagram

```txt
Board
 ├── Column
 │     ├── TaskCard
 │     │      └── PriorityBadge
 │
 └── Column
       ├── TaskCard
```

## Data Flow Explanation

- `Board` manages multiple columns.
- Each `Column` receives column data and renders task cards using the `children` prop.
- `TaskCard` receives a `Task` object and displays task information.
- `PriorityBadge` receives priority data from `TaskCard`.

This approach keeps components reusable and maintainable.

---

# Props Documentation

## Button Component

### Props

| Prop | Type | Required | Description |
|------|------|------|------|
| variant | `"primary" \| "secondary" \| "danger"` | No | Button style |
| size | `"sm" \| "md" \| "lg"` | No | Button size |
| isLoading | `boolean` | No | Shows loading spinner |

### Rendered Output
Reusable button with loading state, variants, and accessibility support.

---

## DeveloperProfile Component

### Props

| Prop | Type |
|------|------|
| name | string |
| role | string |
| image | string \| StaticImageData |
| github | string |
| linkedin | string |

### Rendered Output
Developer profile card with image and social links.

---

## PriorityBadge Component

### Props

| Prop | Type |
|------|------|
| priority | `"low" \| "medium" \| "high"` |

### Rendered Output
Colored badge representing task priority.

---

## TaskCard Component

### Props

| Prop | Type |
|------|------|
| task | Task |
| onClick | () => void |

### Rendered Output
Displays task title, description, assignee, and priority.

---

## Column Component

### Props

| Prop | Type |
|------|------|
| column | Column |
| taskCount | number |
| children | React.ReactNode |
| onAddTask | () => void |

### Rendered Output
Kanban column containing task cards and add task button.

---

## Board Component

### Props
No required props currently.

### Rendered Output
Horizontal collection of columns with scroll support.

---

# Design Decisions

## Why use children prop in Column?

The `children` prop provides flexibility by allowing any content to be rendered inside the column body.  
This keeps the `Column` component reusable and decoupled from `TaskCard`.

---

## Why separate PriorityBadge?

The `PriorityBadge` component is separated for:
- Better reusability
- Cleaner code structure
- Easier maintenance

This allows priority styling logic to remain isolated.

---

## Server vs Client Components

Interactive components using click handlers require `"use client"`.

Examples:
- Column
- Button

Static UI components can remain server components for performance optimization.

---

# Type Definitions

## Task Type

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
```

---

## Column Type

```ts
export interface Column {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}
```

---

# Conclusion

The architecture follows a component-based design using React and Next.js.

Key advantages:
- Reusable components
- Clear data flow
- Maintainable structure
- Type safety with TypeScript
- Scalable project organization

This documentation helps developers quickly understand the structure and workflow of the application.