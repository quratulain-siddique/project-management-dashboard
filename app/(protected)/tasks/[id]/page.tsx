"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
    const router = useRouter();
    const params = useParams();
    const taskId = params.id as string;
    interface User {
        id: string;
        name: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (taskId) {
            fetchTask();
            fetchUsers();
        }
    }, [taskId]);

    const [task, setTask] = useState<Task | null>(null);
    const [project, setProject] = useState<Project | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] =
        useState(false);

    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        assignedUser: "",
        status: "Backlog",
    });
    const fetchTask = async () => {
        try {
            const taskResponse = await api.get(
                `/tasks/${taskId}`
            );

            setTask(taskResponse.data);

            setEditForm({
                title: taskResponse.data.title,
                description: taskResponse.data.description,
                priority: taskResponse.data.priority,
                dueDate: taskResponse.data.dueDate,
                assignedUser: taskResponse.data.assignedUser,
                status: taskResponse.data.status,
            });

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
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Delete this task?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/tasks/${taskId}`);

            toast.success("Task deleted");

            router.push("/tasks");
        } catch (error) {
            toast.error("Failed to delete task");
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
    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            await api.patch(`/tasks/${taskId}`, editForm);

            toast.success("Task updated");

            setShowEditModal(false);

            fetchTask();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task");
        }
    };
    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Task Details
                    </h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
                        >
                            Edit Task
                        </button>

                        <button
                            onClick={handleDelete}
                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                            Delete Task
                        </button>

                        <Link
                            href="/tasks"
                            className="rounded-lg border px-4 py-2"
                        >
                            Back to Tasks
                        </Link>
                    </div>
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
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-2xl font-bold">
                            Edit Task
                        </h2>

                        <form
                            onSubmit={handleUpdate}
                            className="space-y-4"
                        >
                            <input
                                value={editForm.title}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Task Title"
                                className="w-full rounded-lg border p-3"
                            />

                            <textarea
                                value={editForm.description}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Description"
                                className="w-full rounded-lg border p-3"
                            />

                            <input
                                type="date"
                                value={editForm.dueDate}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        dueDate: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <select
                                value={editForm.priority}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        priority: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>

                            <select
                                value={editForm.status}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option>Backlog</option>
                                <option>In Development</option>
                                <option>In Review</option>
                                <option>Shipped</option>
                            </select>

                            <select
                                value={editForm.assignedUser}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        assignedUser: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option value="None">
                                    None
                                </option>

                                {users.map((user) => (
                                    <option
                                        key={user.id}
                                        value={user.name}
                                    >
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowEditModal(false)
                                    }
                                    className="rounded-lg border px-4 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}