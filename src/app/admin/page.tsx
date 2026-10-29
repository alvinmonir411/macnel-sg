"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Inbox,
  Image as ImageIcon,
  Settings,
  Upload,
  Link as LinkIcon,
  RefreshCw,
  Trash2,
  Check,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  RotateCcw,
  Search,
  Filter,
  Clock,
  MapPin,
  User,
  Mail,
  ChevronDown,
  Save,
  ArrowRight,
  Database,
  Cloud,
  Download,
  Plus,
  Briefcase,
  DollarSign,
  Star,
  Code2,
  FileText,
  Sliders,
  CheckSquare,
  X,
  Play,
  Film,
  Layers,
  ChevronRight,
  Menu,
} from "lucide-react";

// Types
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

interface ImageSlot {
  id: string;
  category: string;
  pagePath?: string;
  pageTitle?: string;
  sectionName?: string;
  label: string;
  description: string;
  paths: string[];
  defaultUrl: string;
  currentUrl: string;
  isCustomized: boolean;
}

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  propertyType: string;
  location: string;
  sizeSqft: string;
  costRange: string;
  durationDays: string;
  beforeImage: string;
  afterImage: string;
  summary: string;
  description: string;
}

interface SiteSettings {
  contact: {
    whatsapp: string;
    phonePrimary: string;
    phoneSecondary: string;
    email: string;
    address: string;
    operatingHours: string;
  };
  credentials: {
    uen: string;
    hdbLicense: string;
    bcaLicense: string;
    bizSafe: string;
    yearsInBusiness: string;
  };
  marketing: {
    gtmId: string;
    gtmEnabled: boolean;
    ga4Id: string;
    ga4Enabled: boolean;
    metaPixelId: string;
    metaPixelEnabled: boolean;
  };
  ai: {
    botName: string;
    botSubtitle: string;
    welcomeMessageEn: string;
    welcomeMessageBn: string;
    geminiApiKey: string;
  };
  security: {
    adminPin: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    whatsapp: "6581704063",
    phonePrimary: "+65 8653 1076",
    phoneSecondary: "+65 8170 4063",
    email: "contact@renovationcontractorsg.org",
    address: "101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511",
    operatingHours: "Monday to Saturday: 9:00 AM – 6:30 PM",
  },
  credentials: {
    uen: "202402481G",
    hdbLicense: "HDB Registered Directory HB-00-0000X",
    bcaLicense: "BCA Registered Contractor (CR06 / General Builder)",
    bizSafe: "bizSAFE Level 3 Certified",
    yearsInBusiness: "12",
  },
  marketing: {
    gtmId: "",
    gtmEnabled: false,
    ga4Id: "",
    ga4Enabled: false,
    metaPixelId: "",
    metaPixelEnabled: false,
  },
  ai: {
    botName: "Renovation Contractor SG",
    botSubtitle: "AI assistant · replies instantly",
    welcomeMessageEn: "Hi! Welcome to Renovation Contractor SG. How can we help you today?",
    welcomeMessageBn: "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন।",
    geminiApiKey: "",
  },
  security: {
    adminPin: "13663",
  },
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "inquiries" | "images" | "projects" | "pricing" | "reviews" | "settings"
  >("overview");

  // Sidebar toggle for mobile/compact
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [pricingData, setPricingData] = useState<any>({});
  const [reviewsData, setReviewsData] = useState<any>({});
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // UI helpers
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [globalSearch, setGlobalSearch] = useState<string>("");

  // Filter states
  const [bookingFilter, setBookingFilter] = useState<string>("all");
  const [bookingSearch, setBookingSearch] = useState<string>("");
  const [imageCategory, setImageCategory] = useState<string>("all");
  const [uploadingSlotId, setUploadingSlotId] = useState<string | null>(null);
  const [urlInputMap, setUrlInputMap] = useState<Record<string, string>>({});
  const [customPath, setCustomPath] = useState<string>("");
  const [customUrl, setCustomUrl] = useState<string>("");

