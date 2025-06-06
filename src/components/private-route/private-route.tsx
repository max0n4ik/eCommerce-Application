import React from 'react';
import { Navigate } from 'react-router-dom';

import { useIsAuth } from '@/store/selector';
import { ROUTES } from '@/utils/constantes';
import type { PrivateRouteProps } from '@/utils/types';

const PrivateRoute = ({
  children,
  reverse,
}: PrivateRouteProps): React.JSX.Element => {
  const isAuth = useIsAuth();

  if (reverse) {
    return isAuth ? <Navigate to={ROUTES.HOME} /> : <>{children}</>;
  }
  return isAuth ? <>{children}</> : <Navigate to={ROUTES.LOGIN} />;
};
export default PrivateRoute;
