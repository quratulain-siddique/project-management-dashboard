"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] =
        useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "Not Assigned",
    });
    useEffect(() => {
        fetchUsers();

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {
            setCurrentUser(
                JSON.parse(storedUser)
            );
        }
    }, []);
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
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Users
                </h1>

                <p className="mt-2 text-gray-500">
                    Registered system users.
                </p>
            </div>
            {currentUser?.role === "Admin" && (
                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    + Add User
                </button>
            )}
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Role
                            </th>

                            <th className="p-4 text-left">
                                User ID
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t hover:bg-slate-50"
                            >
                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "Admin"
                                            ? "bg-red-100 text-red-600"
                                            : user.role === "Manager"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : user.role === "Developer"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : user.role === "QA"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {user.role || "Viewer"}
                                    </span>
                                </td>

                                <td className="p-4 text-xs text-gray-500">
                                    {user.id}
                                </td>

                                <td className="p-4">
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-2xl font-bold">
                            Add User
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            />

                            <select
                                value={newUser.role}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        role: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
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
                                    setShowModal(false)
                                }
                                className="rounded-lg border px-4 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        await api.post(
                                            "/users",
                                            newUser
                                        );

                                        toast.success(
                                            "User created"
                                        );

                                        fetchUsers();

                                        setShowModal(
                                            false
                                        );

                                        setNewUser({
                                            name: "",
                                            email: "",
                                            password: "",
                                            role: "Developer",
                                        });
                                    } catch {
                                        toast.error(
                                            "Failed to create user"
                                        );
                                    }
                                }}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}