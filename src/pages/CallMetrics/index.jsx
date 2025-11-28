import React, { useState, useMemo, useCallback } from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  styled,
  Drawer,
  Select,
  MenuItem,
} from "@mui/material";

// --- Icons ---
import CrossIcon from "../../assets/icons/cross.svg";
import FileIcon from "../../assets/icons/file.svg";
import ArrowDownIcon from "../../assets/icons/dropdown.svg";

import SearchFilter from "../../components/search/Search";
import AgentSelect from "../../components/agent/Agent";
import StatusSelect from "../../components/status/Status";
import CustomDateFilter from "../../components/date/Date";
import ResetButton from "../../components/reset/Reset";
import ExportButton from "../../components/export/Export";

// --- STABLE COMPONENTS (Moved outside the main component) ---

// 1. Custom Icon Component for the Select Dropdown (Memoized)
const CustomSelectIcon = React.memo((props) => {
  return (
    <Box
      component="img"
      src={ArrowDownIcon}
      alt="arrow"
      {...props}
      sx={{
        width: "10px",
        height: "10px",
        marginRight: "10px",
        marginTop: "2px",
        userSelect: "none",
        pointerEvents: "none",
        position: "absolute",
        right: "12px",
        top: "calc(50% - 5px)",
        ...props.sx,
      }}
    />
  );
});
CustomSelectIcon.displayName = 'CustomSelectIcon';


// 2. Custom Pagination Component (Memoized)
const CustomPagination = React.memo(({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const from = page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, count);
  
  // Memoized Pagination Styles
  const paginationBoxSx = useMemo(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    p: 3,
    pl: 0,
    gap: 2,
  }), []);

  const selectWrapperSx = useMemo(() => ({
    backgroundColor: "rgba(238, 240, 245, 1)",
    borderRadius: "8px",
    border: "1px solid rgba(209, 213, 219, 1)",
    display: "flex",
    alignItems: "center",
  }), []);

  const selectSx = useMemo(() => ({
    fontSize: "14px",
    fontWeight: 500,
    "& .MuiSelect-select": {
      padding: "6px 30px 6px 12px !important",
      display: "flex",
      alignItems: "center",
    },
  }), []);

  const textSx = useMemo(() => ({ color: "#666", fontSize: "14px" }), []);

  return (
    <Box sx={paginationBoxSx}>
      {/* Rows Selector */}
      <Box sx={selectWrapperSx}>
        <Select
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          variant="standard"
          disableUnderline
          IconComponent={CustomSelectIcon}
          sx={selectSx}
          MenuProps={{
            PaperProps: { sx: { borderRadius: "8px", mt: 1 } },
          }}
        >
          {[6, 10, 25, 50].map((num) => (
            <MenuItem key={num} value={num} sx={{ fontSize: "14px" }}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Typography variant="body2" sx={textSx}>
        Items per page
      </Typography>

      <Typography variant="body2" sx={{ ...textSx, ml: 1 }}>
        {from}-{to} of {count} items
      </Typography>
    </Box>
  );
});
CustomPagination.displayName = 'CustomPagination';


// 3. Status Chip (Styled Component)
const StatusChip = styled(Box)(({ success }) => ({
  color: success ? "#008000" : "#D32F2F",
  fontWeight: 500,
}));


// 4. Transcript Drawer (Memoized)
const TranscriptDrawer = React.memo(({ open, onClose, transcriptData }) => {
  
  // Memoize Drawer Styles
  const drawerPaperSx = useMemo(() => ({ 
    width: "500px", 
    p: 0, 
    borderTopLeftRadius: "30px" 
  }), []);

  const headerSx = useMemo(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 2.5,
    borderBottom: "1px solid #f0f0f0",
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
    bgcolor: "rgba(238, 240, 245, 1)",
    flexShrink: 0
  }), []);

  const contentSx = useMemo(() => ({ 
    p: 3, 
    overflowY: "auto", 
    height: "100%",
    flexGrow: 1 
  }), []);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: drawerPaperSx }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={headerSx}>
          <Typography variant="h6" fontWeight="bold">Transcript</Typography>
          <IconButton onClick={onClose} size="small">
            <Box component="img" src={CrossIcon} alt="close" sx={{ width: "35px", height: "35px", objectFit: "contain" }} />
          </IconButton>
        </Box>
        <Box sx={contentSx}>
          {transcriptData?.length > 0 ? (
            transcriptData.map((line, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: "#333", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 600 }}>{line.speaker}: </span>{line.text}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">No transcript available.</Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
});
TranscriptDrawer.displayName = 'TranscriptDrawer';

// --- Dummy Data (Updated with Call Ended Reason) ---
const dummyTranscript = [
  { speaker: "AI (Neha)", text: "Hello! This is Neha from Vervali. Am I speaking with Mr. Rohan?" },
  { speaker: "Client", text: "Yes, speaking." },
];

