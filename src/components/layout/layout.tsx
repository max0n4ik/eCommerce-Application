import { Link } from 'react-router-dom';

import { ROUTES } from '@/utils/constantes';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): React.JSX.Element {
  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.CART}>Cart</Link>
        <Link to={ROUTES.LOGIN}>Login</Link>
        <Link to={ROUTES.REGISTRATION}>Registration</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
