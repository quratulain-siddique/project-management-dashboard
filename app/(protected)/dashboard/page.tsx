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

            <ul className="space-y-3">
              {recentProjects.length === 0 ? (
                <li className="rounded border p-3">
                  No projects found
                </li>
              ) : (
                recentProjects.map((project) => (
                  <li
                    key={project.id}
                    className="rounded border p-3"
                  >
                    {project.name}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold">
              Recent Tasks
            </h3>

            <ul className="space-y-3">
              {recentTasks.length === 0 ? (
                <li className="rounded border p-3">
                  No tasks found
                </li>
              ) : (
                recentTasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded border p-3"
                  >
                    {task.title}
                  </li>
                ))
              )}
            </ul>
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