import React from 'react';
import PropTypes from 'prop-types';
import { P } from '../../lib/Text';
import { Box } from '../../lib/Layout';

export const LoadingPage = ({ message }) => (
  <Box center noborder w='500px'>
    <P center mt='40px'>
      {message}
    </P>
  </Box>
);

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
};
