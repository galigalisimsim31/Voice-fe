import React from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { parseISO, isAfter, isBefore } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers";
// import CalendarIcon from "../../assets/icons/calendar_icon.svg";

const CalendarIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2969 6.57227C16.8869 6.57227 16.5469 6.23227 16.5469 5.82227V4.59827C15.7729 4.57227 14.8639 4.57227 13.7969 4.57227H11.7969C10.7289 4.57227 9.82088 4.57227 9.04688 4.59827V5.82227C9.04688 6.23227 8.70687 6.57227 8.29688 6.57227C7.88688 6.57227 7.54688 6.23227 7.54688 5.82227V4.70627C6.60188 4.82927 5.95288 5.06627 5.49688 5.52227C4.89488 6.12427 4.67487 7.06227 4.59387 8.57227H20.9999C20.9189 7.06227 20.6979 6.12427 20.0969 5.52227C19.6409 5.06627 18.9919 4.82927 18.0469 4.70627V5.82227C18.0469 6.23227 17.7069 6.57227 17.2969 6.57227ZM21.0409 10.0723C21.0462 10.6009 21.0482 11.1843 21.0469 11.8223V12.8223C21.0469 13.2323 21.3869 13.5723 21.7969 13.5723C22.2069 13.5723 22.5469 13.2323 22.5469 12.8223V11.8223C22.5469 7.84227 22.5469 5.85227 21.1569 4.46227C20.3849 3.69027 19.4269 3.34727 18.0469 3.19427V2.32227C18.0469 1.91227 17.7069 1.57227 17.2969 1.57227C16.8869 1.57227 16.5469 1.91227 16.5469 2.32227V3.09727C15.7509 3.07227 14.8419 3.07227 13.7969 3.07227H11.7969C10.7509 3.07227 9.84288 3.07227 9.04688 3.09727V2.32227C9.04688 1.91227 8.70687 1.57227 8.29688 1.57227C7.88688 1.57227 7.54688 1.91227 7.54688 2.32227V3.19427C6.16687 3.34727 5.20887 3.69027 4.43687 4.46227C3.04687 5.85227 3.04688 7.85227 3.04688 11.8223V13.8223C3.04688 17.8023 3.04687 19.7923 4.43687 21.1823C5.82687 22.5723 7.81687 22.5723 11.7969 22.5723C12.2069 22.5723 12.5469 22.2323 12.5469 21.8223C12.5469 21.4123 12.2069 21.0723 11.7969 21.0723C8.23688 21.0723 6.44688 21.0723 5.49688 20.1223C4.54688 19.1723 4.54688 17.3823 4.54688 13.8223V11.8223C4.54621 11.1849 4.54788 10.6016 4.55188 10.0723H21.0409ZM17.7969 23.0723C15.1769 23.0723 13.0469 20.9423 13.0469 18.3223C13.0469 15.7023 15.1769 13.5723 17.7969 13.5723C20.4169 13.5723 22.5469 15.7023 22.5469 18.3223C22.5469 20.9423 20.4169 23.0723 17.7969 23.0723ZM17.7969 15.0723C16.0069 15.0723 14.5469 16.5323 14.5469 18.3223C14.5469 20.1123 16.0069 21.5723 17.7969 21.5723C19.5869 21.5723 21.0469 20.1123 21.0469 18.3223C21.0469 16.5323 19.5869 15.0723 17.7969 15.0723ZM18.2669 19.8523C18.4169 20.0023 18.6069 20.0723 18.7969 20.0723C18.9869 20.0723 19.1769 20.0023 19.3269 19.8523C19.6169 19.5623 19.6169 19.0823 19.3269 18.7923L18.5469 18.0123V16.3223C18.5469 15.9123 18.2069 15.5723 17.7969 15.5723C17.3869 15.5723 17.0469 15.9123 17.0469 16.3223V18.3223C17.0469 18.5223 17.1269 18.7123 17.2669 18.8523L18.2669 19.8523Z" fill="var(--text-color)" />
</svg>;

const CalendarPickerButton = (props) => (
  <IconButton {...props} className="date-calendar-icon">
    {CalendarIcon}
  </IconButton>
);

const commonDatePickerProps = {
  label: "",
  format: "dd-MM-yyyy, hh:mm a",
  className: "customDatePicker fullWidthPicker",
  slots: {
    openPickerButton: CalendarPickerButton,
    openPickerIcon: null,
  },
  slotProps: {
    textField: {
      size: "small",
      InputLabelProps: { shrink: true },
      sx: { borderRadius: 4 },
    },
    popper: {
      placement: "bottom-start",
      modifiers: [
        {
          name: "flip",
          enabled: false, // don't try to move to top and recalc page height
        },
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            altAxis: true,
            tether: false,
          },
        },
      ],
      // make sure popper is positioned relative to viewport instead of affecting layout
      sx: {
        position: "fixed !important",
        zIndex: 1300,
      },
    },
  },
};

const MuiDateTimePicker = ({
  label = "Select Date & Time",
  selectedDateTime = "",
  setSelectedDateTime = () => { },
  sx = {},
  minDateTime = null,
  maxDateTime = null,
}) => {

  return (
    <Box className="date-time-picker" sx={{ mb: 2, ...sx }}>
      <Box key={label}>
        <Typography variant="body2" sx={{ color: "var(--text-color)", mb: 0.5 }}>
          {label}
        </Typography>
        <DateTimePicker
          {...commonDatePickerProps}
          value={selectedDateTime}
          onChange={(newValue) => setSelectedDateTime(newValue)}
          minDateTime={minDateTime}
          maxDateTime={maxDateTime}
          renderInput={(params) => <TextField {...params} fullWidth />}
          views={['year', 'month', 'day', 'hours', 'minutes']}
        />
      </Box>
    </Box>
  );
};

export default MuiDateTimePicker;
