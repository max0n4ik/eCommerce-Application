import React from 'react';
import { Navigate } from 'react-router-dom';

import { useIsAuth } from '@/store/selector';
import { ROUTES } from '@/utils/constantes';
import type { PropsWithChildren } from '@/utils/types';

const PrivateRoute = ({ children }: PropsWithChildren): React.JSX.Element => {
  const isAuth = useIsAuth();
  return isAuth ? children : <Navigate to={ROUTES.LOGIN} />;
};
export default PrivateRoute;
