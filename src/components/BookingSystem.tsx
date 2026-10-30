"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Building,
  Home,
  Store,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Droplets,
  Paintbrush,
  Grid3X3,
  Lightbulb,
  Zap,
  Hammer,
  Layers,
  Check,
  Download,
  CalendarCheck,
  DoorOpen,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  duration: string;
  badge?: string;
  icon: React.ReactNode;
  specificQuestions: {
    label: string;
    options: string[];
  };
}

export function BookingSystem({ customContact }: { customContact?: any } = {}) {
  const { contact: contextContact } = useSiteSettings();
  const contact = { ...siteConfig.contact, ...(customContact || {}), ...(contextContact || {}) };
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);

  // Step 1: Service
  const [selectedService, setSelectedService] = useState<string>(
    "house-renovation"
  );
  const [serviceDetail, setServiceDetail] = useState<string>("HDB BTO Whole Unit Transformation");

  // Step 2: Property
  const [propertyType, setPropertyType] = useState<string>("Condominium");
  const [propertySize, setPropertySize] = useState<string>("3-Bedroom (900-1200 sqft)");
  const [timeline, setTimeline] = useState<string>("Within 1-2 weeks");

  // Step 3: Date & Slot
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM – 11:30 AM");

  // Step 4: Contact
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  // Step 5: Confirmation Reference
  const [bookingId, setBookingId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Services Catalog for Advanced Engine (Core 8 Renovation Trades)
  const services: ServiceOption[] = [
    {
      id: "house-renovation",
      name: "House Renovation",
      category: "Turnkey Package",
      duration: "60 min consultation",
      badge: "Full Turnkey",
      icon: <Home className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "Key focus of the whole house renovation:",
        options: [
          "HDB BTO Whole Unit Transformation",
          "HDB Resale Full Gut Overhaul",
          "Condominium Modernization & Joinery",
          "Landed Multi-Storey Renovation",
        ],
      },
    },
    {
      id: "tiling-services",
      name: "Floor & Wall Tiling Services",
      category: "Masonry & Wet Trade",
      duration: "45 min inspection",
      badge: "BCA Certified",
      icon: <Grid3X3 className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "Where are the tiles to be laid?",
        options: [
          "Living room & Bedrooms (600x1200 Slabs)",
          "Bathroom floor & walls (Anti-slip)",
          "Kitchen floor & wall backsplash",
          "Balcony anti-slip & outdoor patio tiles",
        ],
      },
    },
    {
      id: "door-window",
      name: "Door & Window Services",
      category: "BCA Approved Installers",
      duration: "30 min measurement",
      badge: "BCA Approved",
      icon: <DoorOpen className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "What door or window works are needed?",
        options: [
          "Aluminium sliding & casement window replacement",
          "Soundproof acoustic double glazing (-42dB)",
          "Fire-rated main entrance timber door & gate",
          "Trackless toilet bi-fold / slide & swing doors",
        ],
      },
    },
    {
      id: "false-ceiling-partition",
      name: "False Ceiling & Partition",
      category: "Interior Architecture",
      duration: "30 min consultation",
      badge: "Saint-Gobain",
      icon: <Lightbulb className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "Type of false ceiling or partition design:",
        options: [
          "L-box perimeter with cove lights & pelmets",
          "Full flat drop ceiling with recessed LED spots",
          "Acoustic drywall room partition divider",
          "Curtain pelmet & aircon duct concealment",
        ],
      },
    },
    {
      id: "painting-services",
      name: "Painting Services",
      category: "Nippon Paint Specialist",
      duration: "30 min measurement",
      badge: "Nippon Paint",
      icon: <Paintbrush className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "What scope of painting do you require?",
        options: [
          "Whole house (Walls + Ceilings) 3-coat system",
          "Nippon Odourless / Medifresh anti-bacterial",
          "Interior walls only",
          "Exterior facade / Balcony painting",
        ],
      },
    },
    {
      id: "plastering-services",
      name: "Plastering Services",
      category: "Surface Preparation",
      duration: "30 min inspection",
      badge: "Skim Coat",
      icon: <Hammer className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "Scope of plastering / skim coating needed:",
        options: [
          "Whole house fine skim coating & wall leveling",
          "Hairline crack bridging & mesh repair",
          "Patching post-electrical conduit hacking",
          "Ceiling water leak stain plaster repair",
        ],
      },
    },
    {
      id: "flooring-carpet-services",
      name: "Flooring & Carpet Services",
      category: "Surfaces & Flooring",
      duration: "45 min measurement",
      badge: "Bona System",
      icon: <Layers className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "Type of flooring or carpet service:",
        options: [
          "Bona dust-free parquet sanding & varnishing",
          "100% waterproof SPC vinyl click-lock overlay",
          "Commercial nylon acoustic carpet tiles",
          "Natural marble diamond crystallization & polishing",
        ],
      },
    },
    {
      id: "toilet-renovation",
      name: "Toilet & Bathroom Renovation",
      category: "Full Wet Trade",
      duration: "45 min on-site measurement",
      badge: "Signature",
      icon: <Droplets className="w-5 h-5 text-brand-accent" />,
      specificQuestions: {
        label: "How many toilets need renovation?",
        options: [
          "1 Master Bathroom only",
          "1 Common Toilet only",
          "Master + Common (2 Toilets)",
          "Partial repair (Tiling/Waterproofing only)",
        ],
      },
    },
  ];

  // Read URL query parameter "?service=..." and auto-select matching trade
  useEffect(() => {
    const serviceParam = searchParams?.get("service");
    if (!serviceParam) return;

    const param = serviceParam.toLowerCase().trim();

    const aliasMap: Record<string, string> = {
      "house-renovation": "house-renovation",
      "full-house-renovation": "house-renovation",
      "house": "house-renovation",
      "tiling-services": "tiling-services",
      "tiling-works": "tiling-services",
      "tiling": "tiling-services",
      "door-window": "door-window",
      "door-window-services": "door-window",
      "false-ceiling": "false-ceiling-partition",
      "false-ceiling-partition": "false-ceiling-partition",
      "painting-services": "painting-services",
      "house-painting": "painting-services",
      "painting": "painting-services",
      "plastering-services": "plastering-services",
      "plastering": "plastering-services",
      "flooring-carpet-services": "flooring-carpet-services",
      "flooring": "flooring-carpet-services",
      "toilet-renovation": "toilet-renovation",
      "toilet-renovation-in-singapore": "toilet-renovation",
    };

    const targetId = aliasMap[param] || param;
    const match = services.find(
      (s) => s.id === targetId || s.id.includes(targetId) || targetId.includes(s.id)
    );

    if (match) {
      setSelectedService(match.id);
      if (match.specificQuestions.options.length > 0) {
        setServiceDetail(match.specificQuestions.options[0]);
      }
    }
  }, [searchParams]);

  const [availableDates, setAvailableDates] = useState<
    Array<{ iso: string; dayName: string; monthDay: string; fullDate: string }>
  >([]);

  // Generate 14-day date list on client mount
  useEffect(() => {
    const list = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) {
        const iso = d.toISOString().split("T")[0];
        const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
        const monthDay = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        list.push({ iso, dayName, monthDay, fullDate: d.toDateString() });
      }
    }
    setAvailableDates(list);
    if (list.length > 0) {
      setSelectedDate(list[0].iso);
    }
  }, []);

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  const timeSlots = [
    { time: "09:30 AM – 10:30 AM", period: "Morning", badge: "Fastest" },
    { time: "11:00 AM – 12:00 PM", period: "Morning", badge: "Popular" },
    { time: "01:30 PM – 02:30 PM", period: "Afternoon", badge: "Available" },
    { time: "03:00 PM – 04:00 PM", period: "Afternoon", badge: "Available" },
    { time: "04:30 PM – 05:30 PM", period: "Late Afternoon", badge: "Available" },
  ];

  // Fetch slot availability from Neon DB whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;
    let isCancelled = false;
    setIsLoadingSlots(true);

    fetch(`/api/bookings/availability?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.bookedSlots) {
          setBookedSlots(data.bookedSlots);
          // If currently selected slot is already booked, pick first free slot
          if (data.bookedSlots.includes(selectedSlot)) {
            const firstFree = timeSlots.find(
              (s) => !data.bookedSlots.includes(s.time)
            );
            if (firstFree) {
              setSelectedSlot(firstFree.time);
            }
          }
        }
      })
      .catch((err) => console.error("Error loading availability:", err))
      .finally(() => {
        if (!isCancelled) setIsLoadingSlots(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedDate]);

  const currentServiceObj = services.find((s) => s.id === selectedService) || services[0];

  const handleNextStep = async () => {
    if (step === 4) {
      // Validate step 4
      if (!clientName.trim() || !clientPhone.trim()) {
        alert("Please enter your name and contact number.");
        return;
      }
      setIsSubmitting(true);
      // Generate ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generated = `MC-SG-${randomNum}`;
      setBookingId(generated);

      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: generated,
            clientName,
            clientPhone,
            clientEmail,
            selectedService,
            serviceName: currentServiceObj.name,
            serviceDetail,
            propertyType,
            propertySize,
            timeline,
            selectedDate,
            selectedSlot,
            postalCode,
            unitNumber,
            additionalNotes,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "This time slot is already reserved. Please select another available slot.");
          // Refresh booked slots and return to step 3
          fetch(`/api/bookings/availability?date=${selectedDate}`)
            .then((r) => r.json())
            .then((d) => d.bookedSlots && setBookedSlots(d.bookedSlots));
          setStep(3);
          return;
        }

        setStep(5);
      } catch (err) {
        console.error("Failed to persist booking to Neon database:", err);
        setStep(5);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Generate WhatsApp confirmation string
  const getWhatsAppMessage = () => {
    const text = `*New Site Inspection Booking [${bookingId}]*%0A%0A` +
      `*Client:* ${encodeURIComponent(clientName)}%0A` +
      `*Contact:* ${encodeURIComponent(clientPhone)}%0A` +
      `*Service:* ${encodeURIComponent(currentServiceObj.name)}%0A` +
      `*Scope:* ${encodeURIComponent(serviceDetail)}%0A` +
      `*Property:* ${encodeURIComponent(propertyType)} (${encodeURIComponent(propertySize)})%0A` +
      `*Timeline:* ${encodeURIComponent(timeline)}%0A` +
      `*Inspection Date:* ${encodeURIComponent(selectedDate)}%0A` +
      `*Time Slot:* ${encodeURIComponent(selectedSlot)}%0A` +
      `*Postal Code:* ${encodeURIComponent(postalCode || "N/A")}%0A` +
      `*Unit:* ${encodeURIComponent(unitNumber || "N/A")}%0A` +
      `*Remarks:* ${encodeURIComponent(additionalNotes || "N/A")}%0A%0A` +
      `Please confirm site engineer assignment.`;
    return `https://wa.me/${contact.whatsapp}?text=${text}`;
  };

  // Generate .ics calendar invite file
  const downloadCalendarFile = () => {
    const icsData =
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//${siteConfig.name}//Booking Engine//EN\n` +
      `BEGIN:VEVENT\n` +
      `SUMMARY:${siteConfig.name} On-Site Inspection (${currentServiceObj.name})\n` +
      `DESCRIPTION:Booking ID: ${bookingId}. Site engineer inspection for ${propertyType}. Scope: ${serviceDetail}. Contact: ${contact.phonePrimary}\n` +
      `LOCATION:Singapore ${postalCode} ${unitNumber}\n` +
      `STATUS:CONFIRMED\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Renovation-Contractor-SG-Booking-${bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Step Progress Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 brand-gradient -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {[
            { num: 1, title: "Service" },
            { num: 2, title: "Property" },
            { num: 3, title: "Schedule" },
            { num: 4, title: "Details" },
            { num: 5, title: "Confirmed" },
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                  step >= s.num
                    ? "bg-brand-primary text-white scale-105"
                    : "bg-white border-2 border-slate-300 text-slate-500"
                }`}
              >
                {step > s.num ? <Check className="w-5 h-5" /> : s.num}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold mt-2 hidden sm:block ${
                  step >= s.num ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 transition-all">
        {/* =========================================================================
            STEP 1: SERVICE & TRADE SELECTION
            ========================================================================= */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Step 1 of 4 · Service Selection
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                What renovation service do you require?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Select a trade to view customized inspection parameters. Free site visit &amp; quote.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {services.map((item) => {
                const isSelected = selectedService === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setSelectedService(item.id);
                      setServiceDetail(item.specificQuestions.options[0]);
                    }}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary-soft/50 ring-2 ring-brand-primary/20 shadow-md"
                        : "border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-primary text-white"
                          : "bg-white border border-slate-200 text-slate-600"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-500">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-extrabold bg-[#A3E635] text-[#16263F] px-2 py-0.5 rounded-full shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-slate-600 font-medium mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {item.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Service-Specific Micro Question */}
            <div className="p-5 rounded-2xl bg-brand-subtle border border-slate-200/80">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {currentServiceObj.specificQuestions.label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentServiceObj.specificQuestions.options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setServiceDetail(opt)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      serviceDetail === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: PROPERTY TYPE & TIMELINE
            ========================================================================= */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Step 2 of 4 · Property &amp; Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Tell us about your property
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                This helps us assign the right specialized project supervisor.
              </p>
            </div>

            {/* Property Type Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                Property Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "HDB Flat", icon: <Building className="w-4 h-4" /> },
                  { id: "Condominium", icon: <Home className="w-4 h-4" /> },
                  { id: "Landed Property", icon: <Home className="w-4 h-4" /> },
                  { id: "Commercial / Office", icon: <Store className="w-4 h-4" /> },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPropertyType(p.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border font-bold text-xs sm:text-sm transition-all ${
                      propertyType === p.id
                        ? "border-brand-primary bg-brand-primary-soft text-brand-primary shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {p.icon}
                    <span>{p.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Unit Size */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                Approximate Size / Room Type:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  "2-Room / Studio (< 600 sqft)",
                  "3-Room / 2-Bed (600-900 sqft)",
                  "4-Room / 3-Bed (900-1200 sqft)",
                  "5-Room / Executive (> 1200 sqft)",
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setPropertySize(s)}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                      propertySize === s
                        ? "border-brand-primary bg-brand-primary-soft text-brand-primary shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Renovation Urgency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                Preferred Project Timeline:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Immediate / Urgent", desc: "Need site visit within 48 hours" },
                  { title: "Within 1-2 weeks", desc: "Standard planning schedule" },
                  { title: "Planning ahead", desc: "Starting in 1-3 months (Collecting keys)" },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.title}
                    onClick={() => setTimeline(t.title)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      timeline === t.title
                        ? "border-brand-primary bg-brand-primary-soft text-slate-900 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <span className="font-bold text-xs block">{t.title}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: DATE & TIME SLOT PICKER
            ========================================================================= */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Step 3 of 4 · Schedule Appointment
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Pick a date &amp; time that suits you
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Our site engineer will arrive on time with measuring tools and material samples.
              </p>
            </div>

            {/* 14-Day Scrollable Horizontal Calendar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3 flex items-center justify-between">
                <span>Select Inspection Date:</span>
                <span className="text-slate-400 font-normal">Mon – Sat available</span>
              </label>
              <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.iso;
                  return (
                    <button
                      type="button"
                      key={d.iso}
                      onClick={() => setSelectedDate(d.iso)}
                      className={`flex flex-col items-center justify-center min-w-[76px] py-3 px-2 rounded-2xl border text-center transition-all shrink-0 ${
                        isSelected
                          ? "bg-brand-primary text-white border-brand-primary shadow-lg scale-105"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-wider opacity-80 font-medium">
                        {d.dayName}
                      </span>
                      <span className="text-base font-extrabold mt-1">{d.monthDay}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                Select Preferred Time Slot:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot.time);
                  const isSelected = selectedSlot === slot.time && !isBooked;

                  return (
                    <button
                      type="button"
                      key={slot.time}
                      disabled={isBooked}
                      onClick={() => !isBooked && setSelectedSlot(slot.time)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        isBooked
                          ? "border-red-200 bg-red-50/60 text-slate-400 cursor-not-allowed opacity-75"
                          : isSelected
                          ? "border-brand-primary bg-brand-primary-soft text-slate-900 shadow-sm ring-1 ring-brand-primary"
                          : "border-slate-200 bg-white text-slate-700 hover:border-brand-primary/40 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock
                          className={`w-4 h-4 ${
                            isBooked
                              ? "text-red-400"
                              : isSelected
                              ? "text-brand-primary"
                              : "text-slate-400"
                          }`}
                        />
                        <span className={isBooked ? "line-through opacity-70" : ""}>
                          {slot.time}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isBooked
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : isSelected
                            ? "bg-brand-primary text-white"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {isBooked ? "🔴 Booked" : isSelected ? "Selected" : "🟢 Available"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-accent-soft border border-brand-accent-soft flex items-center gap-3 text-xs text-slate-800">
              <ShieldCheck className="w-5 h-5 text-brand-accent-dark shrink-0" />
              <span>
                <strong>100% Free &amp; Zero Obligation:</strong> If you need to reschedule,
                simply reply to our WhatsApp confirmation anytime.
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: CONTACT & SINGAPORE ADDRESS
            ========================================================================= */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Step 4 of 4 · Contact &amp; Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Where should our engineer visit?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We will send you an appointment confirmation SMS and WhatsApp invite.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. David Lim"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +65 9123 4567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address (For Calendar Invite)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. david.lim@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Singapore Postal Code (6 Digits)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 520123"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Unit Number &amp; Block (Optional)
                </label>
                <input
                  type="text"
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  placeholder="e.g. Blk 123 Tampines St 11, #08-45"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Special Notes / Site Issues (Optional)
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Existing water leakage in master toilet ceiling, collecting keys on Friday..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 5: CONFIRMATION & WORLD-CLASS MULTI-CHANNEL RECEIPT
            ========================================================================= */}
        {step === 5 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-400 text-center sm:text-left">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-brand-accent-soft text-brand-accent-dark flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary bg-brand-primary-soft px-3 py-1 rounded-full">
                Booking ID: {bookingId}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                Site Inspection Booked!
              </h2>
              <p className="text-sm text-slate-600">
                Thank you, <strong>{clientName}</strong>! Your appointment has been
                registered in our scheduling dispatch.
              </p>
            </div>

            {/* Summary Ticket Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">
                    Service:
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {currentServiceObj.name}
                  </span>
                  <span className="text-slate-500 text-xs">{serviceDetail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">
                    Property:
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {propertyType}
                  </span>
                  <span className="text-slate-500 text-xs">{propertySize}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">
                    Date &amp; Time:
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {selectedDate}
                  </span>
                  <span className="text-brand-primary font-semibold text-xs">
                    {selectedSlot}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">
                    Location:
                  </span>
                  <span className="font-bold text-slate-900 block">
                    Singapore {postalCode || ""}
                  </span>
                  <span className="text-slate-500 text-xs">{unitNumber || "Address provided"}</span>
                </div>
              </div>
            </div>

            {/* Actions: Instant WhatsApp Dispatch & Calendar Sync */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <a
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Confirm on WhatsApp (Instant Priority)</span>
              </a>

              <button
                type="button"
                onClick={downloadCalendarFile}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-brand-primary" />
                <span>Add to Apple / Google Calendar (.ics)</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setClientName("");
                  setClientPhone("");
                }}
                className="text-xs text-brand-primary font-bold hover:underline"
              >
                &larr; Book another appointment
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons (Steps 1 to 4) */}
        {step < 5 && (
          <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 py-2.5 px-4 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl brand-gradient text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all ml-auto disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <span>
                {isSubmitting
                  ? "Saving to Database..."
                  : step === 4
                  ? "Complete Appointment"
                  : "Continue"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
