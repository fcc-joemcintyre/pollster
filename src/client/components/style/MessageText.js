import styled from 'styled-components';
import { common } from '../style/common';

const statusBorder = {
  info: 'white',
  working: 'yellow',
  ok: '#A5C3A0',
  error: '#FF5733',
};

const statusBG = {
  info: 'white',
  working: 'lightyellow',
  ok: '#C3F3BA',
  error: '#FADBD8',
};

export const MessageText = styled.span`
  ${common}
  padding: 4px;
  border: 2px solid ${(props) => { return statusBorder[props.status] || 'white'; }};
  background-color: ${(props) => { return statusBG[props.status] || 'white'; }};
  border-radius: 4px;
`;

export default { MessageText };
