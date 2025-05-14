import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constantes';

type Props = {
  onNext: () => void;
};

const formSchema = z
  .object({
    email: z.string().email('Invalid email address, (e.g., example@email.com)'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

export default function RegistrationFormFirst({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      console.log('form data submitted', formData);
      onNext();
    } else {
      const newErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        newErrors[key] = issue.message;
      }
      setErrors(newErrors);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Get started now</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Credentials to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-sm font-medium text-destructive">
              {errors.email}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-sm font-medium text-destructive">
              {errors.password}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Repeat password</Label>
          </div>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-sm font-medium text-destructive">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="text-accent hover:text-accent-foreground"
        >
          {' '}
          Sign in
        </Link>
      </div>
    </form>
  );
}
