import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { common } from '../css';

export const Divider = styled.hr`
  ${common}
  ${({ extend }) => extend && css`
    margin-left: -${extend};
    margin-right: -${extend};
  `};
`;

Divider.propTypes = {
  extend: PropTypes.string,
};

Divider.defaultProps = {
  extend: null,
};
