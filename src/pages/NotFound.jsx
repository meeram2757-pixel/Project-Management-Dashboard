import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <h2 className="card-title">Page not found</h2>
        <p className="opacity-70">The page you’re looking for doesn’t exist.</p>
        <div className="card-actions justify-end">
          <Link to="/" className="btn btn-primary btn-sm">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

