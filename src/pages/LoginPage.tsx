import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, LoginFormData } from '../schemas/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { AuthLayout } from '../components/layout/AuthLayout';
import { EyeIcon, LogoIcon } from '../components/icons';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field === 'email' || field === 'password') fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
          <LogoIcon className="w-8 h-8" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Welcome to TaskFlow
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Sign in to your workspace and pick up where you left off.
        </p>
      </div>

      {serverError && (
        <Alert type="error" onClose={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={errors.password}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="rounded text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:hover:text-slate-200"
            >
              <EyeIcon className="h-4 w-4" />
            </button>
          }
        />

        <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-bold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};
