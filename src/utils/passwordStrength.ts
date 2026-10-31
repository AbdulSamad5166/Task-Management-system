export function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: 'None', color: 'bg-slate-200' };
  const passed = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const levels = [
    { label: 'Weak', color: 'bg-rose-500' },
    { label: 'Weak', color: 'bg-rose-500' },
    { label: 'Fair', color: 'bg-amber-500' },
    { label: 'Good', color: 'bg-blue-500' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ];
  return { score: passed * 25, ...levels[passed] };
}
