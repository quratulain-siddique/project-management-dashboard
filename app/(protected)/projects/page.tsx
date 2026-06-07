"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    createdDate: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        status: "Active",
        role: "Not Assigned",

    });

    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects");
            setProjects(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            status: "Active",
            role: "Not Assigned",
        });

        setEditingProject(null);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!form.name.trim()) {
            toast.error("Project name is required");
            return;
        }

        try {
            if (editingProject) {
                await api.patch(
                    `/projects/${editingProject.id}`,
                    {
                        name: form.name,
                        description: form.description,
                        status: form.status,
                    }
                );

                toast.success("Project updated");
            } else {
                await api.post("/projects", {
                    name: form.name,
                    description: form.description,
                    status: form.status,
                    createdDate:
                        new Date().toISOString().split("T")[0],
                });

                toast.success("Project created");
            }

            fetchProjects();
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);

        setForm({
            name: project.name,
            description: project.description,
            status: project.status,
            role: "Not Assigned",
        });

        setShowModal(true);
    };

    const handleDelete = async (projectId: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project and all its tasks?"
        );

        if (!confirmed) return;

        try {
            const tasksResponse = await api.get(
                `/tasks?projectId=${projectId}`
            );

            const tasks = tasksResponse.data;

            await Promise.all(
                tasks.map((task: { id: number }) =>
                    api.delete(`/tasks/${task.id}`)
                )
            );

            await api.delete(`/projects/${projectId}`);

            fetchProjects();

            toast.success(
                "Project and related tasks deleted"
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete project");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Projects
                </h1>

                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    + Create Project
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">
                                Project Name
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Created
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-6 text-center"
                                >
                                    No projects found
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        {project.name}
                                    </td>

                                    <td className="p-4">
                                        {project.status}
                                    </td>

                                    <td className="p-4">
                                        {project.createdDate}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="text-blue-600"
                                            >
                                                View
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleEdit(project)
                                                }
                                                className="text-yellow-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h2 className="mb-4 text-2xl font-bold">
                            {editingProject
                                ? "Edit Project"
                                : "Create Project"}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <input
                                placeholder="Project Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
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
                                value={form.status}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3"
                            >
                                <option>Active</option>
                                <option>Completed</option>
                                <option>On Hold</option>
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
                                    {editingProject
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