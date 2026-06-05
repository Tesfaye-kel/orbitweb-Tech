import React, { useState } from 'react';
// 🚪 Import the Link component to navigate between pages without refreshing
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  // 1. State hooks to capture Username, Email, and Password values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Submission function linked to your backend registration API gateway
  const handleSignUpSubmit = async (e) => {
    e.preventDefault(); // 🛑 Prevents the browser from reloading the page

    try {
      // 🔗 Send a network request to your running backend server on port 4000
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 📦 THE PACKET: Sending username, email, and password together
        body: JSON.stringify({ username, email, password }),
      });

      // 📩 Read the JSON package data back from the backend
      const data = await response.json();
      console.log("Response back from backend:", data);

      if (response.ok) {
        // 🎉 If backend status code is 200-299 success
        alert("Account created successfully! 🎉");
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        // ✨ UPDATED METHOD: Breaks down the 'VALIDATION_ERROR' array from your logs
        let detailsMessage = '';
        
        if (data.error && data.error.details && Array.isArray(data.error.details)) {
          // Maps out the specific validation errors into bullet points
          detailsMessage = '\n' + data.error.details.map(item => `• ${item.message || item}`).join('\n');
        } else {
          detailsMessage = data.message || data.error?.message || 'Unknown validation error';
        }
        
        alert(`Sign up failed: ${detailsMessage}`);
      }

    } catch (error) {
      console.error("The network bridge failed completely:", error);
      alert("Could not connect to the backend server. Make sure it's running on port 4000!");
    }
  };

  // 3. Your modern dark-themed user interface layout blueprint
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      
      {/* HTML Form wrapper hooked directly to your backend submit action */}
      <form onSubmit={handleSignUpSubmit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl backdrop-blur-sm">
        
        <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
        <p className="text-slate-400 text-sm mb-6">Create an account to access the full OrbitWeb Tech website.</p>

        {/* 👤 Username Input Group */}
        <div className="mb-4">
          <label className="block text-slate-200 font-semibold mb-2 text-sm">Username</label>
          <input 
            type="text" 
            placeholder="yourusername"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* 📧 Email Input Group */}
        <div className="mb-4">
          <label className="block text-slate-200 font-semibold mb-2 text-sm">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* 🔒 Password Input Group */}
        <div className="mb-6">
          <label className="block text-slate-200 font-semibold mb-2 text-sm">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Action Form Submit Button */}
        <button 
          type="submit" 
          className="w-full rounded-full bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign up
        </button>

        {/* Navigational Link to switch seamlessly over to the signin route view layout */}
        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/signin" className="text-cyan-400 hover:underline cursor-pointer">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}