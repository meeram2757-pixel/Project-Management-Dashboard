import { NavLink, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-full text-white relative z-0">
      <div className="navbar premium-glass sticky top-0 z-10">
        <div className="max-w-6xl w-full mx-auto px-4">
          <div className="flex w-full items-center gap-3">
            <div className="flex-1">
              <NavLink to="/" className="btn btn-ghost text-lg p-[20px] no-underline">
                Project Dashboard
              </NavLink>
            </div>
            <div className="flex items-center gap-2 p-[20px]">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'no-underline btn btn-sm btn-primary text-white border-none' : 'btn btn-sm btn-ghost text-white/70 hover:text-white'
                }
                end
              >
                Dashboard
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

