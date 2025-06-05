import { HashLink as Link } from 'react-router-hash-link';

import { ROUTES } from '@/utils/constantes';

type NavLinksProps = {
  onItemClick?: () => void;
};

export function NavLinks({ onItemClick }: NavLinksProps): React.JSX.Element {
  return (
    <>
      <Link className="menu-item" to={ROUTES.HOME} onClick={onItemClick}>
        Home
      </Link>
      <Link className="menu-item" to={ROUTES.CATALOG} onClick={onItemClick}>
        Catalog
      </Link>
      <Link className="menu-item" to={ROUTES.ABOUT} onClick={onItemClick}>
        About Us
      </Link>
      <Link className="menu-item" to="#contacts" onClick={onItemClick}>
        Contacts
      </Link>
    </>
  );
}
