import React, { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Typography, Menu, Chip, useMediaQuery } from '@mui/material';
import MuiButton from '../button';
import styles from "./index.module.css";
import MuiInput from '../input';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import GroupButton from '../groupbutton';
// import FilterIcon from "../../assets/icons/filter_icon.svg";
import ListFilterPopup from '../listFilterModal';

import TimeIcon from "../../assets/icons/time_icon.svg";
import RunningIcon from "../../assets/icons/running_white_icon.svg";
import DisabledIcon from "../../assets/icons/disabled_white_icon.svg";

const FilterIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.532 4.75H13.468C13.925 4.75 14.322 4.75 14.633 4.78C14.94 4.808 15.318 4.875 15.626 5.128C16.023 5.454 16.247 5.942 16.25 6.45C16.252 6.84 16.078 7.176 15.91 7.442C15.742 7.712 15.499 8.032 15.215 8.406L12.619 11.828C12.367 12.16 12.304 12.248 12.26 12.338C12.2142 12.4323 12.1809 12.5321 12.161 12.635C12.141 12.735 12.138 12.847 12.138 13.269V17.512C12.138 17.72 12.138 17.924 12.124 18.09C12.109 18.254 12.072 18.517 11.9 18.753C11.69 19.04 11.363 19.226 11 19.248C10.698 19.267 10.453 19.145 10.31 19.065C10.1472 18.9682 9.98841 18.8647 9.834 18.755L8.845 18.072L8.797 18.039C8.606 17.908 8.394 17.763 8.235 17.562C8.09682 17.3886 7.99389 17.1899 7.932 16.977C7.861 16.733 7.862 16.477 7.862 16.239V13.269C7.862 12.847 7.858 12.735 7.839 12.635C7.8188 12.5321 7.78518 12.4322 7.739 12.338C7.696 12.248 7.633 12.16 7.381 11.828L4.785 8.406C4.501 8.032 4.258 7.712 4.089 7.442C3.922 7.176 3.749 6.84 3.75 6.45C3.75053 6.19734 3.80672 5.9479 3.91457 5.71941C4.02242 5.49092 4.17928 5.289 4.374 5.128C4.682 4.875 5.06 4.808 5.367 4.779C5.678 4.75 6.074 4.75 6.532 4.75ZM5.308 6.305C5.27434 6.3419 5.25424 6.38916 5.251 6.439C5.257 6.458 5.281 6.52 5.361 6.646C5.489 6.851 5.691 7.118 6.001 7.527L8.576 10.921L8.611 10.967C8.812 11.231 8.972 11.442 9.089 11.682C9.19167 11.8933 9.26567 12.115 9.311 12.347C9.362 12.608 9.361 12.874 9.361 13.211V16.179C9.361 16.337 9.362 16.426 9.366 16.493L9.372 16.555C9.37887 16.5815 9.39113 16.6064 9.408 16.628L9.449 16.662C9.499 16.702 9.569 16.75 9.697 16.838L10.638 17.488V13.21C10.638 12.873 10.638 12.607 10.689 12.346C10.7343 12.1147 10.8083 11.893 10.911 11.681C11.028 11.441 11.188 11.231 11.389 10.966L11.424 10.92L13.999 7.526C14.309 7.116 14.511 6.85 14.639 6.645C14.719 6.519 14.743 6.457 14.749 6.438C14.7458 6.38816 14.7257 6.3409 14.692 6.304C14.6266 6.28659 14.5596 6.27587 14.492 6.272C14.26 6.25 13.936 6.249 13.432 6.249H6.568C6.064 6.249 5.74 6.249 5.508 6.272C5.44043 6.27587 5.37342 6.28759 5.308 6.305ZM15.75 10.5C15.75 10.3011 15.829 10.1103 15.9697 9.96967C16.1103 9.82902 16.3011 9.75 16.5 9.75H19.5C19.6989 9.75 19.8897 9.82902 20.0303 9.96967C20.171 10.1103 20.25 10.3011 20.25 10.5C20.25 10.6989 20.171 10.8897 20.0303 11.0303C19.8897 11.171 19.6989 11.25 19.5 11.25H16.5C16.3011 11.25 16.1103 11.171 15.9697 11.0303C15.829 10.8897 15.75 10.6989 15.75 10.5ZM14.25 13C14.25 12.8011 14.329 12.6103 14.4697 12.4697C14.6103 12.329 14.8011 12.25 15 12.25H19.5C19.6989 12.25 19.8897 12.329 20.0303 12.4697C20.171 12.6103 20.25 12.8011 20.25 13C20.25 13.1989 20.171 13.3897 20.0303 13.5303C19.8897 13.671 19.6989 13.75 19.5 13.75H15C14.8011 13.75 14.6103 13.671 14.4697 13.5303C14.329 13.3897 14.25 13.1989 14.25 13ZM13.75 15.5C13.75 15.3011 13.829 15.1103 13.9697 14.9697C14.1103 14.829 14.3011 14.75 14.5 14.75H19.5C19.6989 14.75 19.8897 14.829 20.0303 14.9697C20.171 15.1103 20.25 15.3011 20.25 15.5C20.25 15.6989 20.171 15.8897 20.0303 16.0303C19.8897 16.171 19.6989 16.25 19.5 16.25H14.5C14.3011 16.25 14.1103 16.171 13.9697 16.0303C13.829 15.8897 13.75 15.6989 13.75 15.5ZM13.75 18C13.75 17.8011 13.829 17.6103 13.9697 17.4697C14.1103 17.329 14.3011 17.25 14.5 17.25H17C17.1989 17.25 17.3897 17.329 17.5303 17.4697C17.671 17.6103 17.75 17.8011 17.75 18C17.75 18.1989 17.671 18.3897 17.5303 18.5303C17.3897 18.671 17.1989 18.75 17 18.75H14.5C14.3011 18.75 14.1103 18.671 13.9697 18.5303C13.829 18.3897 13.75 18.1989 13.75 18Z" fill="var(--text-color)" />
  <path opacity="0.5" d="M13.6399 8H6.35986L8.61086 10.967C8.81186 11.231 8.97186 11.442 9.08886 11.682C9.19153 11.8933 9.26553 12.115 9.31086 12.347C9.36186 12.608 9.36086 12.874 9.36086 13.211V16.179C9.36086 16.337 9.36186 16.426 9.36586 16.493L9.37186 16.555C9.37873 16.5815 9.39099 16.6064 9.40786 16.628L9.44886 16.662C9.49886 16.702 9.56886 16.75 9.69686 16.838L10.6379 17.488V13.21C10.6379 12.873 10.6379 12.607 10.6889 12.346C10.7342 12.1147 10.8082 11.893 10.9109 11.681C11.0279 11.441 11.1879 11.231 11.3889 10.966L13.6399 8Z" fill="var(--text-color)" />
