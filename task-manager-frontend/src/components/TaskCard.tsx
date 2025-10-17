import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import type { Task } from "../types/taskType";
import { Check, Trash2, Calendar, Loader2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toggleTask, deleteTask } = useTaskStore();

  const handleToggle = async () => {
    await toggleTask(task.id);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask(task.id);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 border-l-4 ${
        task.completed ? "border-green-500 bg-green-50/30" : "border-blue-500"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1 hover:cursor-pointer ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-blue-500"
          }`}
        >
          {task.completed && <Check className="h-4 w-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-2 text-sm ${
                task.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex flex-col md:flex-row items-start md:items-center text-left gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(task.created_at)}
            </span>

            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <div className="flex-shrink-0">
            <button
              onClick={() => setShowConfirm(true)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 hover:cursor-pointer p-2 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 className="h-5 w-5" />
            </button>
        </div>

        {/* Popup Delete */}
        {showConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Delete this task?
                    </h2>
                    <div className="flex justify-center gap-3">
                        <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-medium transition hover:cursor-pointer">
                            Cancel
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="flex items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-50 hover:cursor-pointer">
                            {isDeleting 
                             ? <><Loader2 className="h-5 w-5 animate-spin" /> Deleting ...</>
                             : "Delete"}
                          </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}