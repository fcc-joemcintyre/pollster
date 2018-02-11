import React from 'react';
import PropTypes from 'prop-types';
import { PageContent } from '../style/Page';
import { P } from '../style/Text';
import { Relative, Box } from '../style/Layout';
import { FixedHeader, Title } from '../style/Header';

const LoadingPage = ({ message }) => (
  <PageContent>
    <FixedHeader>
      <Relative mw='768px' m='0 auto'>
        <Title>Pollster</Title>
      </Relative>
    </FixedHeader>
    <Box center noborder w='500px'>
      <P center mt='40px'>
        {message}
      </P>
    </Box>
  </PageContent>
);

export default LoadingPage;

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
};
