// @ts-check
import { forwardRef } from 'react';
import { Link } from '@mui/material';

/**
 * @typedef {Object} Props
 * @property {string} href
 */

/**
 * @type React.ForwardRefExoticComponent<Props>
 */
export const LinkExternal = forwardRef ((props, ref) => {
  const { href, ...rest } = props;
  return <Link ref={ref} href={href} target='_blank' rel='noopener noreferrer' {...rest} />;
});
