import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Chat as ChatIcon, Assessment as AssessmentIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Nhập liệu"
          value="/"
          icon={<ChatIcon />}
        />
        <BottomNavigationAction
          label="Báo cáo"
          value="/report"
          icon={<AssessmentIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation; 