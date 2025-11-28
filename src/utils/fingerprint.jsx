export async function getSoftFingerprint() {
  const nav = navigator || {};
  const scr = window.screen || {};
  const tz  = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const langs = Array.isArray(nav.languages) ? nav.languages.join(",") : (nav.language || "");

  const payload = [
    nav.userAgent || "",
    nav.platform || "",
    nav.vendor || "",
    langs,
    tz,
    nav.hardwareConcurrency || 0,
    nav.deviceMemory || 0,          // not supported everywhere
    nav.maxTouchPoints || 0,
    scr.width || 0,
    scr.height || 0,
    scr.colorDepth || 0,
    window.devicePixelRatio || 1,
  ].join("||");

  const enc = new TextEncoder().encode(payload);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  return hex; // 64-char hex
}
