import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const pages = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Ajout Categorie', link: '/ajoutCategorie' },
  { label: 'Ajout Marque', link: '/ajoutMarque' },
  { label: 'Ajout Model', link: '/ajoutModel' },
  { label: 'Annonces', link: '/annonces' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <AppBar position="static" sx={{ background: '#0d4f78', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '100px',

            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontSize: 22,
                fontFamily: 'system-ui',
                fontWeight: 600,
                color: '#e87524', 
                textDecoration: 'none',
              }}
            >
              Tra
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontSize: 22,
                fontFamily: 'system-ui',
                fontWeight: 600,
                color: 'white', // White color for "lala"
                textDecoration: 'none',
              }}
            >
              lala
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {pages.map((page) => (
              <Typography
                key={page.label}
                variant="h6"
                noWrap
                component={Link}
                to={page.link}
                sx={{
                  fontSize: 16,
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'system-ui',
                  fontWeight: 400,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {page.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
            {/* Eto ny Log out */}
            <IconButton
              size="large"
              aria-label="log out"
              color="inherit"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontSize: 16,
                  fontFamily: 'system-ui',
                  fontWeight: 400,
                  color: 'white',
                  textDecoration: 'none',
                  ml: 1, 
                }}
              >
                Log Out
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
