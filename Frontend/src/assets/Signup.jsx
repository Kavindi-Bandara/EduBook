// // // import React, { useState } from "react";

// // // export default function Signup() {
// // //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// // //   const [loading, setLoading] = useState(false);
// // //   const [msg, setMsg] = useState(null);

// // //   function handleChange(e) {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   }

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMsg(null);
// // //     try {
// // //       const res = await fetch("/api/auth/signup", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(form),
// // //       });

// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error(data.error || "Signup failed");
// // //       setMsg({ type: "success", text: data.message || "Account created" });
// // //       setForm({ name: "", email: "", password: "" });
// // //     } catch (err) {
// // //       setMsg({ type: "error", text: err.message });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
// // //       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
// // //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
// // //           Create an Account
// // //         </h2>

// // //         {msg && (
// // //           <div
// // //             className={`mb-4 p-3 rounded-lg text-sm ${
// // //               msg.type === "success"
// // //                 ? "bg-green-100 text-green-700"
// // //                 : "bg-red-100 text-red-700"
// // //             }`}
// // //           >
// // //             {msg.text}
// // //           </div>
// // //         )}

// // //         <form onSubmit={handleSubmit} className="space-y-5">
// // //           <div>
// // //             <label className="block text-gray-600 text-sm font-medium mb-1">
// // //               Name
// // //             </label>
// // //             <input
// // //               name="name"
// // //               value={form.name}
// // //               onChange={handleChange}
// // //               required
// // //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
// // //               placeholder="Enter your name"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-gray-600 text-sm font-medium mb-1">
// // //               Email
// // //             </label>
// // //             <input
// // //               name="email"
// // //               type="email"
// // //               value={form.email}
// // //               onChange={handleChange}
// // //               required
// // //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
// // //               placeholder="you@example.com"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-gray-600 text-sm font-medium mb-1">
// // //               Password
// // //             </label>
// // //             <input
// // //               name="password"
// // //               type="password"
// // //               value={form.password}
// // //               onChange={handleChange}
// // //               required
// // //               minLength={6}
// // //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
// // //               placeholder="••••••••"
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full py-2.5 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50"
// // //           >
// // //             {loading ? "Signing up..." : "Sign Up"}
// // //           </button>
// // //         </form>

// // //         <p className="text-center text-gray-500 text-sm mt-6">
// // //           Already have an account?{" "}
// // //           <a
// // //             href="/"
// // //             className="text-blue-600 font-medium hover:underline"
// // //           >
// // //             Log in
// // //           </a>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";

// // export default function Signup() {
// //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [msg, setMsg] = useState(null);
// //   const navigate = useNavigate();

// //   function handleChange(e) {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMsg(null);
// //     try {
// //       const res = await fetch("/api/admins", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Signup failed");
      
// //       setMsg({ type: "success", text: "Account created successfully! Redirecting..." });
// //       setForm({ name: "", email: "", password: "" });
      
// //       // Redirect to login after successful signup
// //       setTimeout(() => {
// //         navigate("/");
// //       }, 2000);
// //     } catch (err) {
// //       setMsg({ type: "error", text: err.message });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
// //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
// //           Create an Account
// //         </h2>

// //         {msg && (
// //           <div
// //             className={`mb-4 p-3 rounded-lg text-sm ${
// //               msg.type === "success"
// //                 ? "bg-green-100 text-green-700"
// //                 : "bg-red-100 text-red-700"
// //             }`}
// //           >
// //             {msg.text}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           <div>
// //             <label className="block text-gray-600 text-sm font-medium mb-1">
// //               Name
// //             </label>
// //             <input
// //               name="name"
// //               value={form.name}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
// //               placeholder="Enter your name"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-600 text-sm font-medium mb-1">
// //               Email
// //             </label>
// //             <input
// //               name="email"
// //               type="email"
// //               value={form.email}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
// //               placeholder="you@example.com"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-600 text-sm font-medium mb-1">
// //               Password
// //             </label>
// //             <input
// //               name="password"
// //               type="password"
// //               value={form.password}
// //               onChange={handleChange}
// //               required
// //               minLength={6}
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
// //               placeholder="••••••••"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full py-2.5 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50"
// //           >
// //             {loading ? "Signing up..." : "Sign Up"}
// //           </button>
// //         </form>

// //         <p className="text-center text-gray-500 text-sm mt-6">
// //           Already have an account?{" "}
// //           <Link
// //             to="/"
// //             className="text-blue-600 font-medium hover:underline"
// //           >
// //             Log in
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState(null);
//   const navigate = useNavigate();

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMsg(null);
    
//     try {
//       console.log("Sending signup request...", form);
      
//       const res = await fetch("http://localhost:5002/api/admins", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json" 
//         },
//         body: JSON.stringify(form),
//       });

//       console.log("Response status:", res.status);
//       console.log("Response headers:", res.headers);

//       // Check if response is OK
//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("Server response error:", errorText);
//         throw new Error(`Server error: ${res.status} - ${errorText}`);
//       }

//       // Try to parse JSON
//       let data;
//       try {
//         data = await res.json();
//         console.log("Response data:", data);
//       } catch (jsonError) {
//         console.error("JSON parse error:", jsonError);
//         throw new Error("Server returned invalid JSON response");
//       }

//       if (data.success) {
//         setMsg({ 
//           type: "success", 
//           text: "Account created successfully! Redirecting to login..." 
//         });
//         setForm({ name: "", email: "", password: "" });
        
//         // Redirect to login after 2 seconds
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } else {
//         throw new Error(data.message || "Signup failed");
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
      
//       let errorMessage = err.message;
//       if (err.message.includes("Failed to fetch")) {
//         errorMessage = "Cannot connect to server. Please make sure the backend is running on port 5000.";
//       } else if (err.message.includes("Unexpected end of JSON")) {
//         errorMessage = "Server returned empty response. Check if backend routes are properly set up.";
//       }
      
//       setMsg({ 
//         type: "error", 
//         text: errorMessage 
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Create an Account
//         </h2>

//         {msg && (
//           <div
//             className={`mb-4 p-3 rounded-lg text-sm ${
//               msg.type === "success"
//                 ? "bg-green-100 text-green-700 border border-green-300"
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }`}
//           >
//             {msg.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-600 text-sm font-medium mb-1">
//               Name
//             </label>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               name="password"
//               type="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               minLength={6}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2.5 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-gray-500 text-sm mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    
    try {
      console.log("Sending signup request...", form);
      
      const res = await fetch("http://localhost:5002/api/admins", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(form),
      });

      console.log("Response status:", res.status);

      // Check if response is OK
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response error:", errorText);
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      // Try to parse JSON
      let data;
      try {
        data = await res.json();
        console.log("Response data:", data);
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        throw new Error("Server returned invalid JSON response");
      }

      if (data.success) {
        setMsg({ 
          type: "success", 
          text: "Account created successfully! Redirecting to login..." 
        });
        setForm({ name: "", email: "", password: "" });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      
      let errorMessage = err.message;
      if (err.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to server. Please make sure the backend is running on port 5002.";
      } else if (err.message.includes("Unexpected end of JSON")) {
        errorMessage = "Server returned empty response. Check if backend routes are properly set up.";
      }
      
      setMsg({ 
        type: "error", 
        text: errorMessage 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {msg && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              msg.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}