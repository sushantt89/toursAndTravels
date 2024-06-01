import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';
import './top-loading-bar.css'; // Import CSS file for styling (optional)

const TopLoadingBar = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const finishLoading = () => {
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setVisible(false);
          }, 300); // Adjust the delay before hiding the loading bar (in milliseconds)
        }, 500); // Adjust the delay before completing the loading bar (in milliseconds)
      };
  
      window.addEventListener('load', finishLoading);
  
      return () => {
        window.removeEventListener('load', finishLoading);
      };
    }, []);
  
    return visible ? (
      <Progress
        value={progress}
        className="top-loading-bar"
        style={{ height: '4px' }} // Adjust the height of the loading bar
      />
    ) : null;
  };
  
  export default TopLoadingBar;