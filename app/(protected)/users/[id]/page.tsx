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

    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchData = async () => {
        try {
            const userResponse = await api.get(
                `/users/${userId}`
            );

            setUser(userResponse.data);

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

    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        User Details
                    </h1>

                    <Link
                        href="/users"
                        className="rounded-lg border px-4 py-2"
                    >
                        Back
                    </Link>
                </div>

                <p className="mb-3">
                    <strong>Name:</strong>{" "}
                    {user.name}
                </p>

                <p className="mb-3">
                    <strong>Email:</strong>{" "}
                    {user.email}
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
        </div>
    );
}