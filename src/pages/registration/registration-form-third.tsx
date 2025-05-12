import { cn } from '@/lib/utils';
import { Button } from '@/pages/registration/button';
import { Input } from '@/pages/registration/input';
import { Label } from '@/pages/registration/label';
import { useState } from 'react';
type Props = {
  onNext: () => void;
};

export function RegistrationFormThird({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const [useDefault, setUseDefault] = useState(false);
  const [useAsBilling, setUseAsBilling] = useState(false);
  const handleUseDefaultChange = () => {
    const newValue = !useDefault;
    setUseDefault(newValue);
    if (newValue) setUseAsBilling(false);
  };

  const handleUseAsBillingChange = () => {
    const newValue = !useAsBilling;
    setUseAsBilling(newValue);
    if (newValue) setUseDefault(false);
  };
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Shipping address
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Country</Label>
          <Input id="country" type="text" placeholder="Country" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">City</Label>
          </div>
          <Input id="city" type="text" placeholder="City" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Street</Label>
          </div>
          <Input id="street" type="text" placeholder="Street" required />
        </div>
        <div className="flex gap-5">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">House</Label>
            </div>
            <Input id="house" type="text" placeholder="House" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Post code</Label>
            </div>
            <Input
              id="poste-code"
              type="number"
              placeholder="Post code"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            <Input
              id="use-default"
              type="checkbox"
              className="w-3 h-3"
              checked={useDefault}
              onChange={handleUseDefaultChange}
            />
            <Label id="use-default">Use as default</Label>
          </div>
          <div className="flex gap-5">
            <Input
              id="use-default"
              type="checkbox"
              className="w-3 h-3"
              checked={useAsBilling}
              onChange={handleUseAsBillingChange}
            />
            <Label id="use-as-billing">Use this address as billing</Label>
          </div>
        </div>
        <Button type="button" className="w-full" onClick={onNext}>
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
        <a href="e" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
