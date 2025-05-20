import { Link, useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/logo.png';
import { useAuthStore } from '@/store/login';
import { useIsAuth } from '@/store/selector';
import { ROUTES } from '@/utils/constantes';

export default function Header(): React.JSX.Element {
  const isAuth = useIsAuth();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <header className="flex md:flex-row flex-col gap-5 md:gap-0 items-center px-[34px] py-[15px] justify-between">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={Logo} alt="Logo" className="size-[51px]" />
          <p className="font-bold text-[34px] font-serif text-[#586F69]">
            Petal & Pot
          </p>
        </Link>
        <nav className="mb-4 font-medium items-center flex gap-4 text-base text-black font-sans uppercase">
          <Link to={ROUTES.HOME}>Home</Link>
          <Link to={ROUTES.CART}>Cart</Link>

          {isAuth ? (
            <>
              <Link to={ROUTES.PROFILE}>Profile</Link>
              <button onClick={handleLogout}>Logout</button>{' '}
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>Login</Link>
              <Link to={ROUTES.REGISTRATION}>Registration</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
