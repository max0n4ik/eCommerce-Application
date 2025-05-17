import { Link } from 'react-router-dom';

import Facebook from '@/assets/images/facebook.png';
import Instagram from '@/assets/images/instagram.png';
import Logo from '@/assets/images/logo.png';
import Twitter from '@/assets/images/twitter.png';
import { ROUTES } from '@/utils/constantes';

export default function Footer(): React.JSX.Element {
  return (
    <>
      <footer>
        <div className="grid lg:grid-cols-[1fr_0.6fr_0.6fr] gap-[5vw] lg:p-[100px] p-[20px]">
          <div className="flex flex-col gap-5">
            <Link to={ROUTES.HOME} className="flex items-center">
              <img src={Logo} alt="Logo" className="size-[51px]" />
              <p className="font-bold lg:text-[34px] text-[26px] font-serif text-[#586F69]">
                Petal & Pot
              </p>
            </Link>
            <p className="lg:pl-[50px] font-sans text-[14.5px] text-[#676867F2]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>

          <div className="flex flex-col gap-5 pt-3">
            <p className="font-serif text-[19.2px] font-medium text-[#011C14]">
              Quick Links
            </p>
            <nav className="font-medium flex gap-4 font-sans text-[14.5px] text-[#586F69] flex-col leading-3">
              <Link to={ROUTES.HOME}>Home</Link>
              <Link to={ROUTES.CART}>Cart</Link>
              <Link to={ROUTES.LOGIN}>Login</Link>
              <Link to={ROUTES.REGISTRATION}>Registration</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-5 pt-3">
            <p className="font-serif text-[19.2px] font-medium text-[#011C14]">
              Get in touch
            </p>
            <div className="flex gap-[10px]">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Facebook} alt="Facebook" className="size-[34px]" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Instagram} alt="Instagram" className="size-[34px]" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Twitter} alt="Twitter" className="size-[34px]" />
              </a>
            </div>
          </div>
        </div>
        <div className="font-sans text-[14.5px] text-[#676867F2] lg:py-[47px] py-[20px] lg:pl-[100px] pl-[20px]">
          Copyright © 2025 Petal&Pots Plants | Powered by Petal&Pots Plants
        </div>
      </footer>
    </>
  );
}
