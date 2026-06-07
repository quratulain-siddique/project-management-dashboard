"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

interface Task {
    id: string;
    assignedUser: string;
    title: string;
    status: string;
    priority: string;
}

export default function UserDetailsPage() {
    const params = useParams();
    const userId = params.id as string;

    const [user, setUser] =
        useState<User | null>(null);
    const [showEditModal, setShowEditModal] =
        useState(false);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "Not Assigned",
    });

    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchData = async () => {
        try {
            const userResponse = await api.get(
                `/users/${userId}`
            );

            setUser(userResponse.data);
            setEditForm({
                name: userResponse.data.name,
                email: userResponse.data.email,
                role:
                    userResponse.data.role ||
                    "Not Assigned",
            });

            const tasksResponse = await api.get(
                "/tasks"
            );

            const userTasks =
                tasksResponse.data.filter(
                    (task: Task) =>
                        task.assignedUser ===
                        userResponse.data.name
                );

            setTasks(userTasks);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!user) {
        return (
            <div className="p-6">
                Loading user...
            </div>
        );
    }
    const isValid =
        editForm.name.trim() &&
        editForm.email.trim();
    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        User Details
                    </h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
                        >
                            Edit User
                        </button>

                        <Link
                            href="/users"
                            className="rounded-lg border px-4 py-2"
                        >
                            Back
                        </Link>
                    </div>
                </div>

                <p className="mb-3">
                    <strong>Name:</strong>{" "}
                    {user.name}
                </p>

                <p className="mb-3">
                    <strong>Email:</strong>{" "}
                    {user.email}
                </p>
                <p className="mb-3">
                    <strong>Role:</strong>{" "}
                    {user.role || "Not Assigned"}
                </p>
                <p>
                    <strong>User ID:</strong>{" "}
                    {user.id}
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-bold">
                    Assigned Tasks
                </h2>

                {tasks.length === 0 ? (
                    <p>No tasks assigned.</p>
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="rounded-lg border p-4"
                            >
                                <p>
                                    <strong>
                                        {task.title}
                                    </strong>
                                </p>

                                <p>
                                    Priority: {task.priority}
                                </p>

                                <p>
                                    Status: {task.status}
                                </p>

                                <Link
                                    href={`/tasks/${task.id}`}
                                    className="text-blue-600"
                                >
                                    View Task
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h2 className="mb-4 text-2xl font-bold">
                            Edit User
                        </h2>

                        <div className="space-y-4">
                            <input
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                                placeholder="Name"
                            />

                            <input
                                value={editForm.email}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                                placeholder="Email"
                            />

                            <select
                                value={editForm.role}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        role: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option>
                                    Not Assigned
                                </option>
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>Developer</option>
                                <option>QA</option>
                                <option>Viewer</option>
                            </select>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() =>
                                    setShowEditModal(false)
                                }
                                className="rounded-lg border px-4 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    if (!editForm.name.trim()) {
                                        toast.error("Name is required");
                                        return;
                                    }

                                    if (!editForm.email.trim()) {
                                        toast.error("Email is required");
                                        return;
                                    }

                                    try {
                                        await api.patch(
                                            `/users/${userId}`,
                                            editForm
                                        );

                                        toast.success("User updated");

                                        setShowEditModal(false);

                                        fetchData();
                                    } catch {
                                        toast.error(
                                            "Failed to update user"
                                        );
                                    }
                                }}
                                disabled={!isValid}

                                className={`rounded-lg px-4 py-2 text-white transition
        ${isValid
                                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                        : "bg-gray-400 cursor-not-allowed opacity-50"
                                    }`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}