  // Modals
  const [showNewBookingModal, setShowNewBookingModal] = useState<boolean>(false);
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    serviceName: "House Renovation",
    propertyType: "HDB 4-Room",
    inspectionDate: "",
    timeSlot: "10:00 AM – 11:00 AM",
    postalCode: "",
    unitNumber: "",
    notes: "",
  });

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadSlot, setActiveUploadSlot] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // 1. Check Authentication on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchAllData();
        }
      } catch (e) {
        console.error("Auth check failed:", e);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch all data from Neon DB, Cloudinary & Settings
  const fetchAllData = async () => {
    setRefreshing(true);
    try {
      const [bookingsRes, inquiriesRes, settingsRes, imagesRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/inquiries"),
        fetch("/api/admin/settings"),
        fetch("/api/admin/images"),
      ]);

      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        setBookings(data.bookings || []);
      }
      if (inquiriesRes.ok) {
        const data = await inquiriesRes.json();
        setInquiries(data.inquiries || []);
      }
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (data.settings) {
          setSettings({
            contact: { ...DEFAULT_SETTINGS.contact, ...(data.settings.contact || {}) },
            credentials: { ...DEFAULT_SETTINGS.credentials, ...(data.settings.credentials || {}) },
            marketing: { ...DEFAULT_SETTINGS.marketing, ...(data.settings.marketing || {}) },
            ai: { ...DEFAULT_SETTINGS.ai, ...(data.settings.ai || {}) },
            security: { ...DEFAULT_SETTINGS.security, ...(data.settings.security || {}) },
          });
        }
        if (data.projects) setProjects(data.projects);
        if (data.pricing) setPricingData(data.pricing);
        if (data.reviews) setReviewsData(data.reviews);
      }
      if (imagesRes.ok) {
        const data = await imagesRes.json();
        setImageSlots(data.slots || []);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // 3. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", pin: pinInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchAllData();
        showToast("Welcome! Enterprise Dashboard Connected to Neon PostgreSQL & Cloudinary.");
      } else {
        setPinError(data.error || "Incorrect PIN. Please try again.");
      }
    } catch {
      setPinError("Connection error while authenticating.");
    }
  };

  // 4. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      setIsAuthenticated(false);
      setPinInput("");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // 5. Update Booking Status (Neon DB)
  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus as any } : b))
        );
        showToast(`Booking ${id} status set to "${newStatus}".`);
      } else {
        showToast("Failed to update status in database.");
      }
    } catch {
      showToast("Network error updating booking.");
    }
  };

  // 6. Delete Booking (Neon DB)
  const handleDeleteBooking = async (id: string) => {
    if (!confirm(`Are you sure you want to permanently delete booking ${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        showToast(`Booking ${id} deleted.`);
      }
    } catch {
      showToast("Error deleting booking.");
    }
  };

  // 7. Create New Booking Manually (Neon DB)
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.clientName || !newBooking.clientPhone) {
      showToast("Please enter client name and phone number.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: newBooking.clientName,
          clientPhone: newBooking.clientPhone,
          clientEmail: newBooking.clientEmail,
          selectedService: newBooking.serviceName,
          serviceName: newBooking.serviceName,
          propertyType: newBooking.propertyType,
          selectedDate: newBooking.inspectionDate,
          selectedSlot: newBooking.timeSlot,
          postalCode: newBooking.postalCode,
          unitNumber: newBooking.unitNumber,
          additionalNotes: newBooking.notes,
        }),
      });

      if (res.ok) {
        showToast("New booking created and recorded in Neon DB!");
        setShowNewBookingModal(false);
        setNewBooking({
          clientName: "",
          clientPhone: "",
          clientEmail: "",
          serviceName: "House Renovation",
          propertyType: "HDB 4-Room",
          inspectionDate: "",
          timeSlot: "10:00 AM – 11:00 AM",
          postalCode: "",
          unitNumber: "",
          notes: "",
        });
        fetchAllData();
      } else {
        const d = await res.json();
        showToast(d.error || "Failed to create booking.");
      }
    } catch {
      showToast("Network error creating booking.");
    }
  };

  // 8. Delete Inquiry (Neon DB)
  const handleDeleteInquiry = async (id: number) => {
    if (!confirm(`Permanently remove inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        showToast(`Inquiry #${id} deleted.`);
      }
    } catch {
      showToast("Error deleting inquiry.");
    }
  };

  // 9. Media & Cloudinary Upload
  const triggerFileUpload = (slotId: string) => {
    setActiveUploadSlot(slotId);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadSlot) return;

    setUploadingSlotId(activeUploadSlot);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slotId", activeUploadSlot);

    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setImageSlots((prev) =>
          prev.map((s) =>
            s.id === activeUploadSlot
              ? { ...s, currentUrl: data.url, isCustomized: true }
              : s
          )
        );
        showToast(data.message || "Media uploaded and published live!");
      } else {
        showToast(data.error || "Upload failed.");
      }
    } catch {
      showToast("Network error uploading media.");
    } finally {
      setUploadingSlotId(null);
      setActiveUploadSlot(null);
    }
  };

  // 10. Update Image via URL
  const handleUpdateImageViaUrl = async (slotId: string) => {
    const newUrl = urlInputMap[slotId]?.trim();
    if (!newUrl) {
      showToast("Please enter an image or video URL.");
      return;
    }

    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_slot", slotId, newUrl }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setImageSlots((prev) =>
          prev.map((s) =>
            s.id === slotId ? { ...s, currentUrl: newUrl, isCustomized: true } : s
          )
        );
        setUrlInputMap((prev) => ({ ...prev, [slotId]: "" }));
        showToast(data.message || "Asset URL updated successfully!");
      } else {
        showToast(data.error || "Failed to update URL.");
      }
    } catch {
      showToast("Error updating URL.");
    }
  };

  // 11. Reset Image Slot
  const handleResetImage = async (slotId: string) => {
    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_slot", slotId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setImageSlots((prev) =>
          prev.map((s) =>
            s.id === slotId
              ? { ...s, currentUrl: data.currentUrl || s.defaultUrl, isCustomized: false }
              : s
          )
        );
        showToast(data.message || "Reverted to default media.");
      }
    } catch {
      showToast("Error resetting slot.");
    }
  };

  // 12. Save Settings to Neon DB & JSON
  const handleSaveSettings = async (category: string, data: any) => {
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, data }),
      });
      const resData = await res.json();
      if (res.ok) {
        showToast(`${category.toUpperCase()} saved to Neon DB & Live Site!`);
      } else {
        showToast(resData.error || "Failed to save settings.");
      }
    } catch {
      showToast("Network error saving settings.");
    }
  };

  // 13. Save Edited Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const updatedProjects = projects.map((p) =>
      p.id === editingProject.id ? editingProject : p
    );
    setProjects(updatedProjects);
    await handleSaveSettings("projects", updatedProjects);
    setEditingProject(null);
    showToast(`Project "${editingProject.title}" saved successfully!`);
  };

  // 14. Export Bookings to CSV
  const exportBookingsToCSV = () => {
    if (bookings.length === 0) {
      showToast("No bookings to export.");
      return;
    }
    const headers = [
      "Booking ID",
      "Client Name",
      "Phone",
      "Email",
      "Service",
      "Property",
      "Date",
      "Time Slot",
      "Postal",
      "Status",
      "Created At",
    ];
    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${b.client_name}"`,
      `"${b.client_phone}"`,
      `"${b.client_email || ""}"`,
      `"${b.service_name}"`,
      `"${b.property_type || ""}"`,
      `"${b.inspection_date || ""}"`,
      `"${b.time_slot || ""}"`,
      `"${b.postal_code || ""}"`,
      `"${b.status}"`,
      `"${new Date(b.created_at).toLocaleString()}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings-macnel-sg-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Bookings exported to CSV successfully!");
  };

  // 15. Export Inquiries to CSV
  const exportInquiriesToCSV = () => {
    if (inquiries.length === 0) {
      showToast("No inquiries to export.");
      return;
    }
    const headers = ["ID", "Name", "Phone", "Email", "Service", "Property", "Budget", "Message", "Date"];
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email || ""}"`,
      `"${i.service || ""}"`,
      `"${i.property_type || ""}"`,
      `"${i.estimated_budget || ""}"`,
      `"${(i.message || "").replace(/"/g, '""')}"`,
      `"${new Date(i.created_at).toLocaleString()}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiries-macnel-sg-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Inquiries exported to CSV successfully!");
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesFilter = bookingFilter === "all" || b.status === bookingFilter;
      const q = (bookingSearch || globalSearch).toLowerCase();
      const matchesSearch =
        !q ||
        b.client_name?.toLowerCase().includes(q) ||
        b.client_phone?.toLowerCase().includes(q) ||
        b.id?.toLowerCase().includes(q) ||
        b.service_name?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [bookings, bookingFilter, bookingSearch, globalSearch]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    const q = globalSearch.toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.phone.toLowerCase().includes(q) ||
        i.service?.toLowerCase().includes(q) ||
        i.message?.toLowerCase().includes(q)
    );
  }, [inquiries, globalSearch]);

  // Filtered Image Slots
  const filteredImageSlots = useMemo(() => {
    let list = imageSlots;
    if (imageCategory !== "all") {
      list = list.filter((s) => s.category === imageCategory);
    }
    const q = globalSearch.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.pageTitle && s.pageTitle.toLowerCase().includes(q)) ||
          (s.sectionName && s.sectionName.toLowerCase().includes(q)) ||
          (s.pagePath && s.pagePath.toLowerCase().includes(q)) ||
          s.paths.some((p) => p.toLowerCase().includes(q))
      );
    }
    return list;
  }, [imageSlots, imageCategory, globalSearch]);

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-[#070D18] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0D1829] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#8CCB6B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#162740] border border-[#8CCB6B]/40 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8CCB6B]/10">
              <Building2 className="w-8 h-8 text-[#8CCB6B]" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Enterprise Suite</h1>
            <p className="text-xs text-slate-400 mt-1">
              Renovation Contractor SG · Executive CMS
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Enter Master Security PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 5-digit PIN..."
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08101E] border border-slate-700 text-white placeholder-slate-500 font-mono text-center tracking-widest text-lg focus:outline-none focus:border-[#8CCB6B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8CCB6B] to-[#5ea13d] hover:brightness-110 text-[#071306] font-extrabold text-sm shadow-lg shadow-[#8CCB6B]/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Neon PostgreSQL Active</span>
              </span>
              <span className="text-slate-500 font-mono">PIN: 13663</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ENTERPRISE SUITE LAYOUT
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#060C16] text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/mp4,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F1E33] border border-[#8CCB6B] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#8CCB6B] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. ENTERPRISE SIDEBAR */}
      {/* ========================================================= */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } shrink-0 bg-[#091222] border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 z-30 sticky top-0 h-screen`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between gap-3">
            <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#14263E] border border-[#8CCB6B]/40 flex items-center justify-center text-[#8CCB6B] shrink-0 shadow-md shadow-[#8CCB6B]/15">
                <Building2 className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h1 className="font-black text-sm tracking-tight text-white whitespace-nowrap">
                    Macnel Builder
                  </h1>
                  <p className="text-[10px] text-[#8CCB6B] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                    <span>Direct Contractor</span>
                    <span className="w-1 h-1 rounded-full bg-[#8CCB6B]" />
                    <span>SG</span>
                  </p>
                </div>
              )}
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {[
              { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
              { id: "services", label: "Services (Edit Images & Text)", icon: Layers, href: "/admin/services", badge: "8" },
              { id: "bookings", label: "Bookings", badge: bookings.length, icon: Calendar },
              { id: "inquiries", label: "Leads & Inquiries", badge: inquiries.length, icon: Inbox },
              { id: "images", label: "Visual Image Manager (All Pages)", badge: `${imageSlots.length}`, icon: ImageIcon },
              { id: "projects", label: "Portfolio Projects", badge: projects.length, icon: Briefcase, href: "/admin/projects" },
              { id: "pricing", label: "Pricing & Trade Rates", icon: DollarSign },
              { id: "reviews", label: "Customer Reviews", icon: Star },
              { id: "settings", label: "Master Settings & SEO", icon: Settings },
            ].map((tab: any) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              if (tab.href) {
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-slate-300 hover:text-white hover:bg-slate-800/50 border border-emerald-500/20 bg-emerald-950/20 group"
                    title={tab.label}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-[#8CCB6B] group-hover:scale-110 transition-transform" />
                    {sidebarOpen && (
                      <span className="flex-1 text-left truncate text-emerald-300 font-extrabold">{tab.label}</span>
                    )}
                    {sidebarOpen && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#8CCB6B] border border-emerald-500/30">
                        {tab.badge || "Edit"}
                      </span>
                    )}
                  </Link>
                );
              }
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#14263E] to-[#0E1D33] text-white border border-[#8CCB6B]/40 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                  title={tab.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#8CCB6B]" : "text-slate-400"}`} />
                  {sidebarOpen && (
                    <span className="flex-1 text-left truncate">{tab.label}</span>
                  )}
                  {sidebarOpen && tab.badge !== undefined && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        active
                          ? "bg-[#8CCB6B] text-[#071306]"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* System Health Indicators */}
          {sidebarOpen && (
            <div className="p-4 mx-3 mb-3 bg-[#08111E] border border-slate-800/80 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Neon Database</span>
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Cloud className="w-3.5 h-3.5 text-sky-400" />
                  <span>Cloudinary CDN</span>
                </span>
                <span className="text-sky-400 font-bold">Active</span>
              </div>
            </div>
          )}

          {/* User Profile Footer */}
          <div className="p-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0">
                AD
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">Administrator</p>
                  <p className="text-[10px] text-slate-400 font-mono">PIN: 13663</p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. TOPBAR & MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="border-b border-slate-800/80 bg-[#091222]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Global Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Global search bookings, leads, projects, images..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#060C16] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8CCB6B] transition-colors"
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowNewBookingModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8CCB6B] to-[#5ea13d] hover:brightness-110 text-[#071306] text-xs font-black shadow-md shadow-[#8CCB6B]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Booking</span>
              </button>

              <button
                onClick={fetchAllData}
                disabled={refreshing}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Sync from Database"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#8CCB6B]" : ""}`} />
              </button>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
          {/* ========================================================= */}
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Executive Dashboard</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete management of bookings, media assets, projects, and marketing credentials.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportBookingsToCSV}
                    className="px-3.5 py-2 rounded-xl bg-[#091222] border border-slate-700 hover:border-slate-600 text-xs font-bold text-slate-300 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8CCB6B]" />
                    <span>Export Bookings</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("images")}
                    className="px-3.5 py-2 rounded-xl bg-[#14263E] border border-[#8CCB6B]/40 hover:border-[#8CCB6B] text-xs font-bold text-[#8CCB6B] flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Media</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
                    <Calendar className="w-4 h-4 text-[#8CCB6B]" />
                  </div>
                  <p className="text-3xl font-black text-white">{bookings.length}</p>
                  <p className="text-[11px] text-emerald-400 mt-1 font-medium">Synced with Neon DB</p>
                </div>

                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-3xl font-black text-amber-400">
                    {bookings.filter((b) => b.status === "confirmed" || b.status === "in-progress").length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Pending inspection / in-progress</p>
                </div>

                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Website Inquiries</span>
                    <Inbox className="w-4 h-4 text-sky-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{inquiries.length}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Quote request submissions</p>
                </div>

                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Managed Media</span>
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-3xl font-black text-purple-300">{imageSlots.length} Slots</p>
                  <p className="text-[11px] text-slate-400 mt-1">Cloudinary CDN active</p>
                </div>
              </div>

              {/* Recent Bookings & Quick Actions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings (2 Cols) */}
                <div className="lg:col-span-2 bg-[#091222] border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Recent Customer Consultations</h3>
                      <p className="text-xs text-slate-400">Direct bookings from Singapore homeowners</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-xs font-bold text-[#8CCB6B] hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-sm">
                      No customer bookings yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 4).map((b) => (
                        <div
                          key={b.id}
                          className="bg-[#060C16] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#8CCB6B] bg-[#8CCB6B]/10 px-2 py-0.5 rounded-md border border-[#8CCB6B]/20">
                                {b.id}
                              </span>
                              <span className="font-bold text-sm text-white">{b.client_name}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-slate-800 text-slate-300">
                                {b.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300">
                              {b.service_name} {b.property_type && `· ${b.property_type}`}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Date: {b.inspection_date || "TBD"} · {b.time_slot || "Anytime"}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${b.client_phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${b.client_phone}`}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick CMS Hub (1 Col) */}
                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white">Direct Management Hub</h3>
                  <p className="text-xs text-slate-400">
                    Jump to any section to edit content, media, or pricing:
                  </p>

                  <div className="space-y-2 pt-2">
                    {[
                      {
                        label: "Manage Services (Photos & Text)",
                        desc: "Edit titles, images, descriptions & specs",
                        href: "/admin/services",
                        icon: Layers,
                        color: "text-emerald-400",
                      },
                      {
                        label: "Change Hero Photos & Video",
                        desc: "Banner background & video loop",
                        tab: "images",
                        icon: ImageIcon,
                        color: "text-emerald-400",
                      },
                      {
                        label: "Edit Portfolio Projects & Featured",
                        desc: "Before/After photos & homepage slider",
                        href: "/admin/projects",
                        icon: Briefcase,
                        color: "text-sky-400",
                      },
                      {
                        label: "Update Trade Pricing",
                        desc: "Indicative packages & scope",
                        tab: "pricing",
                        icon: DollarSign,
                        color: "text-amber-400",
                      },
                      {
                        label: "Company Contact & Licenses",
                        desc: "UEN, WhatsApp, office showroom",
                        tab: "settings",
                        icon: Settings,
                        color: "text-purple-400",
                      },
                    ].map((item: any, idx) => {
                      const Icon = item.icon;
                      if (item.href) {
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className="w-full p-3 rounded-2xl bg-[#060C16] border border-emerald-500/30 hover:border-emerald-500/70 text-left flex items-center justify-between gap-3 group transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <Icon className={`w-4 h-4 ${item.color}`} />
                              </div>
                              <div>
                                <p className="font-bold text-xs text-white group-hover:text-[#8CCB6B] transition-colors">
                                  {item.label}
                                </p>
                                <p className="text-[11px] text-slate-400">{item.desc}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveTab(item.tab as any)}
                          className="w-full p-3 rounded-2xl bg-[#060C16] border border-slate-800/80 hover:border-slate-700 text-left flex items-center justify-between gap-3 group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0">
                              <Icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div>
                              <p className="font-bold text-xs text-white group-hover:text-[#8CCB6B] transition-colors">
                                {item.label}
                              </p>
                              <p className="text-[11px] text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: BOOKINGS (Neon DB) */}
          {/* ========================================================= */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Client Consultation Bookings</h2>
                  <p className="text-xs text-slate-400">
                    Live client reservations recorded in Neon PostgreSQL
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowNewBookingModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#8CCB6B] hover:brightness-110 text-[#071306] text-xs font-black flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Booking</span>
                  </button>

                  <button
                    onClick={exportBookingsToCSV}
                    className="px-3.5 py-2 rounded-xl bg-[#091222] border border-slate-700 hover:border-slate-600 text-xs font-bold text-slate-300 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8CCB6B]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#091222] border border-slate-800 rounded-2xl p-3">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {["all", "confirmed", "in-progress", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                        bookingFilter === st
                          ? "bg-[#8CCB6B] text-[#071306]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st} ({st === "all" ? bookings.length : bookings.filter((b) => b.status === st).length})
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search by client name, phone..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#060C16] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              {/* Bookings List */}
              {filteredBookings.length === 0 ? (
                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-sm">
                  No bookings found matching current filters.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#091222] border border-slate-800 rounded-3xl p-6 shadow-sm hover:border-slate-700 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-black text-[#8CCB6B] bg-[#8CCB6B]/10 px-2.5 py-1 rounded-lg border border-[#8CCB6B]/20">
                            {b.id}
                          </span>
                          <div>
                            <h3 className="font-bold text-base text-white">{b.client_name}</h3>
                            <p className="text-xs text-slate-400">{b.client_phone} · {b.client_email || "No email"}</p>
                          </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Status:</span>
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className="bg-[#060C16] border border-slate-700 text-xs font-bold text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#8CCB6B]"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500 block">Service</span>
                          <span className="font-bold text-slate-200">{b.service_name}</span>
                          {b.service_detail && <span className="text-slate-400 block text-[11px]">{b.service_detail}</span>}
                        </div>

                        <div>
                          <span className="text-slate-500 block">Property Type</span>
                          <span className="font-bold text-slate-200">{b.property_type || "N/A"}</span>
                          {b.property_size && <span className="text-slate-400 block text-[11px]">{b.property_size}</span>}
                        </div>

                        <div>
                          <span className="text-slate-500 block">Site Inspection</span>
                          <span className="font-bold text-emerald-400">{b.inspection_date || "To Be Scheduled"}</span>
                          <span className="text-slate-400 block text-[11px]">{b.time_slot || "Anytime"}</span>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Postal & Unit</span>
                          <span className="font-bold text-slate-200">
                            {b.postal_code ? `SG ${b.postal_code}` : "Not given"}
                          </span>
                          {b.unit_number && <span className="text-slate-400 block text-[11px]">#{b.unit_number}</span>}
                        </div>
                      </div>

                      {b.notes && (
                        <div className="bg-[#060C16] rounded-xl p-3 text-xs text-slate-300 border border-slate-800">
                          <span className="font-bold text-slate-400">Homeowner Note: </span>
                          {b.notes}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-slate-500">
                          Booked: {new Date(b.created_at).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${b.client_phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${b.client_name}, this is Renovation Contractor SG regarding your site inspection for ${b.service_name}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>
                          <a
                            href={`tel:${b.client_phone}`}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Booking"
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

          {/* ========================================================= */}
          {/* TAB 3: INQUIRIES & LEADS */}
          {/* ========================================================= */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Direct Quote Inquiries</h2>
                  <p className="text-xs text-slate-400">
                    Lead submissions from the website contact and calculator forms
                  </p>
                </div>

                <button
                  onClick={exportInquiriesToCSV}
                  className="px-3.5 py-2 rounded-xl bg-[#091222] border border-slate-700 hover:border-slate-600 text-xs font-bold text-slate-300 flex items-center gap-1.5 self-start md:self-auto"
                >
                  <Download className="w-3.5 h-3.5 text-[#8CCB6B]" />
                  <span>Export Inquiries CSV</span>
                </button>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-sm">
                  No inquiries found.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-[#091222] border border-slate-800 rounded-3xl p-6 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <h3 className="font-bold text-base text-white">{inq.name}</h3>
                          <p className="text-xs text-slate-400">
                            {inq.phone} {inq.email && `· ${inq.email}`}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${inq.name}, thank you for contacting Renovation Contractor SG regarding your quotation.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${inq.phone}`}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block">Service</span>
                          <span className="font-bold text-slate-200">{inq.service || "General Turnkey"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Property Type</span>
                          <span className="font-bold text-slate-200">{inq.property_type || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Estimated Budget</span>
                          <span className="font-bold text-[#8CCB6B]">{inq.estimated_budget || "Not specified"}</span>
                        </div>
                      </div>

                      {inq.message && (
                        <div className="bg-[#060C16] rounded-xl p-3 text-xs text-slate-300 border border-slate-800">
                          <span className="font-bold text-slate-400">Message: </span>
                          {inq.message}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-500">
                        Received: {new Date(inq.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: VISUAL IMAGE MANAGER ACROSS ALL PAGES */}
          {/* ========================================================= */}
          {activeTab === "images" && (
            <div className="space-y-6">
              {/* Top Banner & Stats */}
              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#8CCB6B]" />
                      <span>Instant 1-Click Photo Swapper</span>
                    </div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                      <ImageIcon className="w-7 h-7 text-[#8CCB6B]" />
                      <span>Website Photo &amp; Media Manager</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                      Change ANY image across House Renovation, Toilet Renovation, Tiling, Carpentry, Ceilings, Electrical, Painting, Doors, Flooring, and Homepage. Select a page or search by name to find and upload immediately.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#060C16] border border-slate-800 px-4 py-3 rounded-2xl shrink-0">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Total Indexed Photos</p>
                      <p className="text-xl font-black text-[#8CCB6B]">{imageSlots.length} Visuals</p>
                    </div>
                    <div className="w-px h-8 bg-slate-800" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Live Custom Uploads</p>
                      <p className="text-xl font-black text-emerald-400">
                        {imageSlots.filter((s) => s.isCustomized).length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant In-Tab Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Search any photo, phase, section, or page (e.g. 'phase 1', 'toilet', 'demolition', 'waterproof', 'kitchen', 'hero')..."
                    className="w-full pl-11 pr-24 py-3 rounded-2xl bg-[#060C16] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#8CCB6B] shadow-inner"
                  />
                  {globalSearch && (
                    <button
                      type="button"
                      onClick={() => setGlobalSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Interactive Page Selector Filter Bar */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-[#8CCB6B]" />
                      <span>Filter by Specific Page:</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      Showing <strong className="text-white">{filteredImageSlots.length}</strong> of {imageSlots.length} photos
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: "all", label: "🌟 All Website Photos", count: imageSlots.length },
                      { id: "house-renovation", label: "🏠 House Renovation (/house-renovation)", count: imageSlots.filter((s) => s.category === "house-renovation").length },
                      { id: "toilet-renovation", label: "🚿 Toilet Renovation (/toilet-renovation-in-singapore)", count: imageSlots.filter((s) => s.category === "toilet-renovation").length },
                      { id: "tiling", label: "🧱 Tiling Works (/tiling-works)", count: imageSlots.filter((s) => s.category === "tiling").length },
                      { id: "carpentry", label: "🪚 Carpentry Services (/carpentry-services)", count: imageSlots.filter((s) => s.category === "carpentry").length },
                      { id: "false-ceiling", label: "🪜 False Ceiling (/false-ceiling)", count: imageSlots.filter((s) => s.category === "false-ceiling").length },
                      { id: "electrical", label: "💡 Electrical Rewiring (/electrical-works-rewiring)", count: imageSlots.filter((s) => s.category === "electrical").length },
                      { id: "painting", label: "🎨 Painting & Plastering (/house-painting-plastering)", count: imageSlots.filter((s) => s.category === "painting").length },
                      { id: "doors-windows", label: "🚪 Doors & Windows (/door-window-services)", count: imageSlots.filter((s) => s.category === "doors-windows").length },
                      { id: "flooring", label: "🪵 Flooring & Carpet (/flooring-carpet-services)", count: imageSlots.filter((s) => s.category === "flooring").length },
                      { id: "hero", label: "🚀 Homepage & Hero Banners", count: imageSlots.filter((s) => s.category === "hero").length },
                      { id: "team", label: "👥 About Us & Team", count: imageSlots.filter((s) => s.category === "team").length },
                      { id: "projects", label: "📸 Projects (Before / After)", count: imageSlots.filter((s) => s.category === "projects").length },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setImageCategory(c.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          imageCategory === c.id
                            ? "bg-[#8CCB6B] text-[#071306] shadow-md shadow-[#8CCB6B]/20 scale-[1.02]"
                            : "bg-[#060C16] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        <span>{c.label}</span>
                        {c.count > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                              imageCategory === c.id
                                ? "bg-black/20 text-[#071306]"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {c.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Asset Cards Grid */}
              {filteredImageSlots.length === 0 ? (
                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-base font-bold text-white">No photos found matching &ldquo;{globalSearch}&rdquo;</p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Try searching for terms like &ldquo;phase&rdquo;, &ldquo;demolition&rdquo;, &ldquo;tiling&rdquo;, &ldquo;toilet&rdquo;, &ldquo;carpentry&rdquo;, or reset the page category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setGlobalSearch("");
                      setImageCategory("all");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#8CCB6B] text-black text-xs font-bold hover:brightness-110"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredImageSlots.map((slot) => {
                    const isUploading = uploadingSlotId === slot.id;
                    const urlInput = urlInputMap[slot.id] || "";
                    const isVideo = slot.id === "hero_video" || slot.currentUrl.includes(".mp4");

                    return (
                      <div
                        key={slot.id}
                        className="bg-[#091222] border border-slate-800 rounded-3xl overflow-hidden shadow-md hover:border-slate-700 transition-all flex flex-col group"
                      >
                        {/* Page & Section Breadcrumb Header */}
                        <div className="px-5 py-3.5 bg-[#060C16] border-b border-slate-800/80 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
                            <span className="text-xs font-black text-white truncate">
                              {slot.pageTitle || "Page"}
                            </span>
                            {slot.sectionName && (
                              <>
                                <span className="text-slate-600 text-xs">·</span>
                                <span className="text-[11px] font-bold text-[#8CCB6B] truncate">
                                  {slot.sectionName}
                                </span>
                              </>
                            )}
                          </div>

                          {slot.pagePath && (
                            <a
                              href={slot.pagePath}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 shrink-0 bg-sky-950/40 hover:bg-sky-900/40 px-2 py-0.5 rounded-lg border border-sky-800/40 transition-colors"
                              title={`Open live page: ${slot.pagePath}`}
                            >
                              <span>View Page</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        {/* Media Preview Box */}
                        <div className="relative aspect-[16/10] bg-[#03070E] overflow-hidden group">
                          {isVideo ? (
                            <video
                              src={slot.currentUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={slot.currentUrl}
                              alt={slot.label}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as any).src = slot.defaultUrl;
                              }}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                          {/* Category & Status Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#8CCB6B] px-2.5 py-1 rounded-full border border-white/10">
                              {slot.category}
                            </span>
                            {slot.isCustomized ? (
                              <span className="text-[10px] font-black bg-emerald-500 text-black px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Live Custom</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium bg-slate-900/80 text-slate-300 px-2.5 py-0.5 rounded-full border border-white/10">
                                Default Image
                              </span>
                            )}
                          </div>

                          {/* Zoom / Full Preview Link */}
                          <a
                            href={slot.currentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Open Full Image"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Controls Box */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="font-extrabold text-sm text-white leading-snug">{slot.label}</h3>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{slot.description}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-1.5 truncate">
                              Path: {slot.paths[0]}
                            </p>
                          </div>

                          {/* Upload & URL Buttons */}
                          <div className="space-y-2 pt-2 border-t border-slate-800">
                            <button
                              type="button"
                              onClick={() => triggerFileUpload(slot.id)}
                              disabled={isUploading}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#14263E] hover:bg-[#1A3150] text-[#8CCB6B] border border-[#8CCB6B]/30 hover:border-[#8CCB6B] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                              {isUploading ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  <span>Uploading Asset...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4" />
                                  <span>{isVideo ? "Upload New Video (.mp4)" : "📁 Upload New Photo from PC"}</span>
                                </>
                              )}
                            </button>

                            {/* URL Paste Input */}
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                value={urlInput}
                                onChange={(e) =>
                                  setUrlInputMap((prev) => ({ ...prev, [slot.id]: e.target.value }))
                                }
                                placeholder={isVideo ? "Paste MP4 URL..." : "Paste Cloudinary or Image URL..."}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#060C16] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8CCB6B]"
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateImageViaUrl(slot.id)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                              >
                                Save
                              </button>
                            </div>

                            {slot.isCustomized && (
                              <button
                                type="button"
                                onClick={() => handleResetImage(slot.id)}
                                className="w-full text-center text-[11px] text-slate-400 hover:text-rose-300 transition-colors flex items-center justify-center gap-1 pt-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Reset to Original Default Photo</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Advanced Custom Path Mapper */}
              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Advanced Path Mapping</h3>
                    <p className="text-xs text-slate-400">
                      Override any image on the site by path (e.g. <code className="text-[#8CCB6B]">/images/carpentry/2.jpeg</code>) to a new Cloudinary asset.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!customPath.trim() || !customUrl.trim()) {
                      showToast("Please enter path and URL.");
                      return;
                    }
                    try {
                      const res = await fetch("/api/admin/images", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          action: "custom_path",
                          customPath: customPath.trim(),
                          newUrl: customUrl.trim(),
                        }),
                      });
                      if (res.ok) {
                        showToast(`Path ${customPath} successfully mapped!`);
                        setCustomPath("");
                        setCustomUrl("");
                        fetchAllData();
                      }
                    } catch {
                      showToast("Error saving mapping.");
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2"
                >
                  <input
                    type="text"
                    value={customPath}
                    onChange={(e) => setCustomPath(e.target.value)}
                    placeholder="Local Path (e.g. /images/tiling/13.jpeg)"
                    className="sm:col-span-5 px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8CCB6B]"
                  />
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="New Cloudinary URL (https://res.cloudinary.com/...)"
                    className="sm:col-span-5 px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8CCB6B]"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-2 py-2.5 px-4 rounded-xl bg-[#8CCB6B] hover:brightness-110 text-[#071306] font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply Override</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: PORTFOLIO & PROJECTS CMS */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Portfolio Projects CMS</h2>
                  <p className="text-xs text-slate-400">
                    Edit project case studies, before/after images, locations, and indicative budgets.
                  </p>
                </div>
              </div>

              {projects.length === 0 ? (
                <div className="bg-[#091222] border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-sm">
                  Loading projects from database...
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#091222] border border-slate-800 rounded-3xl overflow-hidden p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Before / After Preview Strip */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Before</span>
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-slate-800">
                              <img
                                src={proj.beforeImage}
                                alt="Before"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#8CCB6B] uppercase">After</span>
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-slate-800">
                              <img
                                src={proj.afterImage}
                                alt="After"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8CCB6B] bg-[#8CCB6B]/10 px-2 py-0.5 rounded">
                            {proj.category}
                          </span>
                          <h3 className="font-extrabold text-base text-white mt-1.5">{proj.title}</h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Location</span>
                            <span className="font-bold text-slate-200">{proj.location}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Cost</span>
                            <span className="font-bold text-[#8CCB6B]">{proj.costRange}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Duration</span>
                            <span className="font-bold text-slate-200">{proj.durationDays}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="px-4 py-2 rounded-xl bg-[#14263E] hover:bg-[#1A3150] text-[#8CCB6B] border border-[#8CCB6B]/30 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Edit Project Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: PRICING GUIDE */}
          {/* ========================================================= */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Indicative Renovation Pricing</h2>
                  <p className="text-xs text-slate-400">
                    Edit rates displayed on the website cost guides.
                  </p>
                </div>

                <button
                  onClick={() => handleSaveSettings("pricing", pricingData)}
                  className="px-6 py-2.5 rounded-xl bg-[#8CCB6B] hover:brightness-110 text-[#071306] font-extrabold text-xs shadow-lg shadow-[#8CCB6B]/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Pricing to DB</span>
                </button>
              </div>

              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <label className="text-slate-300 font-bold text-xs block mb-1.5">
                    Global Pricing Disclaimer Note
                  </label>
                  <input
                    type="text"
                    value={pricingData.disclaimer || ""}
                    onChange={(e) => setPricingData({ ...pricingData, disclaimer: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>

                {Array.isArray(pricingData.categories) &&
                  pricingData.categories.map((cat: any, catIdx: number) => (
                    <div key={catIdx} className="bg-[#060C16] border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <input
                          type="text"
                          value={cat.categoryName}
                          onChange={(e) => {
                            const newCats = [...pricingData.categories];
                            newCats[catIdx].categoryName = e.target.value;
                            setPricingData({ ...pricingData, categories: newCats });
                          }}
                          className="font-bold text-base bg-transparent text-white focus:outline-none border-b border-transparent focus:border-[#8CCB6B]"
                        />
                        <span className="text-xs text-slate-400 font-mono">Category #{catIdx + 1}</span>
                      </div>

                      <div className="space-y-3">
                        {Array.isArray(cat.items) &&
                          cat.items.map((item: any, itemIdx: number) => (
                            <div
                              key={itemIdx}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#091222] rounded-xl border border-slate-800/80 text-xs"
                            >
                              <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold block">Scope</label>
                                <input
                                  type="text"
                                  value={item.scope}
                                  onChange={(e) => {
                                    const newCats = [...pricingData.categories];
                                    newCats[catIdx].items[itemIdx].scope = e.target.value;
                                    setPricingData({ ...pricingData, categories: newCats });
                                  }}
                                  className="w-full bg-transparent font-medium text-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold block">Typical Cost</label>
                                <input
                                  type="text"
                                  value={item.typicalRange}
                                  onChange={(e) => {
                                    const newCats = [...pricingData.categories];
                                    newCats[catIdx].items[itemIdx].typicalRange = e.target.value;
                                    setPricingData({ ...pricingData, categories: newCats });
                                  }}
                                  className="w-full bg-transparent font-bold text-[#8CCB6B] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold block">Timeline</label>
                                <input
                                  type="text"
                                  value={item.timeline}
                                  onChange={(e) => {
                                    const newCats = [...pricingData.categories];
                                    newCats[catIdx].items[itemIdx].timeline = e.target.value;
                                    setPricingData({ ...pricingData, categories: newCats });
                                  }}
                                  className="w-full bg-transparent text-slate-300 focus:outline-none"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: CUSTOMER REVIEWS */}
          {/* ========================================================= */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Client Reviews & Testimonials</h2>
                  <p className="text-xs text-slate-400">Manage verified homeowner reviews displayed on the site.</p>
                </div>

                <button
                  onClick={() => handleSaveSettings("reviews", reviewsData)}
                  className="px-6 py-2.5 rounded-xl bg-[#8CCB6B] hover:brightness-110 text-[#071306] font-extrabold text-xs shadow-lg shadow-[#8CCB6B]/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Reviews to DB</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(reviewsData.reviews) &&
                  reviewsData.reviews.map((rev: any, idx: number) => (
                    <div key={idx} className="bg-[#091222] border border-slate-800 rounded-3xl p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={rev.customerName}
                          onChange={(e) => {
                            const newRevs = [...reviewsData.reviews];
                            newRevs[idx].customerName = e.target.value;
                            setReviewsData({ ...reviewsData, reviews: newRevs });
                          }}
                          className="font-bold text-sm bg-transparent text-white border-b border-transparent focus:border-[#8CCB6B] focus:outline-none"
                        />
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star key={starIdx} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <input
                        type="text"
                        value={rev.propertyTypeArea}
                        onChange={(e) => {
                          const newRevs = [...reviewsData.reviews];
                          newRevs[idx].propertyTypeArea = e.target.value;
                          setReviewsData({ ...reviewsData, reviews: newRevs });
                        }}
                        placeholder="Property location (e.g. 4-Room BTO, Tampines)"
                        className="text-xs text-slate-400 w-full bg-transparent border-b border-transparent focus:border-slate-700 focus:outline-none"
                      />

                      <textarea
                        value={rev.reviewText}
                        onChange={(e) => {
                          const newRevs = [...reviewsData.reviews];
                          newRevs[idx].reviewText = e.target.value;
                          setReviewsData({ ...reviewsData, reviews: newRevs });
                        }}
                        rows={3}
                        className="w-full p-3 rounded-xl bg-[#060C16] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#8CCB6B]"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: MASTER SETTINGS & SEO */}
          {/* ========================================================= */}
          {activeTab === "settings" && (
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">Master Website & Company Settings</h2>
                  <p className="text-xs text-slate-400">
                    Legal credentials, contact numbers, tracking codes, and AI bot settings.
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleSaveSettings("contact", settings.contact);
                    handleSaveSettings("credentials", settings.credentials);
                    handleSaveSettings("marketing", settings.marketing);
                    handleSaveSettings("ai", settings.ai);
                    handleSaveSettings("security", settings.security);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#8CCB6B] hover:brightness-110 text-[#071306] font-extrabold text-xs shadow-lg shadow-[#8CCB6B]/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>

              {/* 1. Contact Info */}
              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8CCB6B]" />
                  <span>Company Contact & Showroom</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">WhatsApp Direct (e.g. 6581704063)</label>
                    <input
                      type="text"
                      value={settings.contact.whatsapp}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Email Address</label>
                    <input
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Primary Call Line</label>
                    <input
                      type="text"
                      value={settings.contact.phonePrimary}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, phonePrimary: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Secondary Line</label>
                    <input
                      type="text"
                      value={settings.contact.phoneSecondary}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, phoneSecondary: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1.5 font-bold">Showroom & Office Address</label>
                    <input
                      type="text"
                      value={settings.contact.address}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, address: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Legal Credentials */}
              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Legal Licenses & Accreditation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">ACRA UEN Number</label>
                    <input
                      type="text"
                      value={settings.credentials.uen}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          credentials: { ...settings.credentials, uen: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">HDB Directory Registration</label>
                    <input
                      type="text"
                      value={settings.credentials.hdbLicense}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          credentials: { ...settings.credentials, hdbLicense: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">BCA Contractor License</label>
                    <input
                      type="text"
                      value={settings.credentials.bcaLicense}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          credentials: { ...settings.credentials, bcaLicense: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">bizSAFE Certification</label>
                    <input
                      type="text"
                      value={settings.credentials.bizSafe}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          credentials: { ...settings.credentials, bizSafe: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Marketing & Tracking Pixels */}
              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Marketing, GA4 & Pixel Tracking</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Google Tag Manager (GTM ID)</label>
                    <input
                      type="text"
                      value={settings.marketing.gtmId}
                      placeholder="GTM-XXXXXXX"
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          marketing: { ...settings.marketing, gtmId: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Google Analytics (GA4 Measurement ID)</label>
                    <input
                      type="text"
                      value={settings.marketing.ga4Id}
                      placeholder="G-XXXXXXXXXX"
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          marketing: { ...settings.marketing, ga4Id: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Meta (Facebook) Pixel ID</label>
                    <input
                      type="text"
                      value={settings.marketing.metaPixelId}
                      placeholder="123456789012345"
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          marketing: { ...settings.marketing, metaPixelId: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Admin Master PIN</label>
                    <input
                      type="text"
                      value={settings.security.adminPin}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, adminPin: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white font-mono focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>
                </div>
              </div>

              {/* 4. AI Assistant */}
              <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Google Gemini AI Assistant</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Assistant Display Name</label>
                    <input
                      type="text"
                      value={settings.ai.botName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ai: { ...settings.ai, botName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-bold">Google Gemini API Key</label>
                    <input
                      type="password"
                      value={settings.ai.geminiApiKey}
                      placeholder="AIzaSy... (optional, smart rules active by default)"
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ai: { ...settings.ai, geminiApiKey: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1.5 font-bold">Welcome Message (English)</label>
                    <input
                      type="text"
                      value={settings.ai.welcomeMessageEn}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ai: { ...settings.ai, welcomeMessageEn: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    handleSaveSettings("contact", settings.contact);
                    handleSaveSettings("credentials", settings.credentials);
                    handleSaveSettings("marketing", settings.marketing);
                    handleSaveSettings("ai", settings.ai);
                    handleSaveSettings("security", settings.security);
                  }}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#8CCB6B] to-[#5ea13d] hover:brightness-110 text-[#071306] font-extrabold text-sm shadow-xl shadow-[#8CCB6B]/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings to Neon Database</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD NEW BOOKING MANUALLY */}
      {/* ========================================================= */}
      {showNewBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0D1829] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white">Create Direct Booking</h3>
              <button
                onClick={() => setShowNewBookingModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newBooking.clientName}
                  onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                  placeholder="e.g. Kelvin Tan"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Client Phone (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    value={newBooking.clientPhone}
                    onChange={(e) => setNewBooking({ ...newBooking, clientPhone: e.target.value })}
                    placeholder="+65 9123 4567"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Client Email (Optional)</label>
                  <input
                    type="email"
                    value={newBooking.clientEmail}
                    onChange={(e) => setNewBooking({ ...newBooking, clientEmail: e.target.value })}
                    placeholder="client@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Service</label>
                  <select
                    value={newBooking.serviceName}
                    onChange={(e) => setNewBooking({ ...newBooking, serviceName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  >
                    <option value="House Renovation">House Renovation</option>
                    <option value="Toilet Renovation">Toilet Renovation</option>
                    <option value="Tiling Works">Tiling Works</option>
                    <option value="Custom Carpentry">Custom Carpentry</option>
                    <option value="False Ceiling">False Ceiling</option>
                    <option value="Painting & Plastering">Painting & Plastering</option>
                    <option value="Door & Window Services">Door & Window</option>
                    <option value="Flooring & Vinyl">Flooring & Vinyl</option>
                    <option value="Electrical Works">Electrical Works</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Property Type</label>
                  <input
                    type="text"
                    value={newBooking.propertyType}
                    onChange={(e) => setNewBooking({ ...newBooking, propertyType: e.target.value })}
                    placeholder="e.g. 4-Room BTO / Condo"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Inspection Date</label>
                  <input
                    type="date"
                    value={newBooking.inspectionDate}
                    onChange={(e) => setNewBooking({ ...newBooking, inspectionDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newBooking.timeSlot}
                    onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                    placeholder="10:00 AM – 11:00 AM"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={newBooking.postalCode}
                    onChange={(e) => setNewBooking({ ...newBooking, postalCode: e.target.value })}
                    placeholder="e.g. 520123"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Unit Number</label>
                  <input
                    type="text"
                    value={newBooking.unitNumber}
                    onChange={(e) => setNewBooking({ ...newBooking, unitNumber: e.target.value })}
                    placeholder="#12-34"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Client Notes</label>
                <textarea
                  rows={2}
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                  placeholder="Additional renovation requests or preferences..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewBookingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#8CCB6B] text-[#071306] font-black hover:brightness-110"
                >
                  Confirm &amp; Record Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: EDIT PROJECT CMS MODAL */}
      {/* ========================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0D1829] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white">Edit Portfolio Project</h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Cost Range</label>
                  <input
                    type="text"
                    value={editingProject.costRange}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, costRange: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingProject.durationDays}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, durationDays: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Before Photo URL</label>
                  <input
                    type="text"
                    value={editingProject.beforeImage}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, beforeImage: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-[#060C16] border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">After Photo URL</label>
                  <input
                    type="text"
                    value={editingProject.afterImage}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, afterImage: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-[#060C16] border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-[#8CCB6B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Summary / Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-[#060C16] border border-slate-700 text-white focus:outline-none focus:border-[#8CCB6B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#8CCB6B] text-[#071306] font-black hover:brightness-110"
                >
                  Save Project Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
