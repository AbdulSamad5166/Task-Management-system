# TaskFlow

**A task and project management workspace for planning work, tracking deadlines, and reviewing progress in one place.**

TaskFlow brings tasks, a Kanban board, a calendar, projects, and progress metrics together in a responsive web app. Work is saved in the browser, so the workspace remains available offline. Optional sync imports sample tasks from DummyJSON to demonstrate the interface.

> **Project type:** Frontend demonstration app. Accounts and workspace data are stored in the browser; there is no application server or shared team database.

## What TaskFlow does

### Plan and manage work

- Create, edit, view, and delete tasks with descriptions, due dates, priorities, status, projects, and tags.
- Split work into subtasks, add notes, and review task activity.
- Track work as Pending, In Progress, or Completed.
- Search, filter, sort, paginate, and bulk update tasks; switch between list and card views.

### See project progress

- Group tasks into color-coded projects and review project progress.
- View totals, completion rate, overdue tasks, upcoming work, and status and priority charts on the dashboard.
- Review deadlines on a monthly calendar and tasks by status on the Kanban board.

### Set up the workspace

- Choose light, dark, or system appearance, an accent palette, compact or comfortable density, and a default task view.
- Register a local account, update its profile, and change its password.
- Continue working offline; view connection status and control sample-data imports.
- Download the source archive from the app's **Export ZIP** action.

## Screens and routes

| Route | Purpose |
| --- | --- |
| `/login`, `/register` | Local account sign-in and registration |
| `/` | Workspace overview, charts, recent and upcoming tasks |
| `/tasks` | Searchable task list or grid, filters, pagination, bulk actions |
| `/tasks/new` | Create a task |
| `/tasks/:id` | Task details, subtasks, notes, activity |
| `/board` | Pending, In Progress, and Completed columns |
| `/projects` | Create projects and review their progress |
| `/calendar` | Tasks arranged by due date |
| `/profile` | Profile and password settings |
| `/settings` | Appearance, sync, and workspace data settings |

Workspace routes require a local account. Register from the sign-in page to start a workspace in this browser.

## Run locally

Requires Node.js 22.12 or newer and npm. No API key, `.env` file, database, or backend is needed to start the app.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and register a local account. On Windows PowerShell, use `npm.cmd` if script execution policy blocks the npm PowerShell script:

```powershell
npm.cmd ci
npm.cmd run dev
```

Vite also prints a network address for previews on the same network. Password hashing requires a secure browser context such as `localhost` or HTTPS; task IDs also support local-network HTTP.

### Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite on port 3000 |
| `npm run lint` | Run strict TypeScript checks |
| `npm test` | Run account, password, ID, and sync regression checks |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run clean` | Remove the production build output |

### Production build

```sh
npm run build
npm run preview
```

The output is a static frontend. Hosting it does not add server accounts, a shared database, or team collaboration.

## Suggested manager demo

1. Register a new account and open the dashboard.
2. Create a project, then add a task with a priority, due date, tag, and checklist.
3. Update the task on the Kanban board; review dashboard and project progress.
4. Open the task to add a note or subtask, then find it in the calendar.
5. Change the theme or density in Settings.
6. Import sample tasks while connected, then show that local tasks remain available offline.

The Dashboard's **Sync Tasks** action imports sample tasks from DummyJSON. Settings also contains sync and data controls. This demonstrates importing data; it is not an integration with a company's task system.

## Data, accounts, and synchronization

- Accounts, password hashes, tasks, projects, preferences, sync settings, and deletion markers live in this browser's `localStorage`.
- Passwords use the browser's Web Crypto SHA-256 API. Because account verification runs only in this browser, this is a demo account flow, **not production authentication**. There is no server-side identity verification or password recovery.
- Clearing this browser's site data removes its local accounts and work. Data does not automatically transfer between devices.
- Sample tasks come from [DummyJSON Todos](https://dummyjson.com/todos). TaskFlow maps them into its task model and assigns display priorities and due dates; this is sample data, not a live business integration.
- Sync imports tasks to the browser. Changes made in TaskFlow are saved locally and are not written back to DummyJSON.
- Sync preserves local work, protects locally edited imported tasks, and remembers deleted imported tasks so they do not return on the next import. Settings provides re-import and reset options.
- Offline, the app continues to read and save local data. Importing or refreshing sample tasks requires an internet connection.

A production multi-user deployment would need server-side authentication, shared storage, backups, access control, and a real task-service integration.

## Code structure

| Path | Responsibility |
| --- | --- |
| `src/app` | Providers, routes, and query client |
| `src/components/layout` | Workspace shell, navigation, page headers |
| `src/components/ui` | Reusable controls, dialogs, notifications |
| `src/components/tasks` | Task forms, rows, cards, board, subtasks |
| `src/components/dashboard`, `src/components/charts` | Dashboard metrics and charts |
| `src/pages` | Dashboard, task, board, calendar, project, account, and settings screens |
| `src/context` | Account, theme, notification, and sync state |
| `src/hooks` | Shared account, task, project, theme, and sync hooks |
| `src/services` | Browser persistence, account operations, task/project logic, API client |
| `src/schemas` | Form validation with Zod |
| `src/utils` | Task merging, filters, dates, formatting, ID generation |
| `tests` | Core account and synchronization regression checks |
| `public/task-management-system.zip` | Source archive served by Export ZIP |

## Technology

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router 7 · TanStack Query · Axios · Zod · Browser Web Crypto and `localStorage`.

## Source archive

`public/task-management-system.zip` is served by the **Export ZIP** button. It contains the source, configuration, tests, and README; it excludes `node_modules`, build output, itself, and local `.env` values. Regenerate the archive after changing project files before sharing it.