</svg>;

const PageHeader = ({
  title, breadcrumbs = "",
  onSearch, onAdd, addButtonTitle = "",
  addButtonIcon, showInput = false, showButton = false, btn_class = "",
  showGroupButton = false, groupButtons = [], defaultIndex = null,  // <-- ADDED (defaults keep everything unchanged)
  showBackButton = false, handleBack, showFilter = false,
  statusOptions = [], expiredOptions = [], filterLabel = "",
  showStatus = false, status = "Scheduled", multiSelectStatus = false,
  filter = {}, filterBtnLabel = "Filters",
  statusLabel = "Status", dateLabel = "",
  expiryLabel = "Expired In", rangeLabel = "",
  fullWidthSearch = false,
  filterCount = "",
  mb = 2
}) => {
  const [searchText, setSearchText] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (onSearch) onSearch(searchText);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchText, onSearch]);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusChipClick = (status) => {
    filter.setSelectedStatus(status)
  };

  const handleExpiredChipClick = (exp) => {
    filter.setSelectedExpired(exp)
  };

  const handleRangeChange = (val) => {
    filter.setRange(val)
  };

  return (
    <Box mb={mb}>
      <Box
        className={styles.page_header_outer}
      >
        {/* 🔵 Left: Page heading */}
        <Typography display="flex" variant="h5" fontWeight="bold" sx={{ color: "var(--text-color)" }}>
          {
            showBackButton && <Box display="flex" onClick={handleBack} sx={{
              border: "1px solid #666666",
              textAlign: "center",
              justifyContent: "center",
              mr: 2,
              pl: isMobile ? 1.4 : 1,
              pr: isMobile ? 0.6 : 1,
              borderRadius: isMobile ? 9 : 3,
              background: "var(--back-btn-bg)",
              cursor: "pointer",
              maxHeight: "33px"
            }}>
              <ArrowBackIosIcon
                sx={{
                  fontSize: 14,
                  mt: 1
                }}
              />
              {!isMobile && <Typography variant="body2" sx={{
                fontSize: 14,
                mt: 0.6
              }}>Back</Typography>}
            </Box>
          }
          {title}
        </Typography>

        {(showInput || showFilter || showButton || showGroupButton || showStatus) && <Box className={`${styles.header_assets} ${fullWidthSearch ? styles?.fullWidthSearch : ""}`} gap={2} alignItems="center" mt={{ xs: 2, sm: 0 }}>
          {showInput && (
            <MuiInput
              type="search"
              className={styles?.header_search}
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setSearchText(e.target.value)
                }
              }}
              fullWidth={fullWidthSearch}
              startIcon={<SearchIcon sx={{ color: "var(--text-color)" }} />}
            />
          )}

          {/* Filter Label */}
          {showFilter && <Typography
            variant="body2"
            sx={{
              px: 2,
              py: 1,
              bgcolor: "var(--filter-bg-color)",
              border: "1px solid var(--filter-border-color)",
              color: "var(--text-color)",
              borderRadius: 2,
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: isMobile ? "fit-content" : "130px"
            }}
            onClick={handleFilterClick}
          >
            {FilterIcon} &nbsp; {filterBtnLabel}

            {filterCount && filterCount > 0 && <Box
              component="span"
              sx={{
                mt: -0.1,
                ml: 0.5,
                minWidth: 18,
                height: 18,
                px: 0.75,
                borderRadius: 10,
                bgcolor: "#A537FF",
                color: "white",
                fontSize: 12,
                lineHeight: "18px",
                fontWeight: 600,
                textAlign: "center",
              }}
              aria-label={`${filterCount} selected`}
            >
              {filterCount}
            </Box>}
          </Typography>}

          {showButton && (
            <MuiButton
              text={!isMobile ? addButtonTitle : null}
              className={`${styles?.add_new_btn} ${btn_class} ${isMobile ? styles.mobile_add_btn : ""}`}
              startIcon={<img src={addButtonIcon} />}
              handleOnClick={onAdd}
            />
          )}

          {/* <<< GroupButton insertion - absolutely nothing else changed >>> */}
          {showGroupButton && !isMobile && (
            <GroupButton defaultIndex={defaultIndex} buttons={groupButtons} exclusive={defaultIndex != null} />
          )}
          {/* <<< end GroupButton insertion >>> */}

          {/* status label */}
          {showStatus && <Box className={`${styles.assetStatus} ${styles[status.toLowerCase()]}`}>
            <Typography className={styles.statusText}>
              {status == "Completed" ? <CheckIcon sx={{ fontSize: 14, mt: "-1px" }} /> : status == "Ended-Up" ? <ClearIcon sx={{ fontSize: 14, mt: "-1px" }} /> : <img src={status == "Running" ? RunningIcon : status == "Cancelled" ? DisabledIcon : TimeIcon} style={{ float: "left", marginRight: 2 }} />}
              {status}
            </Typography>
          </Box>}
          {/* Filter Popup */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            className="filter_popup"
            sx={{
              "& .MuiPaper-root": {
                background: "var(--main-bg-color)",
                color: "var(--text-color)",
                p: 2,
                borderRadius: 3
              }
            }}
          >
            <ListFilterPopup
              handleFilterClose={handleFilterClose}
              handleStatusChipClick={handleStatusChipClick}
              selectedStatus={filter.selectedStatus}
              handleExpiredChipClick={handleExpiredChipClick}
              selectedExpired={filter.selectedExpired}
              statusOptions={statusOptions || []}
              expiredOptions={expiredOptions || []}
              label={filterLabel}
              startDate={filter.startDate}
              endDate={filter.endDate}
              setStartDate={filter.setStartDate}
              setEndDate={filter.setEndDate}
              handleApplyFilter={filter.handleApplyFilter}
              statusLabel={statusLabel}
              expiryLabel={expiryLabel}
              dateLabel={dateLabel}
              rangeLabel={rangeLabel}
              range={filter.range}
              handleRangeChange={handleRangeChange}
              multiSelectStatus={multiSelectStatus}
            />
          </Menu>
        </Box>}

        {showGroupButton && isMobile && (
          <GroupButton defaultIndex={defaultIndex} buttons={groupButtons.map(x => {
            return {
              ...x,
              fullWidth: true
            }
          })} exclusive={defaultIndex != null} className={styles.fullGroupBtn} />
        )}
      </Box>

      {/* 🔻 Breadcrumb Below Title */}
      {breadcrumbs && <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 0, fontSize: "14px" }}>
        <Link underline="hover" color="inherit" href="/role">
          {title}
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "14px" }}>{breadcrumbs}</Typography>
      </Breadcrumbs>}
    </Box>
  );
};

export default PageHeader;
