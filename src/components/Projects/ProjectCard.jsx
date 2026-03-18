import { Link } from 'react-router-dom'

export function ProjectCard({ project, onDelete }) {
  const total = project.tasks?.length ?? 0
  const done = (project.tasks ?? []).filter((t) => t.status === 'Done').length

  return (
    <div className="card premium-glass-card">
      <div className="card-body premium-glass">
        <div className="flex items-start justify-between">
          <div className="min-w-0" >
            <h3 className="animated-gradient-text">Title : {project.title}</h3>
            {project.description ? (
              <p className="text-sm text-white/70 overflow-hidden text-ellipsis">
               Description : {project.description}
              </p>
            ) : (
              <p className="text-sm text-white/40">No description</p>
            )}
          </div>

          <div className="dropdown dropdown-end">
            {/* <button className="btn btn-ghost btn-sm text-white/70 hover:text-white" type="button">
              ⋯
            </button> */}
            {/* <ul className="dropdown-content menu premium-glass rounded-box w-44 p-2 shadow-2xl z-50"> */}
              <li>
                <button
                  type="button"
                  className="text-error"
                  onClick={() => onDelete(project)}
                >
                  Delete project
                </button>
              </li>
            {/* </ul> */}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-[10px]">
          <div>{total} tasks</div>
          <div>{done} done</div>
        </div>

        <div className="card-actions justify-end mt-[10px]">
          {/* <button> */}
          <Link className="btn btn-primary btn-sm no-underline" to={`/project/${project.id}`}>
            Open board
          </Link>

          {/* </button> */}
        </div>
      </div>
    </div>
  )
}

