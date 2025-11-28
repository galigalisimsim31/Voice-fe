// theme-context.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // apply CSS + persist
  useEffect(() => {
    const themeCss = theme === "dark" ? "light.css" : "light.css";
    const linkId = "theme-style";

    let link = document.getElementById(linkId);
    if (link) {
      link.href = `/themes/${themeCss}`;
    } else {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = `/themes/${themeCss}`;
      document.head.appendChild(link);
    }

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // notify other parts of the app (same tab) if needed
    window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
  }, [theme]);

  // keep in sync across tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "theme" && e.newValue && e.newValue !== theme) {
        setTheme(e.newValue);
      }
    };
    const onCustom = (e) => {
      if (e.detail && e.detail !== theme) setTheme(e.detail);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("theme-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("theme-change", onCustom);
    };
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider />");
  return ctx;
}
