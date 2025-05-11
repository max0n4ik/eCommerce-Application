import { Calendar } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/pages/registration/button';
import { Input } from '@/pages/registration/input';
import { Label } from '@/pages/registration/label';

export function RegistrationFormSecond({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Name" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="last-name">Last name</Label>
          </div>
          <Input id="last-name" type="text" placeholder="Last name" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Birthday</Label>
          </div>
          <Input id="birthday" type="text" placeholder="Birthday" required>
           
          </Input>
          <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button type="button" className="w-full">
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
        <a href="#" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
