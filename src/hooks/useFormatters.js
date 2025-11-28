// hooks/useFormatters.ts
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const selectSettings = (s) => s.settings?.data ?? {};

export function useFormatters() {
  const { dateFormat = 'dd MMM, yyyy', timeFormat = 'hh:mm a' } =
    useSelector(selectSettings);

  const api = useMemo(() => {
    const formatDate = (dateStr, fmt = dateFormat) => {
      if (!dateStr) return '';
      return format(new Date(dateStr), fmt);
    };

    const formatTime = (dateStr) => {
      if (!dateStr) return '';
      return format(new Date(dateStr), timeFormat);
    };

    const formatDateTime = (dateStr) => {
      if (!dateStr) return '';
      return format(new Date(dateStr), `${dateFormat} ${timeFormat}`);
    };

    return {
      formatDate,
      formatTime,
      formatDateTime,
    };
  }, [dateFormat, timeFormat]);

  return api;
}
