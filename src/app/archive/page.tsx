"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { CheckoutSuccessHandler } from "./CheckoutSuccessHandler";
import { toast } from "sonner";
import {
    Package,
    CreditCard,
    CalendarDays,
    User,
    ShoppingBag,
    Settings,
    ChevronRight,
    Lock,
    AlertTriangle,
} from "lucide-react";

/* ─── Status badge styling ─── */
const statusStyle = (status: string) => {
    if (status === "PROCESSING") return "border-primary text-primary animate-pulse";
    if (status === "REFUNDED") return "border-destructive text-destructive";
    return "border-white/20 text-white/50";
};

/* ─── Order Card (preserved from original) ─── */
const OrderCard = ({ order, index }: { order: any; index: number }) => (
    <div
        className="group relative bg-secondary/10 border border-white/5 p-6 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-colors duration-300"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
                <span className="text-xs font-mono tracking-widest text-white/50 group-hover:text-primary transition-colors">
                    {order.id.slice(0, 12).toUpperCase()}
                </span>
                <span className={`text-[10px] font-mono tracking-widest px-2 py-1 border ${statusStyle(order.status)}`}>
                    {order.status}
                </span>
            </div>
            <div>
                <div className="text-xl font-black uppercase text-white tracking-tighter mb-1 mix-blend-difference">
                    {order.items.map((i: any) => i.name).join(", ")}
                </div>
                <div className="text-xs text-white/40 font-mono">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-xs font-mono text-white/40">TOTAL</span>
                <span className="text-lg font-bold text-white tracking-widest">€{order.total.toFixed(2)}</span>
            </div>
        </div>
    </div>
);

/* ─── Stat Card ─── */
const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="border border-white/10 bg-secondary/10 p-6 flex flex-col gap-4 hover:border-white/20 transition-colors duration-300">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border border-white/10 text-primary">
                {icon}
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">{label}</span>
        </div>
        <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">{value}</span>
    </div>
);

