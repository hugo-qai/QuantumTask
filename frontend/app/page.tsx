"use client";

import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import SmartInput from '../components/SmartInput';
import { getTasks, Task } from '../lib/api';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      // Sort locally by priority for now, or use backend sort
      setTasks(data.sort((a, b) => b.priority_score - a.priority_score));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev].sort((a, b) => b.priority_score - a.priority_score));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 lg:p-24 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          QuantumTask
        </h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p className="flex place-items-center gap-2 p-8 lg:p-0">
            AI-Powered Productivity
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-2xl text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
                Type normally. We'll handle the rest.
            </p>
        </div>

        <SmartInput onTaskCreated={handleTaskCreated} />
        
        {isLoading ? (
            <p className="mt-8">Loading tasks...</p>
        ) : (
            <TaskList tasks={tasks} />
        )}
      </div>
    </main>
  );
}