const mockData = [
  {
    id: "V - 00781",
    agent: "Neha",
    room: "Room 2",
    location: "India",
    contact: "+91 8877663532",
    dateTime: "12 Oct 2025, 6.30AM",
    duration: "3m, 45s",
    callEndedReason: "Customer ended call", 
    cost: "-",
    status: "Successful",
    transcript: dummyTranscript,
  },
  { id: "V - 00782", agent: "Sneha", room: "Room 1", location: "New Zealand", contact: "+971 887766353", dateTime: "12 Oct 2025, 6.30AM", duration: "2m, 00s", callEndedReason: "Silence Timeout", cost: "50,000", status: "Failed", transcript: dummyTranscript },
  { id: "V - 00783", agent: "Vikram", room: "Room 2", location: "UAE", contact: "+91 8877663532", dateTime: "12 Oct 2025, 6.30AM", duration: "1m, 12s", callEndedReason: "Customer ended call", cost: "-", status: "Successful", transcript: dummyTranscript },
  { id: "V - 00784", agent: "Pooja", room: "Room 2", location: "India", contact: "+91 8877663532", dateTime: "12 Oct 2025, 6.30AM", duration: "3m, 45s", callEndedReason: "Silence Timeout", cost: "-", status: "Failed", transcript: dummyTranscript },
  { id: "V - 00785", agent: "Neha", room: "Room 4", location: "India", contact: "+91 8877663532", dateTime: "12 Oct 2025, 6.30AM", duration: "3m, 45s", callEndedReason: "Customer ended call", cost: "50,000", status: "Successful", transcript: dummyTranscript },
  { id: "V - 00786", agent: "Raj", room: "Room 1", location: "USA", contact: "+1 555123456", dateTime: "12 Oct 2025, 6.32AM", duration: "0m, 55s", callEndedReason: "Silence Timeout", cost: "12,000", status: "Successful", transcript: dummyTranscript },
];

// --- Updated Table Headers ---
const tableHeaders = [
  "Call ID", "Assigned Agent", "Rooms", "Location", "Contact No.",
  "Date & Time", "Call Duration", "Call Ended Reason", "Cost", "Status", "Transcript",
];

// --- The Main Component ---
const CallMetricsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState([]);

  // --- Memoized Derived State ---
  const uniqueAgents = useMemo(() => [...new Set(mockData.map((item) => item.agent))].sort(), []);
  const uniqueStatuses = useMemo(() => [...new Set(mockData.map((item) => item.status))].sort(), []);

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contact.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAgent = selectedAgent ? item.agent === selectedAgent : true;
      const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
      return matchesSearch && matchesAgent && matchesStatus;
    });
  }, [searchTerm, selectedAgent, selectedStatus]);


  // --- Event Handlers optimized with useCallback ---
  const handleSearchChange = useCallback((e) => { setSearchTerm(e.target.value); setPage(0); }, []);
  const handleAgentChange = useCallback((e) => { setSelectedAgent(e.target.value); setPage(0); }, []);
  const handleStatusChange = useCallback((e) => { setSelectedStatus(e.target.value); setPage(0); }, []);
  const handleReset = useCallback(() => { setSearchTerm(""); setSelectedAgent(""); setSelectedStatus(""); setPage(0); }, []);
  const handlePageChange = useCallback((e, newPage) => setPage(newPage), []);
  const handleRowsChange = useCallback((e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }, []);
  
  const handleOpenTranscript = useCallback((transcript) => { 
    setCurrentTranscript(transcript || []); 
    setIsDrawerOpen(true); 
  }, []);

  const handleCloseTranscript = useCallback(() => { 
    setIsDrawerOpen(false); 
    setCurrentTranscript([]); 
  }, []);

  // --- Memoized Style Objects ---
  const paperContainerSx = useMemo(() => ({
    width: "100%",
    borderRadius: "12px",
    height: 530,
    p: 2.5,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
  }), []);

  const headerBoxSx = useMemo(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    mb: 2.5,
    flexShrink: 0
  }), []);
  
  const filterBoxSx = useMemo(() => ({
    display: "flex", 
    alignItems: "center", 
    gap: 1.5, 
    marginLeft: "auto"
  }), []);

  const tableHeaderCellSx = useMemo(() => ({
    fontWeight: "bold", 
    color: "rgba(0, 0, 0, 1)", 
    backgroundColor: "#FFFFFF",
    borderBottom: "none"
  }), []);

  const getTableRowSx = useCallback((index) => ({
    "&:nth-of-type(even)": { backgroundColor: "rgba(243, 243, 243, 1)" },
    "&: .MuiTableCell-root": { borderBottom: "none" }
  }), []);


  return (
    <Paper sx={paperContainerSx}>
      
      <Box sx={headerBoxSx}>
        <Typography variant="h6" fontWeight="500" sx={{ whiteSpace: "nowrap", color:"rgba(31, 44, 94, 1)" }}>
          Call Metrics
        </Typography>

        {/* Right Side Filters */}
        <Box sx={filterBoxSx}>
          <Box sx={{ width: 160 }}>
            <SearchFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </Box>
          <Box sx={{ width: 170 }}>
            <AgentSelect selectedAgent={selectedAgent} onAgentChange={handleAgentChange} agents={uniqueAgents} />
          </Box>
          <Box sx={{ width: 160 }}>
            <StatusSelect selectedStatus={selectedStatus} onStatusChange={handleStatusChange} statuses={uniqueStatuses} />
          </Box>
          
          <CustomDateFilter onClick={() => console.log('Date clicked')} />
          <ResetButton onClick={handleReset} />
          <ExportButton onClick={() => console.log('Export clicked')} />
        </Box>
      </Box>

<TableContainer sx={{ flexGrow: 1, overflowX: "auto", overflowY: "auto" }}>
  <Table 
  stickyHeader 
  aria-label="call metrics table" 
  sx={{ minWidth: 1400 }} // Increased minWidth to accommodate all 11 columns
>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header} sx={tableHeaderCellSx}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id}  sx={getTableRowSx(index)}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.agent}</TableCell>
                <TableCell>{row.room}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.dateTime}</TableCell>
                <TableCell>{row.duration}</TableCell>
                {/* Updated Column */}
                <TableCell>{row.callEndedReason}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell><StatusChip success={row.status === "Successful"}>{row.status}</StatusChip></TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleOpenTranscript(row.transcript)}>
                    <Box component="img" src={FileIcon} sx={{ width: "20px", height: "20px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsChange}
      />
      <TranscriptDrawer open={isDrawerOpen} onClose={handleCloseTranscript} transcriptData={currentTranscript} />
    </Paper>
  );
};
export default CallMetricsPage;