import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/Projects/ProjectCard.jsx'
import { ProjectFormModal } from '../components/Projects/ProjectFormModal.jsx'
import { useProjects } from '../projects/useProjects.js'
import Button from '../components/Button.jsx'


export function Dashboard() {
  const { projects, actions } = useProjects()
  const [createOpen, setCreateOpen] = useState(false)

  const stats = useMemo(() => {
    const allTasks = projects.flatMap((p) => p.tasks ?? [])
    const totalTasks = allTasks.length
    const doneTasks = allTasks.filter((t) => t.status === 'Done').length
    const completion = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100)
    return {
      totalProjects: projects.length,
      totalTasks,
      doneTasks,
      completion,
    }
  }, [projects])

  function handleDeleteProject(project) {
    const ok = window.confirm(
      `Delete project "${project.title}"?\n\nThis will also delete all tasks inside it.`,
    )
    if (!ok) return
    actions.deleteProject(project.id)
  }

  function handleCreateProject(values) {
    actions.createProject(values)
  }

  return (
    <div className="space-y-6 ml-[20px] mr-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 p-[20px]">
        <div>
          <h1 className="text-3xl font-bold animated-gradient-text tracking-tight pb-1"  style={{ fontWeight: 600 }}>Dashboard</h1>
          <p className="text-white/70 mt-1 text-[25px]">
            Create projects, then manage tasks in a kanban board.
          </p>
        </div>
        {/* <div>
         <h2 className="text-4xl font-bold tracking-wide" style={{ fontWeight: 400 }}>Overview : </h2>
        </div> */}
        
      </div>
        <div>
         <h2 className="text-4xl font-bold tracking-wide p-[20px]" style={{ fontWeight: 400 }}>Overview : </h2>
        </div>

      <div className="flex gap-[100px] justify-center w-full rounded-2xl p-4 mb-[50px] ">
        <div className="glass stat bg-white/10 rounded-[25px] p-4 w-[150px] h-[100px] flex flex-col items-center justify-center border border-white/20">
          <div className="animated-gradient-text">Projects</div>
          <div className="animated-gradient-text">{stats.totalProjects}</div>
        </div>
        <div className="glass stat bg-white/10 rounded-[25px] p-4 w-[150px] h-[100px] flex flex-col items-center justify-center border border-white/20">
          <div className="animated-gradient-text">Total tasks</div>
          <div className="animated-gradient-text">{stats.totalTasks}</div>
        </div>
        <div className="glass stat bg-white/10 rounded-[25px] p-4 w-[150px] h-[100px] flex flex-col items-center justify-center border border-white/20">
          <div className="animated-gradient-text">Completed</div>
          <div className="animated-gradient-text">{stats.doneTasks}</div>
        </div>
        <div className="glass stat bg-white/10 rounded-[25px] p-4 w-[150px] h-[100px] flex flex-col items-center justify-center border border-white/20">
          <div className="animated-gradient-text">Completion</div>
          <div className="animated-gradient-text">{stats.completion}%</div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="card text-center items-center py-12 mt-[100px]">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-2 animated-gradient-text">No projects yet</h2>
            <p className="text-white/60 mb-6 ">
              Create your first project to start tracking tasks.
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-sm "
                onClick={() => setCreateOpen(true)}
              >
                Create project
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onDelete={handleDeleteProject} />
          ))}
        </div>
      )}

      {createOpen ? (
        <ProjectFormModal
          onClose={() => setCreateOpen(false)}
          onSubmit={handleCreateProject}
        />
      ) : null}
    </div>
  )
}

