"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Trash2,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Layers,
  Inbox,
  ShieldCheck,
  ChevronRight,
  X,
  SlidersHorizontal,
  CalendarDays,
  ArrowUpDown,
} from "lucide-react";

interface PopupLead {
  id: number;
  phone: string;
  email: string;
  source?: string;
  status?: "new" | "contacted" | "quoted" | "closed";
  notes?: string;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);

  const [leads, setLeads] = useState<PopupLead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [contactFilter, setContactFilter] = useState<string>("all"); // all | both | phone_only | email_only
  const [datePreset, setDatePreset] = useState<string>("all"); // all | today | yesterday | last7 | last30 | thisMonth | custom
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<number | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>("");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // 1. Check Auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchLeads();
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setPinError(data.error || "Incorrect security PIN.");
      }
    } catch {
      setPinError("Connection error while validating PIN.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.leads && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      showToast("Failed to load leads from database.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
        showToast("Lead status updated.", "success");
      }
    } catch {
      showToast("Error updating lead status.", "error");
    }
  };

  const handleSaveNotes = async (id: number) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: notesDraft }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, notes: notesDraft } : l))
        );
        setEditingNotesId(null);
        showToast("Lead notes saved.", "success");
      }
    } catch {
      showToast("Error saving notes.", "error");
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) {
      return;
    }
    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        showToast("Lead successfully deleted.", "success");
      }
    } catch {
      showToast("Error deleting lead.", "error");
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Extract unique sources for dynamic filter dropdown
  const uniqueSources = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.source) set.add(l.source);
    });
    return Array.from(set);
  }, [leads]);

  // Comprehensive Date by Date & All-Type Filtering
  const filteredLeads = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return leads
      .filter((lead) => {
        // 1. Text Search Query
        const q = searchQuery.toLowerCase().trim();
        if (q) {
          const matches =
            lead.phone.toLowerCase().includes(q) ||
            lead.email.toLowerCase().includes(q) ||
            (lead.notes || "").toLowerCase().includes(q) ||
            (lead.source || "").toLowerCase().includes(q) ||
            String(lead.id).includes(q);
          if (!matches) return false;
        }

        // 2. Status Filter
        if (statusFilter !== "all") {
          const currentStatus = lead.status || "new";
          if (currentStatus !== statusFilter) return false;
        }

        // 3. Source / Type Filter
        if (sourceFilter !== "all") {
          const src = lead.source || "website_popup";
          if (src !== sourceFilter) return false;
        }

        // 4. Contact Method Filter
        if (contactFilter !== "all") {
          const hasP = Boolean(lead.phone?.trim());
          const hasE = Boolean(lead.email?.trim());
          if (contactFilter === "both" && (!hasP || !hasE)) return false;
          if (contactFilter === "phone_only" && (!hasP || hasE)) return false;
          if (contactFilter === "email_only" && (!hasE || hasP)) return false;
        }

        // 5. Date by Date Filtering
        if (lead.created_at) {
          const leadDate = new Date(lead.created_at);
          const leadDateStr = leadDate.toISOString().slice(0, 10);

          if (datePreset === "today" && leadDateStr !== todayStr) {
            return false;
          }
          if (datePreset === "yesterday" && leadDateStr !== yesterdayStr) {
            return false;
          }
          if (datePreset === "last7" && leadDate < sevenDaysAgo) {
            return false;
          }
          if (datePreset === "last30" && leadDate < thirtyDaysAgo) {
            return false;
          }
          if (datePreset === "thisMonth") {
            if (
              leadDate.getFullYear() !== now.getFullYear() ||
              leadDate.getMonth() !== now.getMonth()
            ) {
              return false;
            }
          }
          if (datePreset === "custom") {
            if (startDate && leadDateStr < startDate) {
              return false;
            }
            if (endDate && leadDateStr > endDate) {
              return false;
            }
          }
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return sortBy === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [
    leads,
    searchQuery,
    statusFilter,
    sourceFilter,
    contactFilter,
    datePreset,
    startDate,
    endDate,
    sortBy,
  ]);

  // Export Filtered Leads to CSV
  const exportToCSV = () => {
    const listToExport = filteredLeads.length > 0 ? filteredLeads : leads;
    if (listToExport.length === 0) {
      showToast("No leads available to export.", "error");
      return;
    }

    const headers = ["ID", "Created At", "Phone", "Email", "Status", "Source", "Notes"];
    const rows = listToExport.map((l) => [
      l.id,
      new Date(l.created_at).toLocaleString(),
      `"${l.phone}"`,
      `"${l.email}"`,
      l.status || "new",
      `"${l.source || "website_popup"}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `macnel-leads-${datePreset}-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${listToExport.length} leads to CSV.`, "success");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSourceFilter("all");
    setContactFilter("all");
    setDatePreset("all");
    setStartDate("");
    setEndDate("");
    setSortBy("newest");
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (sourceFilter !== "all" ? 1 : 0) +
    (contactFilter !== "all" ? 1 : 0) +
    (datePreset !== "all" ? 1 : 0) +
    (startDate || endDate ? 1 : 0);

  // Calculate Metrics
  const totalCount = leads.length;
  const newCount = leads.filter((l) => !l.status || l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const closedCount = leads.filter((l) => l.status === "closed").length;

  // PIN Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-300">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Popup Leads Suite
            </h1>
            <p className="text-xs text-zinc-400">
              Protected administration interface. Enter security PIN to view customer leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4-digit Security PIN"
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 font-mono text-center tracking-widest text-lg focus:outline-none focus:border-white transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <p className="text-xs text-red-400 font-medium text-center">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-sm tracking-wide transition-colors"
            >
              Unlock Leads Dashboard
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/admin"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Return to Main Admin Suite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-300 ${
            toastType === "success"
              ? "bg-zinc-900 border-zinc-700 text-white"
              : "bg-red-950/90 border-red-800 text-red-200"
          }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Admin Suite</span>
          </Link>
          <div className="h-5 w-px bg-zinc-800" />
          <div>
            <h1 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#8CCB6B]" />
              <span>Customer Leads & Inquiries</span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700">
                {leads.length} Total
              </span>
            </h1>
            <p className="text-[10px] text-zinc-400 hidden sm:block">
              Filter leads date by date, service type, contact method, and status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLeads}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={exportToCSV}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Export Filtered ({filteredLeads.length})</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-5 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Total Captured
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {totalCount}
            </div>
            <p className="text-[11px] text-zinc-500">All visitor submissions</p>
          </div>

          <div className="bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-5 space-y-1">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              New / Pending
            </span>
            <div className="text-2xl sm:text-3xl font-black text-sky-300">
              {newCount}
            </div>
            <p className="text-[11px] text-zinc-500">Requires follow-up</p>
          </div>

          <div className="bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-5 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              In Contact
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">
              {contactedCount}
            </div>
            <p className="text-[11px] text-zinc-500">Quotation in progress</p>
          </div>

          <div className="bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-5 space-y-1">
            <span className="text-xs font-bold text-[#8CCB6B] uppercase tracking-wider">
              Closed / Won
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#8CCB6B]">
              {closedCount}
            </div>
            <p className="text-[11px] text-zinc-500">Contract confirmed</p>
          </div>
        </div>

        {/* 🌟 Comprehensive Filter & Date-by-Date Filter Panel */}
        <div className="bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-5">
          {/* Top Search + Header */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by phone, email, notes, source..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Order Selector */}
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none text-zinc-200 cursor-pointer text-xs"
                >
                  <option value="newest" className="bg-zinc-900 text-white">Newest First</option>
                  <option value="oldest" className="bg-zinc-900 text-white">Oldest First</option>
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset All ({activeFiltersCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* 📅 Date by Date Preset Pills */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
              <CalendarDays className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>Date Filter (Date by Date):</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Time" },
                { id: "today", label: "Today" },
                { id: "yesterday", label: "Yesterday" },
                { id: "last7", label: "Last 7 Days" },
                { id: "last30", label: "Last 30 Days" },
                { id: "thisMonth", label: "This Month" },
                { id: "custom", label: "Custom Range / Specific Date" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setDatePreset(p.id);
                    if (p.id !== "custom") {
                      setStartDate("");
                      setEndDate("");
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    datePreset === p.id
                      ? "bg-white text-black font-black shadow-md"
                      : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom Date Pickers (Start Date & End Date) */}
            {datePreset === "custom" && (
              <div className="pt-2 flex flex-wrap items-center gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-400 font-semibold">From:</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-400 font-semibold">To:</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    const today = new Date().toISOString().slice(0, 10);
                    setStartDate(today);
                    setEndDate(today);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-semibold transition-colors"
                >
                  Set to Today
                </button>
              </div>
            )}
          </div>

          {/* 🎛️ All Type Filters (Status, Source, Contact Method) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-800/80">
            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-200 focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                <option value="all">All Statuses ({leads.length})</option>
                <option value="new">New / Pending ({newCount})</option>
                <option value="contacted">In Contact ({contactedCount})</option>
                <option value="quoted">Quoted ({leads.filter((l) => l.status === "quoted").length})</option>
                <option value="closed">Closed / Won ({closedCount})</option>
              </select>
            </div>

            {/* Source / Type Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Lead Source / Type
              </label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-200 focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                <option value="all">All Types & Sources</option>
                <option value="website_popup">Website Popup</option>
                <option value="website_popup_cookie">Visitor 5s Popup</option>
                {uniqueSources
                  .filter((s) => s !== "website_popup" && s !== "website_popup_cookie")
                  .map((s) => (
                    <option key={s} value={s}>
                      {s.replace(/_/g, " ").toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>

            {/* Contact Method Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Contact Method Available
              </label>
              <select
                value={contactFilter}
                onChange={(e) => setContactFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-200 focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                <option value="all">All (Any Contact)</option>
                <option value="both">Both Phone & Email</option>
                <option value="phone_only">Phone / WhatsApp Only</option>
                <option value="email_only">Email Address Only</option>
              </select>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div>
              Showing <span className="font-bold text-white">{filteredLeads.length}</span> of{" "}
              <span className="font-bold text-white">{leads.length}</span> leads
              {activeFiltersCount > 0 && " (filtered)"}
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#8CCB6B] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Leads Cards Grid */}
        {loading ? (
          <div className="p-16 text-center text-zinc-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-zinc-400" />
            Loading leads from database...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-[#0E0E0E] border border-zinc-800 rounded-3xl p-16 text-center space-y-3">
            <Users className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No Leads Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {activeFiltersCount > 0
                ? "No leads matched your date, status, source, or search filters. Try adjusting your criteria or clearing filters."
                : "When visitors enter their phone and email in the website popup, they will appear here instantly."}
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors mt-2"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3.5">
            {filteredLeads.map((lead) => {
              const cleanPhone = lead.phone?.replace(/[^0-9]/g, "") || "";
              const status = lead.status || "new";

              return (
                <div
                  key={lead.id}
                  className="bg-[#0E0E0E] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3.5">
                    {/* Contact Details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {lead.phone ? (
                          <>
                            <span className="font-mono font-bold text-base text-white tracking-wide">
                              {lead.phone}
                            </span>
                            <button
                              onClick={() => handleCopy(lead.phone, `phone-${lead.id}`)}
                              className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800"
                              title="Copy Phone"
                            >
                              {copiedId === `phone-${lead.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-zinc-500 italic">No phone provided</span>
                        )}

                        {/* Status Badge Dropdown */}
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            status === "new"
                              ? "bg-sky-500/10 text-sky-300 border-sky-500/30"
                              : status === "contacted"
                              ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                              : status === "quoted"
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                              : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          }`}
                        >
                          <option value="new">● New</option>
                          <option value="contacted">● Contacted</option>
                          <option value="quoted">● Quoted</option>
                          <option value="closed">● Closed / Won</option>
                        </select>

                        {/* Lead Source Tag */}
                        {lead.source && (
                          <span className="text-[10px] font-bold text-zinc-400 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800">
                            {lead.source.replace(/_/g, " ")}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        {lead.email ? (
                          <>
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:text-white underline decoration-zinc-700"
                            >
                              {lead.email}
                            </a>
                            <button
                              onClick={() => handleCopy(lead.email, `email-${lead.id}`)}
                              className="p-0.5 rounded text-zinc-600 hover:text-white"
                              title="Copy Email"
                            >
                              {copiedId === `email-${lead.id}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span className="text-zinc-500 italic">No email provided</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {cleanPhone ? (
                        <>
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hello, thank you for requesting a quotation with Renovation Contractor SG. Our master contractor is ready to discuss your project!`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                        </>
                      ) : null}

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Notes & Timestamp */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    {/* Follow-up Notes */}
                    <div className="flex-1">
                      {editingNotesId === lead.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            placeholder="Add notes e.g. Customer wants 4-room HDB quote..."
                            className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveNotes(lead.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-white text-black font-bold text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2 py-1.5 rounded-lg text-zinc-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setNotesDraft(lead.notes || "");
                          }}
                          className="cursor-pointer text-zinc-400 hover:text-zinc-200 group flex items-center gap-2"
                        >
                          <span className="text-zinc-600 font-semibold">Notes:</span>
                          <span className={lead.notes ? "text-zinc-300" : "italic text-zinc-600"}>
                            {lead.notes || "Click to add internal follow-up notes..."}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>Received: {new Date(lead.created_at).toLocaleString()}</span>
                      <span className="text-zinc-700">·</span>
                      <span className="text-zinc-400 font-mono text-[10px]">ID #{lead.id}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
