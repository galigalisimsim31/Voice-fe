import React, { useState, useMemo } from 'react';
import { Button, Popover, Box, Typography, styled } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// --- 1. IMPORTS: Add your specific Start and End icons here ---
// NOTE: Replaced local paths with placeholders to fix compile error.
// You must replace these strings with public URLs to your icons.
import DateIconPng from '../../assets/icons/customdate.svg';
import StartDatePng from '../../assets/icons/date_icon.svg'; // Make sure this file exists
// Make sure this file exists

// --- IMPORTS from date-fns ---
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isBefore,
  subWeeks,
  subYears,
  isValid,
} from 'date-fns';

const DateInputBox = styled(Box)({
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  padding: '8px 12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  marginBottom: '12px',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.2s',
  '&:hover': { borderColor: '#1B9ED9', backgroundColor: '#FAFAFA' },
});

const DayCircle = styled(Box)(({ isSelected }) => ({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '0.75rem',
  fontWeight: 500,
  backgroundColor: isSelected ? '#1F2C5E' : 'transparent',
  color: isSelected ? '#fff' : '#333',
  position: 'relative',
  zIndex: 2,
  '&:hover': {
    backgroundColor: isSelected ? '#1F2C5E' : '#f0f0f0',
  },
}));

const RangeBackground = styled(Box)(({ isRange, isStart, isEnd }) => ({
  backgroundColor: isRange ? 'rgba(31, 44, 94, 0.08)' : 'transparent',
  width: '100%',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  zIndex: 1,

  ...(isStart && {
    borderTopLeftRadius: '14px',
    borderBottomLeftRadius: '14px',
  }),
  ...(isEnd && {
    borderTopRightRadius: '14px',
    borderBottomRightRadius: '14px',
  }),
}));

