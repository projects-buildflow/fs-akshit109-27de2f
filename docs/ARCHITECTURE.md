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

| Prop | Type | Required | Default | Example | Description |
|------|------|----------|---------|---------|-------------|
| variant | `"primary" \| "secondary" \| "danger"` | No | `"primary"` | `"danger"` | Controls button appearance and color scheme |
| size | `"sm" \| "md" \| "lg"` | No | `"md"` | `"lg"` | Controls button padding and font size |
| isLoading | `boolean` | No | `false` | `true` | Shows spinner and disables interaction |
| disabled | `boolean` | No | `false` | `true` | Disables the button entirely |
| onClick | `() => void` | No | — | `handleSubmit` | Click handler callback |
| children | `React.ReactNode` | Yes | — | `"Submit"` | Button label or content |

### Examples

```tsx
// Primary button (default)
<Button variant="primary" size="md">
  Submit
</Button>

// Danger button with loading state
<Button variant="danger" size="sm" isLoading={true}>
  Delete
</Button>

// Disabled secondary button
<Button variant="secondary" disabled>
  Unavailable
</Button>
```

### Rendered Output

Reusable button supporting:
- Variants
- Sizes
- Loading state
- Disabled state
- Accessibility focus styles

---

## DeveloperProfile Component

### Props

| Prop | Type | Required | Example | Description |
|------|------|----------|---------|-------------|
| name | `string` | Yes | `"Akshit Jaiswal"` | Developer's display name |
| role | `string` | Yes | `"Full Stack Developer"` | Job title or role |
| image | `string \| StaticImageData` | Yes | `"/akshit.png"` | Profile image source |
| github | `string` | No | `"https://github.com/akshit109"` | GitHub profile URL |
| linkedin | `string` | No | `"https://linkedin.com/in/akshit109"` | LinkedIn profile URL |

### Examples

```tsx
// Full profile with social links
<DeveloperProfile
  name="Akshit Jaiswal"
  role="Full Stack Developer"
  image={akshit}
  github="https://github.com/akshit109"
  linkedin="https://linkedin.com/in/akshit109"
/>

// Minimal profile without social links
<DeveloperProfile
  name="Alex Chen"
  role="Tech Lead"
  image="/alex.png"
/>
```

### Rendered Output

Profile card displaying:
- Developer image
- Name
- Role
- Social links (if provided)

---

## PriorityBadge Component

### Props

| Prop | Type | Required | Example | Description |
|------|------|----------|---------|-------------|
| priority | `"low" \| "medium" \| "high"` | Yes | `"high"` | Determines badge color and label |

### Examples

```tsx
// High priority — renders red badge
<PriorityBadge priority="high" />

// Medium priority — renders yellow badge
<PriorityBadge priority="medium" />

// Low priority — renders green badge
<PriorityBadge priority="low" />
```

### Rendered Output

Displays a colored priority badge:
- 🟢 Green → Low
- 🟡 Yellow → Medium
- 🔴 Red → High

---

## TaskCard Component

### Props

| Prop | Type | Required | Example | Description |
|------|------|----------|---------|-------------|
| task | `Task` | Yes | `sampleTask` | Full task object (see Task type) |
| onClick | `() => void` | No | `handleClick` | Called when the card is clicked |

### Examples

```tsx
// Basic task card
<TaskCard task={sampleTask} />

// Task card with click handler (e.g. open detail modal)
<TaskCard
  task={sampleTask}
  onClick={() => openTaskDetail(sampleTask.id)}
/>
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

| Prop | Type | Required | Example | Description |
|------|------|----------|---------|-------------|
| column | `Column` | Yes | `todoColumn` | Column metadata (id, title, color) |
| taskCount | `number` | Yes | `3` | Number displayed in the column header badge |
| children | `React.ReactNode` | No | `<TaskCard />` | Task cards rendered inside the column |
| onAddTask | `() => void` | No | `handleAddTask` | Called when the "Add task" button is clicked |

### Examples

```tsx
// Column with tasks
<Column column={todoColumn} taskCount={3} onAddTask={handleAddTask}>
  <TaskCard task={task1} />
  <TaskCard task={task2} />
  <TaskCard task={task3} />
</Column>

// Empty column
<Column column={doneColumn} taskCount={0} onAddTask={handleAddTask}>
  {/* No tasks yet */}
