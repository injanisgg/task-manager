import { create } from "zustand";
import type { Task, TaskCreate } from "../types/taskType";
import { taskService } from "../api/taskService";

interface TaskStore {
    tasks: Task[];
    loading: boolean;
    error: string | null;

    // actions
    fetchTasks: () => Promise<void>;
    createTask: (task: TaskCreate) => Promise<void>;
    toggleTask: (id: string) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    clearError: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const tasks = await taskService.getTasks();
            set({ tasks, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch task", loading: false });
            console.log("Error fetching tasks:", error);
        }
    },

    createTask: async (taskData: TaskCreate) => {
    set({ loading: true, error: null });
    try {
      const newTask = await taskService.createTask(taskData); 
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create task", loading: false });
      console.error("Error creating task:", error);
      throw error;
    }
  },

  toggleTask: async (id: string) => {
    try {
      const updatedTask = await taskService.toggleTask(id); 
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
      }));
    } catch (error) {
      set({ error: "Failed to toggle task" });
      console.error("Error toggling task:", error);
    }
  },

  deleteTask: async (id: string) => {
    try {
      await taskService.deleteTask(id); 
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete task" });
      console.error("Error deleting task:", error);
    }
  },

  clearError: () => set({ error: null }),
}))