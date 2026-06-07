"use client";

import { api } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    createdDate: string;
}

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
interface User {
    id: string;
    name: string;
}

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(
        null
    );

    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [showModal, setShowModal] = useState(false);

    const [editingTask, setEditingTask] =
        useState<Task | null>(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        assignedUser: "None",
        status: "Pending",
    });

    const fetchProject = async () => {
        try {
            const response = await api.get(
                `/projects/${projectId}`
            );

            setProject(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load project");
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get(
                `/tasks?projectId=${projectId}`
            );

            setTasks(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tasks");
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load users");
        }
    };
    useEffect(() => {
        if (projectId) {
            fetchProject();
            fetchTasks();
            fetchUsers();
        }
    }, [projectId]);

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            priority: "Medium",
            dueDate: "",
            assignedUser: "",
            status: "Pending",
        });

        setEditingTask(null);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!form.title.trim()) {
            toast.error("Task title is required");
            return;
        }

        try {
            if (editingTask) {
                await api.patch(
                    `/tasks/${editingTask.id}`,
                    form
                );

                toast.success("Task updated");
            } else {
                await api.post("/tasks", {
                    ...form,
                    projectId,
                });

                toast.success("Task created");
            }

            fetchTasks();

            setShowModal(false);

            resetForm();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);

        setForm({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            assignedUser: task.assignedUser,
            status: task.status,
        });

        setShowModal(true);
    };

    const handleDelete = async (taskId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/tasks/${taskId}`);

            fetchTasks();

            toast.success("Task deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete task");
        }
    };

    if (!project) {
        return (
            <div className="p-6">
                Loading project...
            </div>
        );
    }

    return (
        <div>
            {/* Project Info */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow">
                <h1 className="mb-3 text-3xl font-bold">
                    {project.name}
                </h1>

                <p className="mb-4 text-gray-600">
                    {project.description}
                </p>

                <div className="flex gap-6 text-sm">
                    <p>
                        <strong>Status:</strong>{" "}
                        {project.status}
                    </p>

                    <p>
                        <strong>Created:</strong>{" "}
                        {project.createdDate}
                    </p>
                </div>
            </div>

            {/* Task Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    Tasks
                </h2>

                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    + Add Task
                </button>
            </div>

            {/* Tasks Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">
                                Title
                            </th>

                            <th className="p-4 text-left">
                                Priority
                            </th>

                            <th className="p-4 text-left">
                                Assigned To
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
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
                                    <td className="p-4">
                                        {task.title}
                                    </td>

                                    <td className="p-4">
                                        {task.priority}
                                    </td>

                                    <td className="p-4">
                                        {task.assignedUser || "None"}
                                    </td>

                                    <td className="p-4">
                                        {task.status}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <Link href={`/tasks/${task.id}`}>
                                                View
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleEdit(task)
                                                }
                                                className="text-yellow-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Task Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h2 className="mb-4 text-2xl font-bold">
                            {editingTask
                                ? "Edit Task"
                                : "Create Task"}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <input
                                placeholder="Task Title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <textarea
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description:
                                            e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <select
                                value={form.assignedUser}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
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

                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        dueDate:
                                            e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <select
                                value={form.priority}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        priority:
                                            e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>

                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        status:
                                            e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="rounded-lg border px-4 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-black px-4 py-2 text-white"
                                >
                                    {editingTask
                                        ? "Update"
                                        : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}