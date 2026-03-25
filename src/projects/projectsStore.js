import { TASK_STATUSES } from './constants.js'

function uid() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(16).slice(2)
}

function nowIso() {
  return new Date().toISOString()
}

export function createProjectsActions(setProjects) {
  function createProject({ title, description }) {
    const project = {
      id: uid(),
      title: title.trim(),
      description: description?.trim() ?? '',
      createdAt: nowIso(),
      tasks: [],
    }
    setProjects((prev) => [project, ...prev])
    return project.id
  }

  function deleteProject(projectId) {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  function createTask(projectId, { title, description, dueDate, status }) {
    const task = {
      id: uid(),
      title: title.trim(),
      description: description?.trim() ?? '',
      dueDate: dueDate || '',
      status: TASK_STATUSES.includes(status) ? status : 'Todo',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, tasks: [task, ...(p.tasks ?? [])] } : p,
      ),
    )

    return task.id
  }

  function updateTask(projectId, taskId, patch) {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p
        return {
          ...p,
          tasks: (p.tasks ?? []).map((t) => {
            if (t.id !== taskId) return t
            const next = {
              ...t,
              ...patch,
              updatedAt: nowIso(),
            }
            if (!TASK_STATUSES.includes(next.status)) next.status = t.status
            if (typeof next.title === 'string') next.title = next.title.trim()
            if (typeof next.description === 'string')
              next.description = next.description.trim()
            return next
          }),
        }
      }),
    )
  }

  function deleteTask(projectId, taskId) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, tasks: (p.tasks ?? []).filter((t) => t.id !== taskId) }
          : p,
      ),
    )
  }

  return {
    createProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
  }
}

