import React from 'react';
import PropTypes from 'prop-types';
import { PageContent } from '../style/Page';
import { P } from '../style/Text';
import { Box } from '../style/Layout';
import { FixedFullWidth, RelativeCenteredBox, Title } from '../style/Header';

const LoadingPage = ({ message }) => (
  <PageContent>
    <FixedFullWidth>
      <RelativeCenteredBox>
        <Title>Pollster</Title>
      </RelativeCenteredBox>
    </FixedFullWidth>
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
