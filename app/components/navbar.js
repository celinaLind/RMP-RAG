'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';


const Navbar = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div"
                sx={{ fontFamily: 'Reddit Mono, sans-serif', textTransform: 'uppercase', fontWeight: '900' }}

                >
                    Rate My Professor
                </Typography>
                <Box sx={{ display: 'flex', gap: '1.5rem' }}>
                    <Button color="inherit" sx={{backgroundColor: '#005744', fontFamily: 'Schibsted Grotesk, sans-serif', color: 'white'}}>Universities</Button>
                    <Button color="inherit" sx={{ fontFamily: 'Schibsted Grotesk, sans-serif', color: '#662c90', '&:hover': { backgroundColor: '#ffe51c'},}}>Search</Button>
                    <Button color="inherit" sx={{ fontFamily: 'Schibsted Grotesk, sans-serif', color: '#ff6600', '&:hover': { backgroundColor: '#662c90', },}}>FAQ</Button>
                    <Button color="inherit" sx={{ fontFamily: 'Schibsted Grotesk, sans-serif', '&:hover': { backgroundColor: '#ff6600', },}}>Submit A Link</Button>

                </Box>
            </Toolbar>
            </AppBar>
    );
};

export default Navbar;