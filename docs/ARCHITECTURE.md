# Component Hierarchy

```txt
app/
├── layout.tsx
├── page.tsx
└── team/
    └── page.tsx

docs/
└── ARCHITECTURE.md

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

## Architecture Overview

The project follows a modular component-based architecture using React, Next.js, TypeScript, and Tailwind CSS.

The structure separates:
- UI components
- Type definitions
- Utility functions
- Application routes

This improves:
- Reusability
- Maintainability
- Scalability
- Developer onboarding

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

The application follows a top-down component data flow approach.

### Flow Steps

1. `Board` manages and renders all columns.
2. Each `Column` receives:
   - column information
   - task count
   - child task components
3. `TaskCard` receives task data from the column.
4. `PriorityBadge` receives priority data from `TaskCard`.

This architecture keeps responsibilities separated and components reusable.

---

## Example Data Flow Scenario

```txt
Board
 → Column ("To Do")
    → TaskCard ("Implement Authentication")
       → PriorityBadge ("High")
```

### Scenario Explanation

- The `Board` renders a "To Do" column.
- The column contains multiple task cards.
- A task card displays task information.
- The task priority is passed to `PriorityBadge`.
- `PriorityBadge` determines the correct color and label.

This layered structure improves maintainability and readability.

---

# Props Documentation

## Button Component

### Props

| Prop | Type | Required | Example | Description |
|------|------|------|------|------|
| variant | `"primary" \| "secondary" \| "danger"` | No | `"primary"` | Controls button appearance |
| size | `"sm" \| "md" \| "lg"` | No | `"md"` | Controls button size |
| isLoading | `boolean` | No | `true` | Shows loading spinner |

### Example

```tsx
<Button variant="primary" size="md">
  Submit
</Button>
```

### Rendered Output

Reusable button supporting:
- Variants
- Sizes
- Loading state
- Accessibility focus styles

---

## DeveloperProfile Component

### Props

| Prop | Type | Example |
|------|------|------|
| name | string | `"Akshit Jaiswal"` |
| role | string | `"Full Stack Developer"` |
| image | string \| StaticImageData | `"/akshit.png"` |
| github | string | `"https://github.com/akshit109"` |
| linkedin | string | `"https://linkedin.com/in/akshit109"` |

### Example

```tsx
<DeveloperProfile
  name="Akshit Jaiswal"
  role="Full Stack Developer"
  image={akshit}
  github="https://github.com/akshit109"
  linkedin="https://linkedin.com/in/akshit109"
/>
```

### Rendered Output

Profile card displaying:
- Developer image
- Name
- Role
- Social links

---

## PriorityBadge Component

### Props

| Prop | Type | Example |
|------|------|------|
| priority | `"low" \| "medium" \| "high"` | `"high"` |

### Example

```tsx
<PriorityBadge priority="high" />
```

### Rendered Output

Displays a colored priority badge:
- Green → Low
- Yellow → Medium
- Red → High

---

## TaskCard Component

### Props

| Prop | Type | Example |
|------|------|------|
| task | Task | `sampleTask` |
| onClick | () => void | `handleClick` |

### Example

```tsx
<TaskCard task={sampleTask} />
```

### Rendered Output

Displays:
- Task title
- Description
- Priority badge
- Assignee information

---

## Column Component

### Props

| Prop | Type | Example |
|------|------|------|
| column | Column | `todoColumn` |
| taskCount | number | `3` |
| children | React.ReactNode | `<TaskCard />` |
| onAddTask | () => void | `handleAddTask` |

### Example

```tsx
<Column column={column} taskCount={3}>
  <TaskCard task={task} />
</Column>
```

### Rendered Output

Kanban column containing:
- Header
- Task count
- Scrollable task list
- Add task button

---

## Board Component

### Props

Currently no required props.

### Example

```tsx
<Board />
```

### Rendered Output

Horizontal Kanban board displaying multiple columns with horizontal scrolling.

---

# Design Decisions

## Why use children prop in Column?

The `children` prop keeps the Column component flexible and reusable.

Benefits:
- Decouples Column from TaskCard
- Allows rendering any content inside the column
- Improves scalability

This follows React composition principles.

---

## Why separate PriorityBadge?

The `PriorityBadge` component was separated to improve:

- Reusability
- Maintainability
- Readability

Benefits:
- Centralized priority styling
- Cleaner TaskCard component
- Easier updates in future

---

## Why use reusable components?

Reusable components reduce:
- Duplicate code
- Maintenance effort

They also improve:
- Consistency
- Scalability
- Team collaboration

---

## Server vs Client Components

Next.js App Router supports:
- Server Components
- Client Components

---

### Server Components

Server components render on the server and improve:
- SEO
- Initial performance
- Reduced client-side JavaScript

Examples:
- `Board.tsx`
- `PriorityBadge.tsx`
- `DeveloperProfile.tsx`

These mainly render UI without browser interactivity.

---

### Client Components

Client components are required for:
- Click handlers
- React hooks
- Browser state management

Client components use:

```tsx
"use client";
```

Examples:
- `Column.tsx`
- `Button.tsx`

These contain:
- onClick handlers
- loading state
- interactive actions

---

## Why separate server and client components?

Benefits:
- Better performance
- Reduced bundle size
- Faster rendering
- Improved scalability

This approach balances interactivity and optimization.

---

# Type Definitions

## Priority Type

```ts
export type Priority = "low" | "medium" | "high";
```

Defines available priority levels.

---

## Task Type

```ts
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

### Purpose

Represents a task object inside the Kanban board.

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

### Purpose

Represents a Kanban board column.

---

# Conclusion

This project follows a scalable component-driven architecture using:
- React
- Next.js
- TypeScript
- Tailwind CSS

The structure emphasizes:
- Reusability
- Clear data flow
- Type safety
- Separation of concerns
- Maintainability

The architecture is designed to support future expansion while remaining easy for new developers to understand and contribute to.