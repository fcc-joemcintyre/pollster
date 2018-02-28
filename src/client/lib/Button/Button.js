import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darker } from '../css';
import { size } from './size';

/* eslint-disable indent */
export const Button = styled.button`
  ${size}
  border-radius: 4px;
  ${props => (props.primary ? css`
    color: ${props.color || props.theme.buttonPrimaryColor || '#ffffff'};
    background-color: ${props.bg || props.theme.buttonPrimaryBG || '#0000ff'};
  ` : css`
    color: ${props.color || props.theme.buttonColor || '#ffffff'};
    background-color: ${props.bg || props.theme.buttonBG || '#00007f'};
  `)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => {
      let bg = props.bg;
      if (bg) {
        if (bg === 'transparent') {
          bg = '#ffffff';
        }
      } else {
        bg = (props.primary) ? props.theme.primaryButtonBG || '#0000ff' : props.theme.buttonBG || '#00007f';
      }
      return darker (bg, 10);
    }};
  }
`;
/* eslint-enable indent */

Button.propTypes = {
  primary: PropTypes.bool,
  color: PropTypes.string,
  bg: PropTypes.string,
  ...size.propTypes,
};

Button.defaultProps = {
  primary: false,
  color: null,
  bg: null,
  ...size.defaultProps,
};
