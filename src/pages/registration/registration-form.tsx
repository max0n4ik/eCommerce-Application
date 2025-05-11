import { cn } from '@/lib/utils';
import { Button } from '@/pages/registration/button';
import { Input } from '@/pages/registration/input';
import { Label } from '@/pages/registration/label';

export function RegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Get started now</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Credentials to access your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Repeat password</Label>
          </div>
          <Input id="password" type="password" required />
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
