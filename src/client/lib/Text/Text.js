import styled from 'styled-components';
import { common } from '../css';

export const Heading = styled.h1`
  ${common}
  font-family: 'Merriweather', sans-serif;
  font-size: 28px;
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')}
`;

export const SubHeading = styled.h2`
  ${common}
  font-family: 'Merriweather', sans-serif;
  font-size: 24px;
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')}
`;

export const MinorHeading = styled.h2`
  ${common}
  font-family: 'Merriweather', sans-serif;
  font-size: 16px;
  text-align: center;
`;

export const P = styled.p`
  ${common}
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')};
`;

export const Span = styled.span`
  ${common}
`;

export const UL = styled.ul`
  ${common}
`;

export const LI = styled.li`
  ${common}
`;

export const TextLink = styled.a`
  ${common}
  href=${props => props.href || '#'}
  target='_blank'
  rel='noopener noreferrer'
`;
