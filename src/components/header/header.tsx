import { slide as Menu } from 'react-burger-menu';
import { HashLink as Link } from 'react-router-hash-link';

import { AuthSection } from './auth-section';
import { NavLinks } from './navigation-links';

import Logo from '@/assets/images/logo.png';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import { ROUTES } from '@/utils/constantes';

export default function Header(): React.JSX.Element {
  const { menuOpen, setMenuOpen, closeMenu, openMenu } = useMobileMenu();

  return (
    <header className="flex items-center justify-between px-4 py-3 bc-section-background">
      <Link to={ROUTES.HOME} className="flex items-center">
        <img src={Logo} alt="Logo" className="size-[51px]" />
        <h2 className="font-bold text-[25px] sm:text-[30px] md:text-[34px] lg:text-[34px] font-serif text-[#586F69] ml-2">
          Petal & Pot
        </h2>
      </Link>

      <nav className="hidden md:flex flex-1 items-center justify-between ml-2">
        <div className="flex justify-center flex-1 gap-5 font-medium text-base text-black font-sans uppercase">
          <NavLinks />
        </div>
        <div className="flex items-center gap-3 ml-auto">
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
            className="absolute top-4 right-4 text-3xl z-50 transition-transform duration-200 hover:scale-110 cursor-pointer"
            onClick={closeMenu}
          >
            <span className="icon-cross text-[25px] text-accent"></span>
          </button>
          <div className="pt-8 flex flex-col gap-6 pl-6 pr-6">
            <NavLinks onItemClick={closeMenu} />
            <AuthSection onItemClick={closeMenu} />
          </div>
        </Menu>

        {!menuOpen && (
          <button
            className="z-50 relative text-3xl text-[#586F69] transition-transform duration-200 hover:scale-110 cursor-pointer"
            onClick={openMenu}
          >
            <span className="icon-burger text-[30px]"></span>
          </button>
        )}
      </div>
    </header>
  );
}
