"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    description: string;
    status: string;
}

export default function TaskDetailsPage() {
    const params = useParams();
    const taskId = params.id as string;

    const [task, setTask] = useState<Task | null>(null);
    const [project, setProject] = useState<Project | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    const fetchTask = async () => {
        try {
            const taskResponse = await api.get(
                `/tasks/${taskId}`
            );

            setTask(taskResponse.data);

            const projectResponse = await api.get(
                `/projects/${taskResponse.data.projectId}`
            );

            setProject(projectResponse.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load task");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (taskId) {
            fetchTask();
        }
    }, [taskId]);

    if (loading) {
        return (
            <div className="p-6">
                Loading task...
            </div>
        );
    }

    if (!task) {
        return (
            <div className="p-6">
                Task not found
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Task Details
                    </h1>

                    <Link
                        href="/tasks"
                        className="rounded-lg border px-4 py-2"
                    >
                        Back to Tasks
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">
                            Task ID
                        </p>

                        <p className="font-medium">
                            {task.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Project
                        </p>

                        {project && (
                            <Link
                                href={`/projects/${project.id}`}
                                className="font-medium text-blue-600 hover:underline"
                            >
                                {project.name}
                            </Link>
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Title
                        </p>

                        <p className="font-medium">
                            {task.title}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Assigned User
                        </p>

                        <p className="font-medium">
                            {task.assignedUser}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Priority
                        </p>

                        <p className="font-medium">
                            {task.priority}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Status
                        </p>

                        <p className="font-medium">
                            {task.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Due Date
                        </p>

                        <p className="font-medium">
                            {task.dueDate}
                        </p>
                    </div>

                    {project && (
                        <div>
                            <p className="text-sm text-gray-500">
                                Project Status
                            </p>

                            <p className="font-medium">
                                {project.status}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <p className="mb-2 text-sm text-gray-500">
                        Description
                    </p>

                    <div className="rounded-lg border p-4">
                        {task.description}
                    </div>
                </div>
            </div>

            {project && (
                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-bold">
                        Parent Project
                    </h2>

                    <p className="mb-2">
                        <strong>Name:</strong>{" "}
                        {project.name}
                    </p>

                    <p className="mb-2">
                        <strong>Status:</strong>{" "}
                        {project.status}
                    </p>

                    <p>
                        <strong>Description:</strong>{" "}
                        {project.description}
                    </p>
                </div>
            )}
        </div>
    );
}