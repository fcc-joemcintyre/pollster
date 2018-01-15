import { css } from 'styled-components';

export const common = css`
  margin-top: ${(props) => { return props.mt; }};
  margin-bottom: ${(props) => { return props.mb; }};
  margin-left: ${(props) => { return props.ml; }};
  margin-right: ${(props) => { return props.mr; }};
  padding-top: ${(props) => { return props.pt; }};
  padding-bottom: ${(props) => { return props.pb; }};
  padding-left: ${(props) => { return props.pl; }};
  padding-right: ${(props) => { return props.pr; }};
  font-size: ${(props) => { return props.fs; }};
  font-weight: ${(props) => { return props.bold && 700; }};
  width:  ${(props) => { return props.w; }};
  max-width:  ${(props) => { return props.mw; }};
`;

export default { common };
