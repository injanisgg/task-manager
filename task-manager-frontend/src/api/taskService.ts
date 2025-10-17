import { api } from "./client";
import type { Task, TaskCreate, TaskUpdate } from "../types/taskType";

export const taskService = {
    getTasks: async (): Promise<Task[]> => {
        const res = await api.get<Task[]>("/tasks");
        return res.data;
    },

    getTaskDetail: async (id: string): Promise<Task> => {
        const  res = await api.get<Task>(`/tasks/${id}`);
        return res.data;
    },

    createTask: async (task: TaskCreate): Promise<Task> => {
        const res = await api.post<Task>("/tasks", task);
        return res.data
    },

    updateTask: async (id: string, task: TaskUpdate): Promise<Task> => {
        const res = await api.put<Task>(`/tasks/${id}`, task);
        return res.data;
    },

    toggleTask: async (id: string): Promise<Task> => {
        const res = await api.patch<Task>(`/tasks/${id}/toggle`);
        return res.data;
    },

    deleteTask: async (id: string): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    },
};