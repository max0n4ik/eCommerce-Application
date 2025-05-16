import { Link } from 'react-router-dom';

import Logo from '@/assets/images/logo.png';
import { ROUTES } from '@/utils/constantes';

export default function Header(): React.JSX.Element {
  return (
    <>
      <header className="px-[34px] py-[15px]">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={Logo} alt="Logo" className="size-[51px]" />
          <p className="font-bold text-[34px] font-serif text-[#586F69]">
            Petal & Pot
          </p>
        </Link>
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
