import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { About } from '@/pages/about';
import { Cart } from '@/pages/cart';
import { Catalog } from '@/pages/catalog';
import { Home } from '@/pages/home';
import Login from '@/pages/login/login';
import NotFound from '@/pages/not-found/not-found';
import { Profile } from '@/pages/profile';
import Registration from '@/pages/registration/registration';
import PrivateRoute from '@/private-router/private.router';
import { ROUTES } from '@/utils/constantes';

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.CATALOG} element={<Catalog />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
          <Route
            path={ROUTES.PROFILE}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
