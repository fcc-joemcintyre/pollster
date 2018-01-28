import { css } from 'styled-components';

export const common = css`
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-left: ${props => props.pl};
  padding-right: ${props => props.pr};
  font-size: ${props => props.fs};
  font-weight: ${props => props.bold && 700};
  width:  ${props => props.w};
  max-width:  ${props => props.mw};
`;

export default { common };
