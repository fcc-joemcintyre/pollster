import styled from 'styled-components';
import { common } from './common';

export const Flex = styled.div`
  ${common}
  display: flex;
`;

export const Box = styled.div`
  margin-left: ${(props) => { return props.center && 'auto'; }};
  margin-right: ${(props) => { return props.center && 'auto'; }};
  border: ${(props) => { return (! props.noborder) && '1px solid darkgray'; }};
  width: ${(props) => { return props.w; }};
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
  text-align: ${(props) => { return props.center ? 'center' : props.right ? 'right' : 'left'; }};
`;

export const Divider = styled.hr`
  ${common}
  margin-left: ${(props) => { return props.extend && `-${props.extend}`; }};
  margin-right: ${(props) => { return props.extend && `-${props.extend}`; }};
`;
