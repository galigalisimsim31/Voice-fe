// useResendTimer.js
import { useEffect, useRef, useState } from "react";

export default function useResendTimer({ key = "otp", cooldown = 60, initialRemaining = 0 } = {}) {
  const storageKey = `resend_end_${key}`;
  const [remaining, setRemaining] = useState(initialRemaining);
  const intervalRef = useRef(null);

  const readEnd = () => {
    const v = localStorage.getItem(storageKey);
    return v ? new Date(v).getTime() : 0;
  };
  const writeEnd = (msTs) => localStorage.setItem(storageKey, new Date(msTs).toISOString());
  const clearEnd = () => localStorage.removeItem(storageKey);

  const tick = () => {
    const end = readEnd();
    const now = Date.now();
    const secs = Math.max(0, Math.ceil((end - now) / 1000));
    setRemaining(secs);
    if (secs === 0) stop();
  };

  const start = (seconds = cooldown) => {
    writeEnd(Date.now() + seconds * 1000);
    setRemaining(seconds);
    run();
  };

  const run = () => {
    stop();
    intervalRef.current = setInterval(tick, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const end = readEnd();
    if (end > Date.now()) {
      setRemaining(Math.ceil((end - Date.now()) / 1000));
      run();
    } else {
      clearEnd();
      setRemaining(0);
    }
    const onStorage = (e) => e.key === storageKey && tick();
    const onVis = () => tick();
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  return {
    remaining,
    isCooling: remaining > 0,
    start,
    reset: () => {
      clearEnd();
      setRemaining(0);
      stop();
    },
  };
}

export const toMMSS = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
