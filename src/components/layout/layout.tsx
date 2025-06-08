import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { PropsWithChildren } from '@/utils/interfaces';

export default function Layout({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
