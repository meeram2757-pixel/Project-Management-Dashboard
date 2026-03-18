import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useLocalStorage('pmd-projects', [
    {
      id: 'p1',
      title: 'E-commerce Theme',
      description: 'Design and build the new ecommerce theme.',
      tasks: [
        { id: 't1', title: 'Setup Vite + React', description: 'Initialize the base repository', status: 'Done', dueDate: '2026-03-20' },
        { id: 't2', title: 'Config Tailwind', description: 'Setup styling framework', status: 'In Progress', dueDate: '2026-03-22' },
        { id: 't3', title: 'Design System', description: 'Colors and typography', status: 'Todo', dueDate: '2026-03-25' },
      ],
    },
  ]);

  const addProject = (projectData) => {
    const newProject = {
      id: uuidv4(),
      ...projectData,
      tasks: [],
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const addTask = (projectId, taskData) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: [...p.tasks, { id: uuidv4(), ...taskData, status: 'Todo' }]
        };
      }
      return p;
    }));
  };

  const updateTaskStatus = (projectId, taskId, newStatus) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
        };
      }
      return p;
    }));
  };

  const updateTask = (projectId, taskId, updatedTaskData) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...updatedTaskData } : t)
        };
      }
      return p;
    }));
  };

  const deleteTask = (projectId, taskId) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.filter(t => t.id !== taskId)
        };
      }
      return p;
    }));
  };

  const value = {
    projects,
    addProject,
    deleteProject,
    addTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