/* ─── Tab Button ─── */
const TabButton = ({
    active,
    onClick,
    icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 w-full text-left border-l-2 ${active
            ? "border-primary text-primary bg-white/5"
            : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
    >
        {icon}
        <span className="hidden md:inline">{label}</span>
    </button>
);

/* ─── Overview Tab ─── */
const OverviewTab = ({
    orders,
    setActiveTab,
}: {
    orders: any[] | undefined;
    setActiveTab: (tab: string) => void;
}) => {
    const { data: stats, isLoading: statsLoading } = api.user.getStats.useQuery();
    const { data: profile } = api.user.getProfile.useQuery();

    return (
        <div className="space-y-12">
            {/* Welcome Header */}
            <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                    Welcome back{profile?.name ? `, ${profile.name}` : ""}
                </h2>
                <p className="text-sm font-mono text-white/40 mt-2 tracking-widest uppercase">
                    Your account overview
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    icon={<Package className="w-5 h-5 stroke-[1.5]" />}
                    label="Total Orders"
                    value={statsLoading ? "—" : String(stats?.totalOrders ?? 0)}
                />
                <StatCard
                    icon={<CreditCard className="w-5 h-5 stroke-[1.5]" />}
                    label="Total Spent"
                    value={statsLoading ? "—" : `€${(stats?.totalSpent ?? 0).toFixed(2)}`}
                />
                <StatCard
                    icon={<CalendarDays className="w-5 h-5 stroke-[1.5]" />}
                    label="Member Since"
                    value={
                        statsLoading
                            ? "—"
                            : new Date(stats?.memberSince ?? "").toLocaleDateString("en-GB", {
                                month: "short",
                                year: "numeric",
                            })
                    }
                />
            </div>

            {/* Recent Orders */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black uppercase tracking-widest text-white">Recent Orders</h3>
                    {orders && orders.length > 3 && (
                        <button
                            onClick={() => setActiveTab("orders")}
                            className="text-xs font-mono uppercase tracking-widest text-primary flex items-center gap-1 hover:text-primary/70 transition-colors"
                        >
                            View All <ChevronRight className="w-3 h-3" />
                        </button>
                    )}
                </div>
                {orders && orders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {orders.slice(0, 3).map((order, i) => (
                            <OrderCard key={order.id} order={order} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border border-white/5">
                        <p className="text-white/40 font-mono uppercase tracking-widest mb-4 text-sm">No orders yet</p>
                        <Link
                            href="/#collection"
                            className="px-8 py-3 border border-white/20 text-xs font-mono uppercase tracking-[0.3em] text-white hover:border-white/60 transition-colors inline-block"
                        >
                            Shop the Collection
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── Orders Tab ─── */
const OrdersTab = ({ orders, isLoading }: { orders: any[] | undefined; isLoading: boolean }) => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Order History</h2>
            <p className="text-sm font-mono text-white/40 mt-2 tracking-widest uppercase">
                All of your past purchases
            </p>
        </div>

        {isLoading ? (
            <div className="text-white/50 font-mono uppercase tracking-widest py-16 text-center">Loading orders...</div>
        ) : orders && orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order, i) => (
                    <OrderCard key={order.id} order={order} index={i} />
                ))}
            </div>
        ) : (
            <div className="text-center py-24 border border-white/5">
                <p className="text-white/40 font-mono uppercase tracking-widest mb-6 text-sm">No orders yet</p>
                <Link
                    href="/#collection"
                    className="px-8 py-3 border border-white/20 text-xs font-mono uppercase tracking-[0.3em] text-white hover:border-white/60 transition-colors inline-block"
                >
                    Shop the Collection
                </Link>
            </div>
        )}
    </div>
);

/* ─── Settings Tab ─── */
const SettingsTab = () => {
    const { data: profile, isLoading: profileLoading } = api.user.getProfile.useQuery();
    const utils = api.useUtils();

    // Profile form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileInitialized, setProfileInitialized] = useState(false);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Initialize form with profile data when available
    if (profile && !profileInitialized) {
        setName(profile.name ?? "");
        setEmail(profile.email ?? "");
        setProfileInitialized(true);
    }

    const updateProfile = api.user.updateProfile.useMutation({
        onSuccess: () => {
            toast.success("Profile Updated", { description: "Your changes have been saved." });
            utils.user.getProfile.invalidate();
        },
        onError: (err) => {
            toast.error("Update Failed", { description: err.message });
        },
    });

    const updatePassword = api.user.updatePassword.useMutation({
        onSuccess: () => {
            toast.success("Password Changed", { description: "Your password has been updated securely." });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        },
        onError: (err) => {
            toast.error("Password Change Failed", { description: err.message });
        },
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile.mutate({ name, email });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords Don't Match", { description: "Please confirm your new password." });
            return;
        }
        if (newPassword.length < 8) {
            toast.error("Password Too Short", { description: "Password must be at least 8 characters." });
            return;
        }
        updatePassword.mutate({ currentPassword, newPassword });
    };

    if (profileLoading) {
        return <div className="text-white/50 font-mono uppercase tracking-widest py-16 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-12 max-w-2xl">
            {/* Profile Section */}
            <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Settings</h2>
                <p className="text-sm font-mono text-white/40 mt-2 tracking-widest uppercase">
                    Manage your account
                </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <User className="w-4 h-4 text-primary stroke-[1.5]" />
                    <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Profile Information</h3>
                </div>
                <div className="border border-white/10 p-6 space-y-5 bg-secondary/10">
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/50">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/50">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                        />
                    </div>
                    {profile?.providers && profile.providers.length > 0 && (
                        <div className="text-xs font-mono text-white/30 uppercase tracking-widest pt-2">
                            Connected via {profile.providers.join(", ")}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={updateProfile.isPending}
                        className="px-8 py-3 border border-primary text-xs font-mono uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                    >
                        {updateProfile.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>

            {/* Password Section */}
            {profile?.hasPassword && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-4 h-4 text-primary stroke-[1.5]" />
                        <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Change Password</h3>
                    </div>
                    <div className="border border-white/10 p-6 space-y-5 bg-secondary/10">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/50">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/50">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/50">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={updatePassword.isPending}
                            className="px-8 py-3 border border-primary text-xs font-mono uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                        >
                            {updatePassword.isPending ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            )}

            {/* Danger Zone */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive stroke-[1.5]" />
                    <h3 className="text-sm font-mono uppercase tracking-widest text-destructive">Danger Zone</h3>
                </div>
                <div className="border border-destructive/20 p-6 bg-destructive/5">
                    <p className="text-sm text-white/50 font-mono mb-4">
                        To request account deletion, please contact our support team.
                    </p>
                    <button
                        disabled
                        className="px-8 py-3 border border-destructive/30 text-xs font-mono uppercase tracking-[0.3em] text-destructive/50 cursor-not-allowed"
                    >
                        Request Deletion
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─── Main Dashboard Page ─── */
const Archive = () => {
    const { data: sessionData } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const { data: orders, isLoading } = api.order.getOrders.useQuery(undefined, {
        enabled: !!sessionData?.user,
    });

    const tabs = [
        { id: "overview", label: "Overview", icon: <ShoppingBag className="w-4 h-4 stroke-[1.5]" /> },
        { id: "orders", label: "Orders", icon: <Package className="w-4 h-4 stroke-[1.5]" /> },
        { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4 stroke-[1.5]" /> },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <Suspense fallback={null}>
                <CheckoutSuccessHandler />
            </Suspense>

            {/* Page Header */}
            <section className="pt-32 pb-12 px-8 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
                        My Account
                    </h1>
                </div>
            </section>

            {!sessionData?.user ? (
                <section className="px-8 py-24">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-white/50 font-mono uppercase tracking-widest mb-6">
                            Sign in to access your account
                        </p>
                        <Link
                            href="/login"
                            className="px-8 py-3 border border-white/20 text-xs font-mono uppercase tracking-[0.3em] text-white hover:border-white/60 transition-colors inline-block"
                        >
                            Sign In
                        </Link>
                    </div>
                </section>
            ) : (
                <section className="px-4 md:px-8 py-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
                        {/* Sidebar Navigation */}
                        <nav className="md:w-56 flex-shrink-0">
                            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible md:sticky md:top-24">
                                {tabs.map((tab) => (
                                    <TabButton
                                        key={tab.id}
                                        active={activeTab === tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        icon={tab.icon}
                                        label={tab.label}
                                    />
                                ))}
                            </div>
                        </nav>

                        {/* Main Content */}
                        <main className="flex-1 min-w-0">
                            {activeTab === "overview" && (
                                <OverviewTab orders={orders} setActiveTab={setActiveTab} />
                            )}
                            {activeTab === "orders" && <OrdersTab orders={orders} isLoading={isLoading} />}
                            {activeTab === "settings" && <SettingsTab />}
                        </main>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default Archive;
