"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Not Assigned",
  });
  const [error, setError] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const existingUser = await api.get(
        `/users?email=${form.email}`
      );

      if (existingUser.data.length > 0) {
        toast.error("User already exists");
        return;
      }

      const response = await api.post("/users", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      localStorage.setItem(
        "token",
        `token-${response.data.id}`
      );

      toast.success("Account created successfully");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 pr-16 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 pr-16 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 text-white"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}