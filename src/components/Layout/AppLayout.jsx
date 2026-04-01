import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Plus, Briefcase, CheckSquare, Clock, Users, LayoutTemplate, Layers } from 'lucide-react'
import { useState } from 'react'
import { ProjectFormModal } from '../Projects/ProjectFormModal.jsx'
import { useProjects } from '../../projects/useProjects.js'

export function AppLayout() {
  const [createOpen, setCreateOpen] = useState(false)
  const { actions } = useProjects()

  function handleCreateProject(values) {
    actions.createProject(values)
  }

  return (
    <div className="flex h-screen text-white relative z-0 overflow-hidden">
      {/* Sidebar */}
      <aside className="premium-glass w-[270px] h-full flex flex-col z-10 shrink-0 !border-y-0 !border-l-0 border-r border-white/10 !rounded-none">
        <div className="mb-8 w-full px-2">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-[10px] tracking-wide" style={{ fontWeight: 500 }}>
            <Layers className="text-blue-500" size={28} />
            Project Dashboard
          </h2>
        </div>
        
        <nav className="flex-1 w-full flex flex-col mt-[50px]">

          <ul className="flex flex-col gap-[50px] w-full p-0 m-0 text-white">
            <div className="mt-8 px-2">
              <button
                className="flex items-center py-3 bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium shadow-lg shadow-blue-500/20 border-white !rounded-[50px] gap-[10px]"
                onClick={() => setCreateOpen(true)}
              >
                <Plus size={18} />
                New Project
              </button>
            </div>

            {[
              { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
              { name: 'Projects', icon: Briefcase, path: '/projects' },
              { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
              // { name: 'Timelog', icon: Clock, path: '/timelog' },
              // { name: 'Users', icon: Users, path: '/users' },
              // { name: 'Project Template', icon: LayoutTemplate, path: '/templates' },
            ].map((item) => (
              <li key={item.name} className="w-full list-none">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-[20px] w-full px-4 py-3 rounded-lg transition-all duration-200 no-underline text-sm font-medium ${
                      isActive 
                        ? 'bg-blue-600/80 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`
                  }
                  end={item.path === '/'}
                >
                  <item.icon size={18} />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* <div className="mt-8 px-2">
            <button
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20 border-none"
              onClick={() => setCreateOpen(true)}
            >
              <Plus size={18} />
              New Project
            </button>
          </div> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto w-full px-6 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Project Form Modal */}
      {createOpen && (
        <ProjectFormModal
          onClose={() => setCreateOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  )
}

