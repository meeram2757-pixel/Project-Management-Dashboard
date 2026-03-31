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

          <div className='flex justify-end gap-[10px] mt-[6px]'>
            <button type="button" onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white transition-colors">
              Cancel
            </button>

            <button disabled={!canSave} className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Create
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

