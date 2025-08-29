
export interface Project {
  id: string;
  name: string;
  description: string;
  vision: string;
  vision_statement?: string;
  features: string[];
  tech_stack: string[];
  team_size: number;
  timeline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  created_date: string;
  deadline: string;
  progress: number;
  requirements_doc_url?: string;
}

export const saveProject = (project: Omit<Project, 'id' | 'created_date' | 'progress' | 'status'>) => {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    created_date: new Date().toISOString().split('T')[0],
    progress: 0,
    status: 'planning'
  };
  
  projects.push(newProject);
  localStorage.setItem('created_projects', JSON.stringify(projects));
  return newProject;
};

export const getProjects = (): Project[] => {
  const stored = localStorage.getItem('created_projects');
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const updateProject = (id: string, updates: Partial<Project>) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    localStorage.setItem('created_projects', JSON.stringify(projects));
    return projects[index];
  }
  
  return null;
};

export const deleteProject = (id: string) => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem('created_projects', JSON.stringify(filtered));
};
