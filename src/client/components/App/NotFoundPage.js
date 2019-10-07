import React, { Fragment } from 'react';
import { Text } from 'uikit';
import { Header } from '../Header';

export const NotFoundPage = () => (
  <Fragment>
    <Header />
    <Text center>Sorry, could not find that page for you.</Text>
  </Fragment>
);
