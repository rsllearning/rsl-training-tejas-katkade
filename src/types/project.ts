export type ProjectStatus = 'active' | 'in_progress' | 'completed' | 'planning' | 'on_hold';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';
export type ProjectCategory = 'Engineering' | 'Mobile' | 'Design' | 'AI / ML' | 'Security';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  tasksCount: number;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  dueDate: string;
}

export interface ProjectActivity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  category: 'commit' | 'deploy' | 'task' | 'milestone';
}

export interface ProjectDoc {
  slug: string;
  title: string;
  summary: string;
  content: string;
  lastUpdated: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate: string;
  targetDate: string;
  budget: string;
  lead: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  };
  team: TeamMember[];
  tasks: ProjectTask[];
  activity: ProjectActivity[];
  docs: Record<string, ProjectDoc>;
}
