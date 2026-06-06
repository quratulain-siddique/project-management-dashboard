import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Task Manager
        </h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
        <h2 className="mb-6 text-5xl font-bold text-gray-900">
          Project & Task Management Dashboard
        </h2>

        <p className="max-w-3xl text-lg text-gray-600">
          Manage projects, organize tasks, assign team members, track progress,
          and monitor productivity through an intuitive dashboard built with
          Next.js, TypeScript, Redux Toolkit, and modern frontend practices.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h3 className="mb-10 text-center text-3xl font-bold">
          Features
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <h4 className="mb-2 text-xl font-semibold">Authentication</h4>
            <p className="text-gray-600">
              Secure login, registration, and password recovery.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h4 className="mb-2 text-xl font-semibold">Projects</h4>
            <p className="text-gray-600">
              Create, edit, delete, and manage projects efficiently.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h4 className="mb-2 text-xl font-semibold">Tasks</h4>
            <p className="text-gray-600">
              Assign tasks, update statuses, and track priorities.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h4 className="mb-2 text-xl font-semibold">Analytics</h4>
            <p className="text-gray-600">
              View project statistics and task completion insights.
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h3 className="mb-6 text-center text-3xl font-bold">
            What You Can Do
          </h3>

          <ul className="space-y-3 text-lg text-gray-700">
            <li>✅ Create and manage projects</li>
            <li>✅ Create, update, and delete tasks</li>
            <li>✅ Assign tasks to users</li>
            <li>✅ Track task status and priorities</li>
            <li>✅ Monitor dashboard analytics</li>
            <li>✅ Experience responsive design on all devices</li>
            <li>✅ Manage application state using Redux Toolkit</li>
          </ul>
        </div>
      </section>
      {/* Tech Stack */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-10 text-center text-3xl font-bold">
            Technologies Used
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">Next.js</h4>
              <p className="text-gray-600">
                Framework used for routing, page management, server rendering,
                and overall application structure.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">TypeScript</h4>
              <p className="text-gray-600">
                Provides type safety, better developer experience,
                and reduces runtime errors.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">Tailwind CSS</h4>
              <p className="text-gray-600">
                Utility-first CSS framework used to create responsive
                and modern user interfaces quickly.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">Redux Toolkit</h4>
              <p className="text-gray-600">
                Used for centralized state management including
                authentication, projects, and tasks.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">Axios</h4>
              <p className="text-gray-600">
                Used for API communication and handling requests
                to the mock backend service.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">React Hook Form</h4>
              <p className="text-gray-600">
                Used for building performant forms with minimal re-renders.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">Zod</h4>
              <p className="text-gray-600">
                Used for schema-based validation of login,
                registration, projects, and tasks.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">React Toastify</h4>
              <p className="text-gray-600">
                Used for success, warning, and error notifications
                throughout the application.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">Recharts</h4>
              <p className="text-gray-600">
                Used to visualize dashboard statistics through
                charts and analytics.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h4 className="mb-2 text-xl font-semibold">JSON Server</h4>
              <p className="text-gray-600">
                Provides a mock REST API for projects, tasks,
                users, and authentication simulation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}