import React, { useEffect, useState } from 'react';

const words = ["professors", "tutors", "counselors"];
const colors = ["#ffe51c", "#ff6600", "#D6B4FC"];

const TextTransition = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span style={{ 
      display: 'inline-block',
        transition: 'all 1s ease-out', 
        opacity: 0.9,
        color: colors[index]
         }}>
      {words[index]}
    </span>
  );
};

export default TextTransition;
