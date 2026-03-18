import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { KanbanColumn } from '../components/Tasks/KanbanColumn.jsx'
import { TaskCard } from '../components/Tasks/TaskCard.jsx'
import { TaskFormModal } from '../components/Tasks/TaskFormModal.jsx'
import { TASK_STATUSES } from '../state/projects/constants.js'
import { useProjects } from '../state/projects/useProjects.js'

export function ProjectDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { projects, actions } = useProjects()

  const project = projects.find((p) => p.id === projectId)

  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [prefillStatus, setPrefillStatus] = useState('Todo')

  const tasksByStatus = useMemo(() => {
    const tasks = project?.tasks ?? []
    const map = new Map(TASK_STATUSES.map((s) => [s, []]))
    for (const t of tasks) {
      const bucket = map.get(t.status) ?? map.get('Todo')
      bucket.push(t)
    }
    return map
  }, [project])

  const allCounts = useMemo(() => {
    const tasks = project?.tasks ?? []
    const done = tasks.filter((t) => t.status === 'Done').length
    return { total: tasks.length, done }
  }, [project])

  const editingTask = useMemo(() => {
    if (!project || !editingTaskId) return null
    return (project.tasks ?? []).find((t) => t.id === editingTaskId) ?? null
  }, [editingTaskId, project])

  function openCreateTask(status = 'Todo') {
    setEditingTaskId(null)
    setPrefillStatus(status)
    setTaskModalOpen(true)
  }

  function openEditTask(taskId) {
    setEditingTaskId(taskId)
    setTaskModalOpen(true)
  }

  function handleDeleteTask(taskId) {
    const task = (project?.tasks ?? []).find((t) => t.id === taskId)
    const ok = window.confirm(`Delete task "${task?.title ?? ''}"?`)
    if (!ok) return
    actions.deleteTask(projectId, taskId)
  }

  function handleSubmitTask(values) {
    if (!project) return
    if (editingTaskId) {
      actions.updateTask(projectId, editingTaskId, values)
    } else {
      actions.createTask(projectId, values)
    }
  }

  function handleChangeStatus(taskId, status) {
    actions.updateTask(projectId, taskId, { status })
  }

  if (!project) {
    return (
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Project not found</h2>
          <p className="opacity-70">
            This project may have been deleted or the URL is incorrect.
          </p>
          <div className="card-actions justify-end">
            <Link to="/" className="btn btn-primary btn-sm">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <button className="btn btn-ghost btn-sm text-white/70 hover:text-white" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button className="btn btn-primary btn-sm text-white border-none shadow-[0_0_15px_rgba(37,99,235,0.5)] shadow-primary/50" onClick={() => openCreateTask('Todo')}>
            Add task
          </button>
        </div>

        <div className="premium-glass rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-3xl font-bold truncate animated-gradient-text pb-1">Title : {project.title}</h1>
              {project.description ? (
                <p className="text-white/70 ">Description : {project.description}</p>
              ) : (
                <p className="text-white/40 mt-1">No description</p>
              )}
            </div>
            <div className="flex gap-[10px]">
              <div>{allCounts.total} tasks</div>
              <div>{allCounts.done} done</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {TASK_STATUSES.map((status) => {
          const tasks = tasksByStatus.get(status) ?? []
          return (
            <div key={status} className="flex-col gap-3 min-h-[300px]">
              <KanbanColumn 
                title={status} 
                count={tasks.length}
                onDropTask={(taskId, newStatus) => {
                  const currentTask = (project?.tasks ?? []).find(t => t.id === taskId);
                  if (currentTask && currentTask.status !== newStatus) {
                    handleChangeStatus(taskId, newStatus);
                  }
                }}
              >
                <button
                  className="btn btn-outline btn-sm w-full"
                  onClick={() => openCreateTask(status)}
                  type="button"
                >
                  + Add to {status}
                </button>

                {tasks.length === 0 ? (
                  <div className="text-sm opacity-60 px-1">No tasks</div>
                ) : null}

                {tasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onEdit={() => openEditTask(t.id)}
                    onDelete={() => handleDeleteTask(t.id)}
                    onChangeStatus={(next) => handleChangeStatus(t.id, next)}
                  />
                ))}
              </KanbanColumn>
            </div>
          )
        })}
      </div>

      {taskModalOpen ? (
        <TaskFormModal
          key={editingTaskId ?? `new:${prefillStatus}`}
          onClose={() => setTaskModalOpen(false)}
          onSubmit={handleSubmitTask}
          initialTask={
            editingTask ?? {
              title: '',
              description: '',
              dueDate: '',
              status: prefillStatus,
            }
          }
        />
      ) : null}
    </div>
  )
}

