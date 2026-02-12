import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*  API Base URL from Frontend/.env */
const API = import.meta.env.VITE_API_URL;

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Teacher",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Handle input change */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* Handle Register Submit */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      /*  Use API URL instead of localhost */
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Sign up failed");
        return;
      }

      /* Save token + user */
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user?.role || form.role;

      /* Navigate based on role */
      if (role === "Teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError("Server not reachable. Check backend + Docker setup.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 19.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 17h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4v13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="mt-5 text-3xl font-semibold md:text-4xl">
            Sign up to EduBook
          </h1>

          <p className="mt-2 text-base text-slate-500 md:text-lg text-center">
            Create your account and manage your academic records
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-200 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label className="block text-base font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-base font-medium text-slate-700">
                I am a
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* Error */}
            {error && <p className="text-red-600 font-medium">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-60"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Already have account */}
            <p className="text-center text-base text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                LogIn
              </Link>
            </p>
          </form>

          {/* Back */}
          <Link
            to="/"
            className="mt-6 inline-block text-indigo-600 text-base font-medium hover:underline text-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

