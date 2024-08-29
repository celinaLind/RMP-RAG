import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import styles from '../ImageCarousel.module.css';


const ImageCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollPosition = 0;
      let scrollInterval;

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                if (carousel) {
                    scrollPosition += 1;
                    carousel.scrollTop = scrollPosition;

                    if (scrollPosition >= carousel.scrollHeight / 2) {
                        scrollPosition = 0;
                    }
                }
            }, 20);
        };

        const images = carousel.innerHTML;
    carousel.innerHTML += images;

    startScroll();
       
    return () => clearInterval(scrollInterval);
  }, []);

  const images = [
    '/images/dermatology.jpg',
    '/images/professor4.jpg',
    '/images/nursepractitioner.jpg',
    '/images/professor3.jpg',
    '/images/psychology.jpg',
    // Add more images as needed
  ];

  return (
    <div ref={carouselRef} className={styles.carouselContainer}>
      {images.map((image, index) => (
        <div key={index} className={styles.carouselItem}>
          <img src={image} alt={`carousel-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;

