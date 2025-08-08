import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import useGeneral from '../hooks/useGeneral';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';

const Navbar = () => {
  const { navigate } = useGeneral();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const check = async () => {
      const data = { url: apis().getAccess };
      const result = await httpAction(data);
      setIsAuth(Boolean(result?.status));
    };
    check();
  }, []);

  const logout = async () => {
    const data = { url: apis().logout };
    await httpAction(data);
    setIsAuth(false);
    navigate('/login');
  };
  return (
    <AppBar position="sticky" color="inherit" elevation={1} className="appbar-glass">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, cursor: 'pointer', letterSpacing: 0.3 }} onClick={() => navigate('/')}>Hijab Styles</Typography>
        {isAuth ? (
          <Stack direction="row" spacing={1}>
            <Button onClick={() => navigate('/profile')}>Profile</Button>
            <Button variant="contained" color="error" onClick={logout}>Logout</Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button variant="contained" onClick={() => navigate('/register')}>Sign Up</Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


