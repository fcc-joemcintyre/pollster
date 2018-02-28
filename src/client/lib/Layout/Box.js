import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { common } from '../css';

export const Box = styled.div`
  ${common}
  ${({ center }) => center && css`
    margin-left: auto;
    margin-right: auto;
  `};
  ${({ bg }) => bg && css`
    background-color: ${bg}
  `};
`;

Box.propTypes = {
  center: PropTypes.bool,
  bg: PropTypes.bool,
};

Box.defaultProps = {
  center: false,
  bg: null,
};
