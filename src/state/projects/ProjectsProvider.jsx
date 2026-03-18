import { useMemo } from 'react'
import { useLocalStorageState } from '../../hooks/useLocalStorageState.js'
import { ProjectsContext } from './ProjectsContext.js'
import { STORAGE_KEY } from './constants.js'
import { createProjectsActions } from './projectsStore.js'

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useLocalStorageState(STORAGE_KEY, [])

  const actions = useMemo(() => createProjectsActions(setProjects), [setProjects])

  const value = useMemo(
    () => ({ projects, setProjects, actions }),
    [actions, projects, setProjects],
  )

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  )
}

