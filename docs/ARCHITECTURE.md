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

This project follows a scalable component-based architecture using:

- React
- Next.js
- TypeScript
- Tailwind CSS

The codebase is divided into:
- Components
- Types
- Utilities
- Application routes
- Documentation

This structure improves:
- Reusability
- Maintainability
- Scalability
- Team collaboration
- Developer onboarding

Each component has a single responsibility, making the application easier to understand and extend.

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

The application follows a top-down data flow pattern.

### Step-by-Step Flow

1. `Board` manages all Kanban columns.
2. `Board` passes column information to each `Column`.
3. `Column` renders task content using the `children` prop.
4. `TaskCard` receives task data and displays task information.
5. `PriorityBadge` receives the task priority and applies the correct styling.

This separation ensures:
- Clean architecture
- Better scalability
- Easier debugging
- Improved maintainability

---

## Example Data Flow Scenario

```txt
Board
 → Column ("To Do")
    → TaskCard ("Implement Authentication")
       → PriorityBadge ("High")
```

### Scenario Description

- The `Board` component renders multiple workflow columns.
- A column titled `"To Do"` contains pending tasks.
- The `TaskCard` displays task details such as:
  - title
  - description
  - assignee
  - priority
- `PriorityBadge` determines the correct visual indicator.

Example:
- High priority → red badge
- Medium priority → yellow badge
- Low priority → green badge

This layered approach keeps business logic separated from UI presentation.

---

# Props Documentation

## Button Component

### Purpose

Reusable button component supporting:
- Variants
- Sizes
- Loading state
- Accessibility styles

### Props

| Prop | Type | Required | Default | Example | Description |
|------|------|------|------|------|------|
| variant | `"primary" \| "secondary" \| "danger"` | No | `"primary"` | `"danger"` | Controls button appearance |
| size | `"sm" \| "md" \| "lg"` | No | `"md"` | `"lg"` | Controls button size |
| isLoading | `boolean` | No | `false` | `true` | Shows loading spinner |

### Example Usage

```tsx
<Button variant="primary" size="md">
  Save Changes
</Button>
```

### Loading Example

```tsx
<Button
  variant="primary"
  isLoading
>
  Saving
</Button>
```

### Danger Action Example

```tsx
<Button variant="danger">
  Delete Task
</Button>
```

### Rendered Output

Interactive button with:
- focus ring
- loading spinner
- hover styles
- disabled state

---

## DeveloperProfile Component

### Purpose

Displays developer information and social links.

### Props

| Prop | Type | Example |
|------|------|------|
| name | string | `"Akshit Jaiswal"` |
| role | string | `"Full Stack Developer"` |
| image | string \| StaticImageData | `"/akshit.png"` |
| github | string | `"https://github.com/akshit109"` |
| linkedin | string | `"https://linkedin.com/in/akshit109"` |

### Example Usage

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
- avatar image
- name
- role
- GitHub link
- LinkedIn link

---

## PriorityBadge Component

### Purpose

Displays task priority visually using color-coded badges.

### Props

| Prop | Type | Example |
|------|------|------|
| priority | `"low" \| "medium" \| "high"` | `"high"` |

### Example Usage

```tsx
<PriorityBadge priority="high" />
```

### Priority Styles

| Priority | Color |
|------|------|
| low | Green |
| medium | Yellow |
| high | Red |

### Rendered Output

Rounded colored badge indicating task priority.

---

## TaskCard Component

### Purpose

Displays task information inside Kanban columns.

### Props

| Prop | Type | Example |
|------|------|------|
| task | Task | `sampleTask` |
| onClick | () => void | `handleOpenTask` |

### Example Usage

```tsx
<TaskCard task={sampleTask} />
```

### Click Interaction Example

```tsx
<TaskCard
  task={task}
  onClick={() => openTaskModal(task.id)}
/>
```

### Rendered Output

