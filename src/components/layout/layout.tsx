import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { PropsWithChildren } from '@/utils/interfaces';

export default function Layout({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <div className="p-4 flex flex-col justify-between container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
