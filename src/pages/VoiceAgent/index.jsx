import React, { useState, useMemo, useCallback } from 'react';
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
  Button,
  Switch,
  Dialog,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';

// --- Styles ---
import styles from './index.module.css';

// --- Icons ---
// Use the original image imports
import AddIcon from '../../assets/icons/add.svg';
import ConfirmationSvg from '../../assets/icons/inactive.svg';
import ArrowDownIcon from '../../assets/icons/dropdown.svg';

// --- Components ---
import SearchFilter from '../../components/search/Search';
import StatusSelect from '../../components/status/Status';
import AddAgentForm from './Form/index';

// --- Mock Data ---
const initialData = [
  { id: 'V - 1234', name: 'Neha', createdDate: '12 Aug, 2025', updatedDate: '12 Aug, 2025', voice: 'Elliot', status: true },
  { id: 'V - 1234', name: 'Sneha', createdDate: '12 Aug, 2025', updatedDate: '12 Aug, 2025', voice: 'Cope', status: true },
  { id: 'V - 1234', name: 'Shubham', createdDate: '12 Aug, 2025', updatedDate: '12 Aug, 2025', voice: 'Elliot', status: true },
  { id: 'V - 1234', name: 'Vikram', createdDate: '12 Aug, 2025', updatedDate: '12 Aug, 2025', voice: 'Elliot', status: true },
  { id: 'V - 1235', name: 'Aditi', createdDate: '13 Aug, 2025', updatedDate: '14 Aug, 2025', voice: 'Shimmer', status: false },
];

const tableHeaders = ['Agent ID', 'Agent Name', 'Created Date', 'Updated Date', 'Voice', 'Status'];

// --- 1. Custom Icon (Moved outside component for stability) ---
// This prevents the component from being redefined on every render.
const CustomSelectIcon = (props) => {
  return (
    <img
      src={ArrowDownIcon}
      alt="arrow"
      className={`${styles.selectIcon} ${props.className}`}
      onClick={props.onClick}
    />
  );
};

// --- 2. Custom Pagination Component (Moved outside component for stability) ---
const CustomPagination = React.memo(({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const from = page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, count);

  return (
    <Box className={styles.paginationContainer}>
      
      {/* Rows Selector */}
      <Box className={styles.rowsSelectWrapper}>
        <Select
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          variant="standard"
          disableUnderline
          IconComponent={CustomSelectIcon}
          className={styles.paginationSelect}
          sx={{
            "& .MuiSelect-select": {
              padding: "6px 40px 6px 12px !important", 
              display: "flex",
              alignItems: "center",
            },
          }}
          MenuProps={{ PaperProps: { sx: { borderRadius: "8px", mt: 1 } } }}
        >
          {[6, 10, 25].map((num) => (
            <MenuItem key={num} value={num} sx={{ fontSize: "14px" }}>{num}</MenuItem>
          ))}
        </Select>
      </Box>

      <Typography variant="body2" className={styles.paginationText}>Items per page</Typography>
      <Typography variant="body2" className={`${styles.paginationText} ${styles.paginationTextRange}`}>
        {from}-{to} of {count} items
      </Typography>

      <Box className={styles.paginationArrows}>
        <IconButton
          onClick={(e) => onPageChange(e, page - 1)}
          disabled={page === 0}
          size="small"
          className={styles.arrowBtn}
        >
          <Typography className={styles.arrowText}>‹</Typography>
        </IconButton>
        <IconButton
          onClick={(e) => onPageChange(e, page + 1)}
          disabled={page * rowsPerPage + rowsPerPage >= count}
          size="small"
          className={styles.arrowBtn}
        >
          <Typography className={styles.arrowText}>›</Typography>
        </IconButton>
      </Box>
    </Box>
  );
});

// Setting a display name is helpful for debugging with React DevTools
CustomPagination.displayName = 'CustomPagination';


