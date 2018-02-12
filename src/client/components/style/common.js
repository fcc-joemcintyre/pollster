import { css } from 'styled-components';

export const common = css`
  margin: ${props => props.m};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.p};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-left: ${props => props.pl};
  padding-right: ${props => props.pr};
  font-family: ${props => (props.f ? props.theme.font[props.f] || props.theme.font[0] : props.theme.font[0])};
  font-size: ${props => (props.fs ? props.theme.fontSize[props.f || 0][props.fs] || props.theme.fontSize[0][4] : props.theme.fontSize[0][4])};
  font-weight: ${props => (props.bold ? props.theme.fontWeight[props.f || 0][1] : props.theme.fontWeight[props.f || 0][0])};
  height: ${props => props.h};
  max-height: ${props => props.mh};
  width:  ${props => props.w};
  max-width:  ${props => props.mw};
`;

export default { common };
