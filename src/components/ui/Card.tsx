import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerPill?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  headerPill,
  title,
  subtitle,
  action,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 ${className}`}
      {...props}
    >
      {(headerPill || title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5 dark:border-slate-800/60">
          <div>
            {headerPill && (
              <span className="mb-1.5 block text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] uppercase">
                {headerPill}
              </span>
            )}
            {title && (
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
