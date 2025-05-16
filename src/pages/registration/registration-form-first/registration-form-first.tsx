import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constantes';
import type { Props } from '@/utils/types';
import {
  validateRegistrationCredentials,
  type RegistrationCredentials,
} from '@/utils/validations';

export default function RegistrationFormFirst({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const [formData, setFormData] = useState<RegistrationCredentials>({
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
    const { isValid, errors } = validateRegistrationCredentials(formData);
    setErrors(errors);
    if (!isValid) return;

    console.log('form data submitted', formData);
    onNext();
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
        <div className="grid gap-2 relative">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.email} />
            </div>
          )}
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.password} />
            </div>
          )}
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="confirmPassword">Repeat password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.confirmPassword} />
            </div>
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
          Sign in
        </Link>
      </div>
    </form>
  );
}
