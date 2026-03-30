import type { ScaffoldConfig } from "../../types";

export function generateRootLayoutSidebar(): string {
  return `import { useAtom } from 'jotai'
import { sidebarOpenAtom } from '@store/ui'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      {/* Click-outside overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="md:pl-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
`;
}

export function generateSidebar(): string {
  return `import { useAtom } from 'jotai'
import { sidebarOpenAtom } from '@store/ui'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  const [open] = useAtom(sidebarOpenAtom)

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border',
        'flex flex-col transform transition-transform duration-200',
        'md:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      <SidebarHeader />
      <SidebarNav />
    </aside>
  )
}
`;
}

export function generateSidebarHeader(config: ScaffoldConfig): string {
  return `import { Link } from '@tanstack/react-router'

export function SidebarHeader() {
  return (
    <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
      <Link to="/" className="font-semibold text-foreground">
        ${config.projectName}
      </Link>
    </div>
  )
}
`;
}

export function generateSidebarNav(): string {
  return `import { Link } from '@tanstack/react-router'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/settings', label: 'Settings' },
] as const

export function SidebarNav() {
  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          activeProps={{ className: 'text-foreground bg-muted' }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
`;
}

export function generateTopBar(): string {
  return `import { useAtom } from 'jotai'
import { sidebarOpenAtom } from '@store/ui'
import { useTheme, useUser, useLogout } from '@lib/snapshot'

export function TopBar() {
  const [, setSidebarOpen] = useAtom(sidebarOpenAtom)
  const { user } = useUser()
  const logout = useLogout()
  const { theme, toggle } = useTheme()

  return (
    <header className="h-14 border-b border-border bg-background flex items-center gap-4 px-4 shrink-0">
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        className="md:hidden text-muted-foreground hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <div className="flex-1" />
      <button
        onClick={toggle}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
      {user && (
        <button
          onClick={() => logout.mutate()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sign out
        </button>
      )}
    </header>
  )
}
`;
}
