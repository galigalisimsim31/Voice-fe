import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // default to dark
  });

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

    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
};
