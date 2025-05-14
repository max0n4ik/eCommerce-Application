import { Eye, EyeOff } from 'lucide-react';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authenticate, schema } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constantes';

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>): React.JSX.Element {
  const [state, formAction] = useActionState(authenticate, null);
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateField = (field: 'email' | 'password', value: string): void => {
    try {
      schema.shape[field].parse(value);
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email' || name === 'password') {
      validateField(name, value);
    }
  };

  return (
    <form
      action={formAction}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            required
            aria-describedby="email-error"
            value={formData.email}
            onChange={handleInputChange}
          />
          {(validationErrors.email || state?.errors?.email) && (
            <p
              id="email-error"
              className="text-sm font-medium text-destructive"
            >
              {validationErrors.email || state?.errors?.email}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              aria-describedby="password-error"
              className="pr-10"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
          {(validationErrors.password || state?.errors?.password) && (
            <p
              id="password-error"
              className="text-sm font-medium text-destructive"
            >
              {validationErrors.password || state?.errors?.password}
            </p>
          )}
        </div>
        {state?.message && !state?.errors && (
          <p className="text-sm font-medium text-destructive">
            {state.message}
          </p>
        )}

        <Button type="submit" className="w-full" aria-disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          to={ROUTES.REGISTRATION}
          className="text-accent hover:text-accent-foreground"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