Displays:
- task title
- description
- assignee
- priority badge

The card also supports hover and click interactions.

---

## Column Component

### Purpose

Groups related tasks into workflow stages.

### Props

| Prop | Type | Example |
|------|------|------|
| column | Column | `todoColumn` |
| taskCount | number | `5` |
| children | React.ReactNode | `<TaskCard />` |
| onAddTask | () => void | `handleAddTask` |

### Example Usage

```tsx
<Column column={todoColumn} taskCount={3}>
  <TaskCard task={task1} />
  <TaskCard task={task2} />
</Column>
```

### Rendered Output

Displays:
- column header
- color indicator
- task count badge
- task list
- add task button

---

## Board Component

### Purpose

Main layout component for the Kanban board.

### Props

Currently no required props.

### Example Usage

```tsx
<Board />
```

### Rendered Output

Horizontally scrollable board containing multiple columns.

---

# Design Decisions

## Why use reusable components?

Reusable components:
- reduce duplicate code
- improve consistency
- simplify maintenance
- improve scalability

This architecture allows components to be reused across multiple pages and features.

---

## Why use children prop in Column?

The `children` prop allows the `Column` component to remain flexible.

Benefits:
- Decouples Column from TaskCard
- Supports rendering different content types
- Improves scalability
- Follows React composition principles

Without `children`, Column would become tightly coupled to a specific task implementation.

---

## Why separate PriorityBadge?

Separating `PriorityBadge` improves:
- reusability
- readability
- maintainability

Benefits:
- centralized priority styling
- cleaner TaskCard component
- easier future updates

Example:
If priority colors change later, updates only happen in one component.

---

## Why use TypeScript interfaces?

TypeScript interfaces improve:
- type safety
- autocomplete
- developer experience
- maintainability

Benefits in this project:
- prevents invalid data structures
- ensures consistent props
- reduces runtime bugs

This becomes increasingly important as applications grow larger.

---

## Why use Tailwind CSS?

Tailwind CSS was selected because it:
- speeds up development
- reduces custom CSS files
- improves consistency
- supports responsive design easily

Utility-first styling also simplifies maintenance.

---

## Server vs Client Components

Next.js App Router supports:
- Server Components
- Client Components

---

### Server Components

Server components render on the server and improve:
- performance
- SEO
- initial page load speed

Examples:
- `Board.tsx`
- `PriorityBadge.tsx`
- `DeveloperProfile.tsx`

These components mainly display UI without browser interaction.

---

### Client Components

Client components are required for:
- click handlers
- browser interactivity
- React hooks
- local state management

Client components use:

```tsx
"use client";
```

Examples:
- `Button.tsx`
- `Column.tsx`

These handle:
- loading states
- button interactions
- add task actions

---

## Why separate server and client components?

Benefits:
- smaller client bundles
- improved performance
- faster rendering
- better scalability

This creates an optimized balance between:
- interactivity
- performance
- maintainability

---

# Type Definitions

## Priority Type

```ts
export type Priority = "low" | "medium" | "high";
```

### Purpose

Defines available task priority levels.

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

Represents a task inside the Kanban workflow.

### Key Features

- optional description
- optional assignee
- typed priority system
- creation timestamps

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

Represents a Kanban workflow column.

### Example Columns

- To Do
- In Progress
- Done

---

# Scalability Considerations

The architecture was designed to support future enhancements such as:
- drag and drop
- API integration
- authentication
- task filtering
- search
- real-time collaboration

The modular structure ensures future features can be added with minimal refactoring.

---

# Conclusion

This project follows a scalable and maintainable frontend architecture using modern React and Next.js practices.

Core architectural principles:
- reusable components
- separation of concerns
- top-down data flow
- type safety
- modular organization

The documentation is designed to help new developers quickly understand:
- component relationships
- data flow
- design decisions
- project structure

This foundation supports long-term scalability, maintainability, and collaborative development.