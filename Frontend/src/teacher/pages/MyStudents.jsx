import React from "react";

/*  API Base URL from Frontend/.env */
const API = import.meta.env.VITE_API_URL;

function IconButton({ children, title, onClick, variant = "default" }) {
  const base =
    "flex h-9 w-9 items-center justify-center rounded-xl transition";

  const styles =
    variant === "danger"
      ? "text-red-500 hover:bg-red-50 hover:text-red-700"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700";

  return (
    <button type="button" title={title} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Avatar({ name }) {
  const letter = (name?.trim()?.[0] || "S").toUpperCase();
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
      {letter}
    </div>
  );
}

function ClassPill({ label }) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      {label}
    </span>
  );
}

/*  Reusable modal */
function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function MyStudents() {
  const token = localStorage.getItem("token");

  const [query, setQuery] = React.useState("");
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // Modal state
  const [openForm, setOpenForm] = React.useState(false);
  const [mode, setMode] = React.useState("create"); // create | edit
  const [activeId, setActiveId] = React.useState(null);

  // Form state (matches table columns)
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    rollNo: "",
    className: "",
    parentName: "",
    parentPhone: "",
  });

  // Load students from backend (NO hardcode)
  const fetchStudents = React.useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load students");
        setStudents([]);
        return;
      }

      // Expect: data = [{ _id, name, email, rollNo, className, parentName, parentPhone }]
      setStudents(Array.isArray(data) ? data : data.students || []);
    } catch (err) {
      setError("Server not reachable.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const filtered = students.filter((s) => {
    const hay = `${s.name} ${s.email} ${s.rollNo} ${s.className} ${s.parentName} ${s.parentPhone}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  function resetForm() {
    setForm({
      name: "",
      email: "",
      rollNo: "",
      className: "",
      parentName: "",
      parentPhone: "",
    });
    setActiveId(null);
    setMode("create");
  }

  function openCreate() {
    resetForm();
    setMode("create");
    setOpenForm(true);
  }

  function openEdit(student) {
    setMode("edit");
    setActiveId(student._id || student.id);
    setForm({
      name: student.name || "",
      email: student.email || "",
      rollNo: student.rollNo || "",
      className: student.className || "",
      parentName: student.parentName || "",
      parentPhone: student.parentPhone || "",
    });
    setOpenForm(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  //  Create or Update
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      rollNo: form.rollNo.trim(),
      className: form.className.trim(),
      parentName: form.parentName.trim(),
      parentPhone: form.parentPhone.trim(),
    };

    try {
      const url =
        mode === "create"
          ? `${API}/records`
          : `${API}/records/${activeId}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Save failed");
        return;
      }

      // Refresh list
      await fetchStudents();
      setOpenForm(false);
      resetForm();
    } catch (err) {
      setError("Server not reachable.");
    }
  }

  //  Delete
  async function handleDelete(student) {
    const id = student._id || student.id;

    const ok = window.confirm(`Delete ${student.name}?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API}/records/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      // Refresh
      await fetchStudents();
    } catch (err) {
      alert("Server not reachable.");
    }
  }

  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">My Students</h2>

        <button
          type="button"
          onClick={openCreate}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Add New Student
        </button>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* Search bar area */}
        <div className="border-b border-slate-200 bg-slate-50/60 p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Status */}
        {loading ? (
          <div className="p-6 text-sm text-slate-600">Loading students...</div>
        ) : error ? (
          <div className="p-6 text-sm text-red-600">{error}</div>
        ) : null}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Parent Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filtered.map((s) => (
                <tr key={s._id || s.id} className="hover:bg-slate-50/50">
                  {/* Student info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar name={s.name} />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {s.name}
                        </div>
                        <div className="text-sm text-slate-500">{s.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Roll No */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{s.rollNo}</div>
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4">
                    <ClassPill label={s.className} />
                  </td>

                  {/* Parent */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{s.parentName}</div>
                    <div className="text-sm text-slate-500">{s.parentPhone}</div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit (pencil) */}
                      <IconButton title="Edit Student" onClick={() => openEdit(s)}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L8.25 18.463 3 19.5l1.037-5.25L16.862 3.487Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 6l-1.5-1.5"
                          />
                        </svg>
                      </IconButton>

                      {/* Delete (bin) */}
                      <IconButton
                        title="Delete Student"
                        variant="danger"
                        onClick={() => handleDelete(s)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 7l.75 13.5h7.5L16.5 7"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 11v6"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 11v6"
                          />
                        </svg>
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/*  Create/Edit Form Modal */}
      <Modal
        open={openForm}
        title={mode === "create" ? "Add New Student" : "Edit Student"}
        onClose={() => {
          setOpenForm(false);
          resetForm();
        }}
      >
        {error ? (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Student Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Roll No</label>
            <input
              name="rollNo"
              value={form.rollNo}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Class</label>
            <input
              name="className"
              value={form.className}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Parent Name</label>
            <input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Parent Phone</label>
            <input
              name="parentPhone"
              value={form.parentPhone}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div className="sm:col-span-2 mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setOpenForm(false);
                resetForm();
              }}
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              {mode === "create" ? "Create Student" : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
