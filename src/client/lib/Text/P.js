import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from './textSize';

export const P = styled.p`
  ${size}
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

P.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

P.defaultProps = {
  left: false,
  center: false,
  right: false,
};
