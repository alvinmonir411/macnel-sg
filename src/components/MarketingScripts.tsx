import siteSettingsData from "../../data/siteSettings.json";

export function MarketingHeadScripts({ marketing: customMarketing }: { marketing?: any } = {}) {
  const marketing = customMarketing || (siteSettingsData as any)?.marketing || {};

  const {
    gtmId,
    gtmEnabled,
    ga4Id,
    ga4Enabled,
    metaPixelId,
    metaPixelEnabled,
    tiktokPixelId,
    tiktokPixelEnabled,
    customHeadScripts,
  } = marketing;

  return (
    <>
      {/* 1. Google Tag Manager (Head) */}
      {gtmEnabled && gtmId && gtmId.trim() !== "GTM-WQL9F32Q" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId.trim()}');`,
          }}
        />
      )}

      {/* 2. Google Analytics 4 (GA4) */}
      {ga4Enabled && ga4Id && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id.trim()}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id.trim()}');`,
            }}
          />
        </>
      )}

      {/* 3. Meta (Facebook) Pixel */}
      {metaPixelEnabled && metaPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId.trim()}');
fbq('track', 'PageView');`,
          }}
        />
      )}

      {/* 4. TikTok Pixel */}
      {tiktokPixelEnabled && tiktokPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `!function (w, d, t) {
w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
ttq.load('${tiktokPixelId.trim()}');
ttq.page();
}(window, document, 'ttq');`,
          }}
        />
      )}

      {/* 5. Custom Raw Head Scripts (e.g. Search Console Meta Verification, Hotjar) */}
      {customHeadScripts && (
        <div
          id="custom-head-injection"
          dangerouslySetInnerHTML={{ __html: customHeadScripts }}
        />
      )}
    </>
  );
}

export function MarketingBodyScripts({ marketing: customMarketing }: { marketing?: any } = {}) {
  const marketing = customMarketing || (siteSettingsData as any)?.marketing || {};
  const { gtmId, gtmEnabled, metaPixelId, metaPixelEnabled, customBodyScripts } =
    marketing;

  return (
    <>
      {/* Google Tag Manager (Noscript Body) */}
      {gtmEnabled && gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId.trim()}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}

      {/* Meta Pixel (Noscript Body) */}
      {metaPixelEnabled && metaPixelId && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId.trim()}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}

      {/* Custom Body Scripts (e.g. Live Chat Widgets, WhatsApp conversion) */}
      {customBodyScripts && (
        <div
          id="custom-body-injection"
          dangerouslySetInnerHTML={{ __html: customBodyScripts }}
        />
      )}
    </>
  );
}
