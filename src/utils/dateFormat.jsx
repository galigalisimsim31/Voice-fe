import { format, differenceInDays, differenceInCalendarDays, startOfDay, subDays, subWeeks, subMonths, addDays } from 'date-fns';

export const formatDate = (dateStr, formatStr = "dd MMM, yyyy") => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return format(date, formatStr);
};

export const getDaysDiff = (targetDateStr) => {
    if (!targetDateStr) return "";

    const today = startOfDay(new Date());
    const targetDate = startOfDay(new Date(targetDateStr));

    const diff = differenceInCalendarDays(targetDate, today);

    if (diff < 0) return `${Math.abs(diff)} Day${Math.abs(diff) !== 1 ? 's' : ''} ago`;
    if (diff === 0) return "Today";
    return `${diff} Day${diff > 1 ? 's' : ''} to Go`;
};

export const getStartAndEndDate = (expireValue) => {
    const endDate = new Date(); // usually today
    let startDate = endDate;

    if (expireValue.toLowerCase().includes('month')) {
        const months = parseInt(expireValue);
        startDate = subMonths(endDate, months);
    } else if (expireValue.toLowerCase().includes('week')) {
        const weeks = parseInt(expireValue);
        startDate = subWeeks(endDate, weeks);
    } else if (expireValue.toLowerCase().includes('day')) {
        const days = parseInt(expireValue);
        startDate = subDays(endDate, days);
    }

    return {
        sDate: format(startDate, 'yyyy-MM-dd'),
        eDate: format(endDate, 'yyyy-MM-dd'),
    };
};

export const getDaysRestore = (targetDateStr, windowDays = 15) => {
    if (!targetDateStr) return "";
    const del = startOfDay(new Date(targetDateStr));

    const deadline = addDays(del, windowDays);
    const today = startOfDay(new Date());

    const diff = differenceInCalendarDays(deadline, today);

    if (diff < 0) return `${Math.abs(diff)} Day${Math.abs(diff) !== 1 ? 's' : ''} ago`;
    if (diff === 0) return "Today";
    return `${diff} Day${diff > 1 ? 's' : ''}`;
};