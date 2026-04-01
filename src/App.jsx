import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/Layout/AppLayout.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { ProjectDetail } from './pages/ProjectDetail.jsx'
import { ProjectsProvider } from './projects/ProjectsProvider.jsx'
import { Projects } from './pages/Projects.jsx'
import { Tasks } from './pages/Tasks.jsx'

export default function App() {
  return (
    <ProjectsProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProjectsProvider>
  )
}
