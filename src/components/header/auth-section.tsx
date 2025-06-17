import { HashLink as Link } from 'react-router-hash-link';

import { Badge } from '../ui/badge';

import CartIcon from '@/assets/images/bag.png';
import EnterIcon from '@/assets/images/enter.png';
import LogoutIcon from '@/assets/images/logout.png';
import ProfileIcon from '@/assets/images/profile.png';
import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';
import { useIsAuth } from '@/store/selector';
import { ROUTES } from '@/utils/constantes';
import type { AuthSectionProps } from '@/utils/types';

export function AuthSection({
  onItemClick,
}: AuthSectionProps): React.JSX.Element {
  const isAuth = useIsAuth();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = (): void => {
    logout();
    onItemClick?.();
  };
  const { totalAmount } = useCartStore();
  return (
    <>
      {isAuth ? (
        <>
          <Link className="menu-item" to={ROUTES.PROFILE} onClick={onItemClick}>
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
              className="w-[22px] h-[22px]  ml-[4px]"
            />
          </button>
        </>
      ) : (
        <Link className="menu-item" to={ROUTES.LOGIN} onClick={onItemClick}>
          <img
            src={EnterIcon}
            alt="EnterIcon"
            className="w-[22px] h-[22px] ml-[2px]"
          />
        </Link>
      )}
      <Link
        className="menu-item relative"
        to={ROUTES.CART}
        onClick={onItemClick}
      >
        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums  absolute z-10 bottom-3 left-3">
          <p className="text-center ">{totalAmount}</p>
        </Badge>
        <img src={CartIcon} alt="CartIcon" className="w-[24px] h-[24px]" />
      </Link>
    </>
  );
}
