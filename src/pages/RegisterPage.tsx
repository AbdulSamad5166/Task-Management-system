import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPasswordStrength } from '../utils/passwordStrength';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, RegisterFormData } from '../schemas/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { AuthLayout } from '../components/layout/AuthLayout';
import { EyeIcon, LogoIcon } from '../components/icons';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field === 'name' || field === 'email' || field === 'password' || field === 'confirmPassword') {
        fieldErrors[field] = issue.message;
      }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
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
          Create Your Account
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Bring your tasks and projects together in one place.
        </p>
      </div>

      {serverError && (
        <Alert type="error" onClose={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          error={errors.name}
        />

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

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 chars, 1 uppercase, 1 digit, 1 symbol"
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

              {password && (
            <div className="pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>Strength</span>
                <span>{passwordStrength.label}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-type password"
          error={errors.confirmPassword}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="rounded text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:hover:text-slate-200"
            >
              <EyeIcon className="h-4 w-4" />
            </button>
          }
        />

        <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};
