import { Box, Chip, Grid, Typography } from "@mui/material";
import DateRangeFilter from "../dateRangeFilter";
import MuiSlider from "../slider";

const getChipSx = (isSelected) => ({
  backgroundColor: isSelected ? "var(--active-bg)" : "var(--inactive-bg)",
  border: isSelected ? `1px solid var(--active-border)` : `1px solid var(--inactive-border)`,
  color: "var(--text-color)",
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: isSelected ? "var(--active-bg)" : "var(--inactive-bg)",
  },
});

// helpers for multi/single selection
const isSelectedChip = (selected, option) =>
  Array.isArray(selected) ? selected.includes(option) : selected === option;

const toggleInList = (selected, option) => {
  const arr = Array.isArray(selected)
    ? selected
    : selected
    ? [selected]
    : [];
  return arr.includes(option) ? arr.filter((o) => o !== option) : [...arr, option];
};

const ListFilterPopup = ({
  handleFilterClose,
  handleStatusChipClick,
  selectedStatus,
  handleExpiredChipClick,
  selectedExpired,
  statusOptions = [],
  expiredOptions = [],
  label = "Filters",
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleApplyFilter = () => {},
  statusLabel = "Status",
  dateLabel = "",
  expiryLabel = "Expired In",
  rangeLabel = "",
  handleRangeChange,
  range = 0,
  min = 10,
  max = 100,
  multiSelectStatus = false,
}) => {
  const renderChips = (options, selected, onClick, isStatus = false) =>
    options.map((option) => (
      <Chip
        key={option}
        label={option}
        onClick={() => onClick(option)}
        sx={getChipSx(isSelectedChip(selected, option))}
      />
    ));

  // status click supports single or multi based on flag
  const onStatusChipClick = (option) => {
    if (multiSelectStatus) {
      const next = toggleInList(selectedStatus, option);
      // pass the updated ARRAY back to parent
      handleStatusChipClick(next);
    } else {
      // single-select with toggle off on re-click
      const next = selectedStatus === option ? "" : option;
      handleStatusChipClick(next);
    }
  };

  const handleReset = () => {
    if (statusOptions && statusOptions.length > 0)
      handleStatusChipClick(multiSelectStatus ? [] : "");
    if (expiredOptions && expiredOptions.length > 0) handleExpiredChipClick("");
    if (rangeLabel) handleRangeChange([0, 0]);
    setStartDate(null);
    setEndDate(null);
    handleApplyFilter(false);
  };

  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);

  return (
    <>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          {label}
        </Typography>
        <Box sx={{ cursor: "pointer", fontSize: 22, fontWeight: "bold" }} onClick={handleFilterClose}>
          ×
        </Box>
      </Box>

      {/* Filter Container */}
      <Box sx={{ backgroundColor: "var(--bg-color)", px: 2, pt: 1, borderRadius: 4 }}>
        <Grid container spacing={2}>
          {/* Status Filter */}
          {statusOptions && statusOptions.length > 0 && (
            <Grid size={{ xs: 12, sm: expiredOptions.length ? 7 : 12 }}>
              <Box mb={2}>
                <Typography variant="body2" fontWeight={500} mb={1}>
                  {statusLabel}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {renderChips(statusOptions, selectedStatus, onStatusChipClick, true)}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Expired Filter */}
          {expiredOptions && expiredOptions.length > 0 && (
            <Grid size={{ xs: 12, sm: 5 }}>
              <Box mb={2}>
                <Typography variant="body2" fontWeight={500} mb={1}>
                  {expiryLabel || "Expired In"}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {renderChips(expiredOptions, selectedExpired, handleExpiredChipClick)}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Range Filter */}
          {rangeLabel && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box mb={2}>
                <Typography variant="body2" fontWeight={500} mb={1}>
                  {rangeLabel}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  <MuiSlider
                    min={min}
                    max={max}
                    value={range}
                    setValue={handleRangeChange}
                    label="Credit"
                    isRangeSlider={true}
                  />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Date Range */}
        <Box pb={1}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            {dateLabel
              ? dateLabel
              : label === "Simulation Filters"
              ? "Scheduled On"
              : label === "Reports Filters"
              ? "Generated On"
              : "Added On"}
          </Typography>
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={1} justifyContent="center" mt={2} flexWrap="wrap">
        <Chip
          label="Apply"
          onClick={() => {
            handleApplyFilter(true);
            handleFilterClose();
          }}
          sx={getChipSx(true)}
        />
        <Chip label="Reset All" onClick={handleReset} sx={getChipSx(false)} />
      </Box>
    </>
  );
};

export default ListFilterPopup;
