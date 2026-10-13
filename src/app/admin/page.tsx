"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  Lock,
  LogOut,
  ExternalLink,
  ChevronDown,
  Building,
  User,
  MapPin,
  ClipboardList,
  ShieldCheck,
  Check,
  X,
  Inbox,
  CalendarDays,
} from "lucide-react";

interface Booking {
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  service_id: string;
  service_name: string;
  service_detail?: string;
  property_type?: string;
  property_size?: string;
  timeline?: string;
  inspection_date?: string;
  time_slot?: string;
  postal_code?: string;
  unit_number?: string;
  notes?: string;
  status: "confirmed" | "in-progress" | "completed" | "cancelled";
  created_at: string;
}

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  property_type?: string;
  estimated_budget?: string;
  message?: string;
  source?: string;
  created_at: string;
}

const DEFAULT_ADMIN_PIN = "macnel2026";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"bookings" | "calendar" | "inquiries">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Calendar slot viewer date
  const [inspectDate, setInspectDate] = useState<string>("");
  const [todayStr, setTodayStr] = useState<string>("");

  // Check auth from session storage on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("macnel_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    const todayIso = new Date().toISOString().split("T")[0];
    setInspectDate(todayIso);
    setTodayStr(todayIso);
  }, []);

  // Fetch data
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [bookingsRes, inquiriesRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/inquiries"),
      ]);

      if (bookingsRes.ok) {
        const bData = await bookingsRes.json();
        setBookings(bData.bookings || []);
      }
      if (inquiriesRes.ok) {
        const iData = await inquiriesRes.json();
        setInquiries(iData.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Auth handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("macnel_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Invalid Admin Passkey. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("macnel_admin_auth");
    setPinInput("");
  };

  // Status updater
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus as any } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id: string) => {
    if (!confirm(`Are you sure you want to delete booking ${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.client_name?.toLowerCase().includes(q);
        const matchesPhone = b.client_phone?.toLowerCase().includes(q);
        const matchesId = b.id?.toLowerCase().includes(q);
        const matchesPostal = b.postal_code?.toLowerCase().includes(q);
        const matchesService = b.service_name?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesId && !matchesPostal && !matchesService) {
          return false;
        }
      }

      // Status
      if (statusFilter !== "all" && b.status !== statusFilter) {
        return false;
      }

      // Date
      if (dateFilter === "today" && b.inspection_date !== todayStr) {
        return false;
      }

      return true;
    });
  }, [bookings, searchQuery, statusFilter, dateFilter, todayStr]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = bookings.length;
    const todayCount = bookings.filter((b) => b.inspection_date === todayStr).length;
    const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
    const completedCount = bookings.filter((b) => b.status === "completed").length;
    const inquiriesCount = inquiries.length;
    return { total, todayCount, confirmedCount, completedCount, inquiriesCount };
  }, [bookings, inquiries, todayStr]);

  // Standard 5 inspection time slots
  const standardSlots = [
    "09:30 AM – 10:30 AM",
    "11:00 AM – 12:00 PM",
    "01:30 PM – 02:30 PM",
    "03:00 PM – 04:00 PM",
    "04:30 PM – 05:30 PM",
  ];

  // Calendar slot breakdown for inspectDate
  const inspectDateBookings = useMemo(() => {
    return bookings.filter(
      (b) => b.inspection_date === inspectDate && b.status !== "cancelled"
    );
  }, [bookings, inspectDate]);

  // Format WhatsApp message to client
  const getClientWhatsAppUrl = (b: Booking) => {
    const text =
      `Hello ${encodeURIComponent(b.client_name)},%0A%0A` +
      `This is MACNEL Construction regarding your site inspection (*ID: ${b.id}*).%0A%0A` +
      `*Service:* ${encodeURIComponent(b.service_name)}%0A` +
      `*Date:* ${encodeURIComponent(b.inspection_date || "N/A")}%0A` +
      `*Time:* ${encodeURIComponent(b.time_slot || "N/A")}%0A` +
      `*Address:* ${encodeURIComponent(b.unit_number || "")} (Postal: ${encodeURIComponent(b.postal_code || "N/A")})%0A%0A` +
      `Our site engineer is prepared for your appointment. Please reply to confirm!`;
    const cleanPhone = b.client_phone.replace(/\D/g, "");
    const phoneWithCountry = cleanPhone.startsWith("65") ? cleanPhone : `65${cleanPhone}`;
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-200 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#16263F] text-[#8CCB6B] flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#2C6BA6] block mb-1">
            Internal Operations
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
            MACNEL Admin Portal
          </h1>
          <p className="text-xs text-slate-500 mb-6">
            Enter your management passkey to access site bookings, slot availability, and client records.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin Passkey"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-center text-sm font-semibold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
              />
              {pinError && (
                <p className="text-xs text-red-600 font-medium mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl brand-gradient text-white font-bold text-sm shadow-lg hover:scale-[1.01] transition-transform"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Neon DB Connected</span>
            <Link href="/" className="text-[#2C6BA6] hover:underline font-semibold">
              Return to Website &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Admin Header */}
      <header className="bg-[#16263F] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#8CCB6B] text-[#16263F] flex items-center justify-center font-extrabold text-sm shadow">
              M
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block">
                MACNEL Admin
              </span>
              <span className="text-[10px] text-[#8CCB6B] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8CCB6B] animate-pulse" />
                <span>Neon PostgreSQL Live</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchData}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
              Total Bookings
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {stats.total}
            </div>
            <span className="text-[11px] text-[#2C6BA6] font-semibold mt-1 block">
              All time inspections
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
              Today's Visits
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#4E9A3C] mt-2">
              {stats.todayCount}
            </div>
            <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
              Scheduled for today
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
              Confirmed / Active
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-2">
              {stats.confirmedCount}
            </div>
            <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
              Needs site execution
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
              Completed
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">
              {stats.completedCount}
            </div>
            <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
              Inspections done
            </span>
          </div>

          <div className="col-span-2 lg:col-span-1 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
              Quote Inquiries
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#16263F] mt-2">
              {stats.inquiriesCount}
            </div>
            <span className="text-[11px] text-[#2C6BA6] font-semibold mt-1 block">
              Website contact leads
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "bookings"
                ? "border-[#2C6BA6] text-[#2C6BA6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Site Bookings ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("calendar")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "calendar"
                ? "border-[#2C6BA6] text-[#2C6BA6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Slot Availability Inspector</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("inquiries")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "inquiries"
                ? "border-[#2C6BA6] text-[#2C6BA6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Quote Leads ({inquiries.length})</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: SITE INSPECTIONS & BOOKINGS
            ========================================================================= */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client, phone, ID, postal..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today's Visits</option>
                </select>
              </div>
            </div>

            {/* Bookings Table / Cards */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">No bookings found</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your search query or filters.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow flex flex-col lg:flex-row gap-5 lg:items-center justify-between"
                  >
                    {/* Client & Booking Info */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-extrabold uppercase bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                          {b.id}
                        </span>

                        <span
                          className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full capitalize ${
                            b.status === "confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : b.status === "in-progress"
                              ? "bg-amber-100 text-amber-800"
                              : b.status === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {b.status}
                        </span>

                        <span className="text-xs text-slate-400">
                          Booked: {new Date(b.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 pt-1">
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-[#2C6BA6]" />
                            <span>{b.client_name}</span>
                          </h3>
                          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
                            <p className="font-semibold">{b.client_phone}</p>
                            {b.client_email && <p className="text-slate-500">{b.client_email}</p>}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {b.service_name}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {b.service_detail && <span>{b.service_detail} · </span>}
                            <span>{b.property_type}</span>
                            {b.property_size && <span> ({b.property_size})</span>}
                          </div>
                          {b.timeline && (
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Timeline: <strong>{b.timeline}</strong>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Location & Notes */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            {b.unit_number ? `${b.unit_number}, ` : ""}
                            Postal: <strong>{b.postal_code || "N/A"}</strong>
                          </span>
                        </div>

                        {b.notes && (
                          <div className="text-slate-500 italic">
                            Note: "{b.notes}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Schedule Badge & Actions */}
                    <div className="lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 justify-between items-start lg:items-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                      <div className="bg-[#16263F]/5 p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Inspection Schedule
                        </span>
                        <div className="text-sm font-extrabold text-[#16263F] flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-[#2C6BA6]" />
                          <span>{b.inspection_date || "Date Unspecified"}</span>
                        </div>
                        <div className="text-xs font-semibold text-[#4E9A3C] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{b.time_slot || "Slot Unspecified"}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {/* Status Select */}
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {/* WhatsApp Link */}
                        <a
                          href={getClientWhatsAppUrl(b)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Message client on WhatsApp"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </a>

                        {/* Call Link */}
                        <a
                          href={`tel:${b.client_phone}`}
                          title="Call client"
                          className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteBooking(b.id)}
                          title="Delete booking"
                          className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: CALENDAR SLOT AVAILABILITY INSPECTOR
            ========================================================================= */}
        {activeTab === "calendar" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Inspect Slot Availability (Faka / Booked)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check which inspection slots are open (faka) or occupied on any date.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Select Date:
                </label>
                <input
                  type="date"
                  value={inspectDate}
                  onChange={(e) => setInspectDate(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
                />
              </div>
            </div>

            {/* Slots breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {standardSlots.map((slot) => {
                const bookingForSlot = inspectDateBookings.find((b) => b.time_slot === slot);
                const isBooked = !!bookingForSlot;

                return (
                  <div
                    key={slot}
                    className={`p-5 rounded-2xl border transition-all ${
                      isBooked
                        ? "border-red-200 bg-red-50/50"
                        : "border-emerald-200 bg-emerald-50/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{slot}</span>
                      </span>

                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          isBooked
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {isBooked ? "🔴 Booked / Occupied" : "🟢 Free / Available (Faka)"}
                      </span>
                    </div>

                    {isBooked ? (
                      <div className="text-xs text-slate-700 space-y-1 bg-white p-3 rounded-xl border border-red-100">
                        <p className="font-extrabold text-slate-900">
                          {bookingForSlot.client_name}
                        </p>
                        <p className="text-slate-600 font-semibold">
                          📞 {bookingForSlot.client_phone}
                        </p>
                        <p className="text-slate-500">
                          {bookingForSlot.service_name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          ID: {bookingForSlot.id}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-700 font-medium py-3">
                        This slot is completely free. Clients can book this slot on the website.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: QUOTE LEADS & CONTACT INQUIRIES
            ========================================================================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Customer Quote Requests &amp; Inquiries
                </h2>
                <p className="text-xs text-slate-500">
                  Submissions captured from Contact Us page and Quick Quote Calculator.
                </p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">No inquiries yet</h3>
                <p className="text-xs text-slate-400 mt-1">
                  New submissions from the contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          {inq.name}
                        </span>
                        <span className="text-[11px] font-bold text-[#2C6BA6] bg-[#2C6BA6]/10 px-2 py-0.5 rounded-full">
                          {inq.service || "General Inquiry"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(inq.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 font-medium">
                        <span>📞 {inq.phone}</span>
                        {inq.email && <span> · ✉️ {inq.email}</span>}
                        {inq.property_type && <span> · 🏠 {inq.property_type}</span>}
                      </div>

                      {inq.message && (
                        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                          "{inq.message}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                          inq.name
                        )}%2C%20thank%20you%20for%20contacting%20MACNEL%20Construction.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        title="WhatsApp lead"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>

                      <a
                        href={`tel:${inq.phone}`}
                        className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                        title="Call lead"
                      >
                        <Phone className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-700"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
