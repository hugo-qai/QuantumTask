import React, { useState } from 'react';
import { smartCreateTask, Task } from '../lib/api';

interface SmartInputProps {
  onTaskCreated: (task: Task) => void;
}

const SmartInput: React.FC<SmartInputProps> = ({ onTaskCreated }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const newTask = await smartCreateTask(input);
      onTaskCreated(newTask);
      setInput('');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-8">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Call John tomorrow at 2pm #urgent"
          className="flex-1 p-4 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-bold transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default SmartInput;
