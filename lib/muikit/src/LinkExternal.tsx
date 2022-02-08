import { forwardRef } from 'react';
import { Link } from '@mui/material';

type Props = { href: string };

/**
 * External link with html attributes populated
 */
export const LinkExternal = forwardRef<HTMLAnchorElement, Props> ((props, ref) => {
  const { href, ...rest } = props;
  return <Link ref={ref} href={href} target='_blank' rel='noopener noreferrer' {...rest} />;
});
