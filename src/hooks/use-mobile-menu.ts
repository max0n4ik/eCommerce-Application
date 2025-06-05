import { useState, useEffect } from 'react';

import type { UseMobileMenuResult } from '@/utils/interfaces';

export function useMobileMenu(): UseMobileMenuResult {
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
  const openMenu = (): void => setMenuOpen(true);
  const toggleMenu = (): void => setMenuOpen((prev) => !prev);

  return {
    menuOpen,
    setMenuOpen,
    closeMenu,
    openMenu,
    toggleMenu,
  };
}
