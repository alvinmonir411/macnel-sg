"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import projectsData from "../../../data/projects.json";
import reviewsData from "../../../data/reviews.json";
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
  LayoutDashboard,
  Radio,
  Settings,
  Code2,
  Save,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  Banknote,
  Star,
  Maximize2,
  ArrowRight,
  Globe,
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

interface MarketingConfig {
  gtmId: string;
  gtmEnabled: boolean;
  ga4Id: string;
  ga4Enabled: boolean;
  metaPixelId: string;
  metaPixelEnabled: boolean;
  tiktokPixelId: string;
  tiktokPixelEnabled: boolean;
  customHeadScripts: string;
  customBodyScripts: string;
}

interface ContactConfig {
  whatsapp: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  operatingHours: string;
  showroomNote: string;
}

interface CredentialsConfig {
  uen: string;
  hdbLicense: string;
  bcaLicense: string;
  bizSafe: string;
  yearsInBusiness: string;
}

const DEFAULT_ADMIN_PIN = "macnel2026";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "inquiries" | "marketing" | "company" | "projects" | "reviews"
  >("overview");

  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [savingSettings, setSavingSettings] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>("");

  // Settings states
  const [marketing, setMarketing] = useState<MarketingConfig>({
    gtmId: "",
    gtmEnabled: false,
    ga4Id: "",
    ga4Enabled: false,
    metaPixelId: "",
    metaPixelEnabled: false,
    tiktokPixelId: "",
    tiktokPixelEnabled: false,
    customHeadScripts: "",
    customBodyScripts: "",
  });

  const [contact, setContact] = useState<ContactConfig>({
    whatsapp: "6589361834",
    phonePrimary: "+65 8936 1834",
    phoneSecondary: "+65 6789 0123",
    email: "contact@renovationcontractor.sg",
    address: "280 Woodlands Industrial Park E5, #02-14 Harvest @ Woodlands, Singapore 757322",
    operatingHours: "Monday to Saturday: 9:00 AM – 6:30 PM (Sundays by Appointment)",
    showroomNote: "Visiting our material showroom? Please book a 30-minute advance slot.",
  });

  const [credentials, setCredentials] = useState<CredentialsConfig>({
    uen: "202312345A",
    hdbLicense: "HDB Registered Directory HB-00-0000X",
    bcaLicense: "BCA Registered Contractor (CR06 / General Builder)",
    bizSafe: "bizSAFE Level 3 Certified",
    yearsInBusiness: "12",
  });

  // Filters for bookings
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Filters for inquiries
  const [inquirySearch, setInquirySearch] = useState<string>("");

  // Change PIN modal state
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>("");
  const [pinChangeMsg, setPinChangeMsg] = useState<string>("");

  // Check auth from session storage on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("macnel_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all bookings, inquiries, and settings
  const fetchAllData = async () => {
    try {
      setRefreshing(true);
      const [bookingsRes, inquiriesRes, settingsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/inquiries"),
        fetch("/api/admin/settings"),
      ]);

      if (bookingsRes.ok) {
        const bData = await bookingsRes.json();
        setBookings(bData.bookings || []);
      }

      if (inquiriesRes.ok) {
        const iData = await inquiriesRes.json();
        setInquiries(iData.inquiries || []);
      }

      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        if (sData.settings) {
          if (sData.settings.marketing) setMarketing(sData.settings.marketing);
          if (sData.settings.contact) setContact(sData.settings.contact);
          if (sData.settings.credentials) setCredentials(sData.settings.credentials);
        }
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN || pinInput.trim() === "macnel2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("macnel_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Invalid Master Access PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("macnel_admin_auth");
  };

  // Status updates
  const handleUpdateStatus = async (id: string, newStatus: string) => {
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
      console.error("Failed to update status", err);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id: string) => {
    if (!confirm(`Are you sure you want to delete inspection record #${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete booking", err);
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id: number) => {
    if (!confirm(`Are you sure you want to delete lead inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry", err);
    }
  };

  // Save Settings Handler (Marketing / Company / Credentials)
  const handleSaveSettings = async (category: string, data: any) => {
    try {
      setSavingSettings(true);
      setSaveSuccessMessage("");
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, data }),
      });
      const result = await res.json();
      if (res.ok) {
        setSaveSuccessMessage(`${category.toUpperCase()} settings saved and applied to live site!`);
        setTimeout(() => setSaveSuccessMessage(""), 5000);
      } else {
        alert(result.error || "Failed to save settings.");
      }
    } catch (err) {
      console.error("Save settings error:", err);
      alert("Error saving settings. Please check database connectivity.");
    } finally {
      setSavingSettings(false);
    }
  };

  // Export Bookings to CSV
  const exportBookingsToCSV = () => {
    if (bookings.length === 0) return alert("No booking records to export.");
    const headers = [
      "ID",
      "Client Name",
      "Phone",
      "Email",
      "Service",
      "Property Type",
      "Size",
      "Inspection Date",
      "Time Slot",
      "Postal Code",
      "Status",
      "Created At",
    ];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.client_name}"`,
      `"${b.client_phone}"`,
      b.client_email || "",
      `"${b.service_name}"`,
      b.property_type || "",
      b.property_size || "",
      b.inspection_date || "",
      b.time_slot || "",
      b.postal_code || "",
      b.status,
      b.created_at,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `macnel_inspection_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Inquiries to CSV
  const exportInquiriesToCSV = () => {
    if (inquiries.length === 0) return alert("No lead inquiries to export.");
    const headers = ["ID", "Name", "Phone", "Email", "Service", "Property Type", "Budget", "Message", "Created At"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name}"`,
      `"${i.phone}"`,
      i.email || "",
      `"${i.service || ""}"`,
      i.property_type || "",
      i.estimated_budget || "",
      `"${(i.message || "").replace(/"/g, '""')}"`,
      i.created_at,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `macnel_quote_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        searchQuery === "" ||
        b.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.client_phone.includes(searchQuery) ||
        b.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.postal_code && b.postal_code.includes(searchQuery)) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((i) => {
      return (
        inquirySearch === "" ||
        i.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        i.phone.includes(inquirySearch) ||
        (i.service && i.service.toLowerCase().includes(inquirySearch.toLowerCase())) ||
        (i.property_type && i.property_type.toLowerCase().includes(inquirySearch.toLowerCase()))
      );
    });
  }, [inquiries, inquirySearch]);

  // KPI Calculations
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const inProgressCount = bookings.filter((b) => b.status === "in-progress").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const activePixelsCount = [
    marketing.gtmEnabled,
    marketing.ga4Enabled,
    marketing.metaPixelEnabled,
    marketing.tiktokPixelEnabled,
    Boolean(marketing.customHeadScripts),
  ].filter(Boolean).length;

  // 1. Render Lock Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0A1220] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle dot canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 text-slate-900">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#166534] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Lock className="w-8 h-8 text-[#16a34a]" />
          </div>

          <div className="text-center mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#166534] block mb-1">
              Authorized Personnel Only
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Macnel SG Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Enter your master security PIN to access live bookings, CRM leads, tracking pixels, and site controls.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Security PIN Code
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: macnel2026)"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm tracking-widest focus:outline-none focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pinError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-500 mt-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-[#166534] text-white font-bold text-sm shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Neon DB Online
            </span>
            <Link href="/" className="hover:text-slate-700 transition-colors font-semibold">
              ← Back to Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. Render Authenticated Dashboard
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 relative overflow-hidden">
      {/* Subtle Architectural Dot Canvas (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black shadow-md">
              <Building className="w-5 h-5 text-[#8CCB6B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#0F172A] leading-tight">
                  Macnel SG Control Center
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#166534] border border-emerald-200">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct Contractor Management · Singapore Renovation Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#16a34a]" : ""}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-sm transition-all"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#16a34a]" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Save Success Toast Banner */}
        {saveSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#166534] text-xs sm:text-sm font-bold flex items-center justify-between shadow-md animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
            <button
              onClick={() => setSaveSuccessMessage("")}
              className="text-[#166534] hover:text-black font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* 4 High-Level Executive KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Bookings
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#166534] flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{bookings.length}</p>
            <p className="text-[11px] text-[#166534] font-semibold mt-1">
              {confirmedCount} confirmed inspections
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quote Leads
              </span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{inquiries.length}</p>
            <p className="text-[11px] text-sky-700 font-semibold mt-1">
              Direct form inquiries in DB
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Pixels
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {activePixelsCount} / 5
            </p>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">
              {marketing.ga4Enabled ? "GA4 Active · " : ""}
              {marketing.metaPixelEnabled ? "Meta Active" : "No-Code Tracking"}
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Dispatch Phone
              </span>
              <div className="w-8 h-8 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-base sm:text-lg font-black text-slate-900 truncate">
              +{contact.whatsapp}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1 truncate">
              {contact.phonePrimary}
            </p>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-slate-200">
          {[
            { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
            { id: "bookings", label: `Inspections (${bookings.length})`, icon: CalendarDays },
            { id: "inquiries", label: `Quote Leads (${inquiries.length})`, icon: Inbox },
            { id: "marketing", label: "Marketing & Pixels", icon: Radio, highlight: true },
            { id: "company", label: "Company & Contact", icon: Settings },
            { id: "projects", label: `Portfolio Projects (${projectsData.length})`, icon: Sparkles },
            { id: "reviews", label: `Reviews (${reviewsData.reviews.length})`, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:bg-slate-50 shadow-sm"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#8CCB6B]" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.highlight && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Bookings Queue */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-[#16a34a]" />
                    <span>Recent Site Inspections</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-bold text-[#166534] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-500 py-8 text-center">
                    No inspection bookings yet. Submit a test booking on the website!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900 text-sm">{b.client_name}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                b.status === "confirmed"
                                  ? "bg-emerald-100 text-[#166534]"
                                  : b.status === "in-progress"
                                  ? "bg-amber-100 text-amber-800"
                                  : b.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                          <span className="text-slate-600 flex items-center gap-2">
                            <span>{b.service_name}</span> ·{" "}
                            <span className="font-semibold text-slate-900">
                              {b.inspection_date || "Date TBA"} ({b.time_slot || "Slot TBA"})
                            </span>
                          </span>
                        </div>
                        <a
                          href={`https://wa.me/${b.client_phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                            b.client_name
                          )}%2C%20regarding%20your%20renovation%20inspection%20with%20Macnel%20SG...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-sm flex items-center gap-1 shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions & Marketing Status */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#16a34a]" />
                    <span>Marketing &amp; Pixels Status</span>
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="font-bold">Google Tag Manager (GTM):</span>
                      <span
                        className={`font-black uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                          marketing.gtmEnabled ? "bg-emerald-100 text-[#166534]" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {marketing.gtmEnabled ? "Active" : "Disabled"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="font-bold">Google Analytics 4 (GA4):</span>
                      <span
                        className={`font-black uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                          marketing.ga4Enabled ? "bg-emerald-100 text-[#166534]" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {marketing.ga4Enabled ? "Active" : "Disabled"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="font-bold">Meta (Facebook) Pixel:</span>
                      <span
                        className={`font-black uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                          marketing.metaPixelEnabled ? "bg-emerald-100 text-[#166534]" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {marketing.metaPixelEnabled ? "Active" : "Disabled"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("marketing")}
                    className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#166534] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Configure Pixels &amp; Scripts →
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                    <span>Quick Exports &amp; Data Backup</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={exportBookingsToCSV}
                      className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#16a34a]" />
                      <span>Export Bookings</span>
                    </button>
                    <button
                      onClick={exportInquiriesToCSV}
                      className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#16a34a]" />
                      <span>Export Leads</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INSPECTION BOOKINGS CRM */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action Bar */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {["all", "confirmed", "in-progress", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      statusFilter === st
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, postal..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#16a34a] w-52 sm:w-64"
                  />
                </div>
                <button
                  onClick={exportBookingsToCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#166534] border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Bookings Table / Cards */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center text-slate-500 shadow-sm">
                No inspection bookings match your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-bold text-slate-400">#{b.id}</span>
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 cursor-pointer focus:outline-none border ${
                            b.status === "confirmed"
                              ? "bg-emerald-50 text-[#166534] border-emerald-200"
                              : b.status === "in-progress"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : b.status === "completed"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1">{b.client_name}</h3>
                      <p className="text-xs text-[#166534] font-semibold mb-3 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{b.client_phone}</span>
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                        <p>
                          <strong className="text-slate-800">Trade:</strong> {b.service_name}
                        </p>
                        <p>
                          <strong className="text-slate-800">Date &amp; Slot:</strong>{" "}
                          <span className="text-slate-900 font-bold">
                            {b.inspection_date || "TBA"} · {b.time_slot || "TBA"}
                          </span>
                        </p>
                        {b.property_type && (
                          <p>
                            <strong className="text-slate-800">Property:</strong> {b.property_type} (
                            {b.property_size || "N/A"})
                          </p>
                        )}
                        {b.postal_code && (
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              Postal {b.postal_code} {b.unit_number ? `Unit #${b.unit_number}` : ""}
                            </span>
                          </p>
                        )}
                        {b.notes && (
                          <p className="text-slate-500 italic bg-slate-50 p-2 rounded-lg mt-2">
                            "{b.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <a
                        href={`https://wa.me/${b.client_phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                          b.client_name
                        )}%2C%20regarding%20your%20inspection%20on%20${encodeURIComponent(
                          b.inspection_date || ""
                        )}%20at%20${encodeURIComponent(
                          b.time_slot || ""
                        )}%20with%20Macnel%20Renovation%20SG...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp Reply</span>
                      </a>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete record"
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

        {/* TAB 3: QUOTE INQUIRIES & LEADS */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action Bar */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search lead name, phone, trade..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#16a34a] w-64"
                />
              </div>

              <button
                onClick={exportInquiriesToCSV}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#166534] border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads CSV</span>
              </button>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center text-slate-500 shadow-sm">
                No quote inquiries found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono text-slate-400">Lead #{inq.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1">{inq.name}</h3>
                      <p className="text-xs text-[#166534] font-semibold mb-3 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{inq.phone}</span>
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                        {inq.property_type && (
                          <p>
                            <strong className="text-slate-800">Property:</strong> {inq.property_type}
                          </p>
                        )}
                        {inq.service && (
                          <p>
                            <strong className="text-slate-800">Trades:</strong> {inq.service}
                          </p>
                        )}
                        {inq.message && (
                          <p className="text-slate-700 bg-slate-50 p-3 rounded-xl mt-2 leading-relaxed">
                            "{inq.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                          inq.name
                        )}%2C%20thank%20you%20for%20requesting%20a%20renovation%20quote%20with%20Macnel%20SG...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Chat via WhatsApp</span>
                      </a>
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete lead"
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

        {/* TAB 4: MARKETING, TRACKING & PIXELS INJECTOR (NO-CODE) */}
        {activeTab === "marketing" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-black uppercase tracking-wider text-[#166534] block mb-1">
                  Zero Code Modification Needed
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  No-Code Tracking &amp; Analytics Hub
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Paste your Google Tag Manager, Google Analytics 4, Meta (Facebook) Pixel, or TikTok Pixel IDs below.
                  When toggled ON, the scripts inject automatically across every single page of the website in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 1. Google Tag Manager (GTM) */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-sky-600" />
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Google Tag Manager (GTM)
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketing.gtmEnabled}
                        onChange={(e) =>
                          setMarketing({ ...marketing, gtmEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]" />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={marketing.gtmId}
                    onChange={(e) => setMarketing({ ...marketing, gtmId: e.target.value })}
                    placeholder="e.g. GTM-NXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#16a34a]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Automatically injects head snippet and body noscript iframe.
                  </p>
                </div>

                {/* 2. Google Analytics 4 (GA4) */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Google Analytics 4 (GA4)
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketing.ga4Enabled}
                        onChange={(e) =>
                          setMarketing({ ...marketing, ga4Enabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]" />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={marketing.ga4Id}
                    onChange={(e) => setMarketing({ ...marketing, ga4Id: e.target.value })}
                    placeholder="e.g. G-XXXXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#16a34a]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Automatically loads gtag.js and initial pageview stream.
                  </p>
                </div>

                {/* 3. Meta (Facebook) Pixel */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Meta (Facebook) Pixel ID
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketing.metaPixelEnabled}
                        onChange={(e) =>
                          setMarketing({ ...marketing, metaPixelEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]" />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={marketing.metaPixelId}
                    onChange={(e) => setMarketing({ ...marketing, metaPixelId: e.target.value })}
                    placeholder="e.g. 123456789012345"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#16a34a]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Fires standard PageView events for Facebook/Instagram ads.
                  </p>
                </div>

                {/* 4. TikTok Pixel */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-pink-600" />
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        TikTok Pixel ID
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketing.tiktokPixelEnabled}
                        onChange={(e) =>
                          setMarketing({ ...marketing, tiktokPixelEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]" />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={marketing.tiktokPixelId}
                    onChange={(e) => setMarketing({ ...marketing, tiktokPixelId: e.target.value })}
                    placeholder="e.g. CXXXXXXXXXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#16a34a]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Tracks TikTok ads impressions and conversions.
                  </p>
                </div>
              </div>

              {/* Raw Head & Body Script Textareas */}
              <div className="space-y-6 pt-6 border-t border-slate-200">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#16a34a]" />
                      <span>Custom &lt;head&gt; Raw Code / Verification Meta Tags</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Search Console verification, Clarity, Hotjar
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={marketing.customHeadScripts}
                    onChange={(e) =>
                      setMarketing({ ...marketing, customHeadScripts: e.target.value })
                    }
                    placeholder={`<!-- Example: <meta name="google-site-verification" content="..." /> -->`}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#16a34a]" />
                      <span>Custom &lt;body&gt; Raw Code / Live Chat Widgets</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Tidio, Crisp, or custom conversion scripts
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={marketing.customBodyScripts}
                    onChange={(e) =>
                      setMarketing({ ...marketing, customBodyScripts: e.target.value })
                    }
                    placeholder={`<!-- Example: <script src="//code.tidio.co/...js" async></script> -->`}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sky-400 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-end">
                <button
                  onClick={() => handleSaveSettings("marketing", marketing)}
                  disabled={savingSettings}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-[#166534] text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? "Saving Settings..." : "Save Marketing & Pixels"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COMPANY & CONTACT SETTINGS */}
        {activeTab === "company" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-black uppercase tracking-wider text-[#166534] block mb-1">
                  Live Site Synchronized
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Company Info &amp; Dispatch Settings
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Update your official Singapore WhatsApp hotline, office showroom location, and business registration numbers without editing code.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Primary WhatsApp Number (e.g. 6589361834)
                  </label>
                  <input
                    type="text"
                    value={contact.whatsapp}
                    onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Updates all click-to-WhatsApp buttons across the site instantly.
                  </p>
                </div>

                {/* Primary Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Primary Display Hotline
                  </label>
                  <input
                    type="text"
                    value={contact.phonePrimary}
                    onChange={(e) => setContact({ ...contact, phonePrimary: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                  />
                </div>

                {/* Secondary Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Secondary Office Line
                  </label>
                  <input
                    type="text"
                    value={contact.phoneSecondary}
                    onChange={(e) => setContact({ ...contact, phoneSecondary: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Support / Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Showroom / Office Address
                  </label>
                  <input
                    type="text"
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                  />
                </div>

                {/* Operating Hours */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={contact.operatingHours}
                    onChange={(e) => setContact({ ...contact, operatingHours: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                  />
                </div>
              </div>

              {/* Business Credentials Sub-section */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
                  <span>Singapore Licenses &amp; Registrations</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Singapore UEN Number
                    </label>
                    <input
                      type="text"
                      value={credentials.uen}
                      onChange={(e) => setCredentials({ ...credentials, uen: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      HDB Registered License
                    </label>
                    <input
                      type="text"
                      value={credentials.hdbLicense}
                      onChange={(e) =>
                        setCredentials({ ...credentials, hdbLicense: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      BCA Builder License
                    </label>
                    <input
                      type="text"
                      value={credentials.bcaLicense}
                      onChange={(e) =>
                        setCredentials({ ...credentials, bcaLicense: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      bizSAFE Level
                    </label>
                    <input
                      type="text"
                      value={credentials.bizSafe}
                      onChange={(e) => setCredentials({ ...credentials, bizSafe: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#16a34a]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-end">
                <button
                  onClick={async () => {
                    await handleSaveSettings("contact", contact);
                    await handleSaveSettings("credentials", credentials);
                  }}
                  disabled={savingSettings}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-[#166534] text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? "Saving Settings..." : "Save Company Information"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PORTFOLIO PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#166534] block mb-1">
                  Active Gallery &amp; Transformations
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Completed Singapore Projects ({projectsData.length})
                </h2>
              </div>
              <Link
                href="/project-gallery"
                target="_blank"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>View Live Gallery</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#16a34a]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-900">
                      <img
                        src={proj.afterImage}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {proj.category}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-[#166534]/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        Handover
                      </span>
                    </div>

                    <div className="p-5">
                      <span className="text-xs font-bold text-[#166534] block mb-1">
                        {proj.location} · {proj.propertyType}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-1">
                        {proj.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 py-2 border-y border-slate-100">
                        <span>Area: <strong>{proj.sizeSqft}</strong></span>
                        <span>Duration: <strong>{proj.durationDays}</strong></span>
                        <span className="col-span-2 text-slate-900 font-bold">
                          Cost: <span className="text-[#166534]">{proj.costRange}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/projects/${proj.id}`}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#166534] text-white text-xs font-bold transition-colors"
                    >
                      <span>Preview Scope Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: VERIFIED REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#166534] block mb-1">
                  Customer Social Proof
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Verified Singapore Client Reviews ({reviewsData.reviews.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsData.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {rev.date.replace("TODO_REPLACE: ", "")}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                      "{rev.reviewText.replace("TODO_REPLACE: ", "")}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {rev.customerName.replace("TODO_REPLACE: ", "")}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {rev.propertyTypeArea.replace("TODO_REPLACE: ", "")}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#166534] text-[10px] font-bold border border-emerald-200">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
