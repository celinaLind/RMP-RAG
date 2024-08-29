// components/HeroSection.js
import React from 'react';
import { Grid, Typography, Box, Container, Button } from '@mui/material';
import AIchat from '../components/AIchat'
import TextTransition from './TextTransition';
import ImageCarousel from './ImageCarousel';
import  { RoughNotation }  from 'react-rough-notation';


const HeroSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh', // Full viewport height
        overflow: 'hidden',
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start', // Align items to the start (left side)
          position: 'relative', // Allows for absolute positioning of child elements
          backgroundColor: '#005744', // Left side background color
          padding: '2rem',
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontFamily: 'Reddit Mono, sans-serif',
            fontWeight: '400',
            textTransform: 'uppercase',
            color: '#ffe51c',
            marginTop: '20rem', // Adjust spacing as needed
          }}
        >
          AI powered reviews<br />
          for better{' '}
          <span style={{ position: 'relative' }}>
          <RoughNotation type="underline" show={true} color="#ffe51c">
            academic
          </RoughNotation>
          </span>
          <span style={{ marginLeft: '1rem' }}>decisions</span>

        </Typography>


        {/* AI Chat Component */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5rem', // Add margin to space it out from the text below
        }}
      >
        <AIchat />
      </Box>


        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            bottom: '5rem', // Adjust distance from bottom as needed
            left: '1rem', // Adjust distance from left as needed
            color: '#ffffff', // Adjust color as needed
            fontFamily: 'Schibsted Grotesk, sans-serif',
          }}
        >
          Choose the best <TextTransition /> every time.
        </Typography>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e0e0e0', // Right side background color
          padding: '2rem',
        }}
      >
        {/* Content for the right side */}
        <ImageCarousel />
      </Box>
    </Box>
  );
};

export default HeroSection;
