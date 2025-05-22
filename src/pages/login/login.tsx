import React from 'react';
import { Link } from 'react-router-dom';

import gardenImage from '@/assets/images/garden.png';
import LoginForm from '@/components/login-form/login-form';
import { ROUTES } from '@/utils/constantes';

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-6">
            <div className="h-px bg-gray-300 w-[140px]" />
            <span className="px-3">or</span>
            <div className="h-px bg-gray-300 w-[140px]" />
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to={ROUTES.REGISTRATION}
              className="text-primary hover:text-accent"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={gardenImage}
          alt="export"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
