import { Link } from 'react-router-dom';

import { ROUTES } from '@/utils/constantes';

export default function Header(): React.JSX.Element {
  return (
    <>
      <header>
        <nav className="mb-4 flex gap-4">
          <Link to={ROUTES.HOME}>Home</Link>
          <Link to={ROUTES.CART}>Cart</Link>
          <Link to={ROUTES.LOGIN}>Login</Link>
          <Link to={ROUTES.REGISTRATION}>Registration</Link>
        </nav>
      </header>
    </>
  );
}
