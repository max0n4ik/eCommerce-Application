import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { About } from '@/pages/about';
import { Cart } from '@/pages/cart';
import { Catalog } from '@/pages/catalog';
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
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.CATALOG} element={<Catalog />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
