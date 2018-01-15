import React from 'react';
import { PageContent } from '../style/Page';
import { P } from '../style/Text';

// Content displayed for 404
const NotFoundPage = () => {
  return (
    <PageContent>
      <P center>Sorry, could not find that page for you.</P>
    </PageContent>
  );
};

export default NotFoundPage;
