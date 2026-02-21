import { useState } from "react";
import {
  LayoutDashboard,
  HardHat,
  ClipboardList,
  Users,
  FileText,
  DollarSign,
  Settings,
  Menu,
  X,
  Building2,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Obras", url: "/obras", icon: HardHat },
  { title: "Planilhas", url: "/planilhas", icon: ClipboardList },
  { title: "Funcionários", url: "/funcionarios", icon: Users },
  { title: "Ordens de Compra", url: "/ordens-compra", icon: FileText },
  { title: "Lançamentos", url: "/lancamentos", icon: DollarSign },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-card px-4 py-3 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" />
          <span className="font-bold text-foreground text-sm">Marques Caetano</span>
        </div>
        <div className="w-9" />
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                  <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-sidebar-foreground">Marques Caetano</p>
                  <p className="text-xs text-sidebar-foreground/60">Gestão de Obras</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent lg:hidden transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    end={item.url === "/"}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? ""
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                    activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:min-h-screen">
          <div className="mx-auto max-w-5xl p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
