import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { TaskCard } from './TaskCard';
import { Loader2, ClipboardList, CheckCircle, Clock } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, loading, fetchTasks } = useTaskStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
          <p className="text-gray-600 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-600" />
          Your Tasks
        </h2>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer ${
              filter === 'pending'
                ? 'bg-white text-yellow-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer ${
              filter === 'completed'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            {filter === 'completed' ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : (
              <Clock className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {filter === 'all' && 'No tasks yet'}
            {filter === 'pending' && 'No pending tasks'}
            {filter === 'completed' && 'No completed tasks'}
          </h3>
          <p className="text-gray-500">
            {filter === 'all' && 'Create your first task to get started!'}
            {filter === 'pending' && 'All tasks are completed. Great job!'}
            {filter === 'completed' && 'Complete some tasks to see them here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;