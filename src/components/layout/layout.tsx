import Header from './header/header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): React.JSX.Element {
  return (
    <div className="p-4">
      <Header />
      <main>{children}</main>
    </div>
  );
}
