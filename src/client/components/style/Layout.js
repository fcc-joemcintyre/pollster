import styled from 'styled-components';
import { common } from './common';

export const Flex = styled.div`
  ${common}
  display: flex;
`;

export const Box = styled.div`
  margin-left: ${props => props.center && 'auto'};
  margin-right: ${props => props.center && 'auto'};
  border: ${props => (! props.noborder) && '1px solid darkgray'};
  width: ${props => props.w};
  max-width: 100%;
  ${common}
`;

export const Column = styled.div`
  ${common}
  display: inline-block;
  margin-right: 2%;

  &:last-child {
    margin-right: 0;
  }
`;

export const Row = styled.div`
  ${common}
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')};
`;

export const Divider = styled.hr`
  ${common}
  margin-left: ${props => props.extend && `-${props.extend}`};
  margin-right: ${props => props.extend && `-${props.extend}`};
`;
