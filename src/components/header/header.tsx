import { HashLink as Link } from 'react-router-hash-link';

import CartIcon from '@/assets/images/bag.png';
import EnterIcon from '@/assets/images/enter.png';
import Logo from '@/assets/images/logo.png';
import LogoutIcon from '@/assets/images/logout.png';
import ProfileIcon from '@/assets/images/profile.png';
import { useAuthStore } from '@/store/login';
import { useIsAuth } from '@/store/selector';
import { ROUTES } from '@/utils/constantes';

export default function Header(): React.JSX.Element {
  const isAuth = useIsAuth();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = (): void => {
    logout();
  };

  return (
    <>
      <header className="flex md:flex-row flex-col gap-5 md:gap-0 items-center px-[34px] py-[15px] justify-between bc-section-background">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={Logo} alt="Logo" className="size-[51px]" />
          <p className="font-bold text-[34px] font-serif text-[#586F69]">
            Petal & Pot
          </p>
        </Link>
        <nav className=" font-medium  items-center flex gap-4 text-base text-black font-sans uppercase">
          <Link to={ROUTES.HOME}>Home</Link>
          <Link to={ROUTES.CATALOG}>Shop</Link>
          <Link to={ROUTES.ABOUT}>About Us</Link>
          <Link to={`#contacts`}>Contacts</Link>
          {isAuth ? (
            <>
              <Link to={ROUTES.PROFILE}>
                <img
                  src={ProfileIcon}
                  alt="ProfileIcon"
                  className="w-[25px] h-[25px]"
                ></img>
              </Link>
              <button onClick={handleLogout}>
                <img
                  src={LogoutIcon}
                  alt="ProfileIcon"
                  className="w-[25px] h-[25px]"
                ></img>
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <img
                  src={EnterIcon}
                  alt="EnterIco"
                  className="w-[25px] h-[25px]"
                ></img>
              </Link>
            </>
          )}
          <Link to={ROUTES.CART}>
            <img
              src={CartIcon}
              alt="CartIcon"
              className="w-[25px] h-[25px]"
            ></img>
          </Link>
        </nav>
      </header>
    </>
  );
}
