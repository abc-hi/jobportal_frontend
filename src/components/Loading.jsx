// Loading.jsx
import React from 'react';
import loaderImg from './Spinner.gif'; // put your loading gif here

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // full screen
    }}>
      <img src={loaderImg} alt="Loading..." style={{ width: '100px', height: '100px' }} />
    </div>
  );
};

export default Loading;
