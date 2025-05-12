import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { Cart } from '@/pages/cart';
import Home from '@/pages/home/home';
import { Login } from '@/pages/login';
import NotFound from '@/pages/not-found/not-found';
import { Registration } from '@/pages/registration';
import { ROUTES } from '@/utils/constantes';

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
