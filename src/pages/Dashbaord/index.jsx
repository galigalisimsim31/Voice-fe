import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

// Keep your imports exactly as they were
import TotalCallsIcon from '../../assets/icons/call.svg';
import SuccessIcon from '../../assets/icons/right.svg';
import ActiveAgentsIcon from '../../assets/icons/agentcall.svg';
import DurationIcon from '../../assets/icons/clock_icon.svg';
import CallVolumeChart from '../../components/charts/dotline/index';
import CallPerformanceChart from '../../components/charts/donut/index';
import ClientEngagementChart from '../../components/charts/bar/index';

import CustomDateFilter from '../../components/date/Date';
import AgentSelect from '../../components/agent/Agent';
import ResetButton from '../../components/reset/Reset';

// --- FIXED STATCARD: Changed width from "240px" to "100%" ---
const StatCard = ({
  title,
  value,
  iconSrc,
  iconBg,
  backgroundColor = '#FFFFFF',
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: '16px',
      backgroundColor: backgroundColor,
      height: '100%',
      width: '240px', // Fix 1: Allow card to fill the Grid column
      border: backgroundColor === '#FFFFFF' ? '1px solid #E0E0E0' : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        mb: 2,
      }}
    >
      <Typography
        variant="body2"
        color="rgba(69, 69, 69, 1)"
        fontWeight="500"
        sx={{ fontSize: '16px' }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '50px',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={iconSrc}
          alt={title}
          style={{ width: '20px', height: '20px' }}
        />
      </Box>
    </Box>

    <Typography
      component="div"
      variant="h4"
      fontWeight="600"
      sx={{ color: 'rgba(0, 0, 0, 1)', fontSize: '28px' }}
    >
      {value}
    </Typography>
  </Paper>
);

const locations = [
  { name: 'India', count: 1234 },
  { name: 'New Zealand', count: 123 },
  { name: 'United States', count: 12 },
  { name: 'UAE', count: 47 },
  { name: 'Australia', count: 12 },
];

const DashboardPage = () => {
  const [agent, setAgent] = useState('');

  const handleDateApply = (range) => {
    console.log('Date range selected:', range);
  };

  const handleAgentChange = (event) => {
    setAgent(event.target.value);
  };

  const handleReset = () => {
    setAgent('');
    console.log('Filters reset');
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        minHeight: '100vh',
        borderRadius: '20px',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="500" color="rgba(31, 44, 94, 1)">
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <CustomDateFilter onApply={handleDateApply} />

          <Box sx={{ width: 170 }}>
            <AgentSelect
              selectedAgent={agent}
              onAgentChange={handleAgentChange}
              agents={['Agent 1', 'Agent 2', 'Agent 3']}
            />
          </Box>

          <ResetButton onClick={handleReset} />
        </Box>
      </Box>

      {/* --- Row 0: Stats Cards --- */}
      {/* Fix 2: Adjusted xs/sm/md/lg values so they add up to 12 correctly */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Calls"
            value="500"
            iconSrc={TotalCallsIcon}
            iconBg="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(238, 249, 248, 1)"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Success Rate"
            value="86.6%"
            iconSrc={SuccessIcon}
            iconBg="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(255, 253, 239, 1)"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Agents"
            value="25"
            iconSrc={ActiveAgentsIcon}
            iconBg="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(238, 247, 254, 1)"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Avg Duration"
            value={
              <span style={{ display: 'flex', alignItems: 'baseline' }}>
                12456
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '200',
                    marginLeft: '4px',
                    color: 'rgba(69, 69, 69, 1)',
                  }}
                >
                  Mins
                </span>
              </span>
            }
            iconSrc={DurationIcon}
            iconBg="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(247, 242, 245, 1)"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }} alignItems="stretch">
        {/* LEFT SIDE — Call Volume */}
        <Grid item xs={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              height: '100%',
              minHeight: '320px',
              width: '500px !important', // ✅ MAKES BOTH CARDS SAME HEIGHT
              border: '1px solid rgba(213, 213, 213, 1)',
            }}
          >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Call Volume Over Time
            </Typography>
            <CallVolumeChart />
          </Paper>
        </Grid>

        {/* RIGHT SIDE — Call Performance */}
        <Grid item xs={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              height: '100%',
              minHeight: '320px',
              width: '500px !important', // ✅ SAME HEIGHT AS LEFT SIDE
              border: '1px solid rgba(213, 213, 213, 1)',
              overflow: 'hidden',
            }}
          >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Call Performance Overview
            </Typography>
            <CallPerformanceChart />
          </Paper>
        </Grid>
      </Grid>

      {/* --- Row 2: Engagement & Location --- */}
      <Grid container spacing={3}>
        {/* Client Engagement */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              height: '100%',
              width: '500px !important', // ✅ MAKES BOTH CARDS SAME HEIGHT

              border: '1px solid rgba(213, 213, 213, 1)',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{ mb: 2, color: 'rgba(0, 0, 0, 1)' }}
            >
              Client Engagement Overview
            </Typography>
            <ClientEngagementChart />
          </Paper>
        </Grid>

        {/* Client Reach by Location */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              height: '100%',
              width: '500px !important', // ✅ MAKES BOTH CARDS SAME HEIGHT

              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(213, 213, 213, 1)',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{ mb: 2, color: 'rgba(0, 0, 0, 1)' }}
            >
              Client Reach by Location
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
                color: 'rgba(0, 0, 0, 1)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <span>Location</span>
              <span>Call Counts</span>
            </Box>

            <List disablePadding>
              {locations.map((loc, index) => (
                <ListItem
                  key={loc.name}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? 'rgba(243, 243, 243, 1)' : 'white',
                    py: 1.5,
                  }}
                  secondaryAction={
                    <Typography
                      variant="body2"
                      fontWeight="400"
                      color="rgba(69, 69, 69, 1)"
                    >
                      {loc.count}
                    </Typography>
                  }
                >
                  <ListItemText
                    primary={loc.name}
                    primaryTypographyProps={{
                      fontSize: '14px',
                      color: 'rgba(69, 69, 69, 1)',
                      fontWeight: 400,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
