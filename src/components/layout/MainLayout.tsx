import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-60">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
