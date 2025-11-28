import * as React from 'react';
import ReportService from '../services/reportService';

// Polling hook with manual controls
export function useReportPolling({ id, interval = 1000, autoStart = false }) {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    const intervalRef = React.useRef(null);
    const timeoutRef = React.useRef(null);
    const ctrlRef = React.useRef(null);
    const runningRef = React.useRef(false);

    const fetchOnce = React.useCallback(async () => {
        if (!id) return; // don't call if data/id doesn't exist
        ctrlRef.current?.abort();
        const ctrl = new AbortController();
        ctrlRef.current = ctrl;

        try {
            const res = await ReportService.getOne(id, { skipLoader: true, signal: ctrl.signal });
            setData(res?.data ?? null);
        } catch (e) {
            if (e.name !== 'AbortError') setError(e);
            stop();
        }
    }, [id]);

    const start = React.useCallback((delayMs = 0) => {
        if (!id || runningRef.current) return;
        runningRef.current = true;

        const kick = async () => {
            await fetchOnce();
            intervalRef.current = setInterval(fetchOnce, interval);
        };

        if (delayMs > 0) {
            timeoutRef.current = setTimeout(kick, delayMs);
        } else {
            kick();
        }
    }, [id, interval, fetchOnce]);

    const stop = React.useCallback(() => {
        runningRef.current = false;
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        intervalRef.current = null;
        timeoutRef.current = null;
        ctrlRef.current?.abort();
    }, []);

    const refetch = React.useCallback(() => fetchOnce(), [fetchOnce]);

    // One-off fetch after a delay (doesn't start polling)
    const triggerAfter = React.useCallback((delayMs) => {
        if (!id) return;
        setTimeout(() => { if (!runningRef.current) fetchOnce(); }, delayMs);
    }, [id, fetchOnce]);

    // optional auto-start
    React.useEffect(() => {
        if (autoStart) start();
        return stop;
    }, [autoStart, start, stop]);

    // if id changes mid-run, restart polling
    React.useEffect(() => {
        if (!runningRef.current) return;
        stop(); start();
    }, [id, start, stop]);

    return { data, error, isRunning: runningRef.current, start, stop, refetch, triggerAfter };
}
