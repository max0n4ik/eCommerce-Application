import { Header } from '@/components/header';
import type { PropsWithChildren } from '@/utils/interfaces';

export default function Layout({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <div className="p-4">
      <Header />
      <main>{children}</main>
    </div>
  );
}
