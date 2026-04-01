import { useState } from 'react'
import { TaskCard } from '../components/Tasks/TaskCard.jsx'
import { TaskFormModal } from '../components/Tasks/TaskFormModal.jsx'
import { useProjects } from '../projects/useProjects.js'

export function Tasks() {
  const { projects, actions } = useProjects()

  // Extract all tasks from all projects
  const allTasks = projects.flatMap(p =>
    (p.tasks || []).map(t => ({ ...t, projectId: p.id, projectName: p.title }))
  )

  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTaskInfo, setEditingTaskInfo] = useState(null)

  function handleDeleteTask(projectId, taskId) {
    const ok = window.confirm(`Delete this task?`)
    if (!ok) return
    actions.deleteTask(projectId, taskId)
  }

  function handleStatusChange(projectId, taskId, status) {
    actions.updateTask(projectId, taskId, { status })
  }

  function handleEditTask(task) {
    setEditingTaskInfo(task)
    setTaskModalOpen(true)
  }

  function handleSubmitTask(values) {
    if (editingTaskInfo) {
      actions.updateTask(editingTaskInfo.projectId, editingTaskInfo.id, values)
    }
  }

  return (
    <div className="space-y-6 ml-[20px] mr-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 p-[20px]">
        <div>
          <h1 className="text-3xl font-bold animated-gradient-text tracking-tight pb-1" style={{ fontWeight: 600 }}>All Tasks</h1>
          <p className="text-white/70 mt-1 text-[25px]">
            View and manage all tasks across your projects.
          </p>
        </div>
      </div>

      {allTasks.length === 0 ? (
        <div className="card text-center items-center py-12 mt-[100px]">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-2 animated-gradient-text">No tasks yet</h2>
            <p className="text-white/60 mb-6 ">
              Go to a project to create tasks.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTasks.map(task => (
            <div key={task.id} className="relative flex flex-col gap-2 m-[15px]">
              <div className="text-sm font-semibold text-blue-400 px-1 m-[5px]">Project: {task.projectName}</div>
              <TaskCard
                task={task}
                onDelete={() => handleDeleteTask(task.projectId, task.id)}
                onChangeStatus={(status) => handleStatusChange(task.projectId, task.id, status)}
                onEdit={() => handleEditTask(task)}
              />
            </div>
          ))}
        </div>
      )}

      {taskModalOpen && editingTaskInfo ? (
        <TaskFormModal
          key={`edit-${editingTaskInfo.id}`}
          onClose={() => {
            setTaskModalOpen(false)
            setEditingTaskInfo(null)
          }}
          onSubmit={handleSubmitTask}
          initialTask={editingTaskInfo}
        />
      ) : null}
    </div>
  )
}
