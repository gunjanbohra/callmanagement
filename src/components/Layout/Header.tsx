'use client';

import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { 
  LayoutDashboard, 
  Phone, 
  BarChart2, 
  LogOut, 
  PieChart,
  Settings,
  Building2,
  Users,
  FileSpreadsheet
} from 'lucide-react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userSelector } from '@/store/auth';

export function Header() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const user = useRecoilValue(userSelector);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate('/login');
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  const handleSettingsNavigate = (path: string) => {
    navigate(path);
    handleSettingsClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Service Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<LayoutDashboard size={20} />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          {user?.isOwner && (
            <Button
              color="inherit"
              startIcon={<PieChart size={20} />}
              onClick={() => navigate('/owner-dashboard')}
            >
              Owner Dashboard
            </Button>
          )}
          <Button
            color="inherit"
            startIcon={<Phone size={20} />}
            onClick={() => navigate('/calls')}
          >
            Calls
          </Button>
          <Button
            color="inherit"
            startIcon={<BarChart2 size={20} />}
            onClick={() => navigate('/reports')}
          >
            Reports
          </Button>
          {user?.isOwner && (
            <>
              <Button
                color="inherit"
                startIcon={<Settings size={20} />}
                onClick={handleSettingsClick}
              >
                Setup
              </Button>
              <Menu
                anchorEl={settingsAnchor}
                open={Boolean(settingsAnchor)}
                onClose={handleSettingsClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleSettingsNavigate('/setup/company')}>
                  <Building2 size={20} style={{ marginRight: 8 }} />
                  Company Setup
                </MenuItem>
                <MenuItem onClick={() => handleSettingsNavigate('/setup/users')}>
                  <Users size={20} style={{ marginRight: 8 }} />
                  User Setup
                </MenuItem>
                <MenuItem onClick={() => handleSettingsNavigate('/setup/calls')}>
                  <FileSpreadsheet size={20} style={{ marginRight: 8 }} />
                  Call Import
                </MenuItem>
              </Menu>
            </>
          )}
          <Button
            color="inherit"
            startIcon={<LogOut size={20} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}