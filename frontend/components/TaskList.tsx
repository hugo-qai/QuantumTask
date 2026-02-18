import React from 'react';
import { Task } from '../lib/api';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="w-full max-w-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  {task.due_date ? new Date(task.due_date).toLocaleString() : 'No Due Date'}
                </p>
                <div className="mt-2 flex gap-2">
                  {task.smart_tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 text-xs font-bold rounded ${
                  task.priority_score > 80 ? 'bg-red-100 text-red-800' : 
                  task.priority_score > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  Score: {task.priority_score}
                </span>
                <span className="text-xs text-gray-400 mt-1">{task.status}</span>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet. Try creating one!</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
