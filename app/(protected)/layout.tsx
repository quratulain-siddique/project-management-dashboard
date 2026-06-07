"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const [collapsed, setCollapsed] =
        useState(true);

    useEffect(() => {
        const token =
            localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
    };

    const menuItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: "📊",
        },
        {
            label: "Projects",
            href: "/projects",
            icon: "📁",
        },
        {
            label: "Tasks",
            href: "/tasks",
            icon: "✅",
        },
        {
            label: "Users",
            href: "/users",
            icon: "👥",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}


            <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-sm">
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

            {/* Sidebar + Content */}

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto bg-black text-white transition-all duration-300 ${collapsed ? "w-20" : "w-56"
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-gray-800 p-4">
                        {!collapsed && (
                            <h2 className="font-bold">
                                Menu
                            </h2>
                        )}

                        <button
                            onClick={() =>
                                setCollapsed(!collapsed)
                            }
                            className={`${collapsed ? "w-fit mx-auto" : ""}`}
                        >
                            ☰
                        </button>
                    </div>

                    <nav className="mt-4 flex flex-col gap-2 px-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800 ${pathname === item.href
                                    ? "bg-gray-800"
                                    : ""
                                    }`}
                            >
                                <span>{item.icon}</span>

                                {!collapsed && (
                                    <span>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}