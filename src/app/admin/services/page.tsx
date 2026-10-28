"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
  RefreshCw,
  Search,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  Home,
  Check,
  Grid3X3,
  DoorOpen,
  Lightbulb,
  Paintbrush,
  Hammer,
  Droplets,
} from "lucide-react";
import { ProjectImage } from "@/components/ProjectImage";

interface ServiceItem {
  id: string;
  category: "renovation" | "surfaces" | "walls-ceiling" | "doors" | string;
  title: string;
  badge: string;
  desc: string;
  specs: string[];
  image: string;
  href: string;
  iconName?: string;
}

export default function AdminServicesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
          fetchServices();
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
        fetchServices();
      } else {
        setPinError(data.error || "Incorrect security PIN.");
      }
    } catch {
      setPinError("Authentication request failed.");
    }
  };

  // 2. Fetch services list
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
      showToast("Could not load services data.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 3. Save services list
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Services updated successfully! Website updated in real time.");
      } else {
        showToast(data.error || "Failed to save services.", "error");
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast("Network error while saving services.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Update a single field
  const handleFieldChange = (id: string, field: keyof ServiceItem, value: any) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Spec bullet point handlers
  const handleSpecChange = (id: string, index: number, value: string) => {
    setServices((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newSpecs = [...item.specs];
        newSpecs[index] = value;
        return { ...item, specs: newSpecs };
      })
    );
  };

  const handleAddSpec = (id: string) => {
    setServices((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, specs: [...item.specs, "New service feature or benefit"] };
      })
    );
  };

  const handleRemoveSpec = (id: string, index: number) => {
    setServices((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newSpecs = item.specs.filter((_, i) => i !== index);
        return { ...item, specs: newSpecs };
      })
    );
  };

  // File upload handler (direct image upload via Cloudinary or local)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "services");

    try {
      showToast("Uploading image...", "success");
      const res = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        handleFieldChange(activeUploadId, "image", data.url);
        showToast("Image uploaded and updated!");
      } else {
        // Fallback: create base64 / blob preview if Cloudinary isn't configured
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            handleFieldChange(activeUploadId, "image", reader.result);
            showToast("Local image loaded. Click Save Changes to apply.");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      showToast("Upload failed. You can paste the image URL directly.", "error");
    } finally {
      setActiveUploadId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Filtered view
  const filtered = services.filter((s) => {
    const matchesCategory =
      activeCategory === "all" || s.category === activeCategory;
    const matchesQuery =
      searchQuery === "" ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Login PIN Screen
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-[#070D18] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-[#0B1527] border border-slate-800 p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-[#8CCB6B] border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Services Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Enter your admin PIN to edit service titles, descriptions, and photos.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4 or 6-digit PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-center text-lg tracking-widest focus:outline-none focus:border-[#8CCB6B]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <p className="text-xs font-bold text-rose-400 flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{pinError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Authenticate &amp; Open Services
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 pb-20">
      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border transition-all animate-bounce ${
            toastType === "success"
              ? "bg-[#0A1A12] border-emerald-500/40 text-emerald-300"
              : "bg-[#1F0A0A] border-rose-500/40 text-rose-300"
          }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1527]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              title="Return to Executive Overview"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Services Management
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#8CCB6B]/20 text-[#8CCB6B] border border-[#8CCB6B]/30">
                  {services.length} Services
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Change service titles, badges, descriptions, specs, and photos live.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchServices}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/#services"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 transition-all"
            >
              <span>View On Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#0B1527] border border-slate-800/90 p-4 rounded-2xl">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {[
              { id: "all", label: "All Services" },
              { id: "renovation", label: "House & Toilet" },
              { id: "surfaces", label: "Tiling & Flooring" },
              { id: "walls-ceiling", label: "Ceiling & Walls" },
              { id: "doors", label: "Doors & Windows" },
            ].map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#14263E] text-white border border-[#8CCB6B]/40 shadow-sm"
                    : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service title..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8CCB6B]"
            />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-[#8CCB6B] animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-400">Loading service list...</p>
          </div>
        )}

        {/* Services Editor Grid */}
        {!loading && (
          <div className="space-y-8">
            {filtered.map((service, index) => (
              <div
                key={service.id}
                className="rounded-3xl bg-[#0B1527] border border-slate-800/90 overflow-hidden shadow-xl hover:border-slate-700 transition-all"
              >
                {/* Header Strip */}
                <div className="px-6 py-4 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-[#8CCB6B] border border-emerald-500/20 text-xs font-black flex items-center justify-center shrink-0">
                      #{index + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white truncate">
                      {service.title}
                    </h2>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
                      ID: {service.id}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Category: <span className="text-emerald-400">{service.category}</span>
                  </span>
                </div>

                {/* 2-Column Content: Left = Image & Live Card Preview, Right = Text & Specs Fields */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Image Management & Visual Preview */}
                  <div className="lg:col-span-5 space-y-4">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Service Cover Image
                    </label>

                    {/* Image Preview Box */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                      <ProjectImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Badge Preview */}
                      <div className="absolute top-3 left-3 bg-[#16263F]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                        {service.badge}
                      </div>

                      {/* Overlay action */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveUploadId(service.id);
                            fileInputRef.current?.click();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
                        >
                          <Upload className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Upload Photo</span>
                        </button>
                      </div>
                    </div>

                    {/* Image URL text input */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Image File Path or CDN URL:
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={service.image}
                          onChange={(e) =>
                            handleFieldChange(service.id, "image", e.target.value)
                          }
                          placeholder="/images/... or https://res.cloudinary.com/..."
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#8CCB6B]"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Tip: You can paste any local path (e.g. `/images/house-reno/1.jpeg`) or Cloudinary URL.
                      </p>
                    </div>

                    {/* Quick suggested project images */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Quick Pick Photos:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          "/images/house-reno/1.jpeg",
                          "/images/tiling/2.jpeg",
                          "/images/tiling/13.jpeg",
                          "/images/door-window/1.jpeg",
                          "/images/door-window/4.jpeg",
                          "/images/partition-ceiling/6.jpeg",
                          "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg",
                          "/images/tiling/12.jpeg",
                        ].map((sample, sI) => (
                          <button
                            key={sI}
                            type="button"
                            onClick={() => handleFieldChange(service.id, "image", sample)}
                            className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all ${
                              service.image === sample
                                ? "border-emerald-400 ring-2 ring-emerald-400/40"
                                : "border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100"
                            }`}
                            title={`Select ${sample}`}
                          >
                            <img
                              src={sample}
                              alt="sample"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Text & Content Inputs */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Title & Badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) =>
                            handleFieldChange(service.id, "title", e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-white focus:outline-none focus:border-[#8CCB6B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Promotional Badge
                        </label>
                        <input
                          type="text"
                          value={service.badge}
                          onChange={(e) =>
                            handleFieldChange(service.id, "badge", e.target.value)
                          }
                          placeholder="e.g. Direct Contractor"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-white focus:outline-none focus:border-[#8CCB6B]"
                        />
                      </div>
                    </div>

                    {/* Category & Link Href */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Category Group
                        </label>
                        <select
                          value={service.category}
                          onChange={(e) =>
                            handleFieldChange(service.id, "category", e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#8CCB6B]"
                        >
                          <option value="renovation">House &amp; Toilet Renovation</option>
                          <option value="surfaces">Tiling, Flooring &amp; Carpet</option>
                          <option value="walls-ceiling">Ceiling, Partition &amp; Paint</option>
                          <option value="doors">Door &amp; Window</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Detail Page Link (URL)
                        </label>
                        <input
                          type="text"
                          value={service.href}
                          onChange={(e) =>
                            handleFieldChange(service.id, "href", e.target.value)
                          }
                          placeholder="/house-renovation"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#8CCB6B]"
                        />
                      </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={service.desc}
                        onChange={(e) =>
                          handleFieldChange(service.id, "desc", e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-[#8CCB6B]"
                      />
                    </div>

                    {/* Specification Bullets */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Key Features / Scope Bullets ({service.specs.length})
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddSpec(service.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#8CCB6B] hover:text-emerald-300 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {service.specs.map((spec, specIdx) => (
                          <div key={specIdx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <input
                              type="text"
                              value={spec}
                              onChange={(e) =>
                                handleSpecChange(service.id, specIdx, e.target.value)
                              }
                              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#8CCB6B]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveSpec(service.id, specIdx)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Delete bullet point"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0B1527] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-white">
              Ready to publish changes?
            </h3>
            <p className="text-xs text-slate-400">
              Saving updates both the homepage Services section and dedicated service pages.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all text-center flex-1 sm:flex-initial"
            >
              Back to Dashboard
            </Link>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-initial"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save All Services"}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

