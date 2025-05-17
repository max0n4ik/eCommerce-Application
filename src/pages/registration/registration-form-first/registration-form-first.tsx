import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { RegistrationStepProps } from '@/utils/interfaces';
import {
  validateRegistrationCredentials,
  type RegistrationCredentials,
} from '@/utils/validations';

export default function RegistrationFormFirst({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> &
  RegistrationStepProps): React.JSX.Element {
  const [formData, setFormData] = useState<RegistrationCredentials>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      return Object.fromEntries(
        Object.entries(prevErrors).filter(([key]) => key !== name)
      );
    });
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 my-auto flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
            {errors.password && (
              <div className="absolute left-0 top-full mt-1">
                <Tooltip message={errors.password} />
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="confirmPassword">Repeat password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              autoComplete="off"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showConfirmPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
            {errors.confirmPassword && (
              <div className="absolute left-0 top-full mt-1">
                <Tooltip message={errors.confirmPassword} />
              </div>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
