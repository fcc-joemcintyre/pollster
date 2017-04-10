import React from 'react';
import PropTypes from 'prop-types';

const LoadingPage = ({ message }) => {
  return (
    <div className='app-page'>
      <div className='app-h-area'>
        <div className='app-h-line1'>
          <div className='app-h-title'>Pollster</div>
        </div>
      </div>
      <div className='app-page-contentArea'>
        <div className='app-page-content' style={{ textAlign: 'center' }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
};
