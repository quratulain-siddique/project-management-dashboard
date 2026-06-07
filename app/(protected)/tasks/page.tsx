"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    assignedUser: string;
    status: string;
}

interface Project {
    id: string;
    name: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [tasksResponse, projectsResponse] =
                await Promise.all([
                    api.get("/tasks"),
                    api.get("/projects"),
                ]);

            setTasks(tasksResponse.data);
            setProjects(projectsResponse.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getProjectName = (projectId: string) => {
        const project = projects.find(
            (p) => p.id === projectId
        );

        return project?.name || "Unknown Project";
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading tasks...
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Task Management
                </h1>

                <p className="mt-2 text-gray-500">
                    View all tasks across all projects.
                </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">
                                Task
                            </th>

                            <th className="p-4 text-left">
                                Project
                            </th>

                            <th className="p-4 text-left">
                                Priority
                            </th>

                            <th className="p-4 text-left">
                                Assigned User
                            </th>

                            <th className="p-4 text-left">
                                Due Date
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Task ID
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="p-6 text-center"
                                >
                                    No tasks found
                                </td>
                            </tr>
                        ) : (
                            tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-t"
                                >
                                    <td className="p-4 font-medium">
                                        {task.title}
                                    </td>

                                    <td className="p-4">
                                        {getProjectName(
                                            task.projectId
                                        )}
                                    </td>

                                    <td className="p-4">
                                        {task.priority}
                                    </td>

                                    <td className="p-4">
                                        {task.assignedUser}
                                    </td>

                                    <td className="p-4">
                                        {task.dueDate}
                                    </td>

                                    <td className="p-4">
                                        {task.status}
                                    </td>

                                    <td className="p-4 text-xs text-gray-500">
                                        {task.id}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}