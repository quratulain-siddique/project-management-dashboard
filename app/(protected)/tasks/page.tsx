"use client";
import Link from "next/link";
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
    const [search, setSearch] = useState("");
    const [userFilter, setUserFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] =
        useState("");
    const [sortBy, setSortBy] =
        useState("newest");
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
    const filteredTasks = [...tasks]
        .filter((task) =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((task) =>
            userFilter
                ? task.assignedUser === userFilter
                : true
        )
        .filter((task) =>
            statusFilter
                ? task.status === statusFilter
                : true
        )
        .filter((task) =>
            priorityFilter
                ? task.priority === priorityFilter
                : true
        )
        .sort((a, b) => {
            if (sortBy === "az")
                return a.title.localeCompare(
                    b.title
                );

            if (sortBy === "za")
                return b.title.localeCompare(
                    a.title
                );

            if (sortBy === "newest")
                return (
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                );

            if (sortBy === "oldest")
                return (
                    new Date(b.dueDate).getTime() -
                    new Date(a.dueDate).getTime()
                );

            return 0;
        });

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

            <div className="overflow-hidden rounded-xl bg-white shadow p-2">
                <div className="mb-6 grid gap-4 md:grid-cols-6">
                    <input
                        type="text"
                        placeholder="Search task from title..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="rounded-lg border p-3"
                    />

                    <select
                        value={userFilter}
                        onChange={(e) =>
                            setUserFilter(e.target.value)
                        }
                        className="rounded-lg border p-3"
                    >
                        <option value="">
                            All Users
                        </option>

                        {[
                            ...new Set(
                                filteredTasks.map(
                                    (task) => task.assignedUser
                                )
                            ),
                        ].map((user) => (
                            <option
                                key={user}
                                value={user}
                            >
                                {user}
                            </option>
                        ))}
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="rounded-lg border p-3"
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option>
                            Backlog
                        </option>

                        <option>
                            In Development
                        </option>

                        <option>
                            In Review
                        </option>

                        <option>
                            Shipped
                        </option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                        className="rounded-lg border p-3"
                    >
                        <option value="">
                            All Priorities
                        </option>

                        <option>
                            High
                        </option>

                        <option>
                            Medium
                        </option>

                        <option>
                            Low
                        </option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                        className="rounded-lg border p-3"
                    >
                        <option value="newest">
                            Due Date ↑
                        </option>

                        <option value="oldest">
                            Due Date ↓
                        </option>

                        <option value="az">
                            A-Z
                        </option>

                        <option value="za">
                            Z-A
                        </option>
                    </select>
                    <button
                        onClick={() => {
                            setSearch("");
                            setUserFilter("");
                            setStatusFilter("");
                            setPriorityFilter("");
                            setSortBy("newest");
                        }}
                        className="rounded-lg bg-[#27272A] px-4 py-3 text-white transition hover:bg-[#27272A]"
                    >
                        Reset
                    </button>
                </div>
                <div className="mb-4 text-sm text-gray-500">
                    Showing {filteredTasks.length} of {tasks.length} tasks
                </div>
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
                            filteredTasks.map((task) => {
                                const isOverdue =
                                    new Date(task.dueDate) < new Date() &&
                                    task.status !== "Shipped";

                                return (
                                    <tr
                                        key={task.id}
                                        onClick={() =>
                                            window.location.href = `/tasks/${task.id}`
                                        }
                                        className={`cursor-pointer border-t transition-all hover:bg-blue-50 ${isOverdue
                                            ? "border-l-4 border-l-red-500"
                                            : ""
                                            }`}
                                    >
                                        <td className="p-4 font-medium">
                                            {task.title}
                                        </td>

                                        <td className="p-4">
                                            {getProjectName(task.projectId)}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${task.priority === "High"
                                                    ? "bg-red-100 text-red-700"
                                                    : task.priority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {task.assignedUser || "None"}
                                        </td>

                                        <td
                                            className={`p-4 ${isOverdue
                                                ? "font-semibold text-red-600"
                                                : ""
                                                }`}
                                        >
                                            {task.dueDate}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${task.status === "Shipped"
                                                    ? "bg-green-100 text-green-700"
                                                    : task.status === "In Review"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : task.status === "In Development"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {task.status}
                                            </span>
                                        </td>

                                        <td className="p-4 text-xs text-gray-500">
                                            {task.id}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}