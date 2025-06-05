import { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { HashLink as Link } from 'react-router-hash-link';

import { AuthSection } from './auth-section';

import Logo from '@/assets/images/logo.png';
import { ROUTES } from '@/utils/constantes';

export default function Header(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <AuthSection />
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
              className="absolute top-4 right-4 text-3xl z-50  transition-transform duration-200 hover:scale-110 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <span className="icon-cross text-[25px] text-accent transition-transform duration-200 hover:scale-110 cursor-pointer"></span>
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
            <AuthSection />
          </Menu>
          {!menuOpen && (
            <button
              className="z-50 relative text-3xl text-[#586F69]  transition-transform duration-200 hover:scale-110 cursor-pointer"
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
