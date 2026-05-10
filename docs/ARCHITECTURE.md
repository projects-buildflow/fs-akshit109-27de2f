# Component Architecture

> Task 1.6 — Architecture Review  
> Author: Akshit  
> Last updated: June 2025

---

## 1. Component Hierarchy

### Folder Structure

```
app/
├── layout.tsx          ← Root layout (fonts, global styles, nav shell)
├── page.tsx            ← Home page /
└── team/
    └── page.tsx        ← Team page /team — renders DeveloperProfile cards

components/
├── Board.tsx           ← Owns task state; top of the Kanban tree
├── Column.tsx          ← One Kanban column (To Do / In Progress / Done)
├── TaskCard.tsx        ← Single task card inside a column
├── Button.tsx          ← Reusable button with variant + size props
├── PriorityBadge.tsx   ← Coloured badge displaying task priority level
└── DeveloperProfile.tsx ← Team member profile card with avatar + info
```

### Component Tree

```
<Board>
  └── <Column> (×3 — one per status)
        ├── <TaskCard> (×n — one per task)
        │     ├── <PriorityBadge>
        │     └── <Button>  (Edit / Delete / Move)
        └── <Button>  (+ Add task)

<DeveloperProfile>   ← used independently on /team page
```

---

## 2. Data Flow Diagram

Data flows **top-down via props** and **bottom-up via callbacks**.

```
Board  (owns: Task[], setTasks)
  │
  │  tasks filtered by status
  │  onTaskUpdate(id, data) callback
  ▼
Column
  │
  │  individual Task objects
  │  onTaskUpdate forwarded
  ▼
TaskCard
  │
  │  task.priority  ────────────▶  PriorityBadge  (display only)
  │  onUpdate(id, data)  ────────▶  Button onClick handlers
  ▼
(state change bubbles back up to Board via callback)
```

**Rule:** No component reads or mutates state that belongs to a sibling or parent. `Board` is the single source of truth for all task data.

---

## 3. Props Documentation

### `Board`

No props — owns all state internally.

| State | Type | Description |
|---|---|---|
| `tasks` | `Task[]` | All tasks across all columns |

Renders three `<Column>` components, each receiving a filtered subset of `tasks`.

---

### `Column`

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Column heading (e.g. "In Progress") |
| `status` | `Task['status']` | ✅ | Filters which tasks belong here |
| `tasks` | `Task[]` | ✅ | Full task list — Column filters internally |
| `onTaskUpdate` | `(id: string, data: Partial<Task>) => void` | ✅ | Callback to update a task in Board |
| `children` | `React.ReactNode` | ❌ | Optional slot for extra header actions |

Renders a header with task count and a list of `<TaskCard>` components.

**Why `children`?** Rather than hardcoding an "Add task" button inside `Column`, accepting `children` keeps the component flexible. The parent (`Board`) decides what action — if any — appears in the column header. This avoids re-designing `Column` every time a new header action is needed.

---

### `TaskCard`

| Prop | Type | Required | Description |
|---|---|---|---|
| `task` | `Task` | ✅ | The full task object to display |
| `onUpdate` | `(id: string, data: Partial<Task>) => void` | ✅ | Called when the user edits or moves the task |

Renders task title, description, assignee, `<PriorityBadge>`, and action `<Button>`s.

---

### `Button`

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | ✅ | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | ✅ | Dimensions and font size |
| `onClick` | `() => void` | ✅ | Click handler |
| `disabled` | `boolean` | ❌ | Disables interaction; defaults to `false` |
| `children` | `React.ReactNode` | ✅ | Button label or icon |

Renders a styled `<button>` element. Has no internal state — purely presentational.

---

### `PriorityBadge`

| Prop | Type | Required | Description |
|---|---|---|---|
| `priority` | `'low' \| 'medium' \| 'high'` | ✅ | Determines badge colour and label |

Renders a small coloured pill: green for low, amber for medium, red for high.

**Why a separate component?** Priority styling is used in multiple places — inside `TaskCard`, potentially in filter dropdowns, and in summary views. Extracting it into `PriorityBadge` means the colour logic lives in exactly one file. Changing "high" from red to orange is a one-line edit.

---

### `DeveloperProfile`

| Prop | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Developer's full name |
| `role` | `string` | ✅ | Job title or team role |
| `avatarUrl` | `string` | ✅ | URL for profile image (rendered via `next/image`) |
| `githubHandle` | `string` | ❌ | GitHub username for profile link |
| `skills` | `string[]` | ❌ | List of tech skills to display as badges |

Renders a profile card. Uses `next/image` for optimised avatar loading.

---

## 4. Design Decisions

### Why use `children` in `Column`?

Hardcoding buttons inside `Column` would couple the component to specific actions. Using `children` makes `Column` a general-purpose container — today it holds an "Add task" button, tomorrow it could hold a filter menu — without changing `Column` itself. This follows the **open/closed principle**: open for extension, closed for modification.

### Why separate `PriorityBadge`?

Two reasons:

1. **Reusability.** The same priority display is needed in `TaskCard` and potentially elsewhere (filters, analytics). One component, used everywhere.
2. **Single responsibility.** `TaskCard` should not contain colour-mapping logic for priority levels. That logic belongs in `PriorityBadge`, keeping each component focused on one job.

### Server vs Client components

Next.js renders components on the server by default, which reduces JavaScript sent to the browser.

| Component | Type | Reason |
|---|---|---|
| `DeveloperProfile` | Server | Displays static data; no interactivity needed |
| `Board` | Server (shell) | Can fetch initial tasks server-side |
| `Column` | Server | No direct event handlers |
| `TaskCard` | **Client** (`'use client'`) | Has `onClick` handlers for edit/delete/move |
| `Button` | **Client** (`'use client'`) | Interactive element with `onClick` |
| `PriorityBadge` | Server | Display only; no interactivity |

**Key rule:** Add `'use client'` as deep in the tree as possible. Marking a parent as a client component makes all its children client components too, increasing the JS bundle unnecessarily.

---

## 5. Type Definitions

```ts
// The core data model for a task
interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string; // ISO date string
}

// Represents a Kanban column configuration
interface ColumnConfig {
  id: string;
  title: string;
  status: Task['status'];
}

// Team member profile data
interface Developer {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  githubHandle?: string;
  skills?: string[];
}
```

### Default column configuration

```ts
const COLUMNS: ColumnConfig[] = [
  { id: 'col-1', title: 'To Do',       status: 'todo'        },
  { id: 'col-2', title: 'In Progress', status: 'in-progress' },
  { id: 'col-3', title: 'Done',        status: 'done'        },
];
```

---

## Potential Pitfalls & Mitigations

| Pitfall | Where | Mitigation |
|---|---|---|
| Re-renders on every Board state update | `Column`, `TaskCard` | Wrap in `React.memo`; use `useCallback` for callbacks |
| `next/image` runtime error on external URLs | `DeveloperProfile` | Add hostname to `images.domains` in `next.config.js` |
| `'use client'` boundary set too high | `Board` or `Column` | Keep directive on `TaskCard` and `Button` only |
| TypeScript `any` under deadline pressure | Anywhere | Enable `strict: true` in `tsconfig.json` |
| Priority colour logic duplicated | `TaskCard` or ad-hoc badges | Always import `PriorityBadge`; never re-implement inline |

---

## Contributor Checklist

Before opening a PR that touches these components:

- [ ] All props typed — no `any`
- [ ] `'use client'` only on components that need it
- [ ] External image hostnames added to `next.config.js`
- [ ] New priority display uses `<PriorityBadge>` not inline styles
- [ ] Icon-only `<Button>`s have an `aria-label`