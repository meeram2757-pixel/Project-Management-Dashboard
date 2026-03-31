import { useContext } from 'react'
import { ProjectsContext } from '../utils/ProjectsContext.js'

export function useProjects() {
  const ctx = useContext(ProjectsContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider')
  return ctx
}

