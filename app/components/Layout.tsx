import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  cartCount?: number;
}

export function Layout({ children, cartCount }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg-page" dir="rtl">
      <AnnouncementBar />
      <Header cartCount={cartCount} />
      <main>{children}</main>
    </div>
  );
}





