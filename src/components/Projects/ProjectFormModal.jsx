import { useId, useMemo, useState } from 'react'

export function ProjectFormModal({ onClose, onSubmit }) {
  const titleId = useId()
  const descId = useId()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const canSave = useMemo(() => title.trim().length > 0, [title])

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSave) return
    onSubmit({ title, description })
    onClose()
  }

  return (
    <div className="modal modal-open backdrop-blur-md bg-black/40">
      <div className="modal-box premium-glass border border-white/20 !max-w-md shadow-2xl">
        <h2 className="animated-gradient-text">Create Project</h2>
        <p className="text-sm text-white/70 mt-2">
          Projects contain tasks organized as a kanban boardd.
        </p>

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
              placeholder="e.g. Website Redesign"
              autoFocus
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor={descId}>
              <span className="label-text text-white/80 font-medium">Description (optional)</span>
            </label>
            <textarea
              id={descId}
              className="textarea premium-input min-h-[100px] w-full mt-[20px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
            />
          </div>

          <div className='flex gap-[50px] mt-[10px]'>
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button disabled={!canSave}>
              Create
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

