"use client";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
export default function DashboardPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const fetchDashboardData = async () => {
    try {
      const [projectsResponse, tasksResponse] =
        await Promise.all([
          api.get("/projects"),
          api.get("/tasks"),
        ]);

      const projects = projectsResponse.data;
      const tasks = tasksResponse.data;

      setStats({
        totalProjects: projects.length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(
          (task: any) =>
            task.status?.toLowerCase() === "completed"
        ).length,
        pendingTasks: tasks.filter(
          (task: any) =>
            task.status?.toLowerCase() !== "completed"
        ).length,
      });

      setRecentProjects(
        [...projects].reverse().slice(0, 5)
      );

      setRecentTasks(
        [...tasks].reverse().slice(0, 5)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    setUserName(JSON.parse(user).name);

    fetchDashboardData();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  const chartData = [
    {
      name: "Projects",
      value: stats.totalProjects,
    },
    {
      name: "Tasks",
      value: stats.totalTasks,
    },
    {
      name: "Completed",
      value: stats.completedTasks,
    },
    {
      name: "Pending",
      value: stats.pendingTasks,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100">


      <div className="p-2">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Welcome, {userName}
          </h2>

          <p className="text-gray-600">
            Here's an overview of your projects and tasks.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
          />

          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
          />

          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
          />

          <StatCard
            title="Pending Tasks"
            value={stats.pendingTasks}
          />
        </div>

        {/* Analytics */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-6 text-xl font-semibold">
            Analytics Overview
          </h3>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold">
              Recent Projects
            </h3>

            <div className="space-y-3">
              {recentProjects.length === 0 ? (
                <div className="rounded-xl border border-dashed p-4 text-center text-gray-500">
                  No projects found
                </div>
              ) : (
                recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block rounded-xl border bg-gradient-to-r from-blue-50 to-white p-4 transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {project.name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {project.description || "No description"}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {project.status}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold">
              Recent Tasks
            </h3>

            <div className="space-y-3">
              {recentTasks.length === 0 ? (
                <div className="rounded-xl border border-dashed p-4 text-center text-gray-500">
                  No tasks found
                </div>
              ) : (
                recentTasks.map((task) => (
                  <Link
                    key={task.id}
                    href={`/tasks/${task.id}`}
                    className="block rounded-xl border bg-gradient-to-r from-amber-50 to-white p-4 transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {task.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {task.assignedUser || "Unassigned"}
                        </p>
                      </div>

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
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="mt-3 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}