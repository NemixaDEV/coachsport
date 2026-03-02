import { ReactNode } from 'react'
import BottomNav from './BottomNav'
interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background flex flex-col border-1 border-red-500">
      <main className="flex-1 " style={{ height: 'calc(100dvh - 80px)' }}>
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}
