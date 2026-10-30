"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

export interface ContactSettings {
  phonePrimary: string;
  phoneSecondary: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  address: string;
  showroomNote: string;
  googleMapsEmbedUrl: string;
  operatingHours: string;
  quoteTurnaroundHours: number;
}

export interface CredentialsSettings {
  legalName?: string;
  uen?: string;
  bcaLicense?: string;
  hdbLicense?: string;
  bizSafe?: string;
  yearsInBusiness?: string;
}

export interface SiteSettingsState {
  contact: ContactSettings;
  credentials: CredentialsSettings;
  marketing: any;
  ai: any;
}

const defaultState: SiteSettingsState = {
  contact: siteConfig.contact,
  credentials: {
    legalName: siteConfig.legalName,
    uen: siteConfig.uen,
    bcaLicense: siteConfig.bcaLicense,
    hdbLicense: siteConfig.hdbLicense,
    bizSafe: "bizSAFE Level 3 Certified",
    yearsInBusiness: siteConfig.yearsInBusiness,
  },
  marketing: {},
  ai: {},
};

const SiteSettingsContext = createContext<SiteSettingsState>(defaultState);

export function SiteSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: any;
}) {
  const [settings, setSettings] = useState<SiteSettingsState>(() => ({
    contact: {
      ...siteConfig.contact,
      ...(initialSettings?.contact || {}),
    },
    credentials: {
      legalName: initialSettings?.credentials?.legalName || siteConfig.legalName,
      uen: initialSettings?.credentials?.uen || siteConfig.uen,
      bcaLicense: initialSettings?.credentials?.bcaLicense || siteConfig.bcaLicense,
      hdbLicense: initialSettings?.credentials?.hdbLicense !== undefined
        ? initialSettings.credentials.hdbLicense
        : siteConfig.hdbLicense,
      bizSafe: initialSettings?.credentials?.bizSafe || "bizSAFE Level 3 Certified",
      yearsInBusiness: initialSettings?.credentials?.yearsInBusiness || siteConfig.yearsInBusiness,
    },
    marketing: initialSettings?.marketing || {},
    ai: initialSettings?.ai || {},
  }));

  // Update when SSR initialSettings changes
  useEffect(() => {
    if (initialSettings) {
      setSettings((prev) => ({
        contact: {
          ...prev.contact,
          ...(initialSettings.contact || {}),
        },
        credentials: {
          ...prev.credentials,
          ...(initialSettings.credentials || {}),
        },
        marketing: {
          ...prev.marketing,
          ...(initialSettings.marketing || {}),
        },
        ai: {
          ...prev.ai,
          ...(initialSettings.ai || {}),
        },
      }));
    }
  }, [initialSettings]);

  // Real-time listener for client-side cross-tab & admin changes
  useEffect(() => {
    let isMounted = true;

    const fetchLiveSettings = async () => {
      try {
        const res = await fetch(`/api/live-settings?t=${Date.now()}`, {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data?.success && data?.settings) {
          const live = data.settings;
          setSettings((prev) => ({
            contact: {
              ...prev.contact,
              ...(live.contact || {}),
            },
            credentials: {
              ...prev.credentials,
              ...(live.credentials || {}),
            },
            marketing: {
              ...prev.marketing,
              ...(live.marketing || {}),
            },
            ai: {
              ...prev.ai,
              ...(live.ai || {}),
            },
          }));
        }
      } catch {
        // Silently ignore background poll errors
      }
    };

    // Re-check on focus (e.g. user updated setting in admin and returned to public tab)
    window.addEventListener("focus", fetchLiveSettings);

    // Re-check on custom event
    const handleCustomEvent = (e: any) => {
      if (e?.detail) {
        setSettings((prev) => ({
          ...prev,
          ...e.detail,
        }));
      }
      fetchLiveSettings();
    };
    window.addEventListener("site-settings-updated", handleCustomEvent);

    // Re-check on storage event across browser tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "site_settings_updated_at") {
        fetchLiveSettings();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", fetchLiveSettings);
      window.removeEventListener("site-settings-updated", handleCustomEvent);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

