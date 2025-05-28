import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { PrivateRoute } from '@/components/private-route';
import { About } from '@/pages/about';
import { Cart } from '@/pages/cart';
import { CatalogPage } from '@/pages/catalog';
import { Home } from '@/pages/home';
import Login from '@/pages/login/login';
import NotFound from '@/pages/not-found/not-found';
import { Product } from '@/pages/product';
import { Profile } from '@/pages/profile';
import Registration from '@/pages/registration/registration';
import { ROUTES } from '@/utils/constantes';

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route
            path={ROUTES.REGISTRATION}
            element={
              <PrivateRoute reverse>
                <Registration />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <PrivateRoute reverse>
                <Login />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
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
