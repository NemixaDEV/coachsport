import { createContext, useContext, useState, ReactNode } from 'react'

export type ViewMode = 'admin' | 'user' | 'suscriptor'

interface AdminViewContextType {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(
  undefined,
)

export function useAdminView() {
  const context = useContext(AdminViewContext)
  if (!context)
    throw new Error('useAdminView debe usarse dentro de AdminViewProvider')
  return context
}

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('admin')

  return (
    <AdminViewContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </AdminViewContext.Provider>
  )
}
