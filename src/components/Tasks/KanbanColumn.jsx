export function KanbanColumn({ title, count, onDropTask, children }) {
  return (
    <section 
      className="premium-glass rounded-2xl overflow-hidden flex flex-col h-full"
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData('application/json')
        if (taskId && onDropTask) onDropTask(taskId, title)
      }}
    >
      <header className="px-4 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h3 className="font-semibold text-white tracking-wide">{title}</h3>
        <div className="badge bg-white/10 border-white/20 text-white">{count}</div>
      </header>
      <div className="p-3 space-y-3 min-h-24">{children}</div>
    </section>
  )
}

