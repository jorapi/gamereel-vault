import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GamesIcon from '@mui/icons-material/Games';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 150;

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    width: open ? drawerWidth : 0,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: open ? drawerWidth : 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: `64px`, // Typically AppBar's height, adjust if your AppBar is taller
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: open ? `${drawerWidth}px` : 0,
        // This sets the left margin to the drawer's width when it's open
    }),
);


const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function Layout({ children }) {

    // Initialize the drawer state from localStorage
    const [drawerOpen, setDrawerOpen] = useState(
        JSON.parse(localStorage.getItem('drawerOpen')) || true
    );

    // When the component mounts, read from localStorage
    useEffect(() => {
        const storedDrawerState = localStorage.getItem('drawerOpen');
        if (storedDrawerState !== null) {
            setDrawerOpen(JSON.parse(storedDrawerState));
        }
    }, []);

    // Functions to handle drawer state changes
    const handleDrawerClose = () => {
        setDrawerOpen(false);
        localStorage.setItem('drawerOpen', 'false');
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
        localStorage.setItem('drawerOpen', 'true');
    };


    return (
        <div style={{ display: 'flex' }}>
            <StyledAppBar position="fixed" open={drawerOpen}>
                <Toolbar>
                    {!drawerOpen && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap>
                        GameReel Vault
                    </Typography>
                </Toolbar>
            </StyledAppBar >
            <StyledDrawer variant="permanent" open={drawerOpen}>
                <Toolbar>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <List>
                    {/* Home Link */}
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>

                    {/* Games Link */}
                    <ListItem button component={Link} to="/games">
                        <ListItemIcon>
                            <GamesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Games" />
                    </ListItem>

                    {/* Add more navigation links here */}
                </List>
            </StyledDrawer>
            <MainContent open={drawerOpen}>
                {children}
            </MainContent>
        </div>
    );
}

export default Layout;
