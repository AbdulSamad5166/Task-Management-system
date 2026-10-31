import type { ReactNode } from 'react';
import { CheckCircleIcon, LogoIcon } from '../icons';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex xl:p-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex items-center gap-3 text-xl font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary"><LogoIcon className="h-6 w-6" /></span>
          TaskFlow
        </div>
        <div className="relative max-w-lg py-16">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">Your work, in focus</p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Make room for<br />your best work.</h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-400">A clear view of every project, priority, and next step. Keep your work moving with a workspace built for focus.</p>
          <ul className="mt-10 space-y-4 text-sm text-slate-300">
            {['Plan projects and set priorities', 'Track progress from start to finish', 'Keep working, even when offline'].map((feature) => (
              <li key={feature} className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 shrink-0 text-indigo-300" />{feature}</li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-slate-500">A little structure. A lot more clarity.</p>
      </aside>
      <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md space-y-7">{children}</div>
      </main>
    </div>
  );
}
