"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      const usersResponse = await api.get(
        `/users?email=${email}`
      );

      const users = usersResponse.data;

      if (users.length === 0) {
        setError(`No account found for ${email}`);
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        setError("Incorrect password.");
        return;
      }

      localStorage.setItem(
        "token",
        `token-${user.id}`
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col justify-center bg-black p-10 text-white">
          <h1 className="mb-4 text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-300">
            Login to access your projects, tasks, analytics, and team
            collaboration tools.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Login
          </h2>

          <p className="mb-6 text-gray-500">
            Enter your credentials to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-lg border p-3 pr-16 outline-none focus:ring-2 focus:ring-black"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-black"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Login
            </button>
          </form>

          {/* Error Placeholder */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>

              {error.includes("No account") && (
                <Link
                  href="/signup"
                  className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  Create an account
                </Link>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

            <Link
              href="/signup"
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}