import { useId } from 'react'
import { TASK_STATUSES } from '../../projects/constants.js'
import { formatDate, isOverdue } from '../../utils/date.js'

function statusBadge(status) {
  if (status === 'Done') return 'badge badge-success'
  if (status === 'In Progress') return 'badge badge-info'
  return 'badge badge-ghost'
}

export function TaskCard({ task, onEdit, onDelete, onChangeStatus }) {
  const statusId = useId()
  const overdue = task.status !== 'Done' && isOverdue(task.dueDate)

  return (
    <div
      className="card premium-glass-card rounded-2xl! cursor-grab active:cursor-grabbing hover:border-primary/50"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', task.id)
      }}
    >
      <div className="card-body p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className={`${statusBadge(task.status)} border-none shadow-sm`}>{task.status}</div>
            </div>
            <h4 className="animated-gradient-text">{task.title}</h4>

            {task.description ? (
              <p className="text-sm text-white/70 mt-1 overflow-hidden text-ellipsis">
                {task.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-[5px]">
            <button className="btn btn-ghost btn-xs text-white/50 hover:text-white" type="button" onClick={onEdit}>
              Edit
            </button>
            <button className="btn btn-ghost btn-xs text-error hover:text-red-400" type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="text-xs text-white/60">
            {task.dueDate ? (
              <span className={overdue ? 'text-error font-semibold drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]' : ''}>
                Due {formatDate(task.dueDate)}
              </span>
            ) : (
              <span>No due date</span>
            )}
          </div>

          <div className="form-control">
            <label className="sr-only" htmlFor={statusId}>
              Status
            </label>
            <select
              id={statusId}
              className="select select-xs premium-input"
              value={task.status}
              onChange={(e) => onChangeStatus(e.target.value)}
            >
              {TASK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

