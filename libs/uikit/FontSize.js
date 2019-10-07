import PropTypes from 'prop-types';
import { css } from 'styled-components';

const data = {
  xxsmall: { index: 0, default: '11px' },
  xsmall: { index: 1, default: '12px' },
  small: { index: 2, default: '14px' },
  normal: { index: 3, default: '16px' },
  large: { index: 4, default: '18px' },
  xlarge: { index: 5, default: '22px' },
  xxlarge: { index: 6, default: '26px' },
};

export const FontSize = css`
  ${({ theme, fs }) => (fs && data[fs] ? `
    font-size: ${(theme.fontSize && theme.fontSize[data[fs].index]) || data[fs].default};
  ` : fs && `
    font-size: ${fs};
  `)};
`;

FontSize.propTypes = {
  fs: PropTypes.string,
};

FontSize.defaultProps = {
  fs: null,
};
