"use client";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    setUserName(JSON.parse(user).name);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const stats = {
    totalProjects: 12,
    totalTasks: 48,
    completedTasks: 30,
    pendingTasks: 18,
  };

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
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold">
          Task Manager Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </nav>

      <div className="p-8">
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
              <li className="rounded border p-3">
                E-Commerce Website
              </li>

              <li className="rounded border p-3">
                CRM Dashboard
              </li>

              <li className="rounded border p-3">
                HR Management System
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold">
              Recent Tasks
            </h3>

            <ul className="space-y-3">
              <li className="rounded border p-3">
                Design Login Page
              </li>

              <li className="rounded border p-3">
                Create Task API
              </li>

              <li className="rounded border p-3">
                Implement Dashboard
              </li>
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