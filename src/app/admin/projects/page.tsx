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
  Star,
  Sparkles,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  Sliders,
  Check,
  ChevronRight,
} from "lucide-react";
import { ProjectImage } from "@/components/ProjectImage";

interface ProjectItem {
  id: string;
  isPlaceholder?: boolean;
  featured?: boolean;
  category: string;
  title: string;
  propertyType?: string;
  location: string;
  sizeSqft?: string;
  durationDays?: string;
  costRange?: string;
  beforeImage: string;
  afterImage: string;
  gallery?: string[];
  summary?: string;
  description?: string;
  scopeOfWork?: string[];
  keyHighlights?: string[];
}

export default function AdminProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "unfeatured">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeUploadTarget, setActiveUploadTarget] = useState<{
    id: string;
    type: "before" | "after";
  } | null>(null);

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
          fetchProjects();
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
        fetchProjects();
      } else {
        setPinError(data.error || "Incorrect security PIN.");
      }
    } catch {
      setPinError("Authentication request failed.");
    }
  };

  // 2. Fetch projects list
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
      showToast("Could not load projects data.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 3. Save projects list
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Projects saved! Homepage slider and Gallery updated.");
      } else {
        showToast(data.error || "Failed to save projects.", "error");
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast("Network error while saving projects.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  // Update a single field
  const handleFieldChange = (id: string, field: keyof ProjectItem, value: any) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Image Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadTarget) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "projects");

    try {
      showToast(`Uploading ${activeUploadTarget.type} image...`, "success");
      const res = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const targetField =
        activeUploadTarget.type === "before" ? "beforeImage" : "afterImage";

      if (data.success && data.url) {
        handleFieldChange(activeUploadTarget.id, targetField, data.url);
        showToast("Image uploaded and updated!");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            handleFieldChange(activeUploadTarget.id, targetField, reader.result);
            showToast("Local preview loaded. Click Save All Projects to apply.");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      showToast("Upload failed. You can paste the URL directly.", "error");
    } finally {
      setActiveUploadTarget(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Filtered view
  const filtered = projects.filter((p) => {
    const matchesFeatured =
      filterFeatured === "all" ||
      (filterFeatured === "featured" && p.featured === true) ||
      (filterFeatured === "unfeatured" && !p.featured);

    const matchesQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFeatured && matchesQuery;
  });

  const featuredCount = projects.filter((p) => p.featured === true).length;

  // Login PIN Screen
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-[#0A0A0A] border border-zinc-800 p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white border border-zinc-700 flex items-center justify-center mx-auto mb-5 shadow-md">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Projects CMS</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6">
            Enter admin PIN to manage project photos and homepage featured status.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 5-digit PIN"
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-zinc-700 text-white text-center text-lg tracking-widest focus:outline-none focus:border-white font-mono"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <p className="text-xs font-bold text-zinc-300 flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-white" />
                <span>{pinError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-sm shadow-lg transition-all cursor-pointer"
            >
              Authenticate &amp; Open Projects
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white"
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
    <div className="min-h-screen bg-[#000000] text-zinc-100 pb-20">
      {/* Hidden file input */}
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
          className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border transition-all bg-zinc-900 border-zinc-700 text-white"
        >
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm"
              title="Return to Executive Overview"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Projects CMS &amp; Featured Slider
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-800 text-white border border-zinc-700">
                  {featuredCount} Featured on Home
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {projects.length} Total
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Toggle &apos;Featured&apos; to show in the homepage slider. All projects appear on the full gallery page.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchProjects}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-white" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/#portfolio"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-2 transition-all"
            >
              <span>Preview on Home</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </Link>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-black shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{saving ? "Saving..." : "Save All Projects"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Info Banner */}
        <div className="mb-8 rounded-2xl bg-[#0E0E0E] border border-zinc-800 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Homepage Featured Slider Logic
              </p>
              <p className="text-xs text-zinc-400">
                Turn ON <span className="text-white font-bold">&quot;Featured on Home&quot;</span> on any project card below. Only those projects will appear in the high-impact homepage Before/After slider. All other projects remain published in the complete <Link href="/project-gallery" target="_blank" className="underline font-bold text-zinc-200 hover:text-white">Project Gallery</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#0E0E0E] border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: `All Projects (${projects.length})` },
              { id: "featured", label: `★ Featured on Home (${featuredCount})` },
              { id: "unfeatured", label: `Gallery Only (${projects.length - featuredCount})` },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setFilterFeatured(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterFeatured === tab.id
                    ? "bg-white text-black font-black shadow-sm"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141414] border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-zinc-400">Loading project list...</p>
          </div>
        )}

        {/* Projects Cards List */}
        {!loading && (
          <div className="space-y-8">
            {filtered.map((proj, idx) => (
              <div
                key={proj.id}
                className={`rounded-3xl bg-[#0E0E0E] border overflow-hidden shadow-xl transition-all ${
                  proj.featured
                    ? "border-zinc-500 shadow-2xl"
                    : "border-zinc-800"
                }`}
              >
                {/* Header bar with Featured Switch */}
                <div className="px-6 py-4 bg-[#141414] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-xs font-black flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white truncate max-w-md">
                      {proj.title}
                    </h2>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {proj.category}
                    </span>
                  </div>

                  {/* FEATURED TOGGLE BUTTON */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(proj.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                        proj.featured
                          ? "bg-white text-black"
                          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          proj.featured
                            ? "fill-black text-black"
                            : "text-zinc-500"
                        }`}
                      />
                      <span>
                        {proj.featured ? "Featured on Home" : "Feature on Home"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2-Column: Left = Before & After Images, Right = Metadata Details */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Before vs After Images */}
                  <div className="lg:col-span-6 space-y-5">
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                      Transformation Photos (Before &amp; After)
                    </label>

                    {/* Side-by-side Before & After Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Before Box */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-zinc-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block" />
                            Before Renovation
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveUploadTarget({ id: proj.id, type: "before" });
                              fileInputRef.current?.click();
                            }}
                            className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                          </button>
                        </div>

                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-zinc-800 group shadow-inner">
                          <ProjectImage
                            src={proj.beforeImage}
                            alt={`${proj.title} Before`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2 left-2 bg-zinc-900/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow border border-zinc-700">
                            BEFORE
                          </div>
                        </div>

                        <input
                          type="text"
                          value={proj.beforeImage}
                          onChange={(e) =>
                            handleFieldChange(proj.id, "beforeImage", e.target.value)
                          }
                          placeholder="/images/projects/..."
                          className="w-full px-3 py-1.5 rounded-xl bg-[#141414] border border-zinc-700 text-[11px] text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-white"
                        />
                      </div>

                      {/* After Box */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-white flex items-center gap-1.5 font-bold">
                            <span className="w-2 h-2 rounded-full bg-white inline-block" />
                            After Handover
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveUploadTarget({ id: proj.id, type: "after" });
                              fileInputRef.current?.click();
                            }}
                            className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                          </button>
                        </div>

                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-zinc-800 group shadow-inner">
                          <ProjectImage
                            src={proj.afterImage}
                            alt={`${proj.title} After`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded shadow">
                            AFTER
                          </div>
                        </div>

                        <input
                          type="text"
                          value={proj.afterImage}
                          onChange={(e) =>
                            handleFieldChange(proj.id, "afterImage", e.target.value)
                          }
                          placeholder="/images/projects/..."
                          className="w-full px-3 py-1.5 rounded-xl bg-[#141414] border border-zinc-700 text-[11px] text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Text Information */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) =>
                          handleFieldChange(proj.id, "title", e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-zinc-700 text-sm font-bold text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    {/* Category & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                          Category
                        </label>
                        <select
                          value={proj.category}
                          onChange={(e) =>
                            handleFieldChange(proj.id, "category", e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-zinc-700 text-xs text-white focus:outline-none focus:border-white"
                        >
                          <option value="House Renovation">House Renovation</option>
                          <option value="Toilet Renovation">Toilet Renovation</option>
                          <option value="Condo Renovation">Condo Renovation</option>
                          <option value="Carpentry">Carpentry</option>
                          <option value="False Ceiling">False Ceiling</option>
                          <option value="Tiling">Tiling</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                          Location / Estate
                        </label>
                        <input
                          type="text"
                          value={proj.location}
                          onChange={(e) =>
                            handleFieldChange(proj.id, "location", e.target.value)
                          }
                          placeholder="e.g. Tampines GreenCourt"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-zinc-700 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    {/* Budget & Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                          Cost Range
                        </label>
                        <input
                          type="text"
                          value={proj.costRange}
                          onChange={(e) =>
                            handleFieldChange(proj.id, "costRange", e.target.value)
                          }
                          placeholder="S$28,000 – S$35,000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-zinc-700 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={proj.durationDays}
                          onChange={(e) =>
                            handleFieldChange(proj.id, "durationDays", e.target.value)
                          }
                          placeholder="38 Days"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-zinc-700 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Case Study Description
                      </label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) =>
                          handleFieldChange(proj.id, "description", e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-zinc-700 text-xs text-zinc-300 leading-relaxed focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0E0E0E] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-white">
              Save Project Changes
            </h3>
            <p className="text-xs text-zinc-400">
              Only projects with &quot;Featured on Home&quot; will be displayed in the homepage slider.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all text-center flex-1 sm:flex-initial"
            >
              Back to Dashboard
            </Link>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-initial"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{saving ? "Saving..." : "Save All Projects"}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
