# Component Architecture Review

## 1. Component Hierarchy

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

---

# 2. Data Flow Diagram

```txt
Board
 ├── Column
 │     ├── TaskCard
 │     │      └── PriorityBadge
 │
 └── Column
       ├── TaskCard
```

### Data Flow Explanation

- `Board` manages and renders multiple columns.
- Each `Column` receives column information and renders task cards using the `children` prop.
- Each `TaskCard` receives a `Task` object and displays task details.
- `PriorityBadge` receives the task priority and displays a colored badge.

---

# 3. Props Documentation

## Button Component

### Props

| Prop | Type | Required | Description |
|------|------|------|------|
| variant | `"primary" \| "secondary" \| "danger"` | No | Button style variant |
| size | `"sm" \| "md" \| "lg"` | No | Button size |
| isLoading | `boolean` | No | Shows loading spinner |

### Renders
Reusable button with variants, sizes, loading state, and accessibility focus styles.

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

### Renders
Developer profile card with image, role, and social links.

---

## PriorityBadge Component

### Props

| Prop | Type |
|------|------|
| priority | `"low" \| "medium" \| "high"` |

### Renders
Colored badge indicating task priority.

---

## TaskCard Component

### Props

| Prop | Type |
|------|------|
| task | Task |
| onClick | () => void |

### Renders
Task details including title, description, assignee, and priority.

---

## Column Component

### Props

| Prop | Type |
|------|------|
| column | Column |
| taskCount | number |
| children | React.ReactNode |
| onAddTask | () => void |

### Renders
Kanban column with header, task list, and add task button.

---

## Board Component

### Props
No required props currently.

### Renders
Horizontal collection of columns with scroll support.

---

# 4. Design Decisions

## Why use children prop in Column?

The `children` prop allows the Column component to remain flexible and reusable.  
Instead of tightly coupling Column to TaskCard, any content can be rendered inside the column body.

---

## Why separate PriorityBadge?

Separating `PriorityBadge` improves:
- Reusability
- Maintainability
- Cleaner TaskCard structure

This allows badge styles and logic to be managed independently.

---

## Server vs Client Components

- Components with interaction (`onClick`) use `"use client"`.
- Static UI components can remain server components for better performance.

This balances interactivity and optimization.

---

# 5. Type Definitions

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

This architecture follows a modular component-based design using React and Next.js.  
The structure improves scalability, reusability, maintainability, and developer onboarding.