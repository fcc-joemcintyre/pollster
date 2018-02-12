import React from 'react';
import PropTypes from 'prop-types';
import { P } from '../style/Text';
import { Box } from '../style/Layout';

const LoadingPage = ({ message }) => (
  <Box center noborder w='500px'>
    <P center mt='40px'>
      {message}
    </P>
  </Box>
);

export default LoadingPage;

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
};