const CustomDateFilter = ({ onApply }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [tempRange, setTempRange] = useState({ start: null, end: null });
  const [displayDate, setDisplayDate] = useState(new Date());

  const open = Boolean(anchorEl);
  const id = open ? 'custom-date-popover' : undefined;

  // --- Handlers ---
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTempRange(selectedRange);
    if (selectedRange.start) setDisplayDate(selectedRange.start);
  };

  const handleClose = () => setAnchorEl(null);

  const handleApply = () => {
    setSelectedRange(tempRange);
    if (onApply) onApply(tempRange);
    handleClose();
  };

  const handleMonthNav = (direction) => {
    setDisplayDate((prev) =>
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const handleDateClick = (day) => {
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: day, end: null });
    } else if (isBefore(day, tempRange.start)) {
      setTempRange({ start: day, end: null });
    } else {
      setTempRange({ ...tempRange, end: day });
    }
  };

  const handlePreset = (type) => {
    const today = new Date();
    let newStart;
    switch (type) {
      case 'week':
        newStart = subWeeks(today, 1);
        break;
      case 'month':
        newStart = subMonths(today, 1);
        break;
      case 'year':
        newStart = subYears(today, 1);
        break;
      default:
        return;
    }
    setTempRange({ start: newStart, end: today });
    setDisplayDate(newStart);
  };

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(displayDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [displayDate]);

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const buttonLabel =
    selectedRange.start && selectedRange.end
      ? `${format(selectedRange.start, 'dd MMM')} - ${format(selectedRange.end, 'dd MMM')}`
      : '--Custom Date--';

  return (
    <>
      <Button
        variant="outlined"
        // --- ICON ON THE RIGHT (endIcon) ---
        endIcon={
          <Box
            sx={{
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Replace placeholder with your DateIconPng variable */}
            <img
              src={DateIconPng}
              alt="date"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        }
        onClick={handleClick}
        aria-describedby={id}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          height: '38px',
          width: '160px',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '6px 12px', // Increased padding slightly for better look
          flexShrink: 0,
          color: selectedRange.start || open ? '#333' : '#666',
          borderColor: 'rgba(209, 213, 219, 1)',
          backgroundColor: open ? 'rgba(246, 247, 247, 1)' : 'rgba(240, 240, 240, 0.5)',

          // --- 3. ALIGNMENT CHANGES ---
          // 'flex-start' aligns content to the left side
          justifyContent: 'flex-start',
          // 'gap' controls the exact distance between Text and Icon
          gap: '8px',
        }}
      >
        {buttonLabel}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '12px',
              mt: 1,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {/* --- LEFT SIDEBAR --- */}
         {/* --- LEFT SIDEBAR --- */}
          <Box
            sx={{
              width: '170px',
              p: 2.5,
              borderRight: '1px solid #f0f0f0',
              bgcolor: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* --- START DATE BOX --- */}
            <DateInputBox>
              {tempRange.start ? (
                // STATE 1: DATE SELECTED (Stacked Label + Date)
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                      Start Date
                    </Typography>
                    <Box sx={{ width: '12px', height: '12px' }}>
                      <img
                        src={StartDatePng}
                        alt="icon"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.6 }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                    {format(tempRange.start, 'dd/MM/yyyy')}
                  </Typography>
                </>
              ) : (
                // STATE 2: EMPTY (Single Row Placeholder)
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
                    Start Date
                  </Typography>
                  <Box sx={{ width: '12px', height: '12px' }}>
                    <img
                      src={StartDatePng}
                      alt="icon"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.6 }}
                    />
                  </Box>
                </Box>
              )}
            </DateInputBox>

            {/* --- END DATE BOX --- */}
            <DateInputBox sx={{ mb: 3 }}>
              {tempRange.end ? (
                // STATE 1: DATE SELECTED
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                      End Date
                    </Typography>
                    <Box sx={{ width: '12px', height: '12px' }}>
                      <img
                        src={StartDatePng} // Using same icon as requested
                        alt="icon"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.6 }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                    {format(tempRange.end, 'dd/MM/yyyy')}
                  </Typography>
                </>
              ) : (
                // STATE 2: EMPTY
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
                    End Date
                  </Typography>
                  <Box sx={{ width: '12px', height: '12px' }}>
                    <img
                      src={StartDatePng}
                      alt="icon"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.6 }}
                    />
                  </Box>
                </Box>
              )}
            </DateInputBox>

            {/* --- PRESETS --- */}
            <Box sx={{ mb: 3, pl: 0.5 }}>
              {['week', 'month', 'year'].map((type) => (
                <Typography
                  key={type}
                  onClick={() => handlePreset(type)}
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    cursor: 'pointer',
                    fontSize: '15px',
                    color: 'rgba(0, 0, 0, 1)',
                    fontWeight: '400',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#1F2C5E', fontWeight: 600 },
                  }}
                >
                  Last {type}
                </Typography>
              ))}
            </Box>

            {/* --- APPLY BUTTON --- */}
            <Button
              variant="outlined"
              size="small"
              onClick={handleApply}
              disabled={!tempRange.start || !tempRange.end}
              sx={{
                marginTop: 'auto',
                textTransform: 'none',
                borderColor: 'rgba(195, 195, 195, 1)',
                color: 'rgba(31, 44, 94, 1)',
                borderRadius: '6px',
                fontSize: '12px',
                height: '32px',
                width: '100%', // Fixed width from 20px to 100% so text fits
                '&:hover': { borderColor: '#1F2C5E', bgcolor: 'rgba(31, 44, 94, 0.04)' },
              }}
            >
              Apply
            </Button>
          </Box>

          {/* --- RIGHT CALENDAR --- */}
          <Box sx={{ p: 2.5, width: '280px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                px: 1,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{ fontSize: '0.9rem', color: '#1F2C5E' }}
              >
                {format(displayDate, 'MMMM yyyy')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <ArrowBackIosNewIcon
                  onClick={() => handleMonthNav('prev')}
                  sx={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: '#666',
                    '&:hover': { color: '#333' },
                  }}
                />
                <ArrowForwardIosIcon
                  onClick={() => handleMonthNav('next')}
                  sx={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: '#666',
                    '&:hover': { color: '#333' },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                mb: 1,
              }}
            >
              {weekDays.map((day) => (
                <Typography
                  key={day}
                  variant="caption"
                  align="center"
                  sx={{ color: '#999', fontSize: '11px', fontWeight: 500 }}
                >
                  {day}
                </Typography>
              ))}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                rowGap: '4px',
              }}
            >
              {calendarDays.map((day, index) => {
                const isStart =
                  tempRange.start && isSameDay(day, tempRange.start);
                const isEnd = tempRange.end && isSameDay(day, tempRange.end);
                const isRange =
                  tempRange.start &&
                  tempRange.end &&
                  isWithinInterval(day, {
                    start: tempRange.start,
                    end: tempRange.end,
                  });
                const isSelected = isStart || isEnd;
                const isOutsideMonth = !isSameMonth(day, displayDate);

                return (
                  <Box
                    key={index}
                    onClick={() => handleDateClick(day)}
                    sx={{
                      height: '32px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {(isRange || isStart || isEnd) && (
                      <RangeBackground
                        isRange={true}
                        isStart={isStart}
                        isEnd={isEnd}
                      />
                    )}

                    <DayCircle
                      isSelected={isSelected}
                      sx={{
                        opacity: isOutsideMonth && !isSelected ? 0.3 : 1,
                        fontSize: '12px',
                      }}
                    >
                      {format(day, 'd')}
                    </DayCircle>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default CustomDateFilter;
