import { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (): void => {
    logout();
    setMenuOpen(false);
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return (): void => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);
  const closeMenu = (): void => setMenuOpen(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bc-section-background">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={Logo} alt="Logo" className="size-[51px]" />
          <h2 className="font-bold text-[25px] sm:text-[30px] md:text-[34px] lg:text-[34px] font-serif text-[#586F69] ml-2">
            Petal & Pot
          </h2>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-between ml-4">
          <div className="flex justify-center flex-1 gap-6 font-medium text-base text-black font-sans uppercase">
            <Link className="menu-item" to={ROUTES.HOME}>
              Home
            </Link>
            <Link className="menu-item" to={ROUTES.CATALOG}>
              Catalog
            </Link>
            <Link className="menu-item" to={ROUTES.ABOUT}>
              About Us
            </Link>
            <Link className="menu-item" to={`#contacts`}>
              Contacts
            </Link>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            {isAuth ? (
              <>
                <Link className="menu-item" to={ROUTES.PROFILE}>
                  <img
                    src={ProfileIcon}
                    alt="ProfileIcon"
                    className="w-[25px] h-[25px]"
                  />
                </Link>
                <button onClick={handleLogout}>
                  <img
                    src={LogoutIcon}
                    alt="LogoutIcon"
                    className="w-[25px] h-[25px]"
                  />
                </button>
              </>
            ) : (
              <Link className="menu-item" to={ROUTES.LOGIN}>
                <img
                  src={EnterIcon}
                  alt="EnterIcon"
                  className="w-[25px] h-[25px]"
                />
              </Link>
            )}
            <Link className="menu-item" to={ROUTES.CART}>
              <img
                src={CartIcon}
                alt="CartIcon"
                className="w-[25px] h-[25px]"
              />
            </Link>
          </div>
        </nav>

        <div className="md:hidden">
          <Menu
            right
            isOpen={menuOpen}
            onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
            customBurgerIcon={false}
            customCrossIcon={false}
          >
            <button
              className="absolute top-4 right-4 text-3xl text-[#586F69] z-50"
              onClick={() => setMenuOpen(false)}
            >
              <span className="icon-cross text-[25px]"></span>
            </button>
            <Link className="menu-item" to={ROUTES.HOME} onClick={closeMenu}>
              Home
            </Link>
            <Link className="menu-item" to={ROUTES.CATALOG} onClick={closeMenu}>
              Catalog
            </Link>
            <Link className="menu-item" to={ROUTES.ABOUT} onClick={closeMenu}>
              About Us
            </Link>
            <Link className="menu-item" to="#contacts" onClick={closeMenu}>
              Contacts
            </Link>
            {isAuth ? (
              <>
                <Link className="menu-item" to={ROUTES.PROFILE}>
                  <img
                    src={ProfileIcon}
                    alt="ProfileIcon"
                    className="menu-item w-[25px] h-[25px]"
                  />
                </Link>
                <button onClick={handleLogout}>
                  <img
                    src={LogoutIcon}
                    alt="LogoutIcon"
                    className="w-[25px] h-[25px]"
                  />
                </button>
              </>
            ) : (
              <Link className="menu-item" to={ROUTES.LOGIN}>
                <img
                  src={EnterIcon}
                  alt="EnterIcon"
                  className="w-[25px] h-[25px]"
                />
              </Link>
            )}
            <Link className="menu-item" to={ROUTES.CART} onClick={closeMenu}>
              <img
                src={CartIcon}
                alt="CartIcon"
                className="w-[25px] h-[25px]"
              />
            </Link>
          </Menu>
          {!menuOpen && (
            <button
              className="z-50 relative text-3xl text-[#586F69]"
              onClick={() => setMenuOpen(true)}
            >
              <span className="icon-burger text-[30px]"></span>
            </button>
          )}
        </div>
      </header>
    </>
  );
}
