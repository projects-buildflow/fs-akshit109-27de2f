# Component Architecture

## Overview

This document describes the component hierarchy, data flow, design decisions, and future considerations for the Kanban board feature. It is intended to help new contributors understand how components relate, why certain patterns were chosen, and what trade-offs were made.

---

## Component Hierarchy

```
<Board>
  └── <Column> (×n — one per status: To Do, In Progress, Done)
        └── <TaskCard> (×n — one per task in the column)
              └── <Button> (actions: Edit, Delete, Move)
```

Each layer has a single responsibility:

| Component | Responsibility |
|---|---|
| `Board` | Holds global task state; distributes tasks to columns |
| `Column` | Filters and displays tasks for one status; shows task count |
| `TaskCard` | Renders a single task's data (title, description, assignee, priority) |
| `Button` | Reusable action trigger with variant and size props |

---

## Visual Diagram

> For an interactive, up-to-date diagram see the [Excalidraw board →](https://excalidraw.com) *(link to be added once the board is shared with the team)*

Below is a simplified ASCII representation for quick reference in-repo:

```
┌─────────────────────────────────────────────┐
│                   Board                     │
│  tasks: Task[]   onTaskUpdate: fn           │
│                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│  │  Column   │ │  Column   │ │  Column   │ │
│  │ "To Do"   │ │"In Progress│ │  "Done"  │ │
│  │ count: 3  │ │ count: 2  │ │ count: 1 │ │
│  │           │ │           │ │           │ │
│  │┌─────────┐│ │┌─────────┐│ │┌─────────┐│ │
│  ││TaskCard ││ ││TaskCard ││ ││TaskCard ││ │
│  ││title    ││ ││title    ││ ││title    ││ │
│  ││priority ││ ││priority ││ ││priority ││ │
│  ││assignee ││ ││assignee ││ ││assignee ││ │
│  ││[Button] ││ ││[Button] ││ ││[Button] ││ │
│  │└─────────┘│ │└─────────┘│ │└─────────┘│ │
│  └───────────┘ └───────────┘ └───────────┘ │
└─────────────────────────────────────────────┘
```

---

## Data Flow

Data flows **top-down via props** and **bottom-up via callbacks**. No component reaches into a sibling or parent.

```
Board (owns state)
  │
  │  tasks: Task[]          ← passed down to each Column
  │  onTaskUpdate(id, data) ← callback passed down to TaskCard via Column
  ▼
Column
  │
  │  tasks: Task[]          ← filtered subset for this status
  │  onTaskUpdate           ← forwarded unchanged
  ▼
TaskCard
  │
  │  task: Task             ← single task object
  │  onUpdate(id, data)     ← calls parent callback on action
  ▼
Button
     variant, size, onClick ← purely presentational; no business logic
```

### TypeScript interfaces

```ts
interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
}

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => void;
}

interface ColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onTaskUpdate: (id: string, data: Partial<Task>) => void;
}

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
```

---

## Design Decisions

### 1. State lives in `Board`, not in individual `Column`s

**Why:** Keeping all task data in one place makes status changes (moving a card between columns) straightforward — only `Board` needs to update, and both affected columns re-render with fresh props automatically.

**Trade-off:** For very large task lists this could cause unnecessary re-renders. Mitigation: wrap `Column` and `TaskCard` in `React.memo` so they only re-render when their own slice of data changes.

### 2. `Button` is purely presentational

**Why:** A reusable `Button` with `variant` and `size` props means every action in the app looks and behaves consistently without duplicating styles.

**Trade-off:** It has no built-in loading or async state. Any component that needs a loading button must manage that state itself and pass `disabled={isLoading}`.

### 3. `use client` directive on interactive components only

**Why:** Next.js renders components on the server by default. Components with `onClick` handlers (`TaskCard`, `Button`) cannot run on the server and need the `'use client'` directive. `Column` and `Board` can remain server components if they contain no interactive logic, keeping the JS bundle smaller.

**Pitfall to avoid:** Adding `'use client'` to a parent component automatically makes all its children client components too. Keep the boundary as deep in the tree as possible.

### 4. `next/image` for profile avatars in `DeveloperProfile`

**Why:** `next/image` provides automatic resizing, lazy loading, and format optimisation (WebP), which is important for profile images that vary widely in original size.

**Pitfall to avoid:** Forgetting to add the image hostname to `next.config.js` under `images.domains` will throw a runtime error. Always add external domains before using them.

### 5. Tailwind for styling

**Why:** Utility classes co-locate styles with markup, making it easier to see exactly how a component looks without jumping to a separate CSS file. This is particularly useful for interns and new contributors reviewing code.

**Trade-off:** Long `className` strings can become hard to read. Convention: extract repeated class combinations into a `cn()` helper or a dedicated `variants` map (e.g., with the `cva` library) rather than repeating them inline.

---

## Potential Pitfalls & Mitigations

| Pitfall | Where it can happen | Mitigation |
|---|---|---|
| Re-renders on every keystroke | `Board` state update triggers full tree re-render | Wrap `Column` and `TaskCard` in `React.memo`; use `useCallback` for callbacks |
| `next/image` runtime error | `DeveloperProfile` loading an external avatar URL | Add hostname to `next.config.js` `images.domains` before merging |
| `'use client'` boundary too high | Wrapping `Board` as a client component | Push the directive down to only the components that need interactivity |
| TypeScript `any` creeping in | Quick fixes under deadline pressure | Enable `strict: true` in `tsconfig.json` and treat type errors as CI failures |
| Tailwind class duplication | `Button` variants copy-pasting classes | Use `cva` (class-variance-authority) to define variants in one place |
| Missing accessible labels on `Button` | Icon-only buttons (e.g., delete icon) | Always provide `aria-label` when there is no visible text child |

---

## Team Page Routing

The Team page follows Next.js App Router conventions:

```
app/
  team/
    page.tsx        ← renders the Team page at /team
    layout.tsx      ← shared layout (nav, sidebar) for the team section
  components/
    DeveloperProfile.tsx
    Button.tsx
    TaskCard.tsx
    Column.tsx
    Board.tsx
```

`DeveloperProfile` is a server component (no interactivity needed) so it fetches and renders profile data without adding to the client bundle.

---

## Future Considerations

### Near-term
- **Drag-and-drop:** Integrate `@dnd-kit/core` to allow moving cards between columns. The current prop-drilling pattern supports this cleanly — `Board` already owns status and can update it on drop.
- **Optimistic updates:** Update the UI immediately on card move and roll back on API error, to avoid the card "jumping" back.

### Medium-term
- **Pagination / virtual list:** If task counts grow beyond ~100 per column, render only visible cards using `react-virtual` to keep scroll performance smooth.
- **Zustand or Context for global state:** Once the board needs to share state with other pages (notifications, filters), prop-drilling from `Board` becomes cumbersome. Migrate task state to a Zustand store.

### Long-term
- **Real-time collaboration:** Replace REST polling with WebSocket subscriptions (e.g., via Supabase Realtime or Pusher) so multiple users see card moves live.
- **Accessibility audit:** Run axe-core in CI and ensure all interactive elements are keyboard-navigable and screen-reader friendly before launch.

---

## Checklist for Contributors

Before opening a PR that touches these components:

- [ ] Props are typed with TypeScript interfaces (no `any`)
- [ ] New interactive components have `'use client'` and are as low in the tree as possible
- [ ] External image domains are added to `next.config.js`
- [ ] `Button` variants are added via the `cva` variants map, not inline duplication
- [ ] Accessible labels are present on all icon-only buttons
- [ ] `React.memo` / `useCallback` added if the component re-renders more than needed