import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const FlexGroup = styled.div`
  ${common}
  display: flex;
  flex-wrap: wrap;
  margin: ${props => `0 -${props.spacing}px`};
  justify-content: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')};

  > * {
    margin: ${props => `${props.spacing}px ${props.spacing}px 0px ${props.spacing}px`};
  }
`;

FlexGroup.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  spacing: PropTypes.string,
};

FlexGroup.defaultProps = {
  left: false,
  center: false,
  right: false,
  spacing: '10px',
};
