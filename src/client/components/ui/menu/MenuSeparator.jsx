import React from 'react';
import PropTypes from 'prop-types';

const MenuSeparator = ({ spacing, ...rest }) => {
  const style = { marginTop: spacing, marginBottom: spacing };
  return (
    <hr style={style} {...rest} />
  );
};

export default MenuSeparator;

MenuSeparator.propTypes = {
  spacing: PropTypes.string.isRequired,
};

MenuSeparator.defaultProps = {
  spacing: '0px',
};
