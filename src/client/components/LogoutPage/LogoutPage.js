import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageContent, Text } from 'uikit';
import { logout } from '../../store/userActions';
import { Header } from '../Header';

const LogoutPageBase = ({ authenticated, dispatch }) => {
  const [working, setWorking] = useState (true);

  useEffect (() => {
    (async () => {
      await dispatch (logout ());
      setWorking (false);
    }) ();
  }, []);

  return (
    <Fragment>
      <Header />
      <PageContent>
        {working ?
          <Text as='p' mt='30px' center>
            Logging out ...
          </Text> :
          authenticated ?
            <Text as='p' mt='30px' center>
              Logging out did not complete, please retry or close your browser.
            </Text> :
            <Text as='p' mt='30px' center>
              Thank you for using Pollster, we hope to see you back again soon.
            </Text>
        }
      </PageContent>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export const LogoutPage = connect (mapStateToProps) (LogoutPageBase);

LogoutPageBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