</Column>
```

### Rendered Output

Kanban column containing:
- Header with column title
- Task count badge
- Scrollable task list
- Add task button

---

## Board Component

### Props

Currently no required props. Board manages its own internal state and renders columns from data.

### Example

```tsx
<Board />
```

### Rendered Output

Horizontal Kanban board displaying multiple columns with horizontal scrolling.

---

# Design Decisions

## Why use the `children` prop in Column?

The `children` prop keeps the `Column` component flexible and decoupled from `TaskCard`.

**The problem it solves:** If `Column` directly imported and rendered `TaskCard`, any future change to the card format — a new card type, a drag-and-drop wrapper, a loading skeleton — would require modifying `Column` itself. That couples two components that have no real reason to depend on each other.

**How `children` fixes this:** By accepting `children`, `Column` becomes a layout container. It manages the header, the task count badge, the scroll area, and the "Add task" button — all things that belong to a column regardless of what's inside it. The parent (Board) decides what to render inside each column. This means `Column` never needs to change when card types change.

This follows React's composition principle: build containers that are unaware of their contents, and pass content in from above.

---

## Why separate `PriorityBadge`?

At first glance, it would be simpler to render the priority color and label directly inside `TaskCard`. The reason to extract it is about future change.

**Centralised styling:** Priority colors and labels are referenced in at least two places — `TaskCard` and potentially a filter UI or a task detail modal. Without a dedicated component, any update to priority styling (a new priority level, a rebrand, an accessibility fix for color-blind users) requires finding and updating every place that renders priority. With `PriorityBadge`, that update happens in exactly one file.

**Cleaner TaskCard:** `TaskCard` is already responsible for layout, title, description, and assignee. Adding conditional color logic for priority makes it harder to read. Extracting to `PriorityBadge` keeps each component focused on a single job.

**Easier testing:** A standalone `PriorityBadge` can be tested in isolation — all three variants, edge cases, unknown values — without mounting a full `TaskCard`.

---

## Why use reusable components?

Every time the same UI is written twice, it creates two sources of truth. When a design change or bug fix comes in, both copies need to be updated. In practice, one copy always gets missed.

Reusable components solve this by making the component the single source of truth for its own appearance and behaviour. A `Button` with an `isLoading` prop handles its spinner, disabled state, and cursor in one place. Every part of the app that uses `Button` gets that behaviour automatically when it changes.

The secondary benefit is consistency: reusable components ensure the same spacing, typography, and interaction patterns everywhere, without requiring each developer to remember the details.

---

## Server vs Client Components

Next.js App Router supports:
- Server Components (default)
- Client Components (`"use client"` directive)

---

### Server Components

Server components render on the server, reducing the amount of JavaScript sent to the browser.

**Why this matters:** A component like `DeveloperProfile` just receives props and returns markup. It has no click handlers, no hooks, no state. Rendering it on the server means the browser receives finished HTML for that section — faster initial paint, better SEO, smaller client bundle.

**When to use server components:**
- Static or data-driven UI with no interactivity
- Components that fetch their own data
- Anything where SEO or initial load performance is a priority

Examples in this project:
- `Board.tsx` — data composition, no direct interaction
- `PriorityBadge.tsx` — pure display, no state
- `DeveloperProfile.tsx` — static profile card

---

### Client Components

Client components are required whenever a component needs to respond to user interaction.

**Why the boundary matters:** Marking a component `"use client"` tells Next.js to include it in the JavaScript bundle sent to the browser. Overusing this increases bundle size and slows down the page. The goal is to push the client/server boundary as low in the tree as possible — make the outer layout a server component, and only opt into client rendering for the specific interactive leaf nodes.

**When to use client components:**
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- React hooks (`useState`, `useEffect`, `useRef`)
- Browser APIs (localStorage, window, document)

Examples in this project:
- `Column.tsx` — contains `onAddTask` click handler
- `Button.tsx` — manages `isLoading` state and click events

---

## Why separate server and client components?

Keeping the server/client boundary intentional produces measurable benefits:

- **Smaller bundle:** Server components are never included in client-side JavaScript
- **Faster rendering:** Static markup is generated at build time or on the server, not in the browser
- **Better SEO:** Server-rendered HTML is immediately available to crawlers
- **Simpler mental model:** Each component has a clear, single mode of operation

The rule of thumb: start every component as a server component. Only add `"use client"` when the component genuinely needs it.

---

# Type Definitions

## Priority Type

```ts
export type Priority = "low" | "medium" | "high";
```

Defines available priority levels as a union type, ensuring only valid values can be passed to `PriorityBadge` and stored on `Task` objects.

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

Represents a task object inside the Kanban board. Optional fields (`description`, `assignee`, `dueDate`) allow tasks to be created with minimal data and enriched later.

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

Represents a Kanban board column. `taskIds` stores references to tasks rather than embedding task objects, keeping column data lightweight and making reordering straightforward.

---

# Code Review

**Reviewer:** Alex Chen, Tech Lead
**Score:** 26 / 100
**Status:** 🔄 Feedback — push fixes to re-run review

---

## Feedback Summary

The architecture documentation is well-structured and covers all the required aspects. It showcases a sound understanding of data flow and component responsibilities. Minor improvements could be made in the completeness of components' props documentation and further elaboration on the design decisions section.

---

## Strengths

- Well-structured and organized documentation
- Clear explanation of data flow and component hierarchy
- Thoughtful separation of components and reuse of code

---

## Areas for Improvement

- Include more detailed 'why' explanations in the design decisions section
- Expand the examples in the props documentation to cover more edge cases or usage scenarios

---

## Reviewer Note

> **Alex Chen:** You're making excellent progress! Remember, diving deeper into 'why' can often illuminate new insights into the architecture and its capabilities. Keep up the fantastic work.

---

*Push fixes to this branch and the review will run again automatically.*

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