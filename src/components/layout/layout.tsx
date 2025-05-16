import Header from '../header/header';

import type { LayoutProps } from '@/utils/types';

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className="p-4">
      <Header />
      <main>{children}</main>
    </div>
  );
}