const AIVoiceAgentPage = () => {
  const [rows, setRows] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [openDialog, setOpenDialog] = useState(false); 
  const [openSaveDialog, setOpenSaveDialog] = useState(false); 
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  // --- Handlers optimized with useCallback ---

  const updateAgentStatus = useCallback((id, newStatus) => {
    setRows(currentRows => 
      currentRows.map((row) => row.id === id ? { ...row, status: newStatus } : row)
    );
  }, []);

  const handleSearchChange = useCallback((e) => { setSearchTerm(e.target.value); setPage(0); }, []);
  const handleStatusChange = useCallback((e) => { setSelectedStatus(e.target.value); setPage(0); }, []);
  const handlePageChange = useCallback((e, newPage) => setPage(newPage), []);
  const handleRowsChange = useCallback((e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }, []);

  // Simplified and consolidated close handlers
  const handleCloseDialog = useCallback(() => { 
    setOpenDialog(false); 
    setSelectedAgent(null); 
  }, []);

  const handleConfirmDisable = useCallback(() => {
    if (selectedAgent) {
      updateAgentStatus(selectedAgent.id, false);
      handleCloseDialog();
    }
  }, [selectedAgent, handleCloseDialog, updateAgentStatus]);

  const handleSwitchToggle = useCallback((agent) => {
    if (agent.status === true) {
      setSelectedAgent(agent);
      setOpenDialog(true);
    } else {
      updateAgentStatus(agent.id, true);
    }
  }, [updateAgentStatus]);

  const handleSaveClick = useCallback(() => { setOpenSaveDialog(true); }, []);
  const handleCloseSaveDialog = useCallback(() => { setOpenSaveDialog(false); }, []);
  
  const handleConfirmSave = useCallback(() => {
    setOpenSaveDialog(false);
    setOpenDrawer(false);
  }, []);

  const handleAddAgentClick = useCallback(() => { setOpenDrawer(true); }, []);
  const handleCloseDrawer = useCallback(() => { setOpenDrawer(false); }, []);


  // --- Filtered Data Memoization ---
  // The filtering logic is the biggest performance concern. `useMemo` is already used, 
  // but let's ensure the status comparison is efficient.
  const filteredData = useMemo(() => {
    // Determine the required status match value once
    const statusMatch = selectedStatus === 'Active' ? true : selectedStatus === 'Inactive' ? false : null;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return rows.filter((item) => {
      const matchesSearch = item.id.toLowerCase().includes(lowerSearchTerm) ||
        item.name.toLowerCase().includes(lowerSearchTerm) ||
        item.voice.toLowerCase().includes(lowerSearchTerm);

      // Check for status match only if a status is selected
      const matchesStatus = statusMatch === null ? true : item.status === statusMatch;
      
      return matchesSearch && matchesStatus;
    });
  }, [rows, searchTerm, selectedStatus]);


  // --- Paginated Data (Optional but good practice for large datasets) ---
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);


  return (
    <Paper className={styles.pageContainer}>
      
      {/* Header */}
      <Box className={styles.header}>
        <Typography variant="h6" className={styles.title}>AI Agents</Typography>
        <Box className={styles.filtersContainer}>
          <Box className={styles.searchWrapper}>
            <SearchFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </Box>
          <Box className={styles.statusWrapper}>
            {/* Note: Assuming StatusSelect passes a synthetic event to onStatusChange */}
            <StatusSelect selectedStatus={selectedStatus} onStatusChange={handleStatusChange} statuses={['Active', 'Inactive']} />
          </Box>
          <Button
            variant="contained"
            startIcon={<img src={AddIcon} alt="add" style={{ width: '14px', height: '14px' }} />}
            onClick={handleAddAgentClick}
            className={styles.addButton}
          >
            Add AI Agent
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader aria-label="ai agents table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header} className={styles.tableHeaderCell}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Use paginatedData for render */}
            {paginatedData.map(({ id, name, createdDate, updatedDate, voice, status }, index) => (
              <TableRow key={index} className={styles.tableBodyRow}>
                <TableCell className={styles.tableBodyCell}>{id}</TableCell>
                <TableCell className={styles.tableBodyCell}>{name}</TableCell>
                <TableCell className={styles.tableBodyCell}>{createdDate}</TableCell>
                <TableCell className={styles.tableBodyCell}>{updatedDate}</TableCell>
                <TableCell className={styles.tableBodyCell}>{voice}</TableCell>
                <TableCell className={styles.tableBodyCell}>
                  <Switch 
                    className={styles.greenSwitch} 
                    checked={status} 
                    onChange={() => handleSwitchToggle({ id, name, status })} 
                    disableRipple
                  />
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" className={styles.noDataCell}>
                  <Typography variant="body2" color="text.secondary">No Agents found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom Pagination */}
      <CustomPagination
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsChange}
      />

      {/* --- Dialogs --- */}
      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ className: styles.dialogPaper }}>
        <DialogContent className={styles.dialogContent}>
          <Typography variant="h6" className={styles.dialogTitle}>
            Are you sure you want to <br /> Inactivate **{selectedAgent?.name}**?
          </Typography>
          <Box sx={{ my: 1 }}><img src={ConfirmationSvg} alt="confirm" style={{ width: '140px' }} /></Box>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button onClick={handleCloseDialog} variant="contained" className={styles.dialogBtnNo}>No</Button>
          <Button onClick={handleConfirmDisable} variant="contained" className={styles.dialogBtnYes}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSaveDialog} onClose={handleCloseSaveDialog} PaperProps={{ className: styles.dialogPaper }}>
        <DialogContent className={styles.dialogContent}>
          <Typography variant="h6" className={styles.dialogTitle}>
            Are you sure you want to save <br /> the changes?
          </Typography>
          <Box sx={{ my: 1 }}><img src={ConfirmationSvg} alt="confirm save" style={{ width: '140px' }} /></Box>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button onClick={handleCloseSaveDialog} variant="contained" className={styles.dialogBtnNo}>Discard</Button>
          <Button onClick={handleConfirmSave} variant="contained" className={styles.dialogBtnYes}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* --- Add Agent Form --- */}
      <AddAgentForm 
        open={openDrawer} 
        onClose={handleCloseDrawer} 
        onSave={handleSaveClick} 
      />

    </Paper>
  );
};

export default AIVoiceAgentPage;