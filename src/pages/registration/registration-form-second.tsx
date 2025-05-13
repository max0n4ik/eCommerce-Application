import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BirthdayCalendar } from '@/components/ui/calendar/brithday';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Button } from '@/pages/registration/button';
import { Input } from '@/pages/registration/input';
import { Label } from '@/pages/registration/label';
type Props = {
  onNext: () => void;
};

const FormSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  // .refine(
  //   (dob) => {
  //     const today = new Date();
  //     const thirteenYearsAgo = new Date(
  //       today.getFullYear() - 13,
  //       today.getMonth(),
  //       today.getDate()
  //     );
  //     return dob <= thirteenYearsAgo;
  //   },
  //   { message: 'You must be at least 13 years old' }
  // ),
});
type FormData = z.infer<typeof FormSchema>;

export function RegistrationFormSecond({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data: FormData) => {
    console.log('form data submitted', data);
    onNext();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold capitalize">Registration</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your Credentials to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              {...register('name')}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="last-name">Last name</Label>
            </div>
            <Input
              id="last-name"
              type="text"
              placeholder="Last name"
              {...register('lastName')}
              required
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Birthday</Label>
            <BirthdayCalendar form={form.control} />
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
          <a href="e" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </form>
    </Form>
  );
}
