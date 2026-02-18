import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority_score: number;
  status: string;
  smart_tags: string[];
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const smartCreateTask = async (rawText: string): Promise<Task> => {
  const response = await api.post('/tasks/smart-create', { raw_text: rawText });
  return response.data;
};

export const getQuantumSortedTasks = async (): Promise<{ sorted_task_ids: string[] }> => {
  const response = await api.get('/tasks/quantum-sort');
  return response.data;
};
