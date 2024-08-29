'use client'
import React from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Stack, AppBar } from '@mui/material';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AIchat from './components/AIchat';
import Image from "next/image";
import Styles from './page.module.css';
import { useState, useRef, useEffect } from 'react'
import fetch from "node-fetch";



const Home = () => {
  return (
    <div className={Styles.container}>
      <Navbar />
      <HeroSection />
      </div>
      );
      }
      export default Home;