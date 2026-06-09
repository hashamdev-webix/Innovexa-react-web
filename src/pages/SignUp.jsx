import { Link } from "react-router-dom";
import { User, Mail, LockIcon } from "lucide-react";
import logo from '../assets/images/logo.jpeg';
export default function Signup() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="p-8 md:p-12 lg:p-14">

          {/* Logo */}
          <img
            src={logo}
            alt="Innovexa"
            className="h-16 mb-10"
          />

          <h1 className="text-4xl font-bold text-[#0D47A1] mb-3">
            Create Your Account
          </h1>

          <p className="text-gray-500 mb-10">
            Join Innovexa Softwares and start managing your
            projects, support tickets, and business operations.
          </p>

          <form className="space-y-5 ">

            {/* Name */}
            <div className="relative py-2">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative py-2">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative py-2">
              <LockIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative py-2">
              <LockIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none"
              />
            </div>

            {/* Terms */}
            <label className="flex items-center gap-3 text-sm py-2 text-gray-600">
              <input type="checkbox" />
              I agree to the Terms & Conditions
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-14 rounded-xl bg-[#0D47A1] hover:bg-[#08357F] text-white font-semibold transition-all duration-300"
            >
              Create Account
            </button>

          </form>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 text-[#E53935] font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#0D47A1] items-center justify-center">

          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E53935]/30 blur-3xl rounded-full" />

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />

          {/* Dashboard Mockup */}
          <div className="relative z-10 w-[85%] bg-white rounded-3xl shadow-2xl p-6">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#0D47A1]">
                Innovexa Dashboard
              </h3>

              <div className="h-3 w-3 rounded-full bg-[#E53935]" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">

              <div className="bg-blue-50 rounded-2xl p-5">
                <h4 className="text-3xl font-bold text-[#0D47A1]">
                  128
                </h4>
                <p className="text-sm text-gray-500">
                  Active Projects
                </p>
              </div>

              <div className="bg-red-50 rounded-2xl p-5">
                <h4 className="text-3xl font-bold text-[#E53935]">
                  56
                </h4>
                <p className="text-sm text-gray-500">
                  Support Tickets
                </p>
              </div>

            </div>

            {/* Graph */}
            <div className="bg-gray-100 rounded-2xl h-40 mb-4 flex items-end gap-3 p-5">

              <div className="bg-[#0D47A1] w-6 h-16 rounded-t" />
              <div className="bg-[#0D47A1] w-6 h-24 rounded-t" />
              <div className="bg-[#E53935] w-6 h-32 rounded-t" />
              <div className="bg-[#0D47A1] w-6 h-20 rounded-t" />
              <div className="bg-[#E53935] w-6 h-28 rounded-t" />
              <div className="bg-[#0D47A1] w-6 h-36 rounded-t" />

            </div>

        
          </div>

        </div>

      </div>

    </section>
  );
}