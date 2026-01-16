import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, Menu } from 'lucide-react';
import { Toaster } from 'sonner';
import clsx from 'clsx';
import { useState } from 'react';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed lg:sticky top-0 h-screen w-64 bg-fanga-black text-white p-6 z-30 transition-transform duration-200 lg:translate-x-0 border-r border-gray-800",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded bg-fanga-green flex items-center justify-center">
                        <Zap className="text-white w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">FANGA</span>
                </div>

                <nav className="space-y-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                            isActive ? "bg-fanga-green text-white font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <LayoutDashboard size={20} />
                        Stations
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 lg:px-8">
                    <button
                        className="p-2 lg:hidden text-gray-600"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu />
                    </button>
                    <div className="flex items-center gap-4 ml-auto">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&length=1&background=22c55e&color=fff"
                            alt="Admin Profile"
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        />
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </div>
            </main>
            <Toaster position="top-right" richColors />
        </div>
    );
}
