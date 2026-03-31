import { useId, useMemo, useState } from 'react'
import { TASK_STATUSES } from '../../projects/constants.js'

export function TaskFormModal({ onClose, onSubmit, initialTask }) {
  const titleId = useId()
  const descId = useId()
  const dueId = useId()
  const statusId = useId()

  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '')
  const [status, setStatus] = useState(initialTask?.status ?? 'Todo')

  const canSave = useMemo(() => title.trim().length > 0, [title])
  const mode = initialTask?.id ? 'Edit' : 'Add'

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSave) return
    onSubmit({
      title,
      description,
      dueDate,
      status,
    })
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="premium-glass border border-white/20 w-[500px] rounded-2xl p-6 shadow-2xl relative">
        <h2 className="font-semibold text-2xl text-white mb-2 animated-gradient-text">{mode} Task</h2>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor={titleId}>
              <span className="label-text text-white/80 font-medium">Title</span>
            </label>
            <input
              id={titleId}
              className="input premium-input w-full h-[40px] my-[20px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design login screen"
              autoFocus
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor={descId}>
              <span className="label-text text-white/80 font-medium">Description</span>
            </label>
            <textarea
              id={descId}
              className="textarea premium-input min-h-[100px] w-full mt-[20px] mb-[10px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details, acceptance criteria, notes..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label" htmlFor={dueId}>
                <span className="label-text text-white/80 font-medium">Due date</span>
              </label>
              <input
                id={dueId}
                type="date"
                className="input premium-input w-full h-[40px] mt-[10px] mb-[10px]"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor={statusId}>
                <span className="label-text text-white/80 font-medium">Status</span>
              </label>
              <select
                id={statusId}
                className="select premium-input w-full  h-[30px] mt-[10px]"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-slate-800 text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex justify-end gap-[10px] mt-[6px]'>
            <button type="button" onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white transition-colors">
              Cancel
            </button>
            <button disabled={!canSave} className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